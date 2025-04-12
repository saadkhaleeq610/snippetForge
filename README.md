# Code Snippet Pastebin

A full-stack web application for sharing code snippets, built with Go (backend) and React/TypeScript (frontend). Uses Supabase for storage.

## Features

- Create and share code snippets
- Syntax highlighting for multiple programming languages
- Generate unique, shareable links for snippets
- View stored snippets using unique IDs

## Tech Stack

### Backend
- Go
- Supabase (PostgreSQL)

### Frontend
- React
- TypeScript
- Tailwind CSS
- Supabase JS SDK

## Setup Instructions

### Prerequisites
- Go (1.16+)
- Node.js (14+)
- npm or yarn
- Supabase account and project

### Backend Setup

1. Navigate to the Backend directory:
   ```
   cd Backend
   ```

2. Set up environment variables in the .env file:
   ```
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_key
   ```

3. Run the Go server:
   ```
   go run main.go
   ```

The server will start on http://localhost:8080.

### Frontend Setup

1. Navigate to the Frontend directory:
   ```
   cd Frontend/vite-project
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables in the .env file:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_KEY=your_supabase_key
   ```

4. Start the development server:
   ```
   npm run dev
   ```

The frontend will be available at http://localhost:5173.

### Database Schema

Supabase table structure:

```sql
CREATE TABLE snippets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content TEXT NOT NULL,
  language VARCHAR(50) DEFAULT 'plaintext',
  title VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE
);
```

## Usage

1. Visit the homepage to create a new snippet
2. Enter your code in the editor
3. Select a language and optionally add a title
4. Click "Generate Link" to create a unique, shareable URL
5. Share the URL with others to view your snippet

## License

MIT 