// import react stuff
import React from 'react';
import { Link } from 'react-router-dom';

// custom renderer for link (<a>) tags
const LinkRenderer = ({ href, children }) => {
  // check if link is internal or within the same site (starts with '/')
  if (href.startsWith('/')) {
    // if yes => use react-router <Link>
    return <Link to={href}>{children}</Link>
  }
  
  // if link is external, use <a>
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
  );
};

// if you see <a> tag, use LinkRenderer instead
export const customRenderers = { a: LinkRenderer, };

// ----------
// use github markdown for links in the .md files!
// [link text](link URL)
// ----------