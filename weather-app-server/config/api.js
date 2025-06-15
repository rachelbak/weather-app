import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.API_KEY;
const BASE_URL = "http://api.weatherapi.com/v1";

// פונקציה לבדיקת קלט
const checkInput = (city) => {
    if (!city || typeof city !== 'string') {
        throw new Error("Valid city name is required");
    }
    if (!API_KEY) {
        throw new Error("API_KEY is not configured");
    }
};

// פונקציה לקבלת השעה הנוכחית
const getCurrentHour = (localTimeStr) => {
    return parseInt(localTimeStr.split(" ")[1].split(":")[0], 10);
};

// פונקציה לבניית מערך השעות הרלוונטיות
const buildHoursArray = (hourlyData, currentHour) => {
    const relevantHours = [];

    for (let i = -3; i <= 1; i++) {
        const targetHour = (currentHour + i + 24) % 24;
        const hourData = hourlyData.find(hour =>
            new Date(hour.time).getHours() === targetHour
        );

        if (hourData) {
            relevantHours.push({
                time: hourData.time.split(" ")[1],
                temp: hourData.temp_c,
            });
        }
    }

    return relevantHours;
};

// פונקציה לשליפת נתוני אתמול
export const fetchYesterdayWeather = async (city, date) => {
    try {
        const response = await axios.get(`${BASE_URL}/history.json?key=${API_KEY}&q=${city}&dt=${date}`);
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch yesterday's weather data");
    }
};

// פונקציה לשליפת נתוני מחר
export const fetchTomorrowWeather = async (city) => {
    try {
        const response = await axios.get(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=2&aqi=no&alerts=no`);

        if (response.data.forecast.forecastday.length < 2) {
            throw new Error("No forecast available for tomorrow");
        }

        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch tomorrow's weather data");
    }
};

// פונקציה להשגת טמפרטורות מאתמול
const getYesterdayTemps = async (city, localDateStr, currentHour) => {
    if (currentHour > 2) return {}; // לא צריך נתוני אתמול

    const localDate = new Date(localDateStr);
    localDate.setDate(localDate.getDate() - 1);
    const yesterdayDate = localDate.toLocaleDateString('en-CA');

    const yesterdayWeather = await fetchYesterdayWeather(city, yesterdayDate);
    const yesterdayHours = yesterdayWeather?.forecast?.forecastday?.[0]?.hour || [];

    return {
        "21:00": yesterdayHours.find(h => h.time.endsWith("21:00"))?.temp_c || "N/A",
        "22:00": yesterdayHours.find(h => h.time.endsWith("22:00"))?.temp_c || "N/A",
        "23:00": yesterdayHours.find(h => h.time.endsWith("23:00"))?.temp_c || "N/A"
    };
};

// פונקציה להשגת טמפרטורות ממחר
const getTomorrowTemps = async (city, currentHour) => {
    if (currentHour !== 23) return {}; // לא צריך נתוני מחר

    const tomorrowWeather = await fetchTomorrowWeather(city);
    const tomorrowHours = tomorrowWeather.forecast.forecastday[1].hour;

    return {
        "00:00": tomorrowHours.find(h => h.time.endsWith("00:00"))?.temp_c || "N/A"
    };
};

// פונקציה לעדכון הטמפרטורות בשעות הקצה
const updateEdgeHours = (relevantHours, yesterdayTemps, tomorrowTemps) => {
    relevantHours.forEach(hour => {
        if (tomorrowTemps[hour.time]) {
            hour.temp = tomorrowTemps[hour.time];
        } else if (yesterdayTemps[hour.time]) {
            hour.temp = yesterdayTemps[hour.time];
        }
    });
};

// הפונקציה הראשית - עכשיו הרבה יותר פשוטה!
export const fetchWeather = async (city) => {
    checkInput(city);

    try {
        // שליפת הנתונים הבסיסיים
        const response = await axios.get(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=1&aqi=no&alerts=no`);

        const localTimeStr = response.data.location.localtime;
        const currentHour = getCurrentHour(localTimeStr);
        const localDateStr = localTimeStr.split(" ")[0];
        const hourlyData = response.data.forecast.forecastday[0].hour;

        // בניית מערך השעות
        const relevantHours = buildHoursArray(hourlyData, currentHour);

        // טיפול בשעות קצה
        const yesterdayTemps = await getYesterdayTemps(city, localDateStr, currentHour);
        const tomorrowTemps = await getTomorrowTemps(city, currentHour);

        updateEdgeHours(relevantHours, yesterdayTemps, tomorrowTemps);

        return {
            data: response.data,
            times: relevantHours
        };

    } catch (error) {
        throw new Error("Failed to fetch weather data");
    }
};
