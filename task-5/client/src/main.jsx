import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import axios from 'axios'
import './index.css'
import App from './App.jsx'
https://ebiznes-backend-lab-c5dpe4aqaxbubxdt.polandcentral-01.azurewebsites.net/products

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://localhost:1323'
}
if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'https://ebiznes-backend-lab-c5dpe4aqaxbubxdt.polandcentral-01.azurewebsites.net'
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
