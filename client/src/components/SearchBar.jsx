import '../styles/searchBar.css';
import React, { useState } from 'react';
import { fetchWeather } from '../api/weatherService.js';
import WeatherCard from "./WeatherCard.jsx"

const SearchBar = () => {
  const [city, setCityInput] = useState('');
  const [data, setData] = useState(null);
  const [times, setTimes] = useState(null);
  const [errors, setErrors] = useState("");
  const handleChange = (e) => {
    setCityInput(e.target.value);
  };

  const handleCheck = (e) => {
    e.preventDefault();
    setErrors("");
    fetchWeather(city)
      .then(res => {
        setData(res.data);
        setTimes(res.times);
      })
      .catch(err => {
        console.log(err.message);
        setErrors("Wrong city name. Please try again.");
      })
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
            onKeyDown={(e) => e.key === "Enter" && handleCheck(e)}
            aria-label="City name input"
          />
          <button onClick={handleCheck} aria-label="Search for weather">Check</button>
        </div>
        {errors && <p className="error">{errors}</p>}
      </div>
      <div className="weather">
        <WeatherCard data={data} times={times} formatDateTime={formatDateTime} />
      </div>
      {data && (
        <div className="location-container">
          <p className="latitude">Latitude {data?.location?.lat ?? "Loading..."}</p>
          <p className="longitude">Longitude {data?.location?.lon ?? "Loading..."}</p>
          <p className="accurate">Accurate to  {data?.current?.last_updated
            ? formatDateTime(data.current.last_updated)
            : "Loading..."}</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;