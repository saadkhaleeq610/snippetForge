# Code Sharing Application

## Overview

This is a modern code sharing application that allows developers to create, share, and view code snippets through unique URLs. Built with a React frontend and Go backend, it provides a seamless experience for sharing code snippets across teams and communities.

## Features

- **Create Snippets**: Write and save code snippets with syntax highlighting
- **Share Snippets**: Generate unique, shareable URLs for your code snippets
- **View Snippets**: Access shared code snippets through their unique URLs
- **Syntax Highlighting**: Support for multiple programming languages
- **Responsive Design**: Optimized for various screen sizes
- **Modern UI**: Clean and intuitive user interface

## Tech Stack

### Frontend

- **React**: JavaScript library for building user interfaces
- **TypeScript**: For type-safe development
- **Vite**: Next-generation frontend build tool
- **React Syntax Highlighter**: For code syntax highlighting

### Backend

- **Go**: High-performance backend server
- **Supabase**: Open-source Firebase alternative for database
- **CORS Middleware**: For secure cross-origin requests

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Go (v1.16 or higher)
- Supabase account

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd snippet_sharing
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd code-sharing-app/backend
   ```

2. Set up environment variables:

   - Copy `.env.example` to `.env`
   - Update Supabase credentials in `.env`

3. Run the server:
   ```bash
   go run main.go
   ```

## Project Structure

```
├── snippet_sharing/       # Frontend React application
│   ├── src/              # Source code
│   ├── public/           # Static files
│   └── package.json      # Dependencies and scripts
├── code-sharing-app/     # Backend Go application
│   └── backend/         # Server implementation
└── middleware/          # CORS and other middleware
```

## Development

### Frontend Development

- The frontend is built with React and TypeScript
- Uses Vite for fast development and building
- Components are organized in the `src` directory
- Styles are managed with CSS modules

### Backend Development

- RESTful API built with Go
- Uses Supabase for data persistence
- Implements CORS middleware for security
- Structured for scalability and maintainability

## API Endpoints

### Snippets

- `POST /api/snippets`: Create a new snippet
- `GET /api/snippets/:id`: Retrieve a snippet by ID
- `GET /api/snippets`: List all snippets

## Deployment

### Frontend Deployment

1. Build the frontend:
   ```bash
   cd snippet_sharing
   npm run build
   ```
2. Deploy the `dist` directory to your hosting service

### Backend Deployment

1. Build the Go binary:
   ```bash
   cd code-sharing-app/backend
   go build
   ```
2. Deploy the binary to your server

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
