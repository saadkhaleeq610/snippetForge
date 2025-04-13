// Enhanced language detection utility with additional languages

// Define types for language patterns
type LanguagePattern = {
  keywords?: string[]
  patterns: RegExp[]
}

type LanguagePatterns = {
  [key: string]: LanguagePattern
}

// Improved language patterns with C++, C, Java, and enhanced SQL
const languagePatterns: LanguagePatterns = {
  javascript: {
    keywords: [
      "const", "let", "var", "function", "return", "if", "else", "for", "while",
      "class", "export", "import", "from", "=>", "Promise", "async", "await",
      "document", "window", "console", "null", "undefined"
    ],
    patterns: [
      /\bconst\s+\w+\s*=/,
      /\blet\s+\w+\s*=/,
      /\bfunction\s+\w+\s*\(/,
      /=>\s*{/,
      /import\s+.*\s+from\s+['"]/,
      /export\s+default/,
      /\bconsole\.(log|error|warn|info)\(/,
      /new Promise\s*\(/,
      /\basync\s+function/,
      /\bawait\s+/,
      /\bdocument\.querySelector/,
      /\bwindow\.(addEventListener|location|fetch)/
    ],
  },
  typescript: {
    keywords: [
      "interface", "type", "namespace", "enum", "as", "implements", "readonly",
      "private", "protected", "public", "extends", "generic", "unknown", "never",
      "any", "keyof", "typeof", "declare", "module"
    ],
    patterns: [
      /:\s*(string|number|boolean|any)\b/,
      /interface\s+\w+/,
      /type\s+\w+\s*=/,
      /<[A-Z]\w*>/,
      /<T>/,
      /<T,/,
      /as\s+const/,
      /\w+<\w+>/,
      /\w+:\s*\w+\[\]/,
      /declare\s+(function|const|var|class)/,
      /\w+\s*:\s*\(\s*\)\s*=>\s*\w+/,
      /\w+\s*<\s*\w+\s*(,\s*\w+\s*)*>/
    ],
  },
  python: {
    keywords: [
      "def", "class", "import", "from", "if", "elif", "else", "for", "while",
      "try", "except", "finally", "with", "as", "lambda", "return", "self",
      "None", "True", "False", "and", "or", "not", "in", "is"
    ],
    patterns: [
      /def\s+\w+\s*\(/,
      /class\s+\w+(\s*\([\w,\s]*\))?:/,
      /import\s+\w+/,
      /from\s+\w+\s+import/,
      /#.*$/m,
      /"""/,
      /:\s*$/m,
      /\bself\.\w+/,
      /\bif\s+\w+\s+in\s+/,
      /\s{4}/,
      /\[\s*\w+\s+for\s+\w+\s+in\s+/,
      /@\w+/
    ],
  },
  html: {
    keywords: [
      "DOCTYPE", "html", "head", "body", "div", "span", "script", "link", "meta",
      "class", "id", "src", "href", "style", "alt", "title"
    ],
    patterns: [
      /<!DOCTYPE\s+html>/i,
      /<html[\s>]/i,
      /<\/html>/i,
      /<head>[\s\S]*?<\/head>/i,
      /<body[\s>][\s\S]*?<\/body>/i,
      /<\w+\s+[^>]*?(class|id|style)="[^"]*"/i,
      /<(div|span|p|h[1-6]|ul|li|a|img|input|form)[\s>]/i
    ],
  },
  rust: {
    keywords: [
      "fn", "let", "mut", "pub", "struct", "enum", "impl", "trait", "match",
      "if", "else", "use", "mod", "crate", "extern", "unsafe", "async", "await",
      "dyn", "ref", "self", "Self", "static"
    ],
    patterns: [
      /fn\s+\w+\s*\(/,
      /let\s+mut\s+\w+/,
      /let\s+\w+:\s*[\w<>\[\]]+/,
      /pub\s+(struct|enum|fn|trait|mod)/,
      /impl\s+\w+(\s+for\s+\w+)?/,
      /use\s+[\w:]+::{[^}]+}/,
      /\w+::\w+/,
      /->\s*[\w<>\[\]]+/,
      /Ok\(\w+\)/,
      /Err\(\w+\)/,
      /&mut\s+\w+/,
      /#\[[\w_]+(\(.*?\))?\]/
    ],
  },
  cpp: {
    keywords: [
      "class", "struct", "template", "namespace", "public", "private", "protected",
      "virtual", "const", "static", "inline", "auto", "void", "int", "bool",
      "vector", "string", "cout", "cin", "new", "delete", "std::", "nullptr"
    ],
    patterns: [
      /#include\s*<[\w.]+>/,
      /using\s+namespace\s+std;/,
      /std::\w+/,
      /\w+::\w+/,
      /class\s+\w+(\s*:\s*(public|private|protected)\s+\w+)?/,
      /void\s+\w+\s*\([^)]*\)/,
      /int\s+\w+\s*\([^)]*\)/,
      /string\s+\w+/,
      /vector<\w+>/,
      /cout\s*<<\s*/,
      /cin\s*>>\s*/,
      /new\s+\w+(\s*\([^)]*\))?/,
      /delete\s+\w+/,
      /template\s*<\s*(class|typename)\s+\w+\s*>/
    ],
  },
  c: {
    keywords: [
      "int", "char", "float", "double", "void", "struct", "union", "typedef",
      "enum", "const", "static", "extern", "volatile", "register", "sizeof",
      "malloc", "free", "printf", "scanf", "FILE", "NULL"
    ],
    patterns: [
      /#include\s*<[\w.]+>/,
      /#define\s+\w+/,
      /\bint\s+\w+\s*\(/,
      /\bvoid\s+\w+\s*\(/,
      /\bmalloc\s*\(/,
      /\bfree\s*\(/,
      /\bprintf\s*\(/,
      /\bscanf\s*\(/,
      /struct\s+\w+\s*{/,
      /typedef\s+struct/,
      /\w+\s*\*\s*\w+/,
      /\bFILE\s*\*\s*\w+/,
      /return\s+\d+;/
    ],
  },
  java: {
    keywords: [
      "public", "private", "protected", "class", "interface", "extends", "implements",
      "abstract", "final", "static", "void", "int", "boolean", "String", "import", 
      "package", "try", "catch", "finally", "throw", "throws", "new", "this", "super",
      "System", "out", "println", "null", "Override"
    ],
    patterns: [
      /public\s+class\s+\w+/,
      /public\s+(static\s+)?(void|int|String|boolean)\s+\w+\s*\(/,
      /import\s+[\w.]+;/,
      /package\s+[\w.]+;/,
      /System\.out\.println\(/,
      /@Override/,
      /new\s+\w+(\s*\([^)]*\))?/,
      /try\s*\{[\s\S]*?\}\s*catch\s*\(/,
      /public\s+interface\s+\w+/,
      /extends\s+\w+/,
      /implements\s+\w+/,
      /\w+\[\]\s+\w+/
    ],
  },
  sql: {
    keywords: [
      "SELECT", "FROM", "WHERE", "INSERT", "UPDATE", "DELETE", "CREATE", "TABLE",
      "ALTER", "DROP", "JOIN", "GROUP", "ORDER", "BY", "HAVING", "UNION", "INDEX",
      "VIEW", "PROCEDURE", "FUNCTION", "TRIGGER", "DATABASE", "SCHEMA", "GRANT", 
      "REVOKE", "PRIMARY", "FOREIGN", "KEY", "CONSTRAINT", "NULL", "NOT", "AS"
    ],
    patterns: [
      /SELECT\s+[\w\s,*]+\s+FROM/i,
      /CREATE\s+TABLE\s+\w+/i,
      /INSERT\s+INTO\s+\w+/i,
      /UPDATE\s+\w+\s+SET/i,
      /DELETE\s+FROM\s+\w+/i,
      /ALTER\s+TABLE\s+\w+/i,
      /JOIN\s+\w+\s+ON/i,
      /GROUP\s+BY\s+\w+/i,
      /ORDER\s+BY\s+\w+/i,
      /WHERE\s+\w+\s*[=<>]/i,
      /CREATE\s+(INDEX|VIEW|PROCEDURE|FUNCTION|TRIGGER)/i,
      /PRIMARY\s+KEY\s*\(/i,
      /FOREIGN\s+KEY\s*\(/i,
      /CONSTRAINT\s+\w+/i
    ],
  }
}

// Helper function to escape regex special characters
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

// Improved language detection with better scoring and context analysis
export function detectLanguage(code: string): string {
  if (!code || code.trim() === "") {
    return "javascript" // Default language
  }

  // Normalize code by trimming whitespace
  const normalizedCode = code.trim()
  
  // Quick detection for obvious patterns
  if (normalizedCode.startsWith("<?php")) return "php"
  if (normalizedCode.startsWith("#!/usr/bin/env python") || normalizedCode.startsWith("#!/usr/bin/python")) return "python"
  if (normalizedCode.startsWith("<!DOCTYPE html") || normalizedCode.startsWith("<html")) return "html"
  if (normalizedCode.match(/^{\s*"[^"]+"\s*:/)) return "json"
  if (normalizedCode.startsWith("#include <") && !normalizedCode.includes("class")) return "c"
  if (normalizedCode.includes("public static void main(String[] args)")) return "java"
  if (normalizedCode.toUpperCase().startsWith("SELECT ") && normalizedCode.toUpperCase().includes(" FROM ")) return "sql"
  
  // Score for each language
  const scores: Record<string, number> = {}

  // Initialize scores
  Object.keys(languagePatterns).forEach((lang) => {
    scores[lang] = 0
  })

  // Check for language patterns
  Object.entries(languagePatterns).forEach(([lang, { keywords = [], patterns = [] }]) => {
    // Check keywords with context awareness
    keywords.forEach((keyword) => {
      try {
        // Use word boundaries only for alphanumeric keywords
        const isWord = /^[a-z0-9_]+$/i.test(keyword)
        const pattern = isWord
          ? `\\b${escapeRegExp(keyword)}\\b` // Use word boundaries for normal words
          : escapeRegExp(keyword) // Don't use word boundaries for special characters

        const regex = new RegExp(pattern, "gi")
        const matches = normalizedCode.match(regex)
        if (matches) {
          // Weight keywords differently based on their uniqueness to the language
          const uniqueKeywords = {
            javascript: ["let", "const", "var", "Promise", "undefined"],
            typescript: ["interface", "namespace", "readonly", "keyof", "never"],
            python: ["def", "elif", "None", "self", "yield"],
            html: ["DOCTYPE", "html", "head", "body"],
            rust: ["impl", "trait", "mut", "fn", "crate"],
            cpp: ["template", "nullptr", "vector", "cout", "cin"],
            c: ["malloc", "free", "printf", "scanf"],
            java: ["public class", "System.out", "Override"],
            sql: ["SELECT", "FROM", "JOIN", "GROUP BY", "ORDER BY"]
          }
          
          // Give higher scores to more unique keywords
          const uniqueKeywordMultiplier = (uniqueKeywords as Record<string, string[]>)[lang]?.includes(keyword) ? 2 : 1
          scores[lang] += matches.length * uniqueKeywordMultiplier
        }
      } catch (error) {
        console.warn(`Invalid regex for keyword "${keyword}" in language "${lang}"`)
      }
    })

    // Check patterns with increased weight for distinctive patterns
    patterns.forEach((pattern) => {
      try {
        const matches = normalizedCode.match(pattern)
        if (matches) {
          // Patterns are stronger indicators than keywords
          scores[lang] += matches.length * 3
        }
      } catch (error) {
        console.warn(`Invalid regex pattern in language "${lang}"`)
      }
    })
  })

  // Special case differentiation for similar languages
  
  // C vs C++
  if (scores.c > 0 && scores.cpp > 0) {
    // C++ specific features
    if (normalizedCode.includes("class") || 
        normalizedCode.includes("template") || 
        normalizedCode.includes("namespace") || 
        normalizedCode.includes("std::") ||
        normalizedCode.includes("cout") ||
        normalizedCode.includes("vector<")) {
      scores.cpp += 10;
    } 
    // Pure C features
    else if (normalizedCode.includes("malloc(") || 
             normalizedCode.includes("free(") || 
             normalizedCode.includes("stdio.h") || 
             normalizedCode.includes("printf(")) {
      scores.c += 10;
    }
  }
  
  // JSX/TSX detection
  if ((scores.javascript > 0 || scores.typescript > 0) && 
      ((normalizedCode.includes("<") && normalizedCode.includes("/>")) || 
       (normalizedCode.includes("</") && normalizedCode.includes(">"))) &&
      (normalizedCode.includes("render") || normalizedCode.includes("React") || 
       normalizedCode.includes("Component") || normalizedCode.includes("props"))) {
    if (scores.typescript > scores.javascript) {
      return "tsx"
    } else {
      return "jsx"
    }
  }

  // SQL case insensitivity boost
  if (scores.sql > 0) {
    const sqlKeywords = ["SELECT", "FROM", "WHERE", "INSERT", "UPDATE", "DELETE"];
    sqlKeywords.forEach(keyword => {
      const regex = new RegExp(keyword, "i");
      if (normalizedCode.match(regex)) {
        scores.sql += 2;
      }
    });
  }

  // Find the language with the highest score
  let maxScore = 0;
  let detectedLang = "javascript"; // Default

  Object.entries(scores).forEach(([lang, score]) => {
    if (score > maxScore) {
      maxScore = score;
      detectedLang = lang;
    }
  });

  // If the highest score is very low, default to javascript
  if (maxScore < 3) {
    return "javascript";
  }

  return detectedLang;
}

// Function to help with debugging
export function getLanguageScores(code: string): Record<string, number> {
  if (!code || code.trim() === "") {
    return { javascript: 1 }; // Default language
  }

  // Normalize code
  const normalizedCode = code.trim();
  
  // Score for each language
  const scores: Record<string, number> = {};

  // Initialize scores
  Object.keys(languagePatterns).forEach((lang) => {
    scores[lang] = 0;
  });

  // Calculate scores as in detectLanguage
  Object.entries(languagePatterns).forEach(([lang, { keywords = [], patterns = [] }]) => {
    keywords.forEach((keyword) => {
      try {
        const isWord = /^[a-z0-9_]+$/i.test(keyword);
        const pattern = isWord
          ? `\\b${escapeRegExp(keyword)}\\b`
          : escapeRegExp(keyword);

        const regex = new RegExp(pattern, "gi");
        const matches = normalizedCode.match(regex);
        if (matches) {
          scores[lang] += matches.length;
        }
      } catch (error) {
        // Silently ignore regex errors
      }
    });

    patterns.forEach((pattern) => {
      try {
        const matches = normalizedCode.match(pattern);
        if (matches) {
          scores[lang] += matches.length * 3;
        }
      } catch (error) {
        // Silently ignore regex errors
      }
    });
  });

  return scores;
}