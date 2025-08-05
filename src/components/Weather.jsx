
import React from 'react';

const Weather = ({ data }) => {
  if (!data || !data.current_weather) {
    return <div>Loading current weather...</div>;
  }

  const { temperature, windspeed, weathercode } = data.current_weather;

  return (
    <div className="weather-card">
      <h2>Current Weather</h2>
      <p>Temperature: {temperature}°C</p>
      <p>Wind Speed: {windspeed} km/h</p>
      <p>Weather: {getWeatherDescription(weathercode)}</p>
    </div>
  );
};

// Helper function to get weather description from code
const getWeatherDescription = (code) => {
    const descriptions = {
        0: 'Clear sky',
        1: 'Mainly clear',
        2: 'Partly cloudy',
        3: 'Overcast',
        45: 'Fog',
        48: 'Depositing rime fog',
        51: 'Light drizzle',
        53: 'Moderate drizzle',
        55: 'Dense drizzle',
        56: 'Light freezing drizzle',
        57: 'Dense freezing drizzle',
        61: 'Slight rain',
        63: 'Moderate rain',
        65: 'Heavy rain',
        66: 'Light freezing rain',
        67: 'Heavy freezing rain',
        71: 'Slight snow fall',
        73: 'Moderate snow fall',
        75: 'Heavy snow fall',
        77: 'Snow grains',
        80: 'Slight rain showers',
        81: 'Moderate rain showers',
        82: 'Violent rain showers',
        85: 'Slight snow showers',
        86: 'Heavy snow showers',
        95: 'Thunderstorm',
        96: 'Thunderstorm with slight hail',
        99: 'Thunderstorm with heavy hail',
    };
    return descriptions[code] || 'Unknown weather code';
};

export default Weather;
