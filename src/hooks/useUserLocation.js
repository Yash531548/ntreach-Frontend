import { useState, useCallback, useRef } from 'react'

export const useUserLocation = () => {
  const [location, setLocation] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Use refs to track rate limiting
  const lastFetchTime = useRef(0)
  const fetchCount = useRef(0)

  const fetchLocation = useCallback(async (options = {}) => {
    const { forceRefresh = false, useBackup = true } = options

    // Check cache first (unless force refresh)
    if (!forceRefresh) {
      const cached = localStorage.getItem('userLocation')
      const cachedTime = localStorage.getItem('userLocationTime')

      if (cached && cachedTime) {
        const age = Date.now() - parseInt(cachedTime)
        // Use cache if less than 1 hour old
        if (age < 60 * 60 * 1000) {
          const parsed = JSON.parse(cached)
          setLocation(parsed)
          return parsed
        }
      }
    }

    // Rate limiting - prevent multiple rapid requests
    const now = Date.now()
    if (now - lastFetchTime.current < 5000) {
      // 5 second cooldown
      setError('Please wait a few seconds before trying again')
      return null
    }

    // Track daily limit (simple implementation)
    const today = new Date().toDateString()
    const lastFetchDate = localStorage.getItem('lastFetchDate')

    if (lastFetchDate !== today) {
      fetchCount.current = 0
      localStorage.setItem('lastFetchDate', today)
    }

    fetchCount.current += 1
    if (fetchCount.current > 10) {
      setError('Daily request limit reached. Please try again tomorrow.')
      return null
    }

    setIsLoading(true)
    setError(null)

    try {
      let data = null
      let success = false

      // Primary service: ipapi.co
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout

        const response = await fetch('https://ipapi.co/json/', {
          signal: controller.signal,
          headers: {
            Accept: 'application/json',
            'User-Agent': 'Your-App-Name/1.0' // Identify your app
          }
        })

        clearTimeout(timeoutId)

        if (response.status === 429) {
          throw new Error('Rate limited by primary service')
        }

        if (response.ok) {
          const rawData = await response.json()
          data = {
            ip: rawData.ip,
            country: rawData.country_name,
            countryCode: rawData.country_code,
            region: rawData.region,
            regionCode: rawData.region_code,
            city: rawData.city,
            latitude: rawData.latitude,
            longitude: rawData.longitude,
            timezone: rawData.timezone,
            postal: rawData.postal,
            org: rawData.org,
            source: 'ipapi.co'
          }
          success = true
        }
      } catch (primaryError) {
        console.log('Primary service failed:', primaryError.message)
      }

      // Backup service: ip-api.com (if enabled and primary failed)
      if (!success && useBackup) {
        try {
          const controller = new AbortController()
          const timeoutId = setTimeout(() => controller.abort(), 5000)

          const response = await fetch('http://ip-api.com/json/?fields=66846719', {
            signal: controller.signal
          })

          clearTimeout(timeoutId)

          if (response.ok) {
            const backupData = await response.json()
            data = {
              ip: backupData.query,
              country: backupData.country,
              countryCode: backupData.countryCode,
              region: backupData.regionName,
              regionCode: backupData.region,
              city: backupData.city,
              latitude: backupData.lat,
              longitude: backupData.lon,
              timezone: backupData.timezone,
              postal: backupData.zip,
              org: backupData.isp,
              source: 'ip-api.com'
            }
            success = true
          }
        } catch (backupError) {
          console.log('Backup service failed:', backupError.message)
        }
      }

      if (!success) {
        throw new Error('Unable to fetch location from any service')
      }

      // Save to cache
      localStorage.setItem('userLocation', JSON.stringify(data))
      localStorage.setItem('userLocationTime', Date.now().toString())

      setLocation(data)
      lastFetchTime.current = Date.now()
      return data
    } catch (err) {
      const errorMessage =
        err.name === 'AbortError' ? 'Request timeout - please check your connection' : err.message

      setError(errorMessage)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  const clearLocation = useCallback(() => {
    setLocation(null)
    setError(null)
    localStorage.removeItem('userLocation')
    localStorage.removeItem('userLocationTime')
  }, [])

  // Prefetch function for when you want to load location in background
  const prefetchLocation = useCallback(async () => {
    if (!location && !isLoading) {
      return fetchLocation()
    }
  }, [location, isLoading, fetchLocation])

  return {
    location,
    isLoading,
    error,
    fetchLocation,
    clearLocation,
    prefetchLocation,
    // Helper to check if location is cached
    isCached: !!localStorage.getItem('userLocation')
  }
}
