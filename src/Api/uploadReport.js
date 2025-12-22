import axios from 'axios'
const BASE_URL = import.meta.env.VITE_API_URL

export const uploadReport = async (files, bookingId) => {
  const token = localStorage.getItem('userToken')

  const formData = new FormData()
  files.forEach((file) => {
    formData.append('evidence_files[]', file)
  })
  formData.append('appointment_id', bookingId)

  const response = await axios.post(`${BASE_URL}api/user/upload-report`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  })

  return response
}
