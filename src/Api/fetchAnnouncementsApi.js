import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_URL;
export async function fetchAnnouncementsApi() {
    try {
        const response = await axios.get(`${BASE_URL}api/get_announcement`);
        const result = response.data;
        // Format and return only active announcements, if desired
        if (result.status === "success" && Array.isArray(result.data)) {
            return result.data.filter((a) => a.is_active);
        }

        return [];
    }
    catch (error) {
        console.error("Failed to fetch announcements:", error);
        return [];
    }
}