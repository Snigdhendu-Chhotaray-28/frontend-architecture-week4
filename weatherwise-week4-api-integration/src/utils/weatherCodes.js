/**
 * Weather Code Interpretation Utility
 * Maps WMO (World Meteorological Organization) weather interpretation codes
 * provided by Open-Meteo into clear, descriptive labels and Lucide icon keys.
 */

export const WEATHER_CODE_MAP = {
  0: {
    label: 'Clear Sky',
    dayIcon: 'Sun',
    nightIcon: 'Moon',
    description: 'Cloud development not observed or not seen.',
    gradient: 'from-amber-400 to-orange-500'
  },
  1: {
    label: 'Mainly Clear',
    dayIcon: 'SunMedium',
    nightIcon: 'Moon',
    description: 'Mainly clear sky with few clouds.',
    gradient: 'from-blue-400 to-amber-300'
  },
  2: {
    label: 'Partly Cloudy',
    dayIcon: 'CloudSun',
    nightIcon: 'CloudMoon',
    description: 'Partly cloudy sky with intermittent sunlight.',
    gradient: 'from-sky-400 to-indigo-400'
  },
  3: {
    label: 'Overcast',
    dayIcon: 'Cloud',
    nightIcon: 'Cloud',
    description: 'Sky completely covered by clouds.',
    gradient: 'from-slate-400 to-gray-600'
  },
  45: {
    label: 'Fog',
    dayIcon: 'CloudFog',
    nightIcon: 'CloudFog',
    description: 'Fog with restricted visibility.',
    gradient: 'from-slate-300 to-slate-500'
  },
  48: {
    label: 'Depositing Rime Fog',
    dayIcon: 'CloudFog',
    nightIcon: 'CloudFog',
    description: 'Fog depositing rime crystals.',
    gradient: 'from-slate-400 to-zinc-600'
  },
  51: {
    label: 'Light Drizzle',
    dayIcon: 'CloudDrizzle',
    nightIcon: 'CloudDrizzle',
    description: 'Light, continuous liquid precipitation.',
    gradient: 'from-cyan-400 to-blue-500'
  },
  53: {
    label: 'Moderate Drizzle',
    dayIcon: 'CloudDrizzle',
    nightIcon: 'CloudDrizzle',
    description: 'Moderate drizzle drops.',
    gradient: 'from-blue-400 to-cyan-600'
  },
  55: {
    label: 'Dense Drizzle',
    dayIcon: 'CloudDrizzle',
    nightIcon: 'CloudDrizzle',
    description: 'Dense, steady drizzle.',
    gradient: 'from-blue-500 to-indigo-600'
  },
  56: {
    label: 'Light Freezing Drizzle',
    dayIcon: 'CloudHail',
    nightIcon: 'CloudHail',
    description: 'Freezing drizzle, slight.',
    gradient: 'from-cyan-300 to-blue-400'
  },
  57: {
    label: 'Dense Freezing Drizzle',
    dayIcon: 'CloudHail',
    nightIcon: 'CloudHail',
    description: 'Freezing drizzle, dense.',
    gradient: 'from-cyan-400 to-sky-600'
  },
  61: {
    label: 'Slight Rain',
    dayIcon: 'CloudRain',
    nightIcon: 'CloudRain',
    description: 'Light continuous rain.',
    gradient: 'from-sky-400 to-blue-600'
  },
  63: {
    label: 'Moderate Rain',
    dayIcon: 'CloudRain',
    nightIcon: 'CloudRain',
    description: 'Moderate continuous rain.',
    gradient: 'from-blue-500 to-indigo-600'
  },
  65: {
    label: 'Heavy Rain',
    dayIcon: 'CloudRainWind',
    nightIcon: 'CloudRainWind',
    description: 'Heavy continuous rain.',
    gradient: 'from-blue-600 to-indigo-800'
  },
  66: {
    label: 'Light Freezing Rain',
    dayIcon: 'CloudHail',
    nightIcon: 'CloudHail',
    description: 'Freezing rain, slight.',
    gradient: 'from-cyan-400 to-blue-500'
  },
  67: {
    label: 'Heavy Freezing Rain',
    dayIcon: 'CloudHail',
    nightIcon: 'CloudHail',
    description: 'Freezing rain, heavy.',
    gradient: 'from-cyan-500 to-blue-700'
  },
  71: {
    label: 'Slight Snow Fall',
    dayIcon: 'CloudSnow',
    nightIcon: 'CloudSnow',
    description: 'Slight intermittent snowfall.',
    gradient: 'from-blue-100 to-sky-300'
  },
  73: {
    label: 'Moderate Snow Fall',
    dayIcon: 'CloudSnow',
    nightIcon: 'CloudSnow',
    description: 'Moderate continuous snowfall.',
    gradient: 'from-blue-200 to-sky-400'
  },
  75: {
    label: 'Heavy Snow Fall',
    dayIcon: 'Snowflake',
    nightIcon: 'Snowflake',
    description: 'Heavy continuous snowfall.',
    gradient: 'from-sky-200 to-indigo-400'
  },
  77: {
    label: 'Snow Grains',
    dayIcon: 'Snowflake',
    nightIcon: 'Snowflake',
    description: 'Snow grains falling.',
    gradient: 'from-blue-200 to-indigo-300'
  },
  80: {
    label: 'Slight Rain Showers',
    dayIcon: 'CloudSunRain',
    nightIcon: 'CloudMoonRain',
    description: 'Intermittent slight rain showers.',
    gradient: 'from-cyan-400 to-blue-500'
  },
  81: {
    label: 'Moderate Rain Showers',
    dayIcon: 'CloudRain',
    nightIcon: 'CloudRain',
    description: 'Intermittent moderate rain showers.',
    gradient: 'from-blue-400 to-indigo-600'
  },
  82: {
    label: 'Violent Rain Showers',
    dayIcon: 'CloudRainWind',
    nightIcon: 'CloudRainWind',
    description: 'Violent downpour and rain showers.',
    gradient: 'from-blue-600 to-slate-800'
  },
  85: {
    label: 'Slight Snow Showers',
    dayIcon: 'CloudSnow',
    nightIcon: 'CloudSnow',
    description: 'Slight snow showers.',
    gradient: 'from-blue-200 to-sky-400'
  },
  86: {
    label: 'Heavy Snow Showers',
    dayIcon: 'Snowflake',
    nightIcon: 'Snowflake',
    description: 'Heavy snow showers.',
    gradient: 'from-sky-300 to-indigo-500'
  },
  95: {
    label: 'Thunderstorm',
    dayIcon: 'CloudLightning',
    nightIcon: 'CloudLightning',
    description: 'Thunderstorm with slight or moderate rain.',
    gradient: 'from-amber-600 to-indigo-900'
  },
  96: {
    label: 'Thunderstorm with Slight Hail',
    dayIcon: 'CloudLightning',
    nightIcon: 'CloudLightning',
    description: 'Thunderstorm accompanied by slight hail.',
    gradient: 'from-amber-500 to-purple-900'
  },
  99: {
    label: 'Thunderstorm with Heavy Hail',
    dayIcon: 'CloudLightning',
    nightIcon: 'CloudLightning',
    description: 'Severe thunderstorm with heavy hail.',
    gradient: 'from-red-600 to-slate-900'
  }
};

/**
 * Returns descriptive info for a given WMO weather code.
 * @param {number} code - WMO weather code
 * @param {number|boolean} isDay - 1 for day, 0 for night (default: 1)
 * @returns {object} Object with label, iconName, description, and gradient
 */
export function getWeatherInterpretation(code, isDay = 1) {
  const isDaytime = isDay === 1 || isDay === true;
  const match = WEATHER_CODE_MAP[code];

  if (!match) {
    return {
      code,
      label: 'Partly Cloudy',
      iconName: isDaytime ? 'CloudSun' : 'CloudMoon',
      description: 'Typical mixed sky conditions.',
      gradient: 'from-sky-400 to-indigo-500'
    };
  }

  return {
    code,
    label: match.label,
    iconName: isDaytime ? match.dayIcon : match.nightIcon,
    description: match.description,
    gradient: match.gradient
  };
}
