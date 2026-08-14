import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getVnByOutreachCode = async (outId) => {
  const token = localStorage.getItem("userToken");

  const response = await axios.get(`${BASE_URL}api/get_vn_by_outreach_code`, {
    params: {
      out_id: outId,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};
