import React, { useState, useEffect } from 'react';
import { getWeatherData } from './services/weatherService';
import Weather from './components/Weather';
import Forecast from './components/Forecast';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = (latitude, longitude) => {
      getWeatherData(latitude, longitude)
        .then(data => {
          setWeatherData(data);
        })
        .catch(err => {
          setError('Could not fetch weather data.');
          console.error(err);
        });
    };

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            fetchWeather(position.coords.latitude, position.coords.longitude);
          },
          (err) => {
            // Default to Seoul if geolocation fails
            fetchWeather(37.5665, 126.9780);
            console.warn(`Geolocation failed: ${err.message}. Defaulting to Seoul.`);
          }
        );
      } else {
        // Default to Seoul if geolocation is not supported
        fetchWeather(37.5665, 126.9780);
        console.warn('Geolocation is not supported by this browser. Defaulting to Seoul.');
      }
    };

    getLocation();
  }, []);

  return (
    <div className="App">
      <h1>Weather Forecast</h1>
      {error && <p className="error">{error}</p>}
      {weatherData ? (
        <>
          <Weather data={weatherData} />
          <Forecast data={weatherData} />
        </>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
}

export default App;