import { useState, useEffect } from 'react'
import { getBookingAppoinment } from '../../Api/getBookingAppoinment'
import { uploadReport } from '../../Api/uploadReport'
const BASE_URL = import.meta.env.VITE_API_URL
import UploadReportModal from './UploadReportModal'
import NotificationMobileIcon from '../../assets/Dashboard/Mobile/NotificationMobileIcon.svg'

const ResultData = ({ setSubView, setSelectedView }) => {
  const [appointments, setAppointments] = useState([])
  const [bookingId, setBookingId] = useState('')
  const [openModal, setOpenModal] = useState(false)

  //
  const fetchAppointments = async () => {
    try {
      const response = await getBookingAppoinment()
      if (response.data.status === 'success') {
        const sortedAppointments = response.data.user
          .filter(
            (a) =>
              new Date(a.appointment_date).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)
          )
          .sort(
            (a, b) => new Date(b.appointment_date) - new Date(a.appointment_date) // descending
          )
        setAppointments(sortedAppointments) // update state with API data
      } else {
        alert(`Error fetching slots: ${response.data.message}`)
      }
    } catch (error) {
      alert(error.response?.data?.message || error.message)
    }
  }

  useEffect(() => {
    fetchAppointments()
  }, [])

  //
  const handleFileUpload = async (files) => {
    try {
      const response = await uploadReport(files, bookingId)
      if (response.data.status === 'success') {
        alert('Report(s) uploaded successfully')
        setOpenModal(false)

        // Refetch after upload
        fetchAppointments()
      } else {
        alert(response.data.message || 'Failed to upload report')
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert(error.response?.data?.message || error.message || 'Error uploading report')
    }
  }

  return (
    <div className="rounded-4xl lg:rounded-none lg:rounded-r-4xl w-full md:border md:border-gray-300 md:border-l-0 md:shadow-sm pt-5 md:px-4 xl:pt-8 xl:px-10">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <p
          className="text-black text-[25px] md:text-[28px] xl:text-3xl"
          style={{ fontFamily: 'Sofia Pro', fontWeight: 400 }}
        >
          My Results/Past Data
        </p>
        <div className="relative" onClick={() => setSelectedView('Notifications')}>
          <img src={NotificationMobileIcon} alt="Notification icon" className="lg:hidden" />
          <span className="lg:hidden absolute top-[3px] right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </div>
      </div>

      {/* Table */}
      <div
        className="w-full max-h-[45vh] overflow-y-auto overflow-x-auto rounded-2xl md:rounded-3xl shadow-sm mt-[2rem] mb-[1rem] pt-3 p-4"
        style={{ fontFamily: 'Sofia Pro', fontWeight: 300 }}
      >
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="whitespace-nowrap text-left text-[#626262] text-xs">
              <th className="px-4 py-3" style={{ fontFamily: 'Sofia Pro', fontWeight: 400 }}>
                Test Date
              </th>
              <th className="md:px-4 py-3" style={{ fontFamily: 'Sofia Pro', fontWeight: 400 }}>
                Type of Test
              </th>
              <th
                className="px-4 py-3 text-center"
                style={{ fontFamily: 'Sofia Pro', fontWeight: 400 }}
              >
                Status
              </th>
              <th className="px-4 py-3" style={{ fontFamily: 'Sofia Pro', fontWeight: 400 }}>
                Report/Result
              </th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr
                key={appointment.appointment_id}
                className="text-xs text-left hover:bg-[#E9F8FF] hover:border-0 border-b border-b-[#DEDEDE] whitespace-nowrap"
              >
                <td className="px-4 py-3 rounded-l-4xl">
                  {new Date(appointment.appointment_date).toLocaleDateString('en-GB')}
                </td>
                <td className="px-4 py-3">{appointment.service_names.join(', ')}</td>
                <td className="px-4 py-3 text-center">{appointment.status}</td>
                <td className="px-4 py-3 rounded-r-4xl text-[#323FF7]">
                  {(() => {
                    const evidenceFiles = appointment.user_updated_evidences || []

                    // No evidence uploaded
                    if (evidenceFiles.length === 0) {
                      return (
                        <span
                          onClick={() => {
                            setBookingId(appointment.appointment_id)
                            setOpenModal(true)
                          }}
                          className="cursor-pointer hover:underline"
                        >
                          Upload Report
                        </span>
                      )
                    }

                    // Evidence exists
                    return (
                      <div className="flex items-center gap-1 text-[#323FF7]">
                        <span className="text-[#626262]">Uploaded</span>
                        {evidenceFiles.map((file, index) => (
                          <a
                            key={index}
                            href={file}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            | Evidence {index + 1}
                          </a>
                        ))}
                      </div>
                    )
                  })()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Upload Modal */}
        <UploadReportModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onFileSelect={handleFileUpload}
        />
      </div>

      {/* Recommendations */}
      <div className="mt-[1rem] w-full rounded-2xl shadow-sm h-[19%] pt-3 p-7">
        <p
          className="text-[#0063B9] text-lg mb-4"
          style={{ fontFamily: 'Sofia Pro', fontWeight: 400 }}
        >
          Recommendations
        </p>
        <button
          onClick={() => {
            setSelectedView('teleconsultation')
            setSubView('Past Consultation')
          }}
          style={{ fontFamily: 'Sofia Pro', fontWeight: 300 }}
          className="relative flex items-center text-sm justify-between shadow-lg hover:shadow-lg/30 pr-2 pt-1 pb-1 pl-3 border border-[#566AFF] 
                     bg-[linear-gradient(to_bottom,_#323FF7_0%,_#323FF7_20%,_#33AEE5_100%)] text-white rounded-full cursor-pointer gap-8"
        >
          View Recommendation
        </button>
      </div>
    </div>
  )
}

export default ResultData
