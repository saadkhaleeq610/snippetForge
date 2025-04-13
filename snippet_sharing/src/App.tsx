"use client";

import type React from "react";
import { useState, useEffect, useRef, type CSSProperties } from "react";
import "./App.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { detectLanguage } from "./utils/language-detector";

// Define TypeScript types for our styles
type StylesType = {
  [key: string]: CSSProperties;
};

const styles: StylesType = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    width: "100%",
    fontFamily:
      "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
    color: "#e2e8f0",
  },
  header: {
    padding: "20px 40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    position: "sticky",
    top: 0,
    zIndex: 10,
    background: "rgba(15, 23, 42, 0.8)",
  },
  logo: {
    fontSize: "24px",
    fontWeight: 700,
    background: "linear-gradient(90deg, #38bdf8 0%, #818cf8 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  tagline: {
    fontSize: "14px",
    opacity: 0.7,
  },
  mainContent: {
    display: "flex",
    flex: 1,
    height: "calc(100vh - 70px)",
  },
  sectionLeft: {
    flex: 1,
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    overflow: "hidden",
  },
  sectionRight: {
    flex: 1,
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    overflow: "hidden",
    borderLeft: "1px solid rgba(255, 255, 255, 0.1)",
  },
  glowLeft: {
    position: "absolute",
    top: "50%",
    left: "0",
    width: "300px",
    height: "300px",
    background:
      "radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, rgba(15, 23, 42, 0) 70%)",
    transform: "translateY(-50%)",
    pointerEvents: "none",
    zIndex: 0,
  },
  glowRight: {
    position: "absolute",
    top: "50%",
    right: "0",
    width: "300px",
    height: "300px",
    background:
      "radial-gradient(circle, rgba(129, 140, 248, 0.15) 0%, rgba(15, 23, 42, 0) 70%)",
    transform: "translateY(-50%)",
    pointerEvents: "none",
    zIndex: 0,
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    position: "relative",
    zIndex: 1,
  },
  heading: {
    fontSize: "22px",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  languageBadge: {
    padding: "4px 10px",
    borderRadius: "16px",
    fontSize: "13px",
    fontWeight: 500,
    background: "rgba(56, 189, 248, 0.2)",
    color: "#38bdf8",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  languageBadgeRight: {
    padding: "4px 10px",
    borderRadius: "16px",
    fontSize: "13px",
    fontWeight: 500,
    background: "rgba(129, 140, 248, 0.2)",
    color: "#818cf8",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  editorContainer: {
    display: "flex",
    flex: 1,
    position: "relative",
    zIndex: 1,
    marginBottom: "20px",
    borderRadius: "12px",
    overflow: "hidden",
    background: "rgba(30, 41, 59, 0.5)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
  },
  editorWrapper: {
    position: "relative",
    width: "100%",
    height: "100%",
    minHeight: "300px",
  },
  textarea: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    padding: "15px 15px 15px 60px", // Add padding for line numbers
    fontSize: "15px",
    lineHeight: "1.5",
    background: "rgba(15, 23, 42, 0.3)",
    border: "none",
    outline: "none",
    color: "#e2e8f0",
    fontFamily: "monospace",
    resize: "none",
    zIndex: 2,
    caretColor: "#38bdf8",
  },
  submitButton: {
    padding: "12px 24px",
    fontSize: "15px",
    fontWeight: 600,
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(90deg, #38bdf8 0%, #818cf8 100%)",
    color: "#fff",
    boxShadow: "0 4px 14px rgba(56, 189, 248, 0.4)",
    transition: "all 0.2s ease",
    position: "relative",
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
  submitButtonDisabled: {
    padding: "12px 24px",
    fontSize: "15px",
    fontWeight: 600,
    borderRadius: "8px",
    border: "none",
    background: "rgba(56, 189, 248, 0.3)",
    color: "#fff",
    boxShadow: "0 4px 14px rgba(56, 189, 248, 0.4)",
    transition: "all 0.2s ease",
    position: "relative",
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    cursor: "not-allowed",
  },
  urlResult: {
    marginTop: "20px",
    padding: "20px",
    borderRadius: "12px",
    background: "rgba(30, 41, 59, 0.5)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(56, 189, 248, 0.3)",
    boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)",
    animation: "fadeIn 0.3s ease-out",
    position: "relative",
    zIndex: 1,
  },
  urlResultLabel: {
    fontSize: "14px",
    fontWeight: 500,
    marginBottom: "12px",
    color: "#38bdf8",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  urlInputContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  urlInput: {
    flex: 1,
    padding: "12px 15px",
    fontSize: "14px",
    borderRadius: "8px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    background: "rgba(15, 23, 42, 0.5)",
    color: "#e2e8f0",
    fontFamily: "monospace",
    outline: "none",
  },
  copyButton: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "rgba(255, 255, 255, 0.1)",
    color: "#e2e8f0",
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  copyButtonSuccess: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "rgba(34, 197, 94, 0.2)",
    color: "#22c55e",
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  urlSearchContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
    position: "relative",
    zIndex: 1,
  },
  viewButton: {
    padding: "12px 24px",
    fontSize: "15px",
    fontWeight: 600,
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(90deg, #818cf8 0%, #a78bfa 100%)",
    color: "#fff",
    boxShadow: "0 4px 14px rgba(129, 140, 248, 0.4)",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
  viewButtonDisabled: {
    padding: "12px 24px",
    fontSize: "15px",
    fontWeight: 600,
    borderRadius: "8px",
    border: "none",
    background: "rgba(129, 140, 248, 0.3)",
    color: "#fff",
    boxShadow: "0 4px 14px rgba(129, 140, 248, 0.4)",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    cursor: "not-allowed",
  },
  snippetContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    position: "relative",
    zIndex: 1,
    animation: "fadeIn 0.3s ease-out",
  },
  snippetHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  snippetInfo: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  snippetTitle: {
    fontSize: "16px",
    fontWeight: 500,
    color: "#818cf8",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  copySnippetButton: {
    padding: "6px 12px",
    fontSize: "13px",
    borderRadius: "6px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    background: "rgba(30, 41, 59, 0.5)",
    color: "#e2e8f0",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  snippetViewerContainer: {
    flex: 1,
    borderRadius: "12px",
    overflow: "hidden",
    background: "rgba(30, 41, 59, 0.5)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
  },
  emptySnippet: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
    borderRadius: "12px",
    background: "rgba(30, 41, 59, 0.3)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    textAlign: "center",
    position: "relative",
    zIndex: 1,
  },
  emptySnippetIcon: {
    color: "#64748b",
    marginBottom: "20px",
  },
  emptySnippetTitle: {
    fontSize: "16px",
    color: "#94a3b8",
    marginBottom: "10px",
  },
  emptySnippetText: {
    fontSize: "14px",
    color: "#64748b",
  },
  syntaxHighlighter: {
    margin: 0,
    padding: "15px",
    background: "transparent",
    fontSize: "15px",
    lineHeight: "1.5",
    height: "100%",
    borderRadius: "12px",
    minHeight: "300px",
  },
  lineNumbers: {
    color: "#64748b",
    paddingRight: "15px",
    textAlign: "right",
    minWidth: "40px",
  },
};

function App() {
  const [text, setText] = useState("");
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState("");
  const [snippet, setSnippet] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [language, setLanguage] = useState("javascript");
  const [snippetLanguage, setSnippetLanguage] = useState("javascript");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextSubmit = async () => {
    if (!text.trim()) {
      alert("Please enter some text before submitting.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Detect language before submitting
      const detectedLang = detectLanguage(text);

      const response = await fetch("http://localhost:8080/snippets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: text,
          language: detectedLang, // Store the detected language with the snippet
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const url = `${window.location.origin}/snippet/${data.id}`;
        setGeneratedUrl(url);
        setText(""); // Clear the text area after submission
        setLanguage("javascript"); // Reset language
      } else {
        console.error("Error submitting text:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting text:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyUrl = () => {
    if (generatedUrl) {
      navigator.clipboard.writeText(generatedUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const handleUrlCheck = async () => {
    if (!urlInput.trim()) {
      alert("Please enter a valid URL.");
      return;
    }

    const id = urlInput.split("/").pop(); // Extract the ID from the URL
    if (!id) {
      alert("Invalid URL format.");
      return;
    }

    setIsFetching(true);
    try {
      const response = await fetch("http://localhost:8080/getsnippets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        const data = await response.json();
        setSnippet(data.code); // Display the fetched snippet

        // Set the language from the response if available, otherwise detect it
        if (data.language) {
          setSnippetLanguage(data.language);
        } else {
          setSnippetLanguage(detectLanguage(data.code));
        }
      } else {
        console.error("Error fetching snippet:", response.statusText);
        setSnippet(null);
      }
    } catch (error) {
      console.error("Error fetching snippet:", error);
      setSnippet(null);
    } finally {
      setIsFetching(false);
    }
  };

  // Detect language as user types
  useEffect(() => {
    if (text) {
      const detectedLang = detectLanguage(text);
      setLanguage(detectedLang);
    }
  }, [text]);

  // Animation for line numbers
  const [lineCount, setLineCount] = useState(1);
  useEffect(() => {
    if (text) {
      const lines = text.split("\n").length;
      setLineCount(lines);
    } else {
      setLineCount(1);
    }
  }, [text]);

  // Handle tab key in textarea
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;

      // Insert tab at cursor position
      const newValue = text.substring(0, start) + "  " + text.substring(end);
      setText(newValue);

      // Move cursor after the inserted tab
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart =
            textareaRef.current.selectionEnd = start + 2;
        }
      }, 0);
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.logo}>
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ color: "#38bdf8" }}
          >
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
          CodeShare
        </div>
        <div style={styles.tagline}>Share code snippets instantly</div>
      </header>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Left Section: Create Snippet */}
        <div style={styles.sectionLeft}>
          <div style={styles.glowLeft}></div>

          <div style={styles.sectionHeader}>
            <h1 style={styles.heading}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ color: "#38bdf8" }}
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
              </svg>
              Create Snippet
            </h1>

            {/* Language badge */}
            <div style={styles.languageBadge}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m18 16 4-4-4-4"></path>
                <path d="m6 8-4 4 4 4"></path>
                <path d="m14.5 4-5 16"></path>
              </svg>
              {language}
            </div>
          </div>

          <div style={styles.editorContainer}>
            <div style={styles.editorWrapper}>
              {/* Syntax highlighted code (always visible) */}
              <SyntaxHighlighter
                language={language}
                style={vscDarkPlus}
                showLineNumbers={true}
                customStyle={styles.syntaxHighlighter}
                lineNumberStyle={styles.lineNumbers}
              >
                {text || "// Write your code here..."}
              </SyntaxHighlighter>

              {/* Actual textarea for editing (transparent overlay) */}
              <textarea
                ref={textareaRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="// Write your code here..."
                style={{
                  ...styles.textarea,
                  opacity: 0, // Make it semi-transparent so the highlighted code is visible
                }}
                onFocus={(e) => {
                  // Increase opacity when focused
                  e.currentTarget.style.opacity = "0";
                }}
                onBlur={(e) => {
                  // Restore opacity when blurred
                  e.currentTarget.style.opacity = "0";
                }}
              />
            </div>
          </div>

          <button
            onClick={handleTextSubmit}
            disabled={isSubmitting || !text.trim()}
            style={
              isSubmitting || !text.trim()
                ? styles.submitButtonDisabled
                : styles.submitButton
            }
          >
            {isSubmitting ? (
              <>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ animation: "spin 1s linear infinite" }}
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
                </svg>
                Creating...
              </>
            ) : (
              <>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14"></path>
                  <path d="M12 5v14"></path>
                </svg>
                Create Snippet
              </>
            )}
          </button>

          {generatedUrl && (
            <div style={styles.urlResult}>
              <p style={styles.urlResultLabel}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
                Your shareable link is ready
              </p>
              <div style={styles.urlInputContainer}>
                <input
                  type="text"
                  value={generatedUrl}
                  readOnly
                  style={styles.urlInput}
                />
                <button
                  onClick={handleCopyUrl}
                  style={
                    copySuccess ? styles.copyButtonSuccess : styles.copyButton
                  }
                >
                  {copySuccess ? (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6 9 17l-5-5"></path>
                    </svg>
                  ) : (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        width="14"
                        height="14"
                        x="8"
                        y="8"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                    </svg>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Section: Display Snippet */}
        <div style={styles.sectionRight}>
          <div style={styles.glowRight}></div>

          <h1 style={styles.heading}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: "#818cf8" }}
            >
              <path d="M2 12a5 5 0 0 0 5 5 8 8 0 0 1 5 2 8 8 0 0 1 5-2 5 5 0 0 0 5-5V7h-5a8 8 0 0 0-5 2 8 8 0 0 0-5-2H2Z"></path>
            </svg>
            View Snippet
          </h1>

          <div style={styles.urlSearchContainer}>
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Paste a snippet URL here..."
              style={styles.urlInput}
            />
            <button
              onClick={handleUrlCheck}
              disabled={isFetching || !urlInput.trim()}
              style={
                isFetching || !urlInput.trim()
                  ? styles.viewButtonDisabled
                  : styles.viewButton
              }
            >
              {isFetching ? (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ animation: "spin 1s linear infinite" }}
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
                </svg>
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
              )}
              {isFetching ? "Loading..." : "View"}
            </button>
          </div>

          {snippet ? (
            <div style={styles.snippetContainer}>
              <div style={styles.snippetHeader}>
                <div style={styles.snippetInfo}>
                  <h3 style={styles.snippetTitle}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <path d="M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1"></path>
                      <path d="M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1"></path>
                    </svg>
                    Snippet Content
                  </h3>

                  {/* Language badge for snippet */}
                  <div style={styles.languageBadgeRight}>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m18 16 4-4-4-4"></path>
                      <path d="m6 8-4 4 4 4"></path>
                      <path d="m14.5 4-5 16"></path>
                    </svg>
                    {snippetLanguage}
                  </div>
                </div>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(snippet);
                    alert("Code copied to clipboard!");
                  }}
                  style={styles.copySnippetButton}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      width="14"
                      height="14"
                      x="8"
                      y="8"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                  </svg>
                  Copy Code
                </button>
              </div>

              <div style={styles.snippetViewerContainer}>
                {/* Syntax highlighted code */}
                <SyntaxHighlighter
                  language={snippetLanguage}
                  style={vscDarkPlus}
                  showLineNumbers={true}
                  customStyle={styles.syntaxHighlighter}
                  lineNumberStyle={styles.lineNumbers}
                >
                  {snippet}
                </SyntaxHighlighter>
              </div>
            </div>
          ) : (
            <div style={styles.emptySnippet}>
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={styles.emptySnippetIcon}
              >
                <path d="M2 12a5 5 0 0 0 5 5 8 8 0 0 1 5 2 8 8 0 0 1 5-2 5 5 0 0 0 5-5V7h-5a8 8 0 0 0-5 2 8 8 0 0 0-5-2H2Z"></path>
              </svg>
              <p style={styles.emptySnippetTitle}>No Snippet Loaded</p>
              <p style={styles.emptySnippetText}>
                Enter a snippet URL above to view its contents
              </p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

export default App;
