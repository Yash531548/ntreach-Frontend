import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;

export const bookAppointment = async (data) => {
    const token = localStorage.getItem("userToken");
    const response = await axios.post(
        `${BASE_URL}api/user/book-appointment`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );
    return response
}