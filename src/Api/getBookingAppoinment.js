import axios from 'axios'
const BASE_URL = import.meta.env.VITE_API_URL

export const getBookingAppoinment = async () => {
  const token = localStorage.getItem('userToken')

  const response = await axios.get(`${BASE_URL}api/get_booking_appoinment`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return response
}
