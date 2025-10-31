import axios from 'axios'
const BASE_URL = import.meta.env.VITE_API_URL

export const selfRiskAssessmentItem = async (data) => {
  const token = localStorage.getItem('userToken')
  const response = await axios.post(`${BASE_URL}api/user/self_risk_assessment_item`, data, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return response
}
