
import React from 'react';

const Forecast = ({ data }) => {
  if (!data || !data.daily) {
    return <div>Loading forecast...</div>;
  }

  const { time, weathercode, temperature_2m_max, temperature_2m_min } = data.daily;

  return (
    <div className="forecast-container">
      <h2>7-Day Forecast</h2>
      <div className="forecast-grid">
        {time.map((day, index) => (
          <div key={day} className="forecast-card">
            <p>{new Date(day).toLocaleDateString('en-US', { weekday: 'short' })}</p>
            <p>{getWeatherDescription(weathercode[index])}</p>
            <p>
              {temperature_2m_max[index]}° / {temperature_2m_min[index]}°
            </p>
          </div>
        ))}
      </div>
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

export default Forecast;
