import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactGA from 'react-ga4'
import './index.css'
import App from './App.jsx'

ReactGA.initialize('G-4C7VZB2YGY');
ReactGA.send({ hitType: "pageview", page: window.location.pathname + window.location.search });

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
