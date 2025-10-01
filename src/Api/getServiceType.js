import axios from 'axios'
const BASE_URL = import.meta.env.VITE_API_URL

export const getServiceType = async () => {
  const token = localStorage.getItem('userToken')

  const response = await axios.get(`${BASE_URL}api/get_service_type`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return response
}
