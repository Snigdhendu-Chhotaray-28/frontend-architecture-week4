import React from 'react';
import {
  Droplets,
  Wind,
  CloudRain,
  Sun,
  Sunrise,
  Sunset,
  ShieldAlert,
  Compass
} from 'lucide-react';
import { formatWindSpeed, formatPrecipitation, getUVCategory } from '../utils/temperature';
import { formatSunTime } from '../utils/dateFormat';

export default function WeatherDetails({ weather, unit }) {
  if (!weather || !weather.current) return null;

  const { current, daily } = weather;
  const todayDaily = daily && daily.length > 0 ? daily[0] : null;

  const formattedWind = formatWindSpeed(current.windSpeed, unit);
  const formattedPrecip = formatPrecipitation(current.precipitation, unit);
  const uvCategory = getUVCategory(todayDaily?.uvIndexMax);

  const sunriseFormatted = todayDaily?.sunrise ? formatSunTime(todayDaily.sunrise) : '--:--';
  const sunsetFormatted = todayDaily?.sunset ? formatSunTime(todayDaily.sunset) : '--:--';

  return (
    <section className="weather-details-section" aria-label="Detailed Weather Metrics">
      <h3 className="section-title">Atmospheric Conditions</h3>

      <div className="details-grid">
        {/* Humidity Card */}
        <div className="detail-card">
          <div className="detail-card-header">
            <span className="detail-card-title">Humidity</span>
            <Droplets className="detail-icon icon-humidity" size={20} />
          </div>
          <div className="detail-value-main">
            {current.humidity !== undefined && current.humidity !== null ? `${current.humidity}%` : '--'}
          </div>
          <div className="detail-meter-bar">
            <div
              className="detail-meter-fill fill-humidity"
              style={{ width: `${Math.min(100, Math.max(0, current.humidity || 0))}%` }}
            ></div>
          </div>
          <p className="detail-hint">
            {current.humidity > 70 ? 'High humidity (humid)' : current.humidity < 30 ? 'Low humidity (dry air)' : 'Comfortable moisture level'}
          </p>
        </div>

        {/* Wind Speed Card */}
        <div className="detail-card">
          <div className="detail-card-header">
            <span className="detail-card-title">Wind Speed</span>
            <Wind className="detail-icon icon-wind" size={20} />
          </div>
          <div className="detail-value-main">{formattedWind}</div>
          <div className="detail-meter-bar">
            <div
              className="detail-meter-fill fill-wind"
              style={{ width: `${Math.min(100, (current.windSpeed / 50) * 100)}%` }}
            ></div>
          </div>
          <p className="detail-hint">
            {current.windSpeed > 30 ? 'Strong breeze' : current.windSpeed > 15 ? 'Moderate breeze' : 'Gentle breeze'}
          </p>
        </div>

        {/* Precipitation Card */}
        <div className="detail-card">
          <div className="detail-card-header">
            <span className="detail-card-title">Precipitation</span>
            <CloudRain className="detail-icon icon-rain" size={20} />
          </div>
          <div className="detail-value-main">{formattedPrecip}</div>
          <div className="detail-meter-bar">
            <div
              className="detail-meter-fill fill-rain"
              style={{ width: `${Math.min(100, (current.precipitation / 10) * 100)}%` }}
            ></div>
          </div>
          <p className="detail-hint">
            {current.precipitation > 0 ? 'Active precipitation recorded' : 'No rain reported'}
          </p>
        </div>

        {/* UV Index Card */}
        <div className="detail-card">
          <div className="detail-card-header">
            <span className="detail-card-title">Max UV Index</span>
            <Sun className="detail-icon icon-uv" size={20} />
          </div>
          <div className="detail-value-group">
            <span className="detail-value-main">
              {todayDaily?.uvIndexMax !== null && todayDaily?.uvIndexMax !== undefined
                ? todayDaily.uvIndexMax.toFixed(1)
                : '--'}
            </span>
            <span
              className="uv-risk-badge"
              style={{
                backgroundColor: `${uvCategory.badgeColor}22`,
                color: uvCategory.badgeColor,
                borderColor: uvCategory.badgeColor
              }}
            >
              {uvCategory.label}
            </span>
          </div>
          <div className="detail-meter-bar">
            <div
              className="detail-meter-fill fill-uv"
              style={{
                width: `${Math.min(100, ((todayDaily?.uvIndexMax || 0) / 12) * 100)}%`,
                backgroundColor: uvCategory.badgeColor
              }}
            ></div>
          </div>
          <p className="detail-hint">
            {todayDaily?.uvIndexMax >= 6 ? 'Sun protection required' : 'Low danger from UV'}
          </p>
        </div>

        {/* Sunrise & Sunset Card */}
        <div className="detail-card detail-card-span-2">
          <div className="detail-card-header">
            <span className="detail-card-title">Sun Schedule</span>
            <Compass className="detail-icon icon-sun" size={20} />
          </div>
          <div className="sun-schedule-grid">
            <div className="sun-schedule-item">
              <div className="sun-item-header">
                <Sunrise size={18} className="sunrise-icon" />
                <span>Sunrise</span>
              </div>
              <div className="sun-item-time">{sunriseFormatted}</div>
            </div>
            <div className="sun-schedule-divider"></div>
            <div className="sun-schedule-item">
              <div className="sun-item-header">
                <Sunset size={18} className="sunset-icon" />
                <span>Sunset</span>
              </div>
              <div className="sun-item-time">{sunsetFormatted}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
