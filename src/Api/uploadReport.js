import axios from 'axios'
const BASE_URL = import.meta.env.VITE_API_URL

export const uploadReport = async (file, bookingId) => {
  const token = localStorage.getItem('userToken')

  const formData = new FormData()
  formData.append('report_file', file)
  formData.append('booking_id', bookingId)

  const response = await axios.post(`${BASE_URL}api/user/upload-report`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  })

  return response
}
