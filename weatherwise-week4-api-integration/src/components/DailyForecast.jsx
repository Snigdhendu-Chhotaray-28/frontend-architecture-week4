import React from 'react';
import { Calendar, Sun, ArrowUp, ArrowDown } from 'lucide-react';
import WeatherIcon from './WeatherIcon';
import { getWeatherInterpretation } from '../utils/weatherCodes';
import { formatTemperature, getUVCategory } from '../utils/temperature';
import { formatDailyDate } from '../utils/dateFormat';

export default function DailyForecast({ dailyData, unit }) {
  if (!dailyData || dailyData.length === 0) return null;

  // Calculate global min and max for relative temperature bar range
  const allMins = dailyData.map((d) => d.tempMin).filter((n) => typeof n === 'number');
  const allMaxs = dailyData.map((d) => d.tempMax).filter((n) => typeof n === 'number');
  const globalMin = allMins.length ? Math.min(...allMins) : 0;
  const globalMax = allMaxs.length ? Math.max(...allMaxs) : 40;
  const tempRangeSpan = Math.max(1, globalMax - globalMin);

  return (
    <section className="daily-forecast-section" aria-label="7-Day Extended Forecast">
      <div className="section-title-wrap">
        <Calendar size={18} className="section-title-icon" />
        <h3 className="section-title">7-Day Extended Forecast</h3>
      </div>

      <div className="daily-forecast-list">
        {dailyData.map((day, idx) => {
          const { dayName, formattedDate, isToday } = formatDailyDate(day.date, idx);
          const interpretation = getWeatherInterpretation(day.weatherCode, 1);
          const maxTemp = formatTemperature(day.tempMax, unit);
          const minTemp = formatTemperature(day.tempMin, unit);
          const uvCategory = getUVCategory(day.uvIndexMax);

          // Calculate percentage offsets for visual temperature bar
          const leftPercent = Math.max(0, ((day.tempMin - globalMin) / tempRangeSpan) * 100);
          const rightPercent = Math.max(
            0,
            ((globalMax - day.tempMax) / tempRangeSpan) * 100
          );

          return (
            <div
              key={day.date || idx}
              className={`daily-forecast-row ${isToday ? 'is-today-row' : ''}`}
            >
              {/* Day & Date */}
              <div className="daily-date-col">
                <span className="daily-day-name">{dayName}</span>
                <span className="daily-date-sub">{formattedDate}</span>
              </div>

              {/* Weather Condition Icon & Label */}
              <div className="daily-condition-col">
                <WeatherIcon
                  name={interpretation.iconName}
                  size={26}
                  className="daily-condition-icon"
                />
                <span className="daily-condition-text">{interpretation.label}</span>
              </div>

              {/* UV Badge */}
              <div className="daily-uv-col">
                {day.uvIndexMax !== null && day.uvIndexMax !== undefined && (
                  <span
                    className="daily-uv-pill"
                    style={{
                      backgroundColor: `${uvCategory.badgeColor}22`,
                      color: uvCategory.badgeColor,
                      borderColor: `${uvCategory.badgeColor}55`
                    }}
                    title={`UV Index: ${day.uvIndexMax.toFixed(1)} (${uvCategory.label})`}
                  >
                    UV {day.uvIndexMax.toFixed(0)}
                  </span>
                )}
              </div>

              {/* Min - Temperature Bar - Max */}
              <div className="daily-temp-range-col">
                <span className="temp-min-text">
                  <ArrowDown size={12} className="temp-arrow-down" />
                  {minTemp}
                </span>

                <div className="temp-visual-track">
                  <div
                    className="temp-visual-fill"
                    style={{
                      left: `${leftPercent}%`,
                      right: `${rightPercent}%`
                    }}
                  ></div>
                </div>

                <span className="temp-max-text">
                  <ArrowUp size={12} className="temp-arrow-up" />
                  {maxTemp}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
