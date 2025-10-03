import axios from 'axios'

export const getBlog = async () => {
  const token = localStorage.getItem('userToken')

  const response = await axios.get(`/api/get_blog`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return response
}
