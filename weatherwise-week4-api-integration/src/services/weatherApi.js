/**
 * Weather API Service
 * Handles all external HTTP requests to Open-Meteo Geocoding and Forecast APIs.
 * Implements strict response validation, error propagation, and request aborting.
 */

const GEOCODING_BASE_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST_BASE_URL = 'https://api.open-meteo.com/v1/forecast';

/**
 * Searches for matching cities using Open-Meteo Geocoding API.
 * 
 * @param {string} cityName - Name of the city to query
 * @param {AbortSignal} [signal] - Optional AbortController signal
 * @returns {Promise<Array<object>>} - List of matching locations
 */
export async function searchCities(cityName, signal) {
  const trimmed = cityName ? cityName.trim() : '';
  if (!trimmed) {
    return [];
  }

  const url = `${GEOCODING_BASE_URL}?name=${encodeURIComponent(trimmed)}&count=5&language=en&format=json`;

  try {
    const response = await fetch(url, { signal });

    if (!response.ok) {
      throw new Error(`Geocoding server error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.results || !Array.isArray(data.results) || data.results.length === 0) {
      return [];
    }

    return data.results.map((item) => ({
      id: `${item.id || item.latitude}_${item.longitude}`,
      name: item.name,
      latitude: item.latitude,
      longitude: item.longitude,
      country: item.country || '',
      countryCode: item.country_code || '',
      admin1: item.admin1 || '',
      timezone: item.timezone || 'auto'
    }));
  } catch (error) {
    if (error.name === 'AbortError') {
      throw error; // Re-throw abort errors to allow caller to handle cancellation
    }
    throw new Error(error.message || 'Failed to search cities. Please check your network connection.');
  }
}

/**
 * Fetches current weather, 24-hour hourly forecast, and 7-day daily forecast.
 * 
 * @param {number} latitude - Location latitude
 * @param {number} longitude - Location longitude
 * @param {string} [timezone='auto'] - Timezone identifier
 * @param {AbortSignal} [signal] - Optional AbortController signal
 * @returns {Promise<object>} - Cleaned weather data structure
 */
export async function fetchWeatherForecast(latitude, longitude, timezone = 'auto', signal) {
  if (latitude === undefined || longitude === undefined || latitude === null || longitude === null) {
    throw new Error('Valid geographic coordinates (latitude and longitude) are required.');
  }

  const queryParams = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m',
    hourly: 'temperature_2m,precipitation_probability,weather_code',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max',
    timezone: timezone || 'auto',
    forecast_days: '7'
  });

  const url = `${FORECAST_BASE_URL}?${queryParams.toString()}`;

  try {
    const response = await fetch(url, { signal });

    if (!response.ok) {
      if (response.status === 400) {
        throw new Error('Invalid coordinates provided to weather forecast service.');
      } else if (response.status >= 500) {
        throw new Error('Open-Meteo weather service is temporarily unavailable (Server Error).');
      } else {
        throw new Error(`Weather service responded with error status ${response.status}.`);
      }
    }

    const rawData = await response.json();

    if (!rawData.current || !rawData.daily || !rawData.hourly) {
      throw new Error('Received incomplete weather payload from the weather API.');
    }

    // Process and normalize response
    return transformWeatherData(rawData);
  } catch (error) {
    if (error.name === 'AbortError') {
      throw error;
    }
    throw new Error(error.message || 'Unable to retrieve forecast data. Please verify your internet connection.');
  }
}

/**
 * Normalizes raw Open-Meteo JSON into structured, UI-friendly data.
 * @param {object} raw - Raw API response
 * @returns {object}
 */
function transformWeatherData(raw) {
  const { current, daily, hourly, timezone, elevation } = raw;

  // 1. Current Weather
  const currentWeather = {
    time: current.time,
    temperature: current.temperature_2m,
    apparentTemperature: current.apparent_temperature,
    humidity: current.relative_humidity_2m,
    precipitation: current.precipitation,
    weatherCode: current.weather_code,
    windSpeed: current.wind_speed_10m,
    isDay: current.is_day
  };

  // 2. Filter Next 24 Hours (from current hour onwards)
  const currentIsoHour = current.time ? current.time.slice(0, 13) : '';
  let startIndex = 0;

  if (hourly.time && currentIsoHour) {
    const foundIndex = hourly.time.findIndex(t => t.startsWith(currentIsoHour));
    if (foundIndex !== -1) {
      startIndex = foundIndex;
    }
  }

  // Slice 24 items from startIndex
  const hourlyCount = Math.min(24, (hourly.time?.length || 0) - startIndex);
  const hourlyForecast = [];

  for (let i = 0; i < hourlyCount; i++) {
    const idx = startIndex + i;
    hourlyForecast.push({
      time: hourly.time[idx],
      temperature: hourly.temperature_2m[idx],
      precipitationProbability: hourly.precipitation_probability ? hourly.precipitation_probability[idx] : 0,
      weatherCode: hourly.weather_code[idx],
      isNow: i === 0
    });
  }

  // 3. Process 7-Day Forecast
  const dailyForecast = [];
  const daysCount = daily.time?.length || 0;

  for (let i = 0; i < daysCount; i++) {
    dailyForecast.push({
      date: daily.time[i],
      weatherCode: daily.weather_code[i],
      tempMax: daily.temperature_2m_max[i],
      tempMin: daily.temperature_2m_min[i],
      sunrise: daily.sunrise ? daily.sunrise[i] : null,
      sunset: daily.sunset ? daily.sunset[i] : null,
      uvIndexMax: daily.uv_index_max ? daily.uv_index_max[i] : null
    });
  }

  return {
    timezone,
    elevation,
    current: currentWeather,
    hourly: hourlyForecast,
    daily: dailyForecast,
    lastUpdated: new Date().toISOString()
  };
}
