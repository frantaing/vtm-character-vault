import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <BrowserRouter basename="/vtm-vault">
      <App />
    </BrowserRouter>
  </StrictMode>,
)