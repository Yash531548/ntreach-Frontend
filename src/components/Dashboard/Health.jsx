import { useEffect, useState } from 'react'
import { getNotifications } from '../../Api/getNotifications'
import { getBookTeleconsultation } from '../../Api/getBookTeleconsultation'
import RiskMeter from './RiskMeter'
import Announcement from './Announcement'
import NotificationMobileIcon from '../../assets/Dashboard/Mobile/NotificationMobileIcon.svg'

const Health = ({ setSubView, setActive, setData }) => {
  const [notifications, setNotifications] = useState([])
  const [appointments, setAppointments] = useState([])
  const [mergedData, setMergedData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotifications = async () => {
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
    <div className="rounded-4xl lg:rounded-none lg:rounded-r-4xl w-full md:border md:border-gray-300 border-l-0 md:shadow-sm py-5 md:px-5 xl:pt-8 xl:px-10 font-sofia">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <p className="text-black text-[25px] md:text-[28px] xl:text-3xl font-normal">
          My Health Dashboard
        </p>
        <div className="relative lg:hidden" onClick={() => setActive('Notifications')}>
          <img src={NotificationMobileIcon} alt="Notification icon" />
          <span className="absolute top-[3px] right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </div>
      </div>

      {/* Notifications Table */}
      <div className="w-full h-[30vh] overflow-auto rounded-2xl shadow-sm mt-8 mb-4 pt-3 p-4 font-light">
        <p className="text-lg font-semibold mb-2">Reminders</p>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-black text-xs">
              {['Date', 'Upcoming Appointments', 'Time', 'Location', ''].map((header) => (
                <th key={header} className="py-3 px-4 font-normal whitespace-nowrap">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mergedData.map((item) => (
              <tr
                key={item.id}
                className="text-xs text-left hover:bg-[#E9F8FF] border-b border-[#DEDEDE]"
              >
                <td className="py-3 px-4">
                  {new Date(item.appointment?.date).toLocaleDateString('en-GB')}
                </td>
                <td className="py-3 px-4 capitalize">
                  {item.appointment?.service?.replace(/_/g, ' ') || item.type}
                </td>
                <td className="py-3 px-4">
                  {item.appointment?.time
                    ? new Date(`1970-01-01T${item.appointment.time}`).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                      })
                    : '--'}
                </td>
                <td className="py-3 px-4">{item.appointment?.meeting_link}</td>
                <td className="py-3 px-4 text-[#0078D4]">
                  <button
                    onClick={() => {
                      setSubView('Appointment Detail')
                      setData(item.appointment)
                    }}
                    className="text-[#323FF7] cursor-pointer hover:underline whitespace-nowrap"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Risk & Announcements */}
      <div className="flex flex-col md:flex-row gap-3">
        <RiskMeter />
        <Announcement />
      </div>
    </div>
  )
}

export default Health
