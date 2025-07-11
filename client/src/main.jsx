import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CartProvider } from '../src/components/context/cardContext.jsx'
import './index.css'
import App from './App.jsx'
import Card from './components/Card.jsx'

createRoot(document.getElementById('root')).render(
  <CartProvider >
    <StrictMode>
      <App />
    </StrictMode>
  </CartProvider>,
)
