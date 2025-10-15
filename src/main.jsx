import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { AuthProvider } from './Context/AuthContext.jsx'
import { ProfileProvider } from './Context/ProfileContext.jsx'
import { AuthProviderUser } from './Context/AuthProviderUserContext'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <ProfileProvider>
      <BrowserRouter>
        <AuthProviderUser>
          <App />
        </AuthProviderUser>
      </BrowserRouter>,
    </ProfileProvider>
  </AuthProvider>
)
