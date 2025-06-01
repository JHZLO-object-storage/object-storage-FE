import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// src/main.tsx 또는 src/index.tsx
import '@coreui/coreui/dist/css/coreui.min.css';
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
