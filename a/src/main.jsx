import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import Logincontext from './registrationpage/loginpages/Logincontext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
 

  <Logincontext>
  <App />
  </Logincontext>
      
  </StrictMode>,
)
