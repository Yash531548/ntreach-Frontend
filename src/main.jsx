import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { AuthProvider } from './Context/AuthContext.jsx'
import { ProfileProvider } from './Context/ProfileContext.jsx'
import { AuthProviderUser } from './Context/AuthProviderUserContext'
import { UserProfileProvider } from './Context/UserProfileContext.jsx'
import { BlogProvider } from './Context/BlogContext.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <ProfileProvider>
      <BrowserRouter>
        <AuthProviderUser>
          <UserProfileProvider>
            <BlogProvider>
              <App />
            </BlogProvider>
          </UserProfileProvider>
        </AuthProviderUser>
      </BrowserRouter>
    </ProfileProvider>
  </AuthProvider>
)
