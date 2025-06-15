import { fetchWeather } from "../config/api.js";

export const getByCity = async (req, res) => {
    const { city } = req.params;

    try {
        const data = await fetchWeather(city);
        res.json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
