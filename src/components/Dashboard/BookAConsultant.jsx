import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import NotificationMobileIcon from '../../assets/Dashboard/Mobile/NotificationMobileIcon.svg'
import { bookTeleconsultation } from '../../Api/bookTeleconsultation'
import { getTimeSlot } from '../../Api/getTimeSlot' // API import

const BookAConsultant = ({ setSubView, setSelectedView, setData }) => {
  const [type, setType] = useState('')
  const [service, setService] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [availabilityId, setAvailabilityId] = useState(null)
  const [language, setLanguage] = useState('')
  const [loading, setLoading] = useState(false)
  const [slots, setSlots] = useState([]) // store API slots
  const [availableTimes, setAvailableTimes] = useState([]) // filtered times for chosen date

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
        setAvailableTimes(selected.time_slots)
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
      availability_id: availabilityId
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
      <div className="flex flex-col md:flex-row gap-4 md:justify-between md:items-center">
        <div className="flex items-center justify-between">
          <p
            className="text-black text-[25px] md:text-[28px] xl:text-3xl"
            style={{ fontFamily: 'Sofia Pro', fontWeight: 400 }}
          >
            Book a Teleconsultation
          </p>
          <div className="relative md:hidden" onClick={() => setSelectedView('Notifications')}>
            <img src={NotificationMobileIcon} alt="Notification icon" className="lg:hidden" />
            <span className="lg:hidden absolute top-[3px] right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </div>
        </div>
        <button
          onClick={() => setSubView('Past Consultation')}
          className="text-[13px] xl:text-sm text-[#323FF7] underline cursor-pointer"
        >
          View past Consultation
        </button>
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
              <option value="video">Online (Video)</option>
              <option value="offline">Offline</option>
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
              <option value="general_checkup">General Checkup</option>
              <option value="specialist">Specialist</option>
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
                {slots.map((slot) => (
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
          {loading ? 'Booking...' : 'Book consultation'}
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

export default BookAConsultant
