import { useState } from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme, Alert, CircularProgress, Box, Typography, Paper } from '@mui/material';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import { getWeather } from './services/weatherService';
import type { WeatherData } from './types/weather';
import type { City } from './services/weatherService';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
    },
    secondary: {
      main: '#ff4081',
      light: '#ff79b0',
      dark: '#c60055',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (city: City) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getWeather(city);
      setWeather(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #64b5f6 0%, #2196f3 100%)',
          py: { xs: 2, sm: 4 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%'
        }}
      >
        <Container maxWidth="md">
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: 4,
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              mb: { xs: 2, sm: 4 },
            }}
          >
            <Typography
              variant="h1"
              align="center"
              sx={{
                mb: 4,
                color: '#1565c0',
                fontSize: { xs: '2rem', sm: '2.5rem' },
                fontWeight: 600,
              }}
            >
              Weather App
            </Typography>

            <SearchBar onSearch={handleSearch} />
            
            {loading && (
              <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress size={48} thickness={4} />
              </Box>
            )}

            {error && (
              <Alert
                severity="error"
                sx={{
                  mt: 2,
                  borderRadius: 2,
                  '& .MuiAlert-icon': {
                    fontSize: '1.5rem',
                  },
                }}
              >
                {error}
              </Alert>
            )}

            {weather && !loading && !error && (
              <>
                <Box mt={4}>
                  <WeatherCard data={weather} />
                </Box>
                {'forecast' in weather && (
                  <ForecastCard forecast={weather.forecast} />
                )}
              </>
            )}
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
