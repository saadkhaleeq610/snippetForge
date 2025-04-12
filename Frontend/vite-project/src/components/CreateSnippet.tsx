import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateSnippet = () => {
  const [content, setContent] = useState('');
  const [language, setLanguage] = useState('plaintext');
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [snippetId, setSnippetId] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [copyAlert, setCopyAlert] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setGeneratedLink('');

    try {
      const snippet = {
        content,
        language,
        title: title || undefined,
      };

      const response = await fetch('/api/snippet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(snippet),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data && data[0] && data[0].id) {
        const snippetUrl = `${window.location.origin}/snippet/${data[0].id}`;
        setGeneratedLink(snippetUrl);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error creating snippet:', error);
      setError('Failed to create snippet. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewSnippet = () => {
    if (snippetId.trim()) {
      const id = snippetId.includes('/') ? snippetId.split('/').pop() : snippetId;
      navigate(`/snippet/${id}`);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-screen-md mx-auto px-4 py-3 flex items-center">
          <h1 className="text-md font-medium flex items-center">
            <span className="mr-2">{"</>"}</span> SnippetForge
          </h1>
        </div>
      </header>

      <main className="max-w-screen-md mx-auto p-4">
        {error && (
          <div className="bg-red-900/30 border border-red-700 text-red-200 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {generatedLink && (
          <div className="bg-amber-900/30 border border-amber-700 text-amber-200 px-4 py-3 rounded mb-4">
            <p className="font-medium mb-2">Snippet created successfully!</p>
            <div className="flex items-center">
              <input
                type="text"
                readOnly
                value={generatedLink}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md mr-2 text-gray-200"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generatedLink);
                  setCopyAlert(true);
                  setTimeout(() => setCopyAlert(false), 2000); // Hide alert after 2 seconds
                }}
                className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded shadow-md"
              >
                Copy
              </button>
            </div>
          </div>
        )}
        
        {copyAlert && (
          <div className="bg-green-900/30 border border-green-700 text-green-200 px-4 py-3 rounded mb-4">
            Link copied to clipboard!
          </div>
        )}
        
        <div className="mb-8">
          <h2 className="text-xl font-medium mb-4">Create New Snippet</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm text-gray-300 mb-1">
                Title (Optional)
              </label>
              <input
                type="text"
                id="title"
                placeholder="Enter snippet title"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-gray-200 focus:outline-none focus:border-gray-500"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="language" className="block text-sm text-gray-300 mb-1">
                Language
              </label>
              <select
                id="language"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-gray-200 focus:outline-none focus:border-gray-500"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="plaintext">Plain Text</option>
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="python">Python</option>
                <option value="go">Go</option>
                <option value="java">Java</option>
                <option value="csharp">C#</option>
                <option value="cpp">C++</option>
                <option value="php">PHP</option>
                <option value="ruby">Ruby</option>
                <option value="swift">Swift</option>
                <option value="kotlin">Kotlin</option>
                <option value="rust">Rust</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="content" className="block text-sm text-gray-300 mb-1">
                Code Snippet
              </label>
              <textarea
                id="content"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-gray-200 font-mono h-64 focus:outline-none focus:border-gray-500"
                placeholder="Paste your code here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>
            
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md shadow-md w-auto"
              disabled={isLoading}
            >
              {isLoading ? 'Generating...' : 'Generate Link'}
            </button>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6">
          <h2 className="text-xl font-medium mb-4">View Existing Snippet</h2>
          <div className="flex">
            <input
              type="text"
              placeholder="Enter snippet ID or paste link"
              value={snippetId}
              onChange={(e) => setSnippetId(e.target.value)}
              className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-l-md text-gray-200 focus:outline-none focus:border-gray-500"
            />
            <button
              onClick={handleViewSnippet}
              className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-r-md shadow-md"
            >
              View
            </button>
          </div>
        </div>
      </main>

      <footer className="mt-8 py-4 text-center text-gray-500 text-sm">
        © 2023 CodePaste. All rights reserved.
      </footer>
    </div>
  );
};

export default CreateSnippet;
