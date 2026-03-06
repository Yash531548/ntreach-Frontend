import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { ChevronDown } from 'lucide-react'

import { useVn } from '../../Context/VnContext'
import { useUserProfile } from '../../Context/UserProfileContext'
import { useOutreach } from '../../Context/OutreachContext'

import { fetchStates } from '../../Api/getState'
import { fetchPrepStates } from '../../Api/prepState'
import { fetchDistrictsApi } from '../../Api/fetchDistrictsApi'
import { fetchTestingCentersApi } from '../../Api/fetchTestingCentersApi'
import { fetchPrepCentersApi } from '../../Api/fetchPrepCentersApi'
import { bookAppointment } from '../../Api/bookAppointment'

import { useSticky } from '../../hooks/useSticky'

import { NearestTestingCenters } from './NearestTestingCenters'
import DynamicMap from './DynamicMap'

const ScheduleAppointment = () => {
  const location = useLocation()
  const incomingServices = location.state?.selectedServices || []
  const name = location.state?.name || ''

  const navigate = useNavigate()
  const [states, setStates] = useState([])
  const [selectedState, setSelectedState] = useState('') // selected state id
  const [districts, setDistricts] = useState([])
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [selectedName, setSelectedName] = useState('')
  const [districtLoading, setDistrictLoading] = useState(false)
  const [centers, setCenters] = useState([])
  const [selectedCenter, setSelectedCenter] = useState('')
  const [centerLoading, setCenterLoading] = useState(false)
  const [pendingCenterId, setPendingCenterId] = useState(null)

  const [appointmentDate, setAppointmentDate] = useState('')
  const [loadingSubmit, setLoadingSubmit] = useState(false)

  const { vnData } = useVn()
  const { userProfile } = useUserProfile()
  const { outreachId } = useOutreach()

  const { elementRef, placeholderRef, isSticky, width } = useSticky(20)

  // Check if service 3 is present
  const hasService3 = incomingServices.includes(3)

  // Fetch states based on service type
  useEffect(() => {
    async function getState() {
      try {
        const data = hasService3 ? await fetchPrepStates() : await fetchStates()
        setStates(data)
      } catch (error) {
        console.error(error)
      }
    }
    getState()
  }, [hasService3])

  // Fetch districts ONLY if service 3 is NOT present
  useEffect(() => {
    // Skip district fetching if service 3 is present
    if (hasService3) {
      setDistricts([])
      setSelectedDistrict('')
      return
    }

    if (!selectedState) {
      setDistricts([])
      setSelectedDistrict('')
      return
    }

    async function loadDistricts() {
      setDistrictLoading(true)
      try {
        const data = await fetchDistrictsApi(selectedState)
        setDistricts(data)
      } catch (error) {
        console.error('Failed to fetch districts', error)
        setDistricts([])
      }
      setDistrictLoading(false)
    }
    loadDistricts()
  }, [selectedState, hasService3])

  // Fetch centers based on service type
  useEffect(() => {
    if (!selectedState && !selectedDistrict) {
      setCenters([])
      setSelectedCenter('')
      return
    }

    // Find the matching state object's code
    const stateObj = states.find((s) => String(s.id) === String(selectedState))
    const state_code = stateObj ? stateObj.state_code : ''
    console.log('Selected state code:', state_code)

    if (!state_code) {
      setCenters([])
      setSelectedCenter('')
      return
    }

    const fetchCenters = async () => {
      setCenterLoading(true)
      try {
        let data

        if (hasService3) {
          // Fetch prep centers for service 3
          data = await fetchPrepCentersApi({
            state_code: state_code
          })
          console.log('Raw API response for prep centers:', data)
        } else {
          // Fetch testing centers for other services
          data = await fetchTestingCentersApi({
            district_id: selectedDistrict,
            state_code: state_code
          })
          console.log('Raw API response for testing centers:', data)
        }

        let activeCenters = []

        if (Array.isArray(data)) {
          if (hasService3) {
            activeCenters = data
          } else {
            // Filter active centers
            activeCenters = data.filter((center) => center.status === 1)
          }
        }

        setCenters(activeCenters)

        // If we have a pending ID from a card click, check if it's in the new list
        if (
          pendingCenterId &&
          activeCenters.some((c) => String(c.id) === String(pendingCenterId))
        ) {
          setSelectedCenter(pendingCenterId)
          setPendingCenterId(null) // Clear it once used
        } else if (
          selectedCenter &&
          activeCenters.some((c) => String(c.id) === String(selectedCenter))
        ) {
          // If there's already a selected center that still exists, keep it selected
          console.log('Keeping existing center selection:', selectedCenter)
          // Do nothing - keep the current selectedCenter
        } else if (!pendingCenterId && !selectedCenter) {
          // Only reset to empty if we aren't trying to auto-select from a card
          setSelectedCenter('')
        }
      } catch (error) {
        setCenters([])
        setSelectedCenter('')
        console.log(error)
      }
      setCenterLoading(false)
    }
    fetchCenters()
  }, [selectedDistrict, selectedState, states, pendingCenterId, hasService3, selectedCenter])

  // Convert the date from YYYY-MM-DD to DD-MM-YYYY before sending API:
  const formatDateForAPI = (dateStr) => {
    const [year, month, day] = dateStr.split('-')
    return `${day}-${month}-${year}`
  }

  // Handle booking submission
  const handleSubmit = async () => {
    if (!incomingServices.length) {
      alert('Please select at least one service.')
      return
    }

    if (!selectedState || !selectedCenter || !appointmentDate) {
      alert('Please complete all fields.')
      return
    }

    // For Prep booking, district is not required
    if (!hasService3 && !selectedDistrict) {
      alert('Please select a district.')
      return
    }

    const stateObj = states.find((s) => String(s.id) === String(selectedState))
    const state_code = stateObj ? stateObj.state_code : ''
    if (!state_code) {
      alert('Invalid state selected.')
      return
    }

    setLoadingSubmit(true)

    let riskAssessmentId = userProfile?.risk_assessment?.risk_assessment_id
    let riskScore = userProfile?.risk_assessment?.risk_score

    // Base data object with common fields
    const data = {
      risk_assessment_id: Number(riskAssessmentId) || null,
      service: incomingServices,
      state: Number(state_code),
      testing_center: Number(selectedCenter),
      appointment_date: formatDateForAPI(appointmentDate),
      type: 'Upcoming',
      booking_name: name
    }

    // Add conditional fields based on booking type
    if (hasService3) {
      // Prep booking
      data.booking_type = 'Prep'
      data.risk_score = riskScore
      // District is not required for Prep bookings
    } else {
      // Self booking
      data.booking_type = 'SELF'
      data.district = Number(selectedDistrict)
    }

    // Check if outreachId exists (from URL parameter)
    if (outreachId) {
      // Outreach booking
      data.booking_type = 'Outreach'
      data.outreach_id = outreachId // Send the out_id from URL
    }

    // Conditionally add vn_id only if vnData is available
    if (vnData?.id) {
      data.vn_id = vnData.id
    }

    console.log('data to send on book an appointment', data)

    try {
      const response = await bookAppointment(data)
      if (response.data.status) {
        navigate('/appointmentconfirmed', { state: response.data })
      } else {
        alert('Failed to book appointment: ' + response.data.message)
      }
    } catch (error) {
      console.error(error)
      alert(
        error?.response?.data?.errors?.toString() ||
          error?.message ||
          'An error occurred while booking appointment.'
      )
    }
    setLoadingSubmit(false)
  }

  const handleSelectCenterFromCard = (center) => {
    // State ID from the states list based on the center's state_code
    const matchingState = states.find((s) => String(s.state_code) === String(center.state_code))

    if (matchingState) {
      setSelectedState(matchingState.id)
      setSelectedDistrict(center.district_id)

      // setSelectedCenter(center.id);
      setPendingCenterId(center.id)
      setSelectedName(center.name)

      // Scroll to the form
      document.getElementById('State')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div
      className="
        container w-full min-h-[calc(100vh-64px-60px)] flex items-center justify-center
        px-4 sm:px-4
        lg:px-10
        xl:px-0
      "
      style={{ fontFamily: 'Sofia Pro', fontWeight: 400 }}
    >
      <main
        className="
          container max-w-[1050px] min-h-[calc(100vh-64px-100px)] flex justify-between
          lg:max-w-[850px] lg:justify-center
          xl:max-w-[1050px]
          gap-8
        "
      >
        <div
          className="
          container w-[400px] max-w-[500px] xl:w-[500px] min-h-[calc(100vh-64px-100px)] flex flex-col gap-8 pt-2 mt-8
        "
        >
          <div>
            <h1 className="text-3xl lg:text-4xl xl:text-[2.625rem] text-black whitespace-nowrap xl:mt-6">
              Schedule Appointment
            </h1>
          </div>

          {/* Nearest Testing Centers - Only show if NOT service 3 */}
          {!hasService3 && (
            <NearestTestingCenters
              onSelectCenter={handleSelectCenterFromCard}
              selectedServices={incomingServices}
            />
          )}

          <div className="container rounded-4xl w-full max-w-md min-h-[55vh] shadow-sm p-6 bg-white flex flex-col gap-4">
            {/* State */}
            <div className="relative">
              <label htmlFor="State" className="text-[#11688F] text-lg">
                State
              </label>
              <select
                className={`w-full appearance-none bg-[#F4F4F4] border border-[#92C2D7] rounded-full px-4 py-0.5 pr-10 mt-1 outline-none text-sm ${!selectedState && 'text-[#A9A9A9]'}`}
                style={{ fontFamily: 'Sofia Pro', fontWeight: 300 }}
                id="State"
                name="state"
                value={selectedState}
                onChange={(e) => {
                  const state = states.find((s) => s.id == e.target.value)
                  setSelectedState(e.target.value)
                  setSelectedName(state ? state.state_name : '')
                }}
              >
                <option>Select State</option>
                {/* {displayedStates.map(state => ( */}
                {states.map((state) => (
                  <option key={state.id} value={state.id}>
                    {state.state_name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-3/4 -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>

            {/* District - Only show if NOT service 3 */}
            {!hasService3 && (
              <div className="relative">
                <label htmlFor="District" className="text-[#11688F] text-lg">
                  District
                </label>
                <select
                  className={`w-full appearance-none bg-[#F4F4F4] border border-[#92C2D7] rounded-full px-4 py-0.5 pr-10 mt-1 outline-none text-sm ${!selectedDistrict && 'text-[#A9A9A9]'}`}
                  style={{ fontFamily: 'Sofia Pro', fontWeight: 300 }}
                  id="District"
                  value={selectedDistrict}
                  onChange={(e) => {
                    const district = districts.find((d) => d.id == e.target.value)
                    setSelectedDistrict(e.target.value)
                    setSelectedName(district ? district.district_name : '')
                  }}
                  disabled={!selectedState || districtLoading}
                >
                  <option>Select District</option>
                  {districts.map((district) => (
                    <option value={district.id} key={district.id}>
                      {district.district_name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-3/4 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            )}

            {/* Testing Centre */}
            <div className="relative">
              <label htmlFor="Testing centre" className="text-[#11688F] text-lg">
                Testing Centre
              </label>
              <select
                className={`w-full appearance-none bg-[#F4F4F4] border border-[#92C2D7] rounded-full px-4 py-0.5 pr-10 mt-1 outline-none text-sm ${!selectedCenter && 'text-[#A9A9A9]'}`}
                style={{ fontFamily: 'Sofia Pro', fontWeight: 300 }}
                id="Testing centre"
                value={selectedCenter}
                onChange={(e) => {
                  const center = centers.find((c) => c.id == e.target.value)
                  setSelectedCenter(e.target.value)
                  setSelectedName(center ? center.name : '')
                }}
                disabled={centerLoading}
              >
                <option>Select Center</option>
                {centerLoading ? <option disabled>Loading center...</option> : null}
                {centers.length === 0 && !centerLoading && (
                  <option disabled>No testing center available here</option>
                )}
                {centers.map((center) => (
                  <option value={center.id} key={center.id}>
                    {center.name} {center.address}
                  </option>
                ))}
              </select>
              <ChevronDown className="cursor-pointer absolute right-2 top-3/4 -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>

            {/* Appointment Date */}
            <div>
              <label htmlFor="Appointment Date" className="text-[#11688F] text-lg ">
                Appointment Date
              </label>
              <input
                type="date"
                className={`w-full bg-[#F4F4F4] border border-[#92C2D7] rounded-full pl-4 pr-3 py-0.5  outline-none text-sm mt-1 ${!appointmentDate && 'text-[#A9A9A9]'}`}
                id="Appointment Date"
                style={{ fontFamily: 'Sofia Pro', fontWeight: 300 }}
                min={new Date().toISOString().split('T')[0]} // prevents past dates
                max={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
              />
            </div>

            {/* Button */}
            <button
              onClick={handleSubmit}
              disabled={loadingSubmit}
              className="w-full cursor-pointer py-2 mt-4 rounded-full text-white font-medium bg-gradient-to-b from-[#323FF7] to-[#33AEE5] shadow-lg"
            >
              {loadingSubmit ? 'Booking...' : 'Generate Receipt'}
            </button>
          </div>
        </div>

        <div className="container max-w-[500px] w-[400px] xl:w-[500px] flex flex-col pt-36">
          {/* Placeholder with same dimensions as sticky element */}
          <div
            ref={placeholderRef}
            className="w-full"
            style={{ height: isSticky ? '45vw' : 'auto' }}
          />

          {/* Sticky container */}
          <div
            ref={elementRef}
            className={`transition-all duration-300 ${
              isSticky ? 'fixed top-[20px] z-10' : 'relative'
            }`}
            style={{
              width: isSticky ? width : '100%',
              maxWidth: '500px'
            }}
          >
            <DynamicMap selected={selectedName} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default ScheduleAppointment
