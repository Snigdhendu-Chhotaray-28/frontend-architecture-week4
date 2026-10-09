import React, { useState } from 'react';
import { MapPin, RefreshCw, Sun, Moon, Wind, Droplets, Thermometer, Clock } from 'lucide-react';
import WeatherIcon from './WeatherIcon';
import { getWeatherInterpretation } from '../utils/weatherCodes';
import { formatTemperature } from '../utils/temperature';

export default function CurrentWeather({
  location,
  weather,
  unit,
  onRefresh,
  loading
}) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  if (!weather || !location) return null;

  const { current, timezone, lastUpdated } = weather;
  const interpretation = getWeatherInterpretation(current.weatherCode, current.isDay);

  const handleRefreshClick = async () => {
    setIsRefreshing(true);
    await onRefresh();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const formattedTemp = formatTemperature(current.temperature, unit);
  const formattedFeelsLike = formatTemperature(current.apparentTemperature, unit);

  return (
    <section className="current-weather-card" aria-label="Current Weather Overview">
      {/* Background ambient glow based on weather */}
      <div className="current-weather-glow"></div>

      <div className="current-weather-header">
        <div className="location-info">
          <div className="location-pill">
            <MapPin size={16} className="location-pin" />
            <h2 className="location-name">{location.name}</h2>
            {location.admin1 && <span className="location-region">{location.admin1},</span>}
            <span className="location-country">{location.country}</span>
          </div>
          <div className="timezone-badge" title={`Timezone: ${timezone}`}>
            <Clock size={12} />
            <span>{timezone || 'Auto'}</span>
          </div>
        </div>

        <div className="header-actions">
          <span className={`day-night-pill ${current.isDay ? 'is-day' : 'is-night'}`}>
            {current.isDay ? <Sun size={14} /> : <Moon size={14} />}
            <span>{current.isDay ? 'Daytime' : 'Night'}</span>
          </span>

          <button
            type="button"
            className={`refresh-btn ${isRefreshing || loading ? 'is-spinning' : ''}`}
            onClick={handleRefreshClick}
            disabled={loading || isRefreshing}
            title="Refresh current weather data"
            aria-label="Refresh weather data"
          >
            <RefreshCw size={16} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      <div className="current-weather-main">
        <div className="temp-display-group">
          <div className="temp-large">{formattedTemp}</div>
          <div className="condition-meta">
            <h3 className="condition-title">{interpretation.label}</h3>
            <p className="condition-desc">{interpretation.description}</p>
            <div className="feels-like-row">
              <Thermometer size={14} className="feels-icon" />
              <span>Feels like <strong>{formattedFeelsLike}</strong></span>
            </div>
          </div>
        </div>

        <div className="weather-icon-large-container">
          <WeatherIcon
            name={interpretation.iconName}
            size={96}
            className="weather-icon-hero"
          />
        </div>
      </div>

      {lastUpdated && (
        <div className="current-weather-footer">
          <span>Observed via Open-Meteo • Updated {new Date(lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      )}
    </section>
  );
}
