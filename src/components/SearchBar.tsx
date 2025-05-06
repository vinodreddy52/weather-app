import { useState, useEffect } from 'react';
import { Autocomplete, TextField, Box, CircularProgress } from '@mui/material';
import { City, getCitySuggestions } from '../services/weatherService';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import debounce from 'lodash/debounce';

interface SearchBarProps {
  onSearch: (city: City) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSuggestions = debounce(async (input: string) => {
    if (input.length < 2) {
      setOptions([]);
      return;
    }

    setLoading(true);
    try {
      const suggestions = await getCitySuggestions(input);
      setOptions(suggestions);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setOptions([]);
    } finally {
      setLoading(false);
    }
  }, 300);

  useEffect(() => {
    fetchSuggestions(inputValue);
    return () => {
      fetchSuggestions.cancel();
    };
  }, [inputValue]);

  return (
    <Autocomplete
      id="city-search"
      options={options}
      getOptionLabel={(option) => option.fullName || ''}
      filterOptions={(x) => x} // Disable built-in filtering
      autoComplete
      includeInputInList
      filterSelectedOptions
      loading={loading}
      noOptionsText={inputValue.length < 2 ? "Type at least 2 characters" : "No cities found"}
      onChange={(_, newValue) => {
        if (newValue) {
          onSearch(newValue);
        }
      }}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search for a city..."
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '30px',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
              },
              '&.Mui-focused': {
                backgroundColor: '#ffffff',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              },
            },
          }}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <>
                <LocationOnIcon color="primary" sx={{ ml: 1, mr: -0.5 }} />
                {params.InputProps.startAdornment}
              </>
            ),
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          <LocationOnIcon sx={{ color: 'text.secondary', mr: 1 }} />
          {option.fullName}
        </Box>
      )}
    />
  );
};

export default SearchBar; 