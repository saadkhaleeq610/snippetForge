// package main

// import (
// 	"github.com/gin-gonic/gin"
// )

// func main() {
// 	InitDB()

// 	r := gin.Default()

// 	// Routes
// 	r.POST("/paste", CreatePaste) // Create a new paste
// 	r.GET("/:key", GetPaste)      // Retrieve a paste

// 	r.Run(":8080") // Start server on port 8080
// }

package main

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/mattn/go-sqlite3" // Import the SQLite driver
)

func main() {
	// Open a SQLite database file (it will create the file if it doesn't exist)
	db, err := sql.Open("sqlite3", "./example.db")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	// Create a table if it doesn't exist
	createTable := `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT
    );`
	_, err = db.Exec(createTable)
	if err != nil {
		log.Fatal(err)
	}

	// Insert a new user
	insertUser := `INSERT INTO users (name, email) VALUES (?, ?)`
	_, err = db.Exec(insertUser, "John Doe", "john@example.com")
	if err != nil {
		log.Fatal(err)
	}

	// Query the database
	rows, err := db.Query("SELECT id, name, email FROM users")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	// Loop through the rows
	for rows.Next() {
		var id int
		var name, email string
		err := rows.Scan(&id, &name, &email)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Printf("ID: %d, Name: %s, Email: %s\n", id, name, email)
	}

	// Check for errors after iterating through rows
	if err := rows.Err(); err != nil {
		log.Fatal(err)
	}
}
