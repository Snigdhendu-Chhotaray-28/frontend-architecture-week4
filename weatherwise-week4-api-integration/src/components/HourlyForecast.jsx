import React, { useRef } from 'react';
import { Clock, ChevronLeft, ChevronRight, Droplet } from 'lucide-react';
import WeatherIcon from './WeatherIcon';
import { getWeatherInterpretation } from '../utils/weatherCodes';
import { formatTemperature } from '../utils/temperature';
import { formatHourlyTime } from '../utils/dateFormat';

export default function HourlyForecast({ hourlyData, unit }) {
  const scrollContainerRef = useRef(null);

  if (!hourlyData || hourlyData.length === 0) return null;

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -240 : 240;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="hourly-forecast-section" aria-label="24-Hour Forecast">
      <div className="section-header-row">
        <div className="section-title-wrap">
          <Clock size={18} className="section-title-icon" />
          <h3 className="section-title">Hourly Forecast</h3>
          <span className="section-subtitle">Next 24 hours</span>
        </div>

        <div className="hourly-scroll-controls">
          <button
            type="button"
            className="hourly-arrow-btn"
            onClick={() => handleScroll('left')}
            title="Scroll left"
            aria-label="Scroll left in hourly forecast"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            className="hourly-arrow-btn"
            onClick={() => handleScroll('right')}
            title="Scroll right"
            aria-label="Scroll right in hourly forecast"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="hourly-scroll-container" ref={scrollContainerRef}>
        {hourlyData.map((hour, idx) => {
          const timeLabel = formatHourlyTime(hour.time, hour.isNow);
          const interpretation = getWeatherInterpretation(hour.weatherCode, 1);
          const tempFormatted = formatTemperature(hour.temperature, unit);

          return (
            <div
              key={hour.time || idx}
              className={`hourly-card ${hour.isNow ? 'is-current-hour' : ''}`}
            >
              <div className="hourly-time-tag">
                {timeLabel}
              </div>

              <div className="hourly-icon-wrap" title={interpretation.label}>
                <WeatherIcon
                  name={interpretation.iconName}
                  size={32}
                  className="hourly-icon"
                />
              </div>

              <div className="hourly-temp">{tempFormatted}</div>

              {hour.precipitationProbability !== undefined && (
                <div
                  className={`hourly-precip-badge ${hour.precipitationProbability > 20 ? 'has-rain' : ''}`}
                  title={`Precipitation probability: ${hour.precipitationProbability}%`}
                >
                  <Droplet size={11} />
                  <span>{hour.precipitationProbability}%</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
