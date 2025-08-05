
import React, { useState, useEffect } from 'react';
import { getWeatherData } from './services/weatherService';
import { searchLocation } from './services/locationService';
import Weather from './components/Weather';
import Forecast from './components/Forecast';
import LocationSearch from './components/LocationSearch';
import './App.css';

function App() {
  // State for weather data, potential errors, and current location display name.
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [locationName, setLocationName] = useState('Your Location');

  // Fetches weather data for given coordinates.
  const fetchWeatherByCoords = (latitude, longitude, name = 'Your Location') => {
    setError(null); // Clear previous errors
    setWeatherData(null); // Clear previous weather data
    setLocationName(name);
    getWeatherData(latitude, longitude)
      .then(data => {
        setWeatherData(data);
      })
      .catch(err => {
        setError('Could not fetch weather data.');
        console.error(err);
      });
  };

  // Handles location search query.
  const handleLocationSearch = async (query) => {
    try {
      const location = await searchLocation(query);
      if (location) {
        fetchWeatherByCoords(location.latitude, location.longitude, location.display_name);
      } else {
        setError('Location not found. Please try again.');
        setWeatherData(null);
        setLocationName('Unknown Location');
      }
    } catch (err) {
      setError('Error searching for location.');
      console.error(err);
    }
  };

  // Effect hook to get initial location and weather data on component mount.
  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
          },
          (err) => {
            // Default to Seoul if geolocation fails or is denied.
            fetchWeatherByCoords(37.5665, 126.9780, 'Seoul');
            console.warn(`Geolocation failed: ${err.message}. Defaulting to Seoul.`);
          }
        );
      } else {
        // Default to Seoul if geolocation is not supported.
        fetchWeatherByCoords(37.5665, 126.9780, 'Seoul');
        console.warn('Geolocation is not supported by this browser. Defaulting to Seoul.');
      }
    };

    getLocation();
  }, []); // Empty dependency array ensures this runs only once.

  return (
    <div className="App">
      <h1>Weather Forecast</h1>
      <LocationSearch onSearch={handleLocationSearch} />
      {locationName && <h2 className="current-location">{locationName}</h2>}
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
