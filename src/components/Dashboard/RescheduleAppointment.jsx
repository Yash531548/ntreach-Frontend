import { useState, useEffect } from 'react'
import { ArrowRight, CircleArrowLeft } from 'lucide-react'
import NotificationMobileIcon from '../../assets/Dashboard/Mobile/NotificationMobileIcon.svg'
import { bookTeleconsultation } from '../../Api/bookTeleconsultation'
import { getServiceType } from '../../Api/getServiceType' // API import
import { getTimeSlot } from '../../Api/getTimeSlot' // API import
import './reschedule.css'

const RescheduleAppointment = ({ setSubView, setSelectedView, data, setData }) => {
  const [id, setId] = useState(data?.id)
  const [type, setType] = useState(data?.type || '')
  const [service, setService] = useState()
  const [date, setDate] = useState()
  const [time, setTime] = useState('')
  const [availabilityId, setAvailabilityId] = useState(null)
  const [language, setLanguage] = useState(data?.language)
  const [loading, setLoading] = useState(false)
  const [services, setServices] = useState([]) // store API services
  const [slots, setSlots] = useState([]) // store API slots
  const [availableTimes, setAvailableTimes] = useState([]) // filtered times for chosen date
  console.log(id)

  // Fetch services on mount
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getServiceType()
        if (response.data.status === 'success') {
          setServices(response.data.data) // ✅ store services list
          console.log(response.data.data)
        } else {
          console.error('Error fetching services:', response.data.message)
          alert(`Error fetching services: ${response.data.message}`)
        }
      } catch (error) {
        if (error.response?.data?.message) {
          console.error('Error fetching services:', error.response.data.message)
          alert(`Error fetching services: ${error.response.data.message}`)
        } else {
          console.error('Error fetching services:', error.message)
          alert(`Error fetching services: ${error.message}`)
        }
      }
    }
    fetchServices()
  }, [])

  // Fetch slots on mount
  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await getTimeSlot()
        if (response.data.status === 'success') {
          setSlots(response.data.data)
        } else {
          console.error('Error fetching slots:', response.data.message)
          alert(`Error fetching slots: ${response.data.message}`)
        }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          console.error('Error fetching slots:', error.response.data.message)
          alert(`Error fetching slots: ${error.response.data.message}`)
        } else {
          console.error('Error fetching slots:', error.message)
          alert(`Error fetching slots: ${error.message}`)
        }
      }
    }
    fetchSlots()
  }, [])

  // Update available times when date changes
  useEffect(() => {
    if (date) {
      const selected = slots.find((slot) => slot.date === date)
      if (selected) {
        // only keep unbooked slots
        setAvailableTimes(selected.time_slots.filter((t) => !t.is_booked))
      } else {
        setAvailableTimes([])
      }
      setTime('')
      setAvailabilityId(null)
    }
  }, [date, slots])

  // Helper to format time for display (09:00:00 -> 09:00 AM)
  const formatTimeDisplay = (timeString) => {
    const [hour, minute] = timeString.split(':')
    const h = parseInt(hour, 10)
    const suffix = h >= 12 ? 'PM' : 'AM'
    const formattedHour = ((h + 11) % 12) + 1
    return `${formattedHour}:${minute} ${suffix}`
  }

  // Format date (2025-10-06 -> 06 Oct 2025)
  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' }
    return new Date(dateString).toLocaleDateString('en-GB', options)
  }

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const data = {
      type,
      service,
      date, // YYYY-MM-DD
      time, // HH:mm
      language,
      availability_id: availabilityId,
      id
    }
    console.log(data)

    try {
      const response = await bookTeleconsultation(data)
      if (response.data.status === true) {
        setSelectedView('Home')
        setSubView('Appointment Detail')
        setData(response.data)
      } else {
        console.error('Booking failed:', response.data.message)
        alert(`Booking failed: ${response.data.message}`)
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        console.error('Booking error:', error.response.data.message)
        alert(`Booking error: ${error.response.data.message}`)
      } else {
        console.error('Booking error:', error.message)
        alert(`Booking error: ${error.message}`)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-r-4xl w-full md:border md:border-gray-300 md:border-l-0 md:shadow-sm pt-5 md:px-4 xl:pt-8 xl:px-10"
    >
      {/* Header */}
      <div className="flex  items-start justify-between gap-1 md:gap-4">
        <div className="flex items-start md:items-center gap-2 md:gap-4">
          <CircleArrowLeft
            className="text-gray-700 cursor-pointer"
            onClick={() => setSubView(null)}
          />
          <div
            className="text-[#1475A1] whitespace-nowrap leading-none text-[25px] md:text-[28px] xl:text-3xl"
            style={{ fontFamily: 'Sofia Pro', fontWeight: 400 }}
          >
            <p>
              Reschedule <span className="hidden md:inline-block"> an Appointment</span>
            </p>
            <p className="md:hidden">An Appointment </p>
          </div>
        </div>
        <div className="relative" onClick={() => setSelectedView('Notifications')}>
          <img src={NotificationMobileIcon} alt="Notification icon" className="lg:hidden  " />
          <span className="lg:hidden absolute top-[3px] right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </div>
      </div>

      {/* Form Fields */}
      <div
        className="w-full rounded-2xl shadow-sm md:h-[53%] mt-[2rem] mb-[1rem] px-3 py-4 md:pt-3 md:p-8"
        style={{ fontFamily: 'Sofia Pro', fontWeight: 400 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl text-sm mt-6">
          {/* Row 1 */}
          <div className="flex flex-col">
            <label className="text-[#11688F] mb-2">Type of Consultation*</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
              className={`w-full border border-[#92C2D7] bg-[#F4F4F4] rounded-full px-4 py-0.5 outline-none ${
                !type && 'text-[#A9A9A9]'
              }`}
              style={{ fontFamily: 'Sofia Pro', fontWeight: 300 }}
            >
              <option value="">Select Type of Consultation</option>
              <option value="audio">Audio</option>
              <option value="video">Video</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-[#11688F] mb-2">Select Service*</label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              required
              style={{ fontFamily: 'Sofia Pro', fontWeight: 300 }}
              className={`w-full border border-[#92C2D7] bg-[#F4F4F4] rounded-full px-4 py-0.5 outline-none ${
                !service && 'text-[#A9A9A9]'
              }`}
            >
              <option value="">Select Service</option>
              {services.map((s) => (
                <option key={s.service_type_id} value={s.service_type_slug}>
                  {s.service_type}
                </option>
              ))}
            </select>
          </div>

          {/* Row 2 */}
          <div className="flex gap-4 md:block">
            <div className="flex flex-col w-1/2 md:w-full ">
              <label className="text-[#11688F] mb-2">Select Date*</label>
              <select
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                style={{ fontFamily: 'Sofia Pro', fontWeight: 300 }}
                className={`w-full border border-[#92C2D7] bg-[#F4F4F4] rounded-full px-4 py-0.5 outline-none ${
                  !date && 'text-[#A9A9A9]'
                }`}
              >
                <option value="">Select Date</option>
                {slots
                  // only show dates that have at least one unbooked slot
                  .filter((slot) => slot.time_slots.some((t) => !t.is_booked))
                  .map((slot) => (
                    <option key={slot.date} value={slot.date}>
                      {formatDate(slot.date)}
                    </option>
                  ))}
              </select>
            </div>

            <div className="flex flex-col w-1/2 md:w-full md:mt-6">
              <label className="text-[#11688F] mb-2">Select Language*</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                required
                style={{ fontFamily: 'Sofia Pro', fontWeight: 300 }}
                className={`w-full border border-[#92C2D7] bg-[#F4F4F4] rounded-full px-4 py-0.5 outline-none ${
                  !language && 'text-[#A9A9A9]'
                }`}
              >
                <option value="">Select Language</option>
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Row 3 */}
          <div className="flex flex-col">
            <label className="text-[#11688F] mb-2">Select Time*</label>
            <select
              value={time}
              onChange={(e) => {
                setTime(e.target.value)
                const selectedSlot = availableTimes.find(
                  (t) => t.start_time.slice(0, 5) === e.target.value
                )
                if (selectedSlot) setAvailabilityId(selectedSlot.availability_id)
              }}
              required
              style={{ fontFamily: 'Sofia Pro', fontWeight: 300 }}
              className={`w-full border border-[#92C2D7] bg-[#F4F4F4] rounded-full px-4 py-0.5 outline-none ${
                !time && 'text-[#A9A9A9]'
              }`}
            >
              <option value="">Select Time</option>
              {availableTimes.map((slot) => (
                <option key={slot.availability_id} value={slot.start_time.slice(0, 5)}>
                  {formatTimeDisplay(slot.start_time)} - {formatTimeDisplay(slot.end_time)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="mt-[1.7rem]">
        <button
          type="submit"
          disabled={loading}
          style={{ fontFamily: 'Sofia Pro', fontWeight: 300 }}
          className={`text-sm relative flex items-center justify-between shadow-lg hover:shadow-lg/30 pr-1 pt-1 pb-1 pl-3 border border-[#566AFF] 
                        bg-[linear-gradient(to_bottom,_#323FF7_0%,_#323FF7_20%,_#33AEE5_100%)] 
                        text-white rounded-full cursor-pointer gap-8 ${
                          loading && 'opacity-70 cursor-not-allowed'
                        }`}
        >
          {loading ? 'Updating...' : 'Update Appointment'}
          {!loading && (
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-black text-lg">
              <ArrowRight width={17} />
            </span>
          )}
        </button>
      </div>
    </form>
  )
}

export default RescheduleAppointment
