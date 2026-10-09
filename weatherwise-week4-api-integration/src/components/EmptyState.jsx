import React from 'react';
import { Compass, Sparkles, MapPin } from 'lucide-react';

const SUGGESTED_CITIES = [
  { name: 'Tokyo', country: 'Japan', latitude: 35.6895, longitude: 139.6917, timezone: 'Asia/Tokyo' },
  { name: 'Paris', country: 'France', latitude: 48.8566, longitude: 2.3522, timezone: 'Europe/Paris' },
  { name: 'New York', country: 'United States', latitude: 40.7128, longitude: -74.006, timezone: 'America/New_York' },
  { name: 'Sydney', country: 'Australia', latitude: -33.8688, longitude: 151.2093, timezone: 'Australia/Sydney' },
  { name: 'Mumbai', country: 'India', latitude: 19.076, longitude: 72.8777, timezone: 'Asia/Kolkata' }
];

export default function EmptyState({ onSelectCity }) {
  return (
    <div className="empty-state-card">
      <div className="empty-icon-halo">
        <Compass size={40} className="empty-icon" />
      </div>
      <h3 className="empty-title">Explore Global Atmospheric Conditions</h3>
      <p className="empty-subtitle">
        Search any city above or pick one of our highlighted global destinations to get started.
      </p>

      <div className="suggested-cities-grid">
        {SUGGESTED_CITIES.map((city) => (
          <button
            key={city.name}
            type="button"
            className="suggested-city-btn"
            onClick={() => onSelectCity(city)}
          >
            <MapPin size={14} className="suggested-pin" />
            <span className="suggested-city-name">{city.name}</span>
            <span className="suggested-city-country">{city.country}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
