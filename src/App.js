import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkBreaks from 'remark-breaks'; // Import the remark-breaks plugin

import './App.css';

export default function App() {
  const [input, setInput] = useState('');

  const CodeBlock = ({ node, inline, className, children }) => {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <SyntaxHighlighter language={match[1]} style={solarizedlight}>
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <code className={className}>{children}</code>
    );
  };

  return (
    <div className="App">
      <textarea
        autoFocus
        className="textarea"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your Markdown here..."
      />
      {input ? (
        <ReactMarkdown
          className="markdown"
          remarkPlugins={[remarkBreaks]} // Add the remark-breaks plugin
          components={{
            code: CodeBlock,
          }}
        >
          {input}
        </ReactMarkdown>
      ) : (
        <div className="markdown">Preview will appear here...</div>
      )}
    </div>
  );
}