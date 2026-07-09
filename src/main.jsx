import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactGA from 'react-ga4'
import TagManager from 'react-gtm-module'
import './index.css'
import App from './App.jsx'

ReactGA.initialize('G-60HWSY02DV');
ReactGA.send({ hitType: "pageview", page: window.location.pathname + window.location.search });

const tagManagerArgs = {
  gtmId: 'GTM-PWX2VGX7'
};
TagManager.initialize(tagManagerArgs);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
