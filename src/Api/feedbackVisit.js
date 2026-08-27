import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const getAuthConfig = () => {
  const token = localStorage.getItem("userToken");

  return token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    : {};
};

export const createFeedbackVisit = async (data) => {
  const { data: response } = await axios.post(
    `${BASE_URL}api/create-feedback-visit`,
    data,
    getAuthConfig(),
  );

  return response;
};

export const updateFeedbackVisit = async (visitId, data) => {
  const { data: response } = await axios.put(
    `${BASE_URL}api/update-feedback-visit/${visitId}`,
    data,
    getAuthConfig(),
  );

  return response;
};
