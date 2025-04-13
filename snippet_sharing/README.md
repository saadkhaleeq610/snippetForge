# Code Sharing Application

This project is a **Code Sharing Application** built with **React**, **TypeScript**, and **Vite** for the frontend, and **Go** with **Supabase** for the backend. It allows users to create, share, and view code snippets via unique URLs.

## Features

- **Create Snippets**: Write and save code snippets.
- **Share Snippets**: Generate shareable URLs for your snippets.
- **View Snippets**: Retrieve and view snippets using their URLs.
- **Responsive Design**: Optimized for various screen sizes.
- **Modern UI**: Built with React and styled for a sleek user experience.

---

## Frontend

### Tech Stack

- **React**: For building the user interface.
- **TypeScript**: For type-safe development.
- **Vite**: For fast builds and hot module replacement.

### Setup Instructions

1. **Install Dependencies**:

   ```bash
   npm install
   ```

2. **Run Development Server**:

   ```bash
   npm run dev
   ```

3. **Build for Production**:

   ```bash
   npm run build
   ```

4. **Preview Production Build**:
   ```bash
   npm run preview
   ```

### ESLint Configuration

This project uses ESLint for linting. To expand the configuration for type-aware lint rules, refer to the following:

```js
export default tseslint.config({
  extends: [
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

---

## Backend

### Tech Stack

- **Go**: For building the backend server.
- **Supabase**: For storing and retrieving code snippets.

### Setup Instructions

1. **Install Go Dependencies**:
   Ensure you have Go installed and set up.

2. **Environment Variables**:
   Create a `.env` file in the `backend` directory with the following:

   ```
   SUPABASE_URL=<your-supabase-url>
   SUPABASE_KEY=<your-supabase-key>
   ```

3. **Run the Server**:

   ```bash
   go run main.go
   ```

4. **Endpoints**:
   - `POST /snippets`: Save a new snippet.
   - `POST /getsnippets`: Retrieve a snippet by ID.
   - `GET /ping`: Health check endpoint.

---

## Middleware

The backend includes a CORS middleware to handle cross-origin requests. Update the allowed origins in `cors.go` as needed.

---

## Project Structure

```
httpserver_
├── snippet_sharing/          # Frontend
│   ├── src/                  # React source files
│   ├── public/               # Static assets
│   ├── package.json          # Frontend dependencies
│   ├── vite.config.ts        # Vite configuration
│   └── tsconfig.*.json       # TypeScript configurations
├── code-sharing-app/         # Backend
│   ├── backend/              # Go backend source files
│   ├── .env                  # Environment variables
│   └── main.go               # Backend entry point
└── middleware/               # Shared middleware
```

---

## Usage

1. **Create a Snippet**:

   - Write your code in the text area and click "Create Snippet".
   - Copy the generated URL to share.

2. **View a Snippet**:
   - Paste the snippet URL in the input field and click "View".

---

## License

This project is licensed under the MIT License.
