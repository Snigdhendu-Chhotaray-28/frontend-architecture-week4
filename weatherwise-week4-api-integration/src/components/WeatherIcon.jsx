import React from 'react';
import {
  Sun,
  SunMedium,
  Moon,
  CloudSun,
  CloudMoon,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudRainWind,
  CloudHail,
  CloudSnow,
  Snowflake,
  CloudSunRain,
  CloudMoonRain,
  CloudLightning,
  HelpCircle
} from 'lucide-react';

const ICON_MAP = {
  Sun,
  SunMedium,
  Moon,
  CloudSun,
  CloudMoon,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudRainWind,
  CloudHail,
  CloudSnow,
  Snowflake,
  CloudSunRain,
  CloudMoonRain,
  CloudLightning
};

export default function WeatherIcon({ name, size = 24, className = '', color }) {
  const IconComponent = ICON_MAP[name] || Cloud;

  return (
    <IconComponent
      size={size}
      className={`weather-icon ${className}`}
      color={color}
      strokeWidth={2}
    />
  );
}
