import React, { useState, useRef, useEffect } from 'react';
import { Search, Loader2, X, MapPin, ChevronRight } from 'lucide-react';

export default function SearchBar({
  onSearch,
  searching,
  searchResults,
  onSelectResult,
  onClearResults
}) {
  const [inputValue, setInputValue] = useState('');
  const dropdownRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim() || searching) return;
    onSearch(inputValue);
  };

  const handleClear = () => {
    setInputValue('');
    if (onClearResults) onClearResults();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (onClearResults) onClearResults();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClearResults]);

  return (
    <div className="search-bar-wrapper" ref={dropdownRef}>
      <form onSubmit={handleSubmit} className="search-form" role="search">
        <div className="search-input-container">
          <Search className="search-icon" size={18} />
          <input
            id="city-search-input"
            type="text"
            className="search-input"
            placeholder="Search city (e.g., Tokyo, New York, London, Mumbai)..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={searching}
            autoComplete="off"
            aria-label="Search city name"
          />
          {inputValue && !searching && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={handleClear}
              title="Clear search"
              aria-label="Clear input text"
            >
              <X size={16} />
            </button>
          )}
          {searching && (
            <Loader2 className="search-spinner animate-spin" size={18} />
          )}
        </div>

        <button
          type="submit"
          className="search-submit-btn"
          disabled={searching || !inputValue.trim()}
          aria-label="Submit search"
        >
          <span>Search</span>
        </button>
      </form>

      {/* Disambiguation Dropdown for Multiple Matches */}
      {searchResults && searchResults.length > 1 && (
        <div className="search-dropdown" role="listbox" aria-label="Matching cities list">
          <div className="search-dropdown-header">
            <span>Multiple matches found — select your city:</span>
          </div>
          <div className="search-dropdown-list">
            {searchResults.map((loc) => (
              <button
                key={loc.id}
                type="button"
                className="search-dropdown-item"
                onClick={() => {
                  onSelectResult(loc);
                  setInputValue(`${loc.name}, ${loc.country}`);
                }}
              >
                <div className="item-icon-wrap">
                  <MapPin size={16} className="item-pin" />
                </div>
                <div className="item-details">
                  <div className="item-city-name">{loc.name}</div>
                  <div className="item-location-meta">
                    {loc.admin1 ? `${loc.admin1}, ` : ''}
                    {loc.country}
                  </div>
                </div>
                <ChevronRight size={16} className="item-arrow" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
