import axios from 'axios';
import { WeatherData } from '../types/weather';

const BASE_URL = 'https://api.open-meteo.com/v1/forecast';
const GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search';

export interface City {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  countryCode: string;
  fullName: string;
}

export const getCitySuggestions = async (query: string): Promise<City[]> => {
  if (!query || query.length < 2) return [];

  try {
    const response = await axios.get(GEO_URL, {
      params: {
        name: query,
        count: 10,
        language: 'en',
        format: 'json'
      }
    });

    if (!response.data.results) return [];

    return response.data.results.map((result: any) => ({
      name: result.name,
      country: result.country,
      latitude: result.latitude,
      longitude: result.longitude,
      countryCode: result.country_code,
      fullName: `${result.name}, ${result.country}`
    }));
  } catch (error) {
    console.error('Error fetching city suggestions:', error);
    return [];
  }
};

export const getWeather = async (city: City): Promise<WeatherData> => {
  try {
    // Get weather data including forecast
    const weatherResponse = await axios.get(BASE_URL, {
      params: {
        latitude: city.latitude,
        longitude: city.longitude,
        current: 'temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code',
        daily: 'temperature_2m_max,weather_code',
        timezone: 'auto',
        forecast_days: 6 // Current day + 5 days
      }
    });

    const current = weatherResponse.data.current;
    const daily = weatherResponse.data.daily;
    
    // Map weather code to description
    const currentWeather = getWeatherDescription(current.weather_code);

    // Process forecast data
    const forecast = daily.time.slice(1).map((date: string, index: number) => ({
      date,
      temp: daily.temperature_2m_max[index + 1],
      weather_code: daily.weather_code[index + 1],
      description: getWeatherDescription(daily.weather_code[index + 1]).description
    }));

    return {
      main: {
        temp: current.temperature_2m,
        feels_like: current.apparent_temperature,
        humidity: current.relative_humidity_2m,
        pressure: 1013 // OpenMeteo doesn't provide pressure in free tier
      },
      weather: [{
        main: currentWeather.main,
        description: currentWeather.description,
        icon: getWeatherIcon(current.weather_code)
      }],
      wind: {
        speed: current.wind_speed_10m
      },
      name: city.name,
      sys: {
        country: city.countryCode
      },
      forecast
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.reason || 'Failed to fetch weather data');
    }
    throw new Error('An unexpected error occurred');
  }
};

function getWeatherDescription(code: number): { main: string; description: string } {
  // WMO Weather interpretation codes (WW)
  const weatherCodes: Record<number, { main: string; description: string }> = {
    0: { main: 'Clear', description: 'Clear sky' },
    1: { main: 'Clear', description: 'Mainly clear' },
    2: { main: 'Clouds', description: 'Partly cloudy' },
    3: { main: 'Clouds', description: 'Overcast' },
    45: { main: 'Fog', description: 'Foggy' },
    48: { main: 'Fog', description: 'Depositing rime fog' },
    51: { main: 'Drizzle', description: 'Light drizzle' },
    53: { main: 'Drizzle', description: 'Moderate drizzle' },
    55: { main: 'Drizzle', description: 'Dense drizzle' },
    61: { main: 'Rain', description: 'Slight rain' },
    63: { main: 'Rain', description: 'Moderate rain' },
    65: { main: 'Rain', description: 'Heavy rain' },
    71: { main: 'Snow', description: 'Slight snow fall' },
    73: { main: 'Snow', description: 'Moderate snow fall' },
    75: { main: 'Snow', description: 'Heavy snow fall' },
    95: { main: 'Thunderstorm', description: 'Thunderstorm' },
  };
  
  return weatherCodes[code] || { main: 'Unknown', description: 'Unknown weather' };
}

function getWeatherIcon(code: number): string {
  // Map weather codes to similar OpenWeatherMap icons for compatibility
  const iconMap: Record<number, string> = {
    0: '01d', // Clear sky
    1: '02d', // Mainly clear
    2: '03d', // Partly cloudy
    3: '04d', // Overcast
    45: '50d', // Foggy
    48: '50d', // Rime fog
    51: '09d', // Light drizzle
    53: '09d', // Moderate drizzle
    55: '09d', // Dense drizzle
    61: '10d', // Slight rain
    63: '10d', // Moderate rain
    65: '10d', // Heavy rain
    71: '13d', // Slight snow
    73: '13d', // Moderate snow
    75: '13d', // Heavy snow
    95: '11d', // Thunderstorm
  };
  
  return iconMap[code] || '01d';
} 