// imports
import { useState, useEffect } from 'react';

export const useTheme = () => {
  // init state from localStorage/default to 'system'
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') { return localStorage.getItem('theme') || 'system'; }
    return 'system';
  });
  
  useEffect(() => {
    const root = window.document.documentElement;
    const isDark =
      theme === 'dark' ||
      (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    // remove the opposite theme class to avoid conflicts
    root.classList.remove(isDark ? 'light' : 'dark');
    // add current theme class to html element
    root.classList.add(isDark ? 'dark' : 'light');
      
    // save user preference
    localStorage.setItem('theme', theme);
  }, [theme]); // rerun this wheneever theme state changes
  
  return [theme, setTheme];
}