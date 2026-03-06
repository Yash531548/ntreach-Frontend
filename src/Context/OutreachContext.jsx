import { createContext, useContext, useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router'

// Step 1️⃣ — Create the context
const OutreachContext = createContext()

// Step 2️⃣ — Create a hook so we can easily use this context in components
export const useOutreach = () => {
  const context = useContext(OutreachContext)
  if (!context) {
    throw new Error('useOutreach must be used within an OutreachProvider')
  }
  return context
}

// Step 3️⃣ — Create the provider component that wraps your entire app
export const OutreachProvider = ({ children }) => {
  const location = useLocation()
  const [outreachId, setOutreachId] = useState(null)
  const [loading, setLoading] = useState(true)
  const initialCaptureDone = useRef(false)

  // Step 4️⃣ — Extract out_id from URL only on initial load or when explicitly found
  useEffect(() => {
    const extractOutreachId = () => {
      try {
        // Parse the query parameters from the URL
        const searchParams = new URLSearchParams(location.search)
        const outIdParam = searchParams.get('out_id')

        if (outIdParam) {
          // Always set when param is found (new outreach link)
          setOutreachId(outIdParam)
          console.log('outreach_id found in URL:', outIdParam)
          initialCaptureDone.current = true
        } else if (!initialCaptureDone.current) {
          // Only set to null on initial load if no param
          setOutreachId(null)
          initialCaptureDone.current = true
        }
        // If we already have an outreachId and no param is found, KEEP the existing value
        // This prevents clearing on route changes
      } catch (error) {
        console.error('Failed to extract outreach_id:', error.message)
        if (!initialCaptureDone.current) {
          setOutreachId(null)
          initialCaptureDone.current = true
        }
      } finally {
        setLoading(false)
      }
    }

    extractOutreachId()
  }, [location.search]) // Still runs on route changes but won't clear existing value

  // Step 5️⃣ — Share the outreach data with the entire app
  return (
    <OutreachContext.Provider
      value={{
        outreachId,
        loading
      }}
    >
      {children}
    </OutreachContext.Provider>
  )
}
