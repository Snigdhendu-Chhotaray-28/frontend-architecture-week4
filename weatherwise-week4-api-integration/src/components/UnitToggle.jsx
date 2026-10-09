import React from 'react';

export default function UnitToggle({ unit, onToggle }) {
  return (
    <div className="unit-toggle-group" role="group" aria-label="Temperature unit selector">
      <button
        type="button"
        className={`unit-toggle-btn ${unit === 'C' ? 'active' : ''}`}
        onClick={() => onToggle('C')}
        aria-pressed={unit === 'C'}
        title="Display temperatures in Celsius (°C)"
      >
        °C
      </button>
      <button
        type="button"
        className={`unit-toggle-btn ${unit === 'F' ? 'active' : ''}`}
        onClick={() => onToggle('F')}
        aria-pressed={unit === 'F'}
        title="Display temperatures in Fahrenheit (°F)"
      >
        °F
      </button>
    </div>
  );
}
