import React, { useState } from 'react';
import './BreakdownButton.scss';

const BreakdownButton = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className={`breakdown-button ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick} 
    >
      Task Breakdown
    </button>
  );
};

export default BreakdownButton;