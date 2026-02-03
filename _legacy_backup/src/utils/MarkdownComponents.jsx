import React from 'react';
import { Link } from 'react-router-dom';

// Helper for labelling keys! (This is for the dynamic panel thing)
// Turns "blood_potency" to "Blood Potency", etc
export const formatLabel = (key) => {
  return key
    .replace(/_/g, ' ') 
    .replace(/\b\w/g, (l) => l.toUpperCase()) 
    .replace('V5', '(V5)'); 
};

/**
 * @param {string} className - tailwind classes to apply to the links.
 * @returns
 */
const createLinkRenderer = (className) => {
  // component to be rendered
  const LinkRenderer = ({ href, children }) => {
    if (href.startsWith('/')) {
      return <Link to={href} className={className}>{children}</Link>;
    }
    return <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>;
  };
  return LinkRenderer;
};

/**
 * @param {string} linkClassName - the classes to apply to links.
 * @param {boolean} isInline - if yes => remove the <p> tag wrapper.
 * @returns
 */
export const createMarkdownRenderers = (linkClassName, isInline = false) => {
  const config = {
    a: createLinkRenderer(linkClassName),
  };

  if (isInline) {
    config.p = ({ children }) => <>{children}</>;
  }

  return config;
};