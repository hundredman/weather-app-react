# React Weather Forecast

This is a simple weather forecast application built with React and Vite, using the Open-Meteo API.

## Features

- Displays the current weather conditions based on the user's geolocation.
- Shows a 7-day weather forecast.
- **Location Search**: Allows users to search for weather in specific cities using Nominatim API.
- Defaults to Seoul, South Korea if geolocation is unavailable or denied.

## Tech Stack

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- **API**: [Open-Meteo Weather API](https://open-meteo.com/), [Nominatim API](https://nominatim.openstreetmap.org/)

## Getting Started

### Prerequisites

- Node.js and npm (or yarn/pnpm) installed on your machine.

### Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```sh
   cd weather-forecast-v2.1
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```

### Running the Development Server

To start the development server, run:

```sh
npm run dev
```

This will start the application on `http://localhost:5173`.


## Project Structure

```
/src
|-- /components
|   |-- Weather.jsx     # Component to display current weather
|   |-- Forecast.jsx    # Component to display the 7-day forecast
|   `-- LocationSearch.jsx # Component for searching locations
|-- /services
|   |-- weatherService.js # Fetches data from the Open-Meteo API
|   `-- locationService.js # Fetches location data from Nominatim API
|-- /utils
|   `-- weatherUtils.js # Utility functions for weather data (e.g., icons)
|-- App.css             # Main stylesheet
|-- App.jsx             # Main application component
`-- main.jsx            # Entry point of the application
```
