import { useState, useEffect } from 'react'
import { getBookingAppoinment as getBookingAppointment } from '../../Api/getBookingAppoinment'
import NotificationMobileIcon from '../../assets/Dashboard/Mobile/NotificationMobileIcon.svg'
const UpcomingAppointMent = ({ setSubView, setData }) => {
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await getBookingAppointment()
        if (response.data.status === 'success') {
          const sortedAppointments = response.data.user
            .filter((a) => new Date(a.appointment_date) >= new Date())
            .sort(
              (a, b) => new Date(b.appointment_date) - new Date(a.appointment_date) // descending
            )
          setAppointments(sortedAppointments) // update state with API data
        } else {
          console.error('Error fetching appointments:', response.data.message)
        }
      } catch (error) {
        console.error(
          'Error fetching appointments:',
          error.response?.data?.message || error.message
        )
      }
    }
    fetchAppointments()
  }, [])

  return (
    <div className="rounded-4xl lg:rounded-none lg:rounded-r-4xl w-full md:border md:border-gray-300 md:border-l-0 dm:shadow-sm pt-5 md:px-4 xl:pt-8 xl:px-10">
      <div className="flex  items-center justify-between ">
        <p
          className="text-black text-[24px] md:text-[28px] xl:text-3xl"
          style={{ fontFamily: 'Sofia Pro', fontWeight: 400 }}
        >
          Upcoming Appointments
        </p>
        <div className="relative" onClick={() => setSelectedView('Notifications')}>
          <img src={NotificationMobileIcon} alt="Notification icon" className="lg:hidden  " />
          <span className="lg:hidden absolute top-[3px] right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </div>
      </div>
      <div
        className="w-full max-h-[53vh] overflow-y-auto overflow-x-auto rounded-2xl shadow-sm mt-[2rem] mb-[1rem] pt-3 p-4"
        style={{ fontFamily: 'Sofia Pro', fontWeight: 300 }}
      >
        <table className="w-full text-left border-collapse whitespace-nowrap">
          {/* Table Header */}
          <thead>
            <tr className="text-[#626262] text-xs">
              <th className="py-3 px-4" style={{ fontFamily: 'Sofia Pro', fontWeight: 400 }}>
                Test Date
              </th>
              <th
                className="py-3 px-2 xl:px-4"
                style={{ fontFamily: 'Sofia Pro', fontWeight: 400 }}
              >
                Type of Test
              </th>
              <th className="py-3 px-4" style={{ fontFamily: 'Sofia Pro', fontWeight: 400 }}>
                Type
              </th>
              <th className="py-3 px-4" style={{ fontFamily: 'Sofia Pro', fontWeight: 400 }}>
                Centre
              </th>
              {/* <th className="py-3 px-4"></th> */}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {appointments.map((appointment) => (
              <tr
                key={appointment.id}
                className={`text-xs text-left hover:bg-[#E9F8FF] hover:border-0 border-b border-b-[#DEDEDE] last:border-b-0`}
              >
                <td className="py-3 px-4 rounded-l-full">
                  {new Date(appointment.appointment_date).toLocaleDateString('en-GB')}
                </td>
                <td className="py-3 px-4 capitalize">{appointment.service_names?.toString()}</td>
                <td className="py-3 px-4 capitalize">{appointment.booking_status}</td>
                <td className="py-3 px-4">{appointment.center_name?.toString()}</td>
                {/* <td className="py-3 px-4 text-[#0078D4] cursor-pointer rounded-r-full">
                  <button
                    onClick={() => {
                      setSubView('Reschedule')
                      setData(appointment)
                    }}
                    className="text-[#323FF7] hover:underline cursor-pointer"
                  >
                    Reschedule
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UpcomingAppointMent
