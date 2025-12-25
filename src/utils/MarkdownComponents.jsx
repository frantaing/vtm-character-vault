// import react stuff
import React from 'react';
import { Link } from 'react-router-dom';

// styling for markdown links (grey background; in main content)
const markdownLinkClasses = "rounded-md underline transition-all hover:px-2 hover:py-1 hover:text-black hover:bg-gray-300";
// styling for image captions
const detailLinkClasses = "rounded-md underline transition-all hover:px-2 hover:py-0.5 hover:text-black hover:bg-white";

// custom renderer for link (<a>) tags
const LinkRenderer = ({ href, children }) => {  
  // check if link is internal or within the same site (starts with '/')
  if (href.startsWith('/')) {
    // if yes => use react-router <Link>
    return <Link to={href} className={markdownLinkClasses}>{children}</Link>
  }
  
  // if link is external, use <a>
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={detailLinkClasses}>{children}</a>
  );
};

// default renderer. used for main body content
export const customRenderers = {
  a: LinkRenderer,
};

// if you see <a> tag, use LinkRenderer instead
export const inlineMarkdownRenderers = {
  ...customRenderers, // inherit the styled link renderer
  p: ({ children }) => <>{children}</>, // override the paragraph renderer
};

// ----------
// use github markdown for links in the .md files!
// [link text](link URL)
// ----------