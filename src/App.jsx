import React, { useState, useEffect } from 'react';
import { getWeatherData } from './services/weatherService';
import Weather from './components/Weather';
import Forecast from './components/Forecast';
import './App.css';

function App() {
  // State for weather data and errors.
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  // Fetch weather data on component mount.
  useEffect(() => {
    // Fetches weather data from the API.
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

    // Get user's location, then fetch weather.
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          // On success, fetch weather for the location.
          (position) => {
            fetchWeather(position.coords.latitude, position.coords.longitude);
          },
          // On failure, use a default location (Seoul).
          (err) => {
            fetchWeather(37.5665, 126.9780); // Default to Seoul
            console.warn(`Geolocation failed: ${err.message}. Defaulting to Seoul.`);
          }
        );
      } else {
        // Geolocation not supported, so default to Seoul.
        fetchWeather(37.5665, 126.9780); // Default to Seoul
        console.warn('Geolocation is not supported by this browser. Defaulting to Seoul.');
      }
    };

    getLocation();
  }, []); // Runs only once on mount.

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