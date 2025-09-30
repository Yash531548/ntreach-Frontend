import { useEffect, useState } from 'react'
import { getNotifications } from '../../Api/getNotifications'
import RiskMeter from './RiskMeter'
import Announcement from './Announcement'
import NotificationMobileIcon from '../../assets/Dashboard/Mobile/NotificationMobileIcon.svg'

// 
const formatDate = timestamp =>
  timestamp
    ? new Date(timestamp).toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' })
    : '-';
const formatTime = timestamp =>
  timestamp
    ? new Date(timestamp).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata'
      })
    : '-';

const Health = ({ setSubView, setActive }) => {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await getNotifications()
        if (response.data.status) {
          setNotifications(response.data.data || [])
        } else {
          console.error('Error fetching notifications:', response.data.message)
          alert(`Error fetching notifications: ${response.data.message}`)
        }
      } catch (error) {
        console.error('Error fetching notifications:', error.message)
        alert(`Error fetching notifications: ${error.message}`)
      } finally {
        setLoading(false)
      }
    }

    fetchNotifications()
  }, [])

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
            {notifications.map((n) => (
              <tr
                key={n.id}
                className="text-xs text-left hover:bg-[#E9F8FF] border-b border-[#DEDEDE]"
              >
                <td className="py-3 px-4">{formatDate(n.created_at)}</td>
                <td className="py-3 px-4">{n.type}</td>
                <td className="py-3 px-4">{formatTime(n.created_at)}</td>
                <td className="py-3 px-4">{n.location}</td>
                <td className="py-3 px-4 text-[#0078D4]">
                  <button
                    onClick={() => setSubView('Appointment Detail')}
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
