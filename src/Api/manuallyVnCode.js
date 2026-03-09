import axios from 'axios'
const BASE_URL = import.meta.env.VITE_API_URL

export const manuallyVnCode = async (vnCode) => {
  const token = localStorage.getItem('userToken')

  const response = await axios.get(`${BASE_URL}api/manually-vn-code`, {
    params: { vn_code: vnCode },
    headers: { Authorization: `Bearer ${token}` }
  })
  return response
}
