/**
 * Date and Time Formatting Utilities
 * Formats timestamps for hourly, daily, and sun cycle displays with timezone consideration.
 */

/**
 * Formats an ISO date string into a friendly day string (e.g., "Today", "Tomorrow", "Wed, Oct 14")
 * @param {string} isoDate - 'YYYY-MM-DD'
 * @param {number} index - Index in the forecast array (0 is today)
 * @returns {{ dayName: string, formattedDate: string, isToday: boolean }}
 */
export function formatDailyDate(isoDate, index = -1) {
  if (!isoDate) return { dayName: '--', formattedDate: '--', isToday: false };

  try {
    // Parse date parts manually to avoid UTC offset shifts
    const [year, month, day] = isoDate.split('-').map(Number);
    const dateObj = new Date(year, month - 1, day);

    const isToday = index === 0;
    const isTomorrow = index === 1;

    const weekdayShort = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
    const weekdayFull = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
    const monthDay = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    let label = weekdayShort;
    if (isToday) label = 'Today';
    else if (isTomorrow) label = 'Tomorrow';

    return {
      dayName: label,
      weekdayFull,
      formattedDate: monthDay,
      isToday
    };
  } catch (err) {
    return { dayName: isoDate, formattedDate: isoDate, isToday: false };
  }
}

/**
 * Formats an ISO hourly timestamp (e.g. "2026-10-09T14:00") to "2 PM" or "14:00"
 * @param {string} isoDateTime
 * @param {boolean} isFirst - True if this represents the current/starting hour
 * @returns {string}
 */
export function formatHourlyTime(isoDateTime, isFirst = false) {
  if (!isoDateTime) return '--';
  if (isFirst) return 'Now';

  try {
    const dateObj = new Date(isoDateTime);
    return dateObj.toLocaleTimeString('en-US', {
      hour: 'numeric',
      hour12: true
    });
  } catch (e) {
    const timePart = isoDateTime.split('T')[1];
    return timePart || isoDateTime;
  }
}

/**
 * Formats sunrise/sunset ISO strings (e.g. "2026-10-09T06:15") to "6:15 AM"
 * @param {string} isoDateTime
 * @returns {string}
 */
export function formatSunTime(isoDateTime) {
  if (!isoDateTime) return '--:--';
  try {
    const dateObj = new Date(isoDateTime);
    return dateObj.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  } catch (e) {
    return isoDateTime;
  }
}

/**
 * Formats current local time string for the header / status
 * @returns {string}
 */
export function getCurrentFormattedDateTime() {
  const now = new Date();
  return now.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
