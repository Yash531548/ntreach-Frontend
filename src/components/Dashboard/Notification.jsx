import { useState, useEffect } from 'react'
import { getNotifications } from '../../Api/getNotifications'
import { getBookingAppoinment } from '../../Api/getBookingAppoinment'
import { getBookTeleconsultation } from '../../Api/getBookTeleconsultation'
import { CircleArrowLeft } from 'lucide-react'
import NotificationMobileIcon from '../../assets/Dashboard/Mobile/NotificationMobileIcon.svg'

const Notification = ({ setSelectedView }) => {
  const [notifications, setNotifications] = useState([])
  const [appointments, setAppointments] = useState([]) // from getBookingAppoinment
  const [teleconsultations, setTeleconsultations] = useState([]) // from getBookTeleconsultation
  const [mergedAppointments, setMergedAppointments] = useState([]) // both merged
  const [mergedData, setMergedData] = useState([]) // notifications + mergedAppointments
  const [loading, setLoading] = useState(true)

  // 🔹 Fetch Notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true)
        const response = await getNotifications()
        if (response.data?.status) {
          const teleconsultNotifs = response.data.data.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          )
          setNotifications(teleconsultNotifs)
        }
      } catch (error) {
        console.error('Error fetching notifications:', error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchNotifications()
  }, [])

  // 🔹 Fetch Appointments (clinic bookings)
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true)
        const response = await getBookingAppoinment()
        if (response.data?.status === 'success') {
          const sorted = response.data.user
            .map((item) => ({
              ...item,
              type: 'Appointment',
              unified_date: item.appointment_date
            }))
            .sort((a, b) => new Date(b.unified_date) - new Date(a.unified_date))
          setAppointments(sorted)
        }
      } catch (error) {
        console.error(
          'Error fetching appointments:',
          error.response?.data?.message || error.message
        )
      } finally {
        setLoading(false)
      }
    }
    fetchAppointments()
  }, [])

  // 🔹 Fetch Teleconsultations
  useEffect(() => {
    const fetchTeleconsultations = async () => {
      try {
        setLoading(true)
        const response = await getBookTeleconsultation()
        if (response.data?.status === true) {
          const sorted = response.data.data
            .map((item) => ({
              ...item,
              type: 'Teleconsultation',
              unified_date: item.date
            }))
            .sort((a, b) => new Date(b.unified_date) - new Date(a.unified_date))
          setTeleconsultations(sorted)
        }
      } catch (error) {
        console.error(
          'Error fetching teleconsultations:',
          error.response?.data?.message || error.message
        )
      } finally {
        setLoading(false)
      }
    }
    fetchTeleconsultations()
  }, [])

  // 🔹 Merge both appointments (clinic + teleconsultation)
  useEffect(() => {
    const all = [...appointments, ...teleconsultations].sort(
      (a, b) => new Date(b.unified_date) - new Date(a.unified_date)
    )
    setMergedAppointments(all)
  }, [appointments, teleconsultations])

  // 🔹 Merge Notifications + All Appointments
  useEffect(() => {
    if (notifications.length && mergedAppointments.length) {
      const merged = notifications.map((n) => {
        const match = mergedAppointments.find(
          (a) =>
            String(a.id) === String(n.booking_id) || String(a.booking_id) === String(n.booking_id)
        )
        return { ...n, appointment: match || null }
      })
      setMergedData(merged)
    }
  }, [notifications, mergedAppointments])

  return (
    <div className="rounded-r-4xl w-full md:border md:border-gray-300 border-l-0 md:shadow-sm pt-5 md:px-5 xl:pt-8 xl:px-10">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <CircleArrowLeft
            className="text-gray-700 cursor-pointer"
            onClick={() => setSelectedView('Home')}
          />
          <p
            className="text-[#0063B9] text-[25px] md:text-[28px] xl:text-3xl"
            style={{ fontFamily: 'Sofia Pro', fontWeight: 400 }}
          >
            Notifications
          </p>
        </div>
        <div className="relative">
          <img src={NotificationMobileIcon} alt="Notification icon" className="lg:hidden" />
          {notifications.some((n) => !n.read) && (
            <span className="lg:hidden absolute top-[3px] right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div
        className="w-full max-h-[85vh] md:h-[50vh] overflow-y-auto rounded-2xl shadow-sm mt-[2rem] mb-[1rem] pt-3 p-4"
        style={{ fontFamily: 'Sofia Pro', fontWeight: 300 }}
      >
        {loading ? (
          <p className="text-center text-gray-500">Loading notifications...</p>
        ) : notifications.length === 0 ? (
          <p className="text-center text-gray-500">No notifications found</p>
        ) : (
          mergedData.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 py-3 border-b border-gray-200 last:border-b-0"
            >
              {/* Left: Date + Time */}
              <div
                style={{ fontFamily: 'Sofia Pro', fontWeight: 500 }}
                className="flex flex-col items-center bg-[#FAFAFA] px-3 py-1 rounded-xl text-[10px] font-medium min-w-[80px]"
              >
                <div className="bg-gradient-to-r from-[#323FF7] to-[#33AEE5] bg-clip-text text-transparent text-center">
                  <span>
                    {item.appointment?.unified_date
                      ? new Date(item.appointment.unified_date).toLocaleDateString('en-GB')
                      : '--'}
                  </span>
                  <br />
                  <span>
                    {item.appointment?.time
                      ? new Date(`1970-01-01T${item.appointment.time}`).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true
                        })
                      : '--'}
                  </span>
                </div>
              </div>

              {/* Right: Message */}
              <p className="text-xs text-black capitalize">
                {item.appointment?.service_names?.join(', ') ||
                  item.appointment?.service?.replace(/_/g, ' ') ||
                  '--'}
                <br />
                {item.data}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Notification
