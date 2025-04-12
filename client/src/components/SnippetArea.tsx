import { useState } from "react";

export default function CodeSnippetShare() {
  const [code, setCode] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleGenerateLink = () => {
    // Simulate link generation (replace with real backend logic)
    const link = `https://codeshare.app/snippet/${btoa(code).slice(0, 8)}`;
    setGeneratedLink(link);
    setShowPopup(true);

    // Auto-hide popup after 3 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  const isCodePresent = code.trim().length > 0;

  return (
    <div className="relative mx-auto mt-4 p-6 bg-gray-900 text-white rounded-2xl shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Share Your Code Snippet</h1>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="// Paste or write your code here..."
        className="min-w-300 h-120 p-4 border border-gray-700 bg-gray-800 text-white rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm placeholder-gray-400"
      />

      {isCodePresent && (
        <div className="mt-4 text-right">
          <button
            onClick={handleGenerateLink}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          >
            Generate Link
          </button>
        </div>
      )}

{showPopup && (
        <div className="static flex justify-center items-center bg-gray-800 border border-gray-700 text-white text-sm rounded-lg px-4 py-2 shadow-lg">
          Link generated:
          <br />
          <a href={generatedLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
            {generatedLink}
          </a>
        </div>
      )}
    </div>
    
  );
}
