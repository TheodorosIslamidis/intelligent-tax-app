import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './AdviceDisplay.css';

function AdviceDisplay({ advice }) {
  return (
    <div className="advice-display">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {advice}
      </ReactMarkdown>
    </div>
  );
}

export default AdviceDisplay;
