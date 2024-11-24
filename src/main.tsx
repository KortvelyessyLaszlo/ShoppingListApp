import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

/**
 * Entry point for the React application.
 * 
 * This file sets up the React application by importing necessary modules,
 * creating a root element, and rendering the main App component within
 * React's StrictMode for highlighting potential problems in the application.
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
