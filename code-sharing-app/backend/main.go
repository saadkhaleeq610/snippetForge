package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"github.com/google/uuid"
	"github.com/joho/godotenv"
)

// Snippet represents the structure of a code snippet
type Snippet struct {
	ID   string `json:"id"`
	Code string `json:"code"`
}

func main() {
	// Load environment variables from .env file
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}

	http.HandleFunc("/ping", withCORS(handlePing))               // Ping endpoint
	http.HandleFunc("/snippets", withCORS(handleSnippets))       // Snippets endpoint
	http.HandleFunc("/getsnippets", withCORS(handleGetSnippets)) // Get Snippets endpoint

	port := "8080"
	fmt.Printf("Server is running on http://localhost:%s\n", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}

// withCORS is a middleware function to add CORS headers
func withCORS(handler http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Add CORS headers
		w.Header().Set("Access-Control-Allow-Origin", "*")                            // Allow all origins
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")          // Allow specific methods
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization") // Allow specific headers

		// Handle preflight (OPTIONS) requests
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		// Call the original handler
		handler(w, r)
	}
}

// handlePing handles the /ping endpoint
func handlePing(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	// Respond with a simple JSON message
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"message": "pong"})
}

// handleSnippets handles POST requests to save code snippets
func handleSnippets(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	// Parse the request body
	var snippet Snippet
	err := json.NewDecoder(r.Body).Decode(&snippet)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Generate a unique ID for the snippet
	snippet.ID = uuid.New().String()

	// Save the snippet to Supabase
	err = saveSnippetToSupabase(snippet)
	if err != nil {
		http.Error(w, "Failed to save snippet", http.StatusInternalServerError)
		return
	}

	// Respond with the snippet ID
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"id": snippet.ID})
}

// handleGetSnippets handles POST requests to retrieve the snippet content
func handleGetSnippets(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	// Parse the request body
	var requestData struct {
		ID string `json:"id"`
	}
	err := json.NewDecoder(r.Body).Decode(&requestData)
	if err != nil || requestData.ID == "" {
		http.Error(w, "Invalid request body or missing ID", http.StatusBadRequest)
		return
	}

	// Fetch the snippet from Supabase
	snippet, err := getSnippetFromSupabase(requestData.ID)
	if err != nil {
		http.Error(w, "Snippet not found", http.StatusNotFound)
		return
	}

	// Respond with the snippet content
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"code": snippet.Code})
}

// saveSnippetToSupabase saves the snippet to Supabase using its REST API
func saveSnippetToSupabase(snippet Snippet) error {
	// Supabase API URL and table name
	supabaseURL := os.Getenv("SUPABASE_URL")
	supabaseKey := os.Getenv("SUPABASE_KEY")
	tableName := "snippets"

	// Construct the Supabase API endpoint
	apiURL := fmt.Sprintf("%s/rest/v1/%s", supabaseURL, tableName)

	// Convert the snippet to JSON
	snippetJSON, err := json.Marshal(snippet)
	if err != nil {
		return err
	}

	// Create the HTTP request
	req, err := http.NewRequest("POST", apiURL, bytes.NewBuffer(snippetJSON))
	if err != nil {
		return err
	}

	// Set the required headers
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("apikey", supabaseKey)
	req.Header.Set("Authorization", "Bearer "+supabaseKey)

	// Send the request
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	// Check for errors in the response
	if resp.StatusCode != http.StatusCreated {
		body, _ := ioutil.ReadAll(resp.Body)
		return fmt.Errorf("failed to save snippet: %s", string(body))
	}

	return nil
}

// getSnippetFromSupabase fetches a snippet from Supabase by ID
func getSnippetFromSupabase(id string) (*Snippet, error) {
	// Supabase API URL and table name
	supabaseURL := os.Getenv("SUPABASE_URL")
	supabaseKey := os.Getenv("SUPABASE_KEY")
	tableName := "snippets"

	// Construct the Supabase API endpoint
	apiURL := fmt.Sprintf("%s/rest/v1/%s?id=eq.%s", supabaseURL, tableName, id)

	// Create the HTTP request
	req, err := http.NewRequest("GET", apiURL, nil)
	if err != nil {
		return nil, err
	}

	// Set the required headers
	req.Header.Set("apikey", supabaseKey)
	req.Header.Set("Authorization", "Bearer "+supabaseKey)

	// Send the request
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	// Check for errors in the response
	if resp.StatusCode != http.StatusOK {
		body, _ := ioutil.ReadAll(resp.Body)
		return nil, fmt.Errorf("failed to fetch snippet: %s", string(body))
	}

	// Parse the response
	var snippets []Snippet
	err = json.NewDecoder(resp.Body).Decode(&snippets)
	if err != nil || len(snippets) == 0 {
		return nil, fmt.Errorf("snippet not found")
	}

	return &snippets[0], nil
}
