import { fetchWeather } from "../config/api.js";

// controllers/weatherController.js
export const getByCity = async (req, res) => {
   
    const { city } = req.params;
    
    try {
        const weatherData = await fetchWeather(city);
        res.json(weatherData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};