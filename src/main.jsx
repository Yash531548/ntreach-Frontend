import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { AuthProvider } from './Context/AuthContext.jsx'
import { ProfileProvider } from './Context/ProfileContext.jsx'
import { AuthProviderUser } from './Context/AuthProviderUserContext'
import { UserProfileProvider } from './Context/UserProfileContext.jsx'
import { OutreachProvider } from './Context/OutreachContext.jsx'
import { VNCodeProvider } from './Context/VNCodeContext.jsx'
import { BlogProvider } from './Context/BlogContext.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <ProfileProvider>
      <BrowserRouter>
        <AuthProviderUser>
          <UserProfileProvider>
            <OutreachProvider>
              <VNCodeProvider>
              <BlogProvider>
                <App />
              </BlogProvider>
              </VNCodeProvider>
            </OutreachProvider>
          </UserProfileProvider>
        </AuthProviderUser>
      </BrowserRouter>
    </ProfileProvider>
  </AuthProvider>
)
