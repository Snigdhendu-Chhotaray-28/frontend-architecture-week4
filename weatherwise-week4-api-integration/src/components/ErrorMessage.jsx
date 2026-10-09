import React from 'react';
import { AlertCircle, RefreshCw, X } from 'lucide-react';

export default function ErrorMessage({ message, onRetry, onDismiss }) {
  if (!message) return null;

  return (
    <div className="error-banner-card" role="alert">
      <div className="error-banner-icon-wrap">
        <AlertCircle size={22} className="error-icon" />
      </div>

      <div className="error-banner-content">
        <h4 className="error-banner-title">Data Retrieval Notice</h4>
        <p className="error-banner-message">{message}</p>
      </div>

      <div className="error-banner-actions">
        {onRetry && (
          <button
            type="button"
            className="error-retry-btn"
            onClick={onRetry}
            aria-label="Retry weather request"
          >
            <RefreshCw size={14} />
            <span>Retry</span>
          </button>
        )}

        {onDismiss && (
          <button
            type="button"
            className="error-dismiss-btn"
            onClick={onDismiss}
            aria-label="Dismiss error notice"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
