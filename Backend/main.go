package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

// Snippet struct to hold the snippet data
type Snippet struct {
	ID        string `json:"id,omitempty"`
	Content   string `json:"content"`
	Language  string `json:"language"`
	Title     string `json:"title,omitempty"`
	CreatedAt string `json:"created_at,omitempty"`
	ExpiresAt string `json:"expires_at,omitempty"`
}

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// Load environment variables
	supabaseURL := os.Getenv("SUPABASE_URL")
	supabaseKey := os.Getenv("SUPABASE_KEY")

	if supabaseURL == "" || supabaseKey == "" {
		log.Fatal("SUPABASE_URL and SUPABASE_KEY must be set in environment variables")
	}

	// Set up CORS middleware
	http.HandleFunc("/api/snippet", func(w http.ResponseWriter, r *http.Request) {
		// Set CORS headers
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		// Handle preflight requests
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		switch r.Method {
		case http.MethodPost:
			// Handle storing a new snippet
			handleStoreSnippet(w, r, supabaseURL, supabaseKey)
		case http.MethodGet:
			// Handle retrieving a snippet by ID
			handleGetSnippet(w, r, supabaseURL, supabaseKey)
		default:
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		}
	})

	fmt.Println("Server is running on port 8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func handleStoreSnippet(w http.ResponseWriter, r *http.Request, supabaseURL, supabaseKey string) {
	var snippet Snippet

	// Parse the request body
	if err := json.NewDecoder(r.Body).Decode(&snippet); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	// Validate snippet content
	if snippet.Content == "" {
		http.Error(w, "Snippet content is required", http.StatusBadRequest)
		return
	}

	// Set default language if not provided
	if snippet.Language == "" {
		snippet.Language = "plaintext"
	}

	// Create JSON payload
	payload, err := json.Marshal(snippet)
	if err != nil {
		http.Error(w, "Failed to create request payload", http.StatusInternalServerError)
		return
	}

	// Create request to Supabase
	req, err := http.NewRequest("POST", supabaseURL+"/rest/v1/snippets", bytes.NewBuffer(payload))
	if err != nil {
		http.Error(w, "Failed to create request", http.StatusInternalServerError)
		return
	}

	// Set headers for Supabase API
	req.Header.Set("apikey", supabaseKey)
	req.Header.Set("Authorization", "Bearer "+supabaseKey)
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Prefer", "return=representation")

	// Send request
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		http.Error(w, "Failed to store snippet", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	// Read response
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		http.Error(w, "Failed to read response", http.StatusInternalServerError)
		return
	}

	// Check if the request was successful
	if resp.StatusCode != http.StatusCreated && resp.StatusCode != http.StatusOK {
		http.Error(w, fmt.Sprintf("Supabase error: %s", body), resp.StatusCode)
		return
	}

	// Return the response
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	w.Write(body)
}

func handleGetSnippet(w http.ResponseWriter, r *http.Request, supabaseURL, supabaseKey string) {
	// Extract the snippet ID from the query parameters
	id := r.URL.Query().Get("id")
	if id == "" {
		http.Error(w, "Snippet ID is required", http.StatusBadRequest)
		return
	}

	// Create request to Supabase
	req, err := http.NewRequest("GET", supabaseURL+"/rest/v1/snippets?id=eq."+id, nil)
	if err != nil {
		http.Error(w, "Failed to create request", http.StatusInternalServerError)
		return
	}

	// Set headers for Supabase API
	req.Header.Set("apikey", supabaseKey)
	req.Header.Set("Authorization", "Bearer "+supabaseKey)

	// Send request
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		http.Error(w, "Failed to retrieve snippet", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	// Read response
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		http.Error(w, "Failed to read response", http.StatusInternalServerError)
		return
	}

	// Check if we got any results
	var snippets []Snippet
	if err := json.Unmarshal(body, &snippets); err != nil {
		http.Error(w, "Failed to parse response", http.StatusInternalServerError)
		return
	}

	if len(snippets) == 0 {
		http.Error(w, "Snippet not found", http.StatusNotFound)
		return
	}

	// Return the snippet
	w.Header().Set("Content-Type", "application/json")
	w.Write(body)
}
