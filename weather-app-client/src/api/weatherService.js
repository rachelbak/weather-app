import axios from "axios";

const fetchWeather = async (city) => {
    if (!city || !city.trim()) {
        throw new Error("City name is required");
    }
    try {
        const response = await axios.get(`http://localhost:8080/weather/${city}`);
        if (!response.data || !response.data.data) {
            throw new Error("City not found");
        }
        return response.data;
    } catch (error) {
        const message = error?.response?.data?.error?.message || error.message || "Error fetching data";
        throw new Error(message);
    }
};

export { fetchWeather };