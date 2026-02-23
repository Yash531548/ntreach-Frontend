import { useState, useEffect } from 'react'
import axios from 'axios'

export function useNearestTestingCenters(lat, lng) {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!lat || !lng) return

    const loadCenters = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}api/neareast_testingCenter`,
          {
            params: { latitude: lat, longitude: lng }
          }
        )
        setData(response.data)
        setError(null)
      } catch (err) {
        setError('Failed to load testing centers')
        console.error('Fetch error:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadCenters()
  }, [lat, lng])

  return { data, isLoading, error }
}
