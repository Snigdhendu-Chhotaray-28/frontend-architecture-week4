/**
 * Custom Hook: useWeather
 * Encapsulates all state, side-effects, API calls, and history management for WeatherWise.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { searchCities, fetchWeatherForecast } from '../services/weatherApi';

const DEFAULT_LOCATION = {
  name: 'London',
  country: 'United Kingdom',
  admin1: 'England',
  latitude: 51.5085,
  longitude: -0.1257,
  timezone: 'Europe/London'
};

const STORAGE_KEY_RECENT = 'weatherwise_recent_searches';

export function useWeather(initialLocation = DEFAULT_LOCATION) {
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('C'); // 'C' | 'F'
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY_RECENT);
      return saved ? JSON.parse(saved) : [DEFAULT_LOCATION];
    } catch {
      return [DEFAULT_LOCATION];
    }
  });

  // Reference for in-flight requests to cancel obsolete calls
  const abortControllerRef = useRef(null);

  /**
   * Adds a location to recent searches list (max 5 items, no duplicates)
   */
  const addToRecentSearches = useCallback((location) => {
    if (!location || !location.name) return;

    setRecentSearches((prev) => {
      // Filter out duplicate by coordinates or exact name/country
      const filtered = prev.filter(
        (item) =>
          !(
            (item.latitude === location.latitude && item.longitude === location.longitude) ||
            (item.name.toLowerCase() === location.name.toLowerCase() && item.country === location.country)
          )
      );
      const updated = [location, ...filtered].slice(0, 5);
      try {
        sessionStorage.setItem(STORAGE_KEY_RECENT, JSON.stringify(updated));
      } catch (e) {
        console.warn('Unable to persist recent searches to sessionStorage', e);
      }
      return updated;
    });
  }, []);

  /**
   * Fetches weather forecast for a given location.
   */
  const loadWeatherForLocation = useCallback(
    async (location, isSilentRefresh = false) => {
      if (!location || location.latitude === undefined || location.longitude === undefined) {
        setError('Invalid location coordinates.');
        return;
      }

      // Cancel any ongoing fetch
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      if (!isSilentRefresh) {
        setLoading(true);
      }
      setError(null);

      try {
        const data = await fetchWeatherForecast(
          location.latitude,
          location.longitude,
          location.timezone || 'auto',
          abortControllerRef.current.signal
        );

        setWeatherData(data);
        setSelectedLocation(location);
        addToRecentSearches(location);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'An unexpected error occurred while fetching weather data.');
        }
      } finally {
        setLoading(false);
      }
    },
    [addToRecentSearches]
  );

  /**
   * Executes a city search and handles result sets.
   */
  const handleSearchCity = useCallback(
    async (query) => {
      const trimmed = query ? query.trim() : '';
      if (!trimmed) {
        setError('Please enter a city name to search.');
        return;
      }

      if (trimmed.length < 2) {
        setError('City name must be at least 2 characters long.');
        return;
      }

      setSearching(true);
      setError(null);
      setSearchResults([]);

      try {
        const results = await searchCities(trimmed);

        if (results.length === 0) {
          setError(`No locations found matching "${trimmed}". Please verify the spelling.`);
          setSearchResults([]);
        } else if (results.length === 1) {
          // Exactly one match - directly load it
          setSearchResults([]);
          await loadWeatherForLocation(results[0]);
        } else {
          // Multiple matches - show dropdown options for user disambiguation
          // Also pre-load the top result for immediate responsiveness
          setSearchResults(results);
          await loadWeatherForLocation(results[0]);
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Unable to complete city search. Please try again.');
        }
      } finally {
        setSearching(false);
      }
    },
    [loadWeatherForLocation]
  );

  /**
   * Selects a location from dropdown or recent searches
   */
  const handleSelectLocation = useCallback(
    (location) => {
      setSearchResults([]);
      loadWeatherForLocation(location);
    },
    [loadWeatherForLocation]
  );

  /**
   * Refreshes the currently active location
   */
  const handleRefresh = useCallback(() => {
    if (selectedLocation) {
      loadWeatherForLocation(selectedLocation);
    }
  }, [selectedLocation, loadWeatherForLocation]);

  /**
   * Toggles temperature unit between Celsius and Fahrenheit
   */
  const toggleUnit = useCallback((newUnit) => {
    if (newUnit) {
      setUnit(newUnit);
    } else {
      setUnit((prev) => (prev === 'C' ? 'F' : 'C'));
    }
  }, []);

  /**
   * Dismiss/Clear error notification
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Initial effect to load default city weather
   */
  useEffect(() => {
    if (initialLocation) {
      loadWeatherForLocation(initialLocation);
    }

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []); // Run once on mount

  return {
    selectedLocation,
    weatherData,
    loading,
    searching,
    searchResults,
    error,
    unit,
    recentSearches,
    searchCity: handleSearchCity,
    selectLocation: handleSelectLocation,
    refreshWeather: handleRefresh,
    toggleUnit,
    clearError,
    clearSearchResults: () => setSearchResults([])
  };
}
