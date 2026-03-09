import { createContext, useContext, useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router'
import { manuallyVnCode } from '../Api/manuallyVnCode'

// Step 1️⃣
const VNCodeContext = createContext()

// Step 2️⃣
export const useVNCode = () => {
  const context = useContext(VNCodeContext)
  if (!context) {
    throw new Error('useVNCode must be used within a VNCodeProvider')
  }
  return context
}

// Step 3️⃣
export const VNCodeProvider = ({ children }) => {
  const location = useLocation()

  const [vnCode, setVnCode] = useState(null)
  const [vnId, setVnId] = useState(null)
  const [loading, setLoading] = useState(true)

  const initialCaptureDone = useRef(false)

  // Step 4️⃣ — Extract vncode from URL
  useEffect(() => {
    const extractVNCode = () => {
      try {
        const searchParams = new URLSearchParams(location.search)
        const vnCodeParam = searchParams.get('vncode')

        if (vnCodeParam) {
          setVnCode(vnCodeParam)
          console.log('vncode found in URL:', vnCodeParam)
          initialCaptureDone.current = true
        } else if (!initialCaptureDone.current) {
          setVnCode(null)
          initialCaptureDone.current = true
        }
      } catch (error) {
        console.error('Failed to extract vncode:', error.message)

        if (!initialCaptureDone.current) {
          setVnCode(null)
          initialCaptureDone.current = true
        }
      } finally {
        setLoading(false)
      }
    }

    extractVNCode()
  }, [location.search])

  // Step 5️⃣ — Fetch vn_id from API
  useEffect(() => {
    const fetchVnId = async () => {
      if (!vnCode) return

      try {
        const res = await manuallyVnCode(vnCode)
        const id = res?.data?.data?.[0]

        setVnId(id)

        console.log('vn_id from API:', id)
      } catch (error) {
        console.error('Failed to fetch vn_id:', error.message)
      }
    }

    fetchVnId()
  }, [vnCode])

  // Step 6️⃣ — Provide to app
  return (
    <VNCodeContext.Provider
      value={{
        vnCode,
        vnId,
        loading
      }}
    >
      {children}
    </VNCodeContext.Provider>
  )
}
