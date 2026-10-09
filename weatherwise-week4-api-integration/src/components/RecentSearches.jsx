import React from 'react';
import { History, MapPin } from 'lucide-react';

export default function RecentSearches({
  recentSearches,
  currentLocation,
  onSelect
}) {
  if (!recentSearches || recentSearches.length === 0) {
    return null;
  }

  return (
    <div className="recent-searches-container" aria-label="Recent search history">
      <div className="recent-searches-label">
        <History size={14} />
        <span>Recent:</span>
      </div>
      <div className="recent-chips-list">
        {recentSearches.map((loc) => {
          const isActive =
            currentLocation &&
            currentLocation.name.toLowerCase() === loc.name.toLowerCase() &&
            currentLocation.country === loc.country;

          return (
            <button
              key={`${loc.name}-${loc.latitude}-${loc.longitude}`}
              type="button"
              className={`recent-chip ${isActive ? 'active' : ''}`}
              onClick={() => onSelect(loc)}
              title={`View weather for ${loc.name}, ${loc.country}`}
            >
              <MapPin size={12} className="chip-pin" />
              <span>{loc.name}</span>
              {loc.countryCode && (
                <span className="chip-country-code">{loc.countryCode}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
