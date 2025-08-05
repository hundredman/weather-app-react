
import React from 'react';
import { getWeatherInfo } from '../utils/weatherUtils';

const Forecast = ({ data }) => {
  if (!data || !data.daily) {
    return <div>Loading forecast...</div>;
  }

  const { time, weathercode, temperature_2m_max, temperature_2m_min } = data.daily;

  return (
    <div className="forecast-container">
      <h2>7-Day Forecast</h2>
      <div className="forecast-grid">
        {time.map((day, index) => {
          const { description, icon } = getWeatherInfo(weathercode[index]);
          return (
            <div key={day} className="forecast-card">
              <h3>{new Date(day).toLocaleDateString('en-US', { weekday: 'short' })}</h3>
              <span className="weather-icon">{icon}</span>
              <p>{description}</p>
              <p className="temp-range">
                <strong>{temperature_2m_max[index]}°</strong> / {temperature_2m_min[index]}°
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;
