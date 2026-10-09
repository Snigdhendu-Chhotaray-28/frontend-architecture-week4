/**
 * Temperature and Unit Conversion Utilities
 * Handles Celsius to Fahrenheit conversions and metric to imperial unit formatting.
 */

/**
 * Converts Celsius to Fahrenheit
 * @param {number} celsius
 * @returns {number}
 */
export function celsiusToFahrenheit(celsius) {
  if (celsius === null || celsius === undefined || isNaN(celsius)) return null;
  return (celsius * 9) / 5 + 32;
}

/**
 * Converts value based on selected unit ('C' or 'F')
 * @param {number} celsius
 * @param {'C' | 'F'} unit
 * @returns {number|null}
 */
export function convertTemperature(celsius, unit = 'C') {
  if (celsius === null || celsius === undefined || isNaN(celsius)) return null;
  if (unit === 'F') {
    return Math.round(celsiusToFahrenheit(celsius));
  }
  return Math.round(celsius);
}

/**
 * Formats a temperature with the unit symbol (e.g. "24°C" or "75°F")
 * @param {number} celsius
 * @param {'C' | 'F'} unit
 * @returns {string}
 */
export function formatTemperature(celsius, unit = 'C') {
  const converted = convertTemperature(celsius, unit);
  if (converted === null) return '--°';
  return `${converted}°${unit}`;
}

/**
 * Formats wind speed based on unit system (km/h for C, mph for F)
 * @param {number} speedKmh - wind speed in km/h
 * @param {'C' | 'F'} unit
 * @returns {string}
 */
export function formatWindSpeed(speedKmh, unit = 'C') {
  if (speedKmh === null || speedKmh === undefined || isNaN(speedKmh)) return '--';
  if (unit === 'F') {
    const mph = speedKmh * 0.621371;
    return `${mph.toFixed(1)} mph`;
  }
  return `${speedKmh.toFixed(1)} km/h`;
}

/**
 * Formats precipitation based on unit system (mm for C, in for F)
 * @param {number} precipMm - precipitation in mm
 * @param {'C' | 'F'} unit
 * @returns {string}
 */
export function formatPrecipitation(precipMm, unit = 'C') {
  if (precipMm === null || precipMm === undefined || isNaN(precipMm)) return '0.0 mm';
  if (unit === 'F') {
    const inches = precipMm * 0.0393701;
    return `${inches.toFixed(2)} in`;
  }
  return `${precipMm.toFixed(1)} mm`;
}

/**
 * Returns UV Index Risk Level Category and Color
 * @param {number} uvIndex
 * @returns {{ label: string, colorClass: string, badgeColor: string }}
 */
export function getUVCategory(uvIndex) {
  if (uvIndex === null || uvIndex === undefined || isNaN(uvIndex)) {
    return { label: 'Unknown', colorClass: 'text-gray-400', badgeColor: '#94a3b8' };
  }
  if (uvIndex < 3) {
    return { label: 'Low', colorClass: 'text-emerald-400', badgeColor: '#10b981' };
  }
  if (uvIndex < 6) {
    return { label: 'Moderate', colorClass: 'text-yellow-400', badgeColor: '#f59e0b' };
  }
  if (uvIndex < 8) {
    return { label: 'High', colorClass: 'text-orange-400', badgeColor: '#f97316' };
  }
  if (uvIndex < 11) {
    return { label: 'Very High', colorClass: 'text-rose-500', badgeColor: '#ef4444' };
  }
  return { label: 'Extreme', colorClass: 'text-purple-500', badgeColor: '#a855f7' };
}
