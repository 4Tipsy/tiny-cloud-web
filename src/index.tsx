import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)




// GLOBALS

declare global {
  interface Window {
    SERVER_RAW_URL: string;
    LINK_TO_REPO: string;
    LINK_TO_GH_ACC: string;
  }
}

window.SERVER_RAW_URL = "http://localhost:1234"
window.LINK_TO_REPO = "#"
window.LINK_TO_GH_ACC = "#"