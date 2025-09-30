import axios from 'axios'
const BASE_URL = import.meta.env.VITE_API_URL

export const getBookTeleconsultation = async () => {
  const token = localStorage.getItem('userToken')

  const response = await axios.get(`${BASE_URL}api/get_book_teleconsultation`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return response
}
