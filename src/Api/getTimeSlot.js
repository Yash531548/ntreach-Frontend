import axios from 'axios'
const BASE_URL = import.meta.env.VITE_API_URL

export const getTimeSlot = async () => {
  const token = localStorage.getItem('userToken')

  const response = await axios.get(`${BASE_URL}api/get_time_slot`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return response
}

export const getAllTimeSlotsByService = async (serviceId) => {
  const token = localStorage.getItem('userToken')

  const response = await axios.get(`${BASE_URL}api/get_all_time_slot`, {
    params: { service_id: serviceId },
    headers: { Authorization: `Bearer ${token}` }
  })
  return response
}
