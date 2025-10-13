import axios from 'axios'
const BASE_URL = import.meta.env.VITE_API_URL

export const getVn = async (data) => {
  const token = localStorage.getItem('userToken')

  const response = await axios.post(`${BASE_URL}api/get_vn_by_name`, data, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return response
}
