// Imports
import React from 'react';

/**
 * Helper for labelling keys! (This is for the dynamic panel thing)
 * Turns "blood_potency" to "Blood Potency", etc
 */
export const formatLabel = (key) => {
  return key
    .replace(/_/g, ' ') 
    .replace(/\b\w/g, (l) => l.toUpperCase()) 
    .replace('V5', '(V5)'); 
};

/**
 * Factory for creating Link Renderers
 * @param {string} className - tailwind classes to apply to the links.
 * @returns
 */
const createLinkRenderer = (className) => {
  // Component to be rendered
  const LinkRenderer = ({ href, children }) => {
    // Determine if the link is internal
    const isInternal = href.startsWith('/');
    
    // In Astro, use standard <a> tags for everything.
    // Internal links are handled by the ClientRouter.
    return (
      <a 
        href={href} 
        className={className} 
        target={isInternal ? undefined : "_blank"} 
        rel={isInternal ? undefined : "noopener noreferrer"}
      >
        {children}
      </a>
    );
  };
  return LinkRenderer;
};

/**
 * Creates the components configuration for ReactMarkdown
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