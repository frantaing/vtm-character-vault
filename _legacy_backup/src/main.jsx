// imports
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Buffer } from 'buffer'
import './index.css'
import App from './App.jsx'

// import: other
import { ThemeProvider } from './context/ThemeContext.jsx'

// polyfill buffer for gray-matter
globalThis.Buffer = Buffer

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter basename="/">
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);