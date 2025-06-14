import axios from "axios";

const fetchWeather = async (city) => {

    try {
        const response = await axios.get(`http://localhost:8080/weather/${city}`);
        return response.data;
    } catch (error) {
        console.log("City not found or error fetching data");
    }
};

export { fetchWeather };