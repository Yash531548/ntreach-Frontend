import { useEffect, useState } from 'react'
import { CircleArrowLeft } from 'lucide-react'
import NotificationMobileIcon from '../../assets/Dashboard/Mobile/NotificationMobileIcon.svg'
import { getNotifications } from '../../Api/getNotifications'
import { getBookTeleconsultation } from '../../Api/getBookTeleconsultation'

const Notification = ({ setSelectedView }) => {
  const [notifications, setNotifications] = useState([])
  const [appointments, setAppointments] = useState([])
  const [mergedData, setMergedData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true)
      try {
        const response = await getNotifications()
        if (response.data.status) {
          const notifications = response.data.data
            .filter((n) => n.type === 'Teleconsultation')
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          setNotifications(notifications)
        } else {
          console.error('Error fetching notifications:', response.data.message)
        }
      } catch (error) {
        console.error('Error fetching notifications:', error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchNotifications()
  }, [])

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true)
      try {
        const response = await getBookTeleconsultation()
        if (response.data.status === true) {
          const appointments = response.data.data.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          )
          setAppointments(appointments)
        } else {
          console.error('Error fetching slots:', response.data.message)
        }
      } catch (error) {
        console.error('Error fetching slots:', error.response?.data?.message || error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchAppointments()
  }, [])

  // Merge notifications + appointments
  useEffect(() => {
    if (notifications.length && appointments.length) {
      const merged = notifications.map((n) => {
        const matchedAppointment = appointments.find((a) => String(a.id) === String(n.booking_id))
        return {
          ...n,
          appointment: matchedAppointment || null
        }
      })
      setMergedData(merged)
    }
  }, [notifications, appointments])

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
                    {item.appointment?.date
                      ? new Date(item.appointment.date).toLocaleDateString('en-GB')
                      : '--'}
                  </span>
                  <br />
                  <span>
                    (
                    {item.appointment?.time
                      ? new Date(`1970-01-01T${item.appointment.time}`).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true
                        })
                      : '--'}
                    )
                  </span>
                </div>
              </div>

              {/* Right: Message */}
              <p className="text-xs text-black capitalize">
                {item.appointment?.service?.replace(/_/g, ' ') || item.type} <br />
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
