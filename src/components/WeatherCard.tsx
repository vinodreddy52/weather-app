import { Card, CardContent, Typography, Box, Divider, useTheme, useMediaQuery } from '@mui/material';
import { WeatherData } from '../types/weather';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import OpacityIcon from '@mui/icons-material/Opacity';
import AirIcon from '@mui/icons-material/Air';
import CompressIcon from '@mui/icons-material/Compress';

interface WeatherCardProps {
  data: WeatherData;
}

const WeatherCard = ({ data }: WeatherCardProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card
      sx={{
        borderRadius: 4,
        background: 'linear-gradient(to bottom right, rgba(255,255,255,0.9), rgba(255,255,255,0.8))',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Typography
          variant="h5"
          component="div"
          sx={{
            fontWeight: 600,
            color: '#1565c0',
            textAlign: 'center',
            mb: 2,
            fontSize: { xs: '1.5rem', sm: '2rem' },
          }}
        >
          {data.name}, {data.sys.country}
        </Typography>
        
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 4,
            position: 'relative',
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: { xs: 'column', sm: 'row' },
            }}
          >
            <img
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
              alt={data.weather[0].description}
              style={{
                width: isMobile ? 100 : 150,
                height: isMobile ? 100 : 150,
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
              }}
            />
            <Typography
              variant="h2"
              component="div"
              sx={{
                fontWeight: 600,
                background: 'linear-gradient(45deg, #1565c0, #64b5f6)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                ml: { xs: 0, sm: 2 },
                fontSize: { xs: '3rem', sm: '4rem' },
              }}
            >
              {Math.round(data.main.temp)}°
            </Typography>
          </Box>
        </Box>

        <Typography
          variant="h6"
          align="center"
          sx={{
            color: 'text.secondary',
            mb: 3,
            textTransform: 'capitalize',
            fontWeight: 500,
            fontSize: { xs: '1rem', sm: '1.25rem' },
          }}
        >
          {data.weather[0].description}
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' },
          gap: { xs: 1.5, sm: 2 }
        }}>
          <Box sx={{ textAlign: 'center' }}>
            <ThermostatIcon color="primary" sx={{ fontSize: { xs: 24, sm: 30 }, mb: 1 }} />
            <Typography variant="body2" color="text.secondary">
              Feels Like
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
              {Math.round(data.main.feels_like)}°C
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <OpacityIcon color="primary" sx={{ fontSize: { xs: 24, sm: 30 }, mb: 1 }} />
            <Typography variant="body2" color="text.secondary">
              Humidity
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
              {data.main.humidity}%
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <AirIcon color="primary" sx={{ fontSize: { xs: 24, sm: 30 }, mb: 1 }} />
            <Typography variant="body2" color="text.secondary">
              Wind Speed
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
              {data.wind.speed} m/s
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <CompressIcon color="primary" sx={{ fontSize: { xs: 24, sm: 30 }, mb: 1 }} />
            <Typography variant="body2" color="text.secondary">
              Pressure
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
              {data.main.pressure} hPa
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default WeatherCard; 