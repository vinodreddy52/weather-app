# Weather App

A modern React weather application that displays current weather conditions and forecasts. Built with React, TypeScript, and Material-UI.

## Features

- Current weather display
- Search for cities
- Responsive design
- Beautiful Material-UI components
- TypeScript for better type safety

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your OpenWeatherMap API key:
   ```
   VITE_WEATHER_API_KEY=your_api_key_here
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Technologies Used

- React
- TypeScript
- Vite
- Material-UI
- Axios
- OpenWeatherMap API

## Project Structure

```
src/
  ├── components/
  │   ├── WeatherCard.tsx
  │   ├── SearchBar.tsx
  │   └── WeatherInfo.tsx
  ├── services/
  │   └── weatherService.ts
  ├── types/
  │   └── weather.ts
  └── App.tsx
```

## License

MIT
