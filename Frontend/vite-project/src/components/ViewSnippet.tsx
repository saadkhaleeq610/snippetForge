import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';

import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-markup-templating'; // ✅ REQUIRED for PHP
import 'prismjs/components/prism-php';

import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-swift';
import 'prismjs/components/prism-kotlin';


// Define Snippet type
interface Snippet {
  id: string;
  content: string;
  language: string;
  title?: string;
  created_at: string;
}

const ViewSnippet = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [snippet, setSnippet] = useState<Snippet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Language mapping to ensure proper highlighting
  const getLanguageClass = (language: string) => {
    const languageMap: { [key: string]: string } = {
      javascript: 'javascript',
      typescript: 'typescript',
      python: 'python',
      go: 'go',
      java: 'java',
      csharp: 'csharp',
      cpp: 'cpp',
      php: 'php',
      ruby: 'ruby',
      swift: 'swift',
      kotlin: 'kotlin',
      rust: 'rust',
      plaintext: 'plaintext',
      // Add more mappings if needed
    };
    return languageMap[language.toLowerCase()] || 'plaintext';
  };

  useEffect(() => {
    // Initialize Prism
    if (typeof window !== 'undefined') {
      Prism.manual = true;
    }
  }, []);

  useEffect(() => {
    const fetchSnippet = async () => {
      if (!id) {
        navigate('/');
        return;
      }
      
      try {
        setLoading(true);
        const response = await fetch(`/api/snippet?id=${id}`);
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data && data.length > 0) {
          setSnippet(data[0]);
        } else {
          setError('Snippet not found');
        }
      } catch (error) {
        console.error('Error fetching snippet:', error);
        setError('Failed to load snippet. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchSnippet();
  }, [id, navigate]);

  useEffect(() => {
    if (snippet) {
      // Ensure highlighting is applied after the DOM is updated
      const timeout = setTimeout(() => {
        Prism.highlightAll();
      }, 0);

      return () => clearTimeout(timeout); // Cleanup timeout
    }
  }, [snippet]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <header className="bg-gray-900 border-b border-gray-800">
          <div className="max-w-screen-md mx-auto px-4 py-3 flex items-center">
            <h1 className="text-md font-medium flex items-center">
              <span className="mr-2">{"</>"}</span> SnippetForge
            </h1>
          </div>
        </header>
        
        <main className="flex justify-center items-center h-[80vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-400"></div>
        </main>
      </div>
    );
  }

  if (error || !snippet) {
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
          <div className="bg-red-900/30 border border-red-700 text-red-200 px-4 py-3 rounded mb-4">
            {error || 'Snippet not found'}
          </div>
          <Link to="/" className="text-gray-400 hover:text-gray-300">
            ← Create New Snippet
          </Link>
        </main>
      </div>
    );
  }

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
        <div className="mb-4">
          <Link to="/" className="text-gray-400 hover:text-gray-300">
            ← Create New Snippet
          </Link>
        </div>
        
        <div className="bg-gray-900 border border-gray-800 rounded shadow-lg overflow-hidden">
          {snippet.title && (
            <div className="px-4 py-2 bg-gray-800 border-b border-gray-700">
              <h2 className="text-lg font-medium">{snippet.title}</h2>
              <div className="flex text-xs text-gray-400 mt-1">
                <span className="mr-2">Language: {snippet.language}</span>
                <span>Created: {new Date(snippet.created_at).toLocaleString()}</span>
              </div>
            </div>
          )}
          <pre className="p-4 m-0 overflow-x-auto">
            <code className={`language-${getLanguageClass(snippet.language)}`}>
              {snippet.content}
            </code>
          </pre>
        </div>
      </main>
      
      <footer className="mt-8 py-4 text-center text-gray-500 text-sm">
        © 2023 SnippetForge. All rights reserved.
      </footer>
    </div>
  );
};

export default ViewSnippet;