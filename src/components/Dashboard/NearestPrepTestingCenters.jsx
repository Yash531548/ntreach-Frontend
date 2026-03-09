import { useEffect, useMemo } from 'react'
import { MapPin, RefreshCcw, Building2 } from 'lucide-react'
import { useUserLocation } from '../../hooks/useUserLocation'
import { useNearestTestingCenters } from '../../hooks/useNearestTestingCenters'

export function NearestPrepTestingCenters({ onSelectCenter }) {
  const {
    location,
    isLoading: locationLoading,
    error: locationError,
    fetchLocation
  } = useUserLocation()

  const {
    data: response,
    isLoading: centersLoading,
    error: centersError
  } = useNearestTestingCenters(location?.latitude, location?.longitude)

  console.log(location)

  useEffect(() => {
    fetchLocation()
  }, [fetchLocation])

  const allCenters = useMemo(() => response?.data || [], [response])

  // Filter the centers based on the services they offer
  // const filteredCenters = useMemo(() => {
  //   const allCenters = response?.data || []

  //   // If no specific services were passed, show all nearby centers
  //   if (!selectedServices || selectedServices.length === 0) {
  //     return allCenters
  //   }

  //   return allCenters.filter((center) => {
  //     // center_services from your API is an array of strings like ["1", "2"]
  //     const availableServices = center.center_services || []

  //     // Match center if it provides AT LEAST ONE of the selected services
  //     return selectedServices.some((serviceId) =>
  //       availableServices.map(String).includes(String(serviceId))
  //     )
  //   })
  // }, [response, selectedServices])

  if (locationLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 space-y-4">
        <RefreshCcw className="w-8 h-8 text-blue-500 animate-spin" />
        <p className="text-gray-600 font-medium">Pinpointing your location...</p>
      </div>
    )
  }

  if (locationError || centersError) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-xl text-red-700">
        <p className="font-bold">Something went wrong</p>
        <p className="text-sm">{locationError || 'Failed to load centers'}</p>
        <button
          onClick={fetchLocation}
          className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg text-sm"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="w-full mx-auto p-4 md:p-8 bg-gray-50">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Nearby Testing Centers
          </h2>
          <div className="flex items-center gap-1.5 mt-1 text-gray-500">
            <MapPin className="w-4 h-4 text-blue-500" />
            <span className="text-sm">
              {location?.city && location?.region ? (
                <>
                  Showing results for{' '}
                  <span className="font-semibold text-gray-700">
                    {location.city}, {location.region}
                  </span>
                </>
              ) : (
                'Showing results for your current area'
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Grid Section */}
      {centersLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-60">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-40 bg-gray-200 animate-pulse rounded-2xl" />
          ))}
        </div>
      ) : allCenters.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
          <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No centers found within your immediate vicinity.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {allCenters.map((center) => (
            <div
              key={center.id}
              onClick={() => onSelectCenter && onSelectCenter(center)}
              className="group bg-white border border-gray-100 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-200 cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                  {center.distance.toFixed(1)} km away
                </span>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-1 leading-snug">{center.name}</h3>

              <address className="not-italic text-sm text-gray-500 mb-4">
                {center.address}
                <span className="block mt-1 font-medium text-gray-400">PIN: {center.pin_code}</span>
              </address>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
