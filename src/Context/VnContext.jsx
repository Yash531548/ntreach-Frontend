import { createContext, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getVn } from '../Api/getVn' // your axios helper file

// Step 1️⃣ — Create the context
const VnContext = createContext()

// Step 2️⃣ — Create a hook so we can easily use this context in components
export const useVn = () => useContext(VnContext)

// Step 3️⃣ — Create the provider component that wraps your entire app
export const VnProvider = ({ children }) => {
  const { vnName } = useParams()
  const [vnData, setVnData] = useState(null) // store VN details
  const [loading, setLoading] = useState(true) // track fetch state

  // Step 4️⃣ — Fetch VN details when the app starts or URL changes
  useEffect(() => {
    const fetchVN = async () => {
      try {
        if (vnName) {
          // Fetch VN details from your backend
          const response = await getVn({ vn_name: vnName })
          console.log(response.data)
          setVnData(response.data?.data)
          // Store in localStorage to persist after reload
          localStorage.setItem('vnData', JSON.stringify(response.data?.data))
        } else {
          // No VN in URL → check if it exists in localStorage
          const stored = localStorage.getItem('vnData')
          if (stored) setVnData(JSON.parse(stored))
        }
      } catch (error) {
        console.error('Failed to fetch VN:', error.response?.data?.message || error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchVN()
  }, [vnName])

  // Step 5️⃣ — Share the VN data with the entire app
  return (
    <VnContext.Provider value={{ vnData, loading }}>
      {children}
    </VnContext.Provider>
  )
}
