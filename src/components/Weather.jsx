import React from 'react';
import { getWeatherInfo } from '../utils/weatherUtils';

const Weather = ({ data }) => {
  if (!data || !data.current_weather) {
    return <div>Loading current weather...</div>;
  }

  const { temperature, windspeed, weathercode } = data.current_weather;
  const { description, icon } = getWeatherInfo(weathercode);

  return (
    <div className="weather-card current-weather">
      <h2>Current Weather</h2>
      <div className="weather-info">
        <span className="weather-icon">{icon}</span>
        <div>
          <p className="temperature">{temperature}°C</p>
          <p>{description}</p>
          <p>Wind: {windspeed} km/h</p>
        </div>
      </div>
    </div>
  );
};

export default Weather;