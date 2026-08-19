import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const saveFeedbackDetails = async (data) => {
  const token = localStorage.getItem("userToken");

  const response = await axios.post(
    `${BASE_URL}api/save-feedback-details`,
    data,
    {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    },
  );

  return response;
};
