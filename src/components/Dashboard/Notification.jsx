import { useEffect, useState } from 'react'
import { CircleArrowLeft } from 'lucide-react'
import NotificationMobileIcon from '../../assets/Dashboard/Mobile/NotificationMobileIcon.svg'
import { getNotifications } from '../../Api/getNotifications' // your helper

const Notification = ({ setSelectedView }) => {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true)
      try {
        const response = await getNotifications()
        if (response.data.status === true) {
          const formatted = Array.isArray(response.data.data)
            ? response.data.data.map((item) => {
                const createdDate = new Date(item.created_at)
                return {
                  id: item.id,
                  createdAt: createdDate.getTime(), // keep raw timestamp for sorting
                  date: createdDate.toLocaleDateString('en-IN'), // e.g. 30/09/2025
                  time: createdDate.toLocaleTimeString('en-IN', {
                    hour: '2-digit',
                    minute: '2-digit'
                  }),
                  title: item.data,
                  read: !!item.read_at
                }
              })
              .sort((a, b) => b.createdAt - a.createdAt) // 🔥 sort descending by date
            : []
          setNotifications(formatted)
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
          notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-center gap-4 py-3 border-b border-gray-200 last:border-b-0"
            >
              {/* Left: Date + Time */}
              <div
                style={{ fontFamily: 'Sofia Pro', fontWeight: 500 }}
                className="flex flex-col items-center bg-[#FAFAFA] px-3 py-1 rounded-xl text-[10px] font-medium min-w-[80px]"
              >
                <div className="bg-gradient-to-r from-[#323FF7] to-[#33AEE5] bg-clip-text text-transparent text-center">
                  <span>{notification.date}</span>
                  <br />
                  <span>({notification.time})</span>
                </div>
              </div>

              {/* Right: Message */}
              <p className="text-xs text-black">{notification.title}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Notification
