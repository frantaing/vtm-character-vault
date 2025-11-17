import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Buffer } from 'buffer'
import './index.css'
import App from './App.jsx'

// polyfill buffer for gray-matter
globalThis.Buffer = Buffer

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <BrowserRouter basename="/vtm-vault">
      <App />
    </BrowserRouter>
  </StrictMode>,
)