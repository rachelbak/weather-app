import '../styles/searchBar.css';
import { useState } from 'react';
import { fetchWeather } from '../api/weatherService.js';
import WeatherCard from "./WeatherCard.jsx"

const SearchBar = () => {
  const [city, setCityInput] = useState('');
  const [data, setData] = useState(null);
  const [times, setTimes] = useState(null);
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCityInput(e.target.value);
  };

  const handleCheck = async (e) => {
    e.preventDefault();
    setErrors("");

    if (!city.trim()) {
      setErrors("Please enter a city name");
      return;
    }

    setData(null);
    setTimes(null);
    setLoading(true);

    try {
      const res = await fetchWeather(city);
      setData(res.data);
      setTimes(res.times);
      // setCityInput(''); // Uncomment if you want to clear the input after search
    } catch (err) {
      setErrors("Wrong city name. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const formatDateTime = (dateTime) => {
    const [date, time] = dateTime.split(" ");
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year.slice(-2)} at ${time}`;
  };

  return (

    <div >
      <div className="search-container">
        <img src="/logo.svg" alt="Logo" />
        <p id='title'>
          Use our weather app to see the weather around the world
        </p>
        <div className="input-container">
          <label >City Name</label>
          <input
            type="text"
            value={city}
            onChange={handleChange}
            onKeyDown={(e) => e.key === "Enter" && !loading && handleCheck(e)}
            aria-label="City name input"
            aria-describedby={errors ? "error-message" : undefined}
            disabled={loading}
          />
          <button onClick={handleCheck} disabled={loading} aria-label="Search for weather">Check</button>
        </div>
        {errors && (
          <p id="error-message" className="error" role="alert">
            {errors}
          </p>
        )}
      </div>
      <div className="weather">
        <WeatherCard data={data} times={times} formatDateTime={formatDateTime} />
      </div>
      {data && (
        <div className="location-container">
          <p className="latitude">Latitude {data?.location?.lat}</p>
          <p className="longitude">Longitude {data?.location?.lon}</p>
          <p className="accurate">Accurate to  {data?.current?.last_updated
            ? formatDateTime(data.current.last_updated) : ""}</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;