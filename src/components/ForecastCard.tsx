import { Card, CardContent, Typography, Box, useTheme, useMediaQuery } from '@mui/material';

interface ForecastDay {
  date: string;
  temp: number;
  weather_code: number;
  description: string;
}

interface ForecastCardProps {
  forecast: ForecastDay[];
}

const ForecastCard = ({ forecast }: ForecastCardProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).format(date);
  };

  return (
    <Card
      sx={{
        borderRadius: 4,
        background: 'linear-gradient(to bottom right, rgba(255,255,255,0.9), rgba(255,255,255,0.8))',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        mt: 3,
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: 600,
            color: '#1565c0',
            textAlign: 'center',
            mb: 3,
            fontSize: { xs: '1.1rem', sm: '1.25rem' },
          }}
        >
          5-Day Forecast
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(5, 1fr)' },
            gap: 2,
          }}
        >
          {forecast.map((day) => (
            <Box
              key={day.date}
              sx={{
                textAlign: 'center',
                p: 1,
                borderRadius: 2,
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  mb: 1,
                  fontWeight: 500,
                }}
              >
                {formatDate(day.date)}
              </Typography>
              <img
                src={`https://openweathermap.org/img/wn/${getWeatherIcon(day.weather_code)}@2x.png`}
                alt={day.description}
                style={{
                  width: isMobile ? 50 : 70,
                  height: isMobile ? 50 : 70,
                  margin: '0 auto',
                  display: 'block',
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: '1rem', sm: '1.25rem' },
                  background: 'linear-gradient(45deg, #1565c0, #64b5f6)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                {Math.round(day.temp)}°
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  mt: 1,
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                }}
              >
                {day.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

function getWeatherIcon(code: number): string {
  const iconMap: Record<number, string> = {
    0: '01d',
    1: '02d',
    2: '03d',
    3: '04d',
    45: '50d',
    48: '50d',
    51: '09d',
    53: '09d',
    55: '09d',
    61: '10d',
    63: '10d',
    65: '10d',
    71: '13d',
    73: '13d',
    75: '13d',
    95: '11d',
  };
  
  return iconMap[code] || '01d';
}

export default ForecastCard; 