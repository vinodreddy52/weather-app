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
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).format(date);
  };

  return (
    <Card
      sx={{
        borderRadius: 24,
        background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)',
        mt: 4,
        width: '100%',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, #64b5f6, #2196f3, #1976d2, #64b5f6)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 3s ease-in-out infinite',
        },
        '@keyframes shimmer': {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      }}
    >
      <CardContent sx={{ p: { xs: 3, sm: 4, md: 5 } }}>
        <Typography
          variant="h5"
          component="div"
          sx={{
            fontWeight: 800,
            background: 'linear-gradient(135deg, #1565c0 0%, #64b5f6 50%, #1976d2 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            textAlign: 'center',
            mb: 4,
            fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
            textShadow: '0 2px 4px rgba(0,0,0,0.1)',
            letterSpacing: '0.5px',
          }}
        >
          🌤️ 5-Day Forecast
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { 
              xs: 'repeat(2, 1fr)', 
              sm: 'repeat(3, 1fr)', 
              md: 'repeat(5, 1fr)' 
            },
            gap: { xs: 2, sm: 3, md: 4 },
            width: '100%',
            justifyContent: 'center',
            alignItems: 'stretch',
          }}
        >
          {forecast.map((day) => (
            <Box
              key={day.date}
              sx={{
                textAlign: 'center',
                p: { xs: 2, sm: 2.5, md: 3 },
                borderRadius: 20,
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                background: 'linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
                backdropFilter: 'blur(15px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: { xs: '140px', sm: '160px', md: '180px' },
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
                  transform: 'translateX(-100%)',
                  transition: 'transform 0.6s',
                },
                '&:hover': {
                  transform: 'translateY(-8px) scale(1.02)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.15), 0 8px 16px rgba(0,0,0,0.1)',
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)',
                  '&::before': {
                    transform: 'translateX(100%)',
                  },
                },
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  mb: 2,
                  fontWeight: 700,
                  fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                  lineHeight: 1.2,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  background: 'linear-gradient(45deg, #1976d2, #64b5f6)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                {formatDate(day.date)}
              </Typography>
              
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2,
                  width: '100%',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -8,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '60%',
                    height: '2px',
                    background: 'linear-gradient(90deg, transparent, rgba(100, 181, 246, 0.3), transparent)',
                    borderRadius: '50%',
                  },
                }}
              >
                <img
                  src={`https://openweathermap.org/img/wn/${getWeatherIcon(day.weather_code)}@2x.png`}
                  alt={day.description}
                  style={{
                    width: isMobile ? 50 : isTablet ? 60 : 70,
                    height: isMobile ? 50 : isTablet ? 60 : 70,
                    margin: '0 auto',
                    display: 'block',
                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))',
                    transition: 'transform 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                  }}
                />
              </Box>
              
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '1.3rem', sm: '1.5rem', md: '1.8rem' },
                  background: 'linear-gradient(135deg, #1565c0 0%, #64b5f6 50%, #1976d2 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  mb: 2,
                  lineHeight: 1.2,
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
              >
                {Math.round(day.temp)}°
              </Typography>
              
              <Typography
                variant="body2"
                sx={{
                  color: '#424242',
                  fontSize: { xs: '0.75rem', sm: '0.85rem', md: '0.9rem' },
                  fontWeight: 600,
                  lineHeight: 1.4,
                  textAlign: 'center',
                  maxWidth: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  textTransform: 'capitalize',
                  letterSpacing: '0.3px',
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