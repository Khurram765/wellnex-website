console.log("✅ index.jsx loaded");
console.log("Root element:", document.getElementById("root"));
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Test from './Test.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
    {/* <Test/> */}
  </StrictMode>,
)
