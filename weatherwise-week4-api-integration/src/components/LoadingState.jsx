import React from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingState({ message = 'Fetching real-time meteorological data...' }) {
  return (
    <div className="loading-state-wrapper" role="status" aria-live="polite">
      <div className="loading-spinner-banner">
        <Loader2 className="loading-spinner animate-spin" size={24} />
        <span>{message}</span>
      </div>

      {/* Hero Skeleton */}
      <div className="skeleton-card skeleton-hero">
        <div className="skeleton-line skeleton-title"></div>
        <div className="skeleton-hero-body">
          <div className="skeleton-line skeleton-temp"></div>
          <div className="skeleton-circle skeleton-icon-placeholder"></div>
        </div>
      </div>

      {/* Metrics Grid Skeleton */}
      <div className="skeleton-grid">
        <div className="skeleton-card skeleton-metric"></div>
        <div className="skeleton-card skeleton-metric"></div>
        <div className="skeleton-card skeleton-metric"></div>
        <div className="skeleton-card skeleton-metric"></div>
      </div>

      {/* Hourly Skeleton */}
      <div className="skeleton-card skeleton-hourly">
        <div className="skeleton-line skeleton-heading"></div>
        <div className="skeleton-row">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="skeleton-hourly-chip"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
