import React from "react";
import '../styles/weatherCard.css';

const WeatherCard = React.memo(({ data, times, formatDateTime }) => {

  return (
    <>
      <div className="outer-container">
        {data ? (
          <div className="weather-container">
            <div className="location-info">
              <p>{data.location.name}</p>
              <p>{data.location.country}</p>
              <p>
                {formatDateTime(data.location.localtime)}
              </p>
            </div>
            <div className="temperature-container">
              <p>{data.current.temp_c.toFixed(0)}°</p>
              <p>{data.current.condition.text}</p>
            </div>
            <div className="weather-details-container">
              <div className="weather-detail">
                <p>precipitation</p>
                <p>{data.current.precip_mm} mm</p>
              </div>
              <div className="weather-detail">
                <p>humidity</p>
                <p>{data.current.humidity}%</p>
              </div>
              <div className="weather-detail">
                <p>wind</p>
                <p>{data.current.wind_kph} km/h</p>
              </div>
            </div>
            <div className="weather-times">
              {times.map((hour, index) => (
                <div key={index}>
                  <p>{hour.time}</p>
                  <p>{hour.temp.toFixed(0)}°</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="instructions">
            <h2>Welcome!</h2>
            <p>Enter a city name in the search bar to get the latest weather updates.</p>
          </div>
        )}
      </div>
    </>
  );
});

export default WeatherCard;