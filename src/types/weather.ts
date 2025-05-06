export interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  name: string;
  sys: {
    country: string;
  };
  forecast: Array<{
    date: string;
    temp: number;
    weather_code: number;
    description: string;
  }>;
}

export interface WeatherError {
  message: string;
} 