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
    LINK_TO_API_DOCS: string;
  }
}

window.SERVER_RAW_URL = "http://tiny-cloud.xyz"
window.LINK_TO_REPO = "https://github.com/4Tipsy/tiny-cloud-web"
window.LINK_TO_GH_ACC = "https://github.com/4Tipsy"
window.LINK_TO_API_DOCS = "http://tiny-cloud.xyz/api/redoc"