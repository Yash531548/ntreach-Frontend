import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { getUserProfile } from '../Api/getUserProfile'

const UserProfileContext = createContext()
export const useUserProfile = () => useContext(UserProfileContext)

export const UserProfileProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchProfile = useCallback(async () => {
    setLoading(true)
    try {
      const response = await getUserProfile()
      const data = response.data?.data || response.data
      setUserProfile(data)
      localStorage.setItem('userProfile', JSON.stringify(data))
      setError(null)
    } catch (err) {
      console.error('Profile fetch failed:', err)
      setError(err.response?.data?.message || err.message)
      const stored = localStorage.getItem('userProfile')
      if (stored) setUserProfile(JSON.parse(stored))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  return (
    <UserProfileContext.Provider
      value={{
        userProfile,
        loading,
        error,
        refetchUserProfile: fetchProfile,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  )
}
