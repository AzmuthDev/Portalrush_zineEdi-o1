import React from 'react';
import './SectionSideLabel.css';

export const SectionSideLabel = ({ number, title }) => {
  return (
    <div className="section-side-label-wrapper">
      <span className="section-label-number">{number}.</span>
      <span className="section-label-text">{title}</span>
    </div>
  );
};
