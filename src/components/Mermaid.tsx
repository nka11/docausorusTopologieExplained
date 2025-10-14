import React from 'react';

interface MermaidProps {
  children: string;
  className?: string;
}

const Mermaid: React.FC<MermaidProps> = ({ children, className = '' }) => {
  return (
    <div className={`mermaid ${className}`}>
      {children}
    </div>
  );
};

export default Mermaid;
