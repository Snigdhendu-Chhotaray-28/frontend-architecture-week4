import React from 'react';
import { CloudSun, Sparkles, Activity } from 'lucide-react';
import UnitToggle from './UnitToggle';
import { getCurrentFormattedDateTime } from '../utils/dateFormat';

export default function Header({ unit, onToggleUnit }) {
  const dateString = getCurrentFormattedDateTime();

  return (
    <header className="app-header">
      <div className="header-container">
        <div className="brand-section">
          <div className="logo-badge">
            <CloudSun className="logo-icon" size={28} />
          </div>
          <div className="brand-text">
            <div className="brand-title-row">
              <h1 className="brand-title">WeatherWise</h1>
              <span className="version-pill">
                <Sparkles size={12} />
                <span>Live API</span>
              </span>
            </div>
            <p className="brand-subtitle">
              Real-time atmospheric insights powered by Open-Meteo
            </p>
          </div>
        </div>

        <div className="header-controls">
          <div className="header-status-pill" title="Live Open-Meteo connection active">
            <span className="status-dot"></span>
            <span className="status-text">{dateString}</span>
          </div>

          <UnitToggle unit={unit} onToggle={onToggleUnit} />
        </div>
      </div>
    </header>
  );
}
