import React from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import RecentSearches from './components/RecentSearches';
import CurrentWeather from './components/CurrentWeather';
import WeatherDetails from './components/WeatherDetails';
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';
import LoadingState from './components/LoadingState';
import ErrorMessage from './components/ErrorMessage';
import EmptyState from './components/EmptyState';
import { useWeather } from './hooks/useWeather';

export default function App() {
  const {
    selectedLocation,
    weatherData,
    loading,
    searching,
    searchResults,
    error,
    unit,
    recentSearches,
    searchCity,
    selectLocation,
    refreshWeather,
    toggleUnit,
    clearError,
    clearSearchResults
  } = useWeather();

  return (
    <div className="app-layout">
      <Header unit={unit} onToggleUnit={toggleUnit} />

      <main className="main-content-container">
        {/* Top Control Section: Search & Recents */}
        <section className="search-section-wrapper">
          <SearchBar
            onSearch={searchCity}
            searching={searching}
            searchResults={searchResults}
            onSelectResult={selectLocation}
            onClearResults={clearSearchResults}
          />

          <RecentSearches
            recentSearches={recentSearches}
            currentLocation={selectedLocation}
            onSelect={selectLocation}
          />
        </section>

        {/* Global Error Banner if present */}
        {error && (
          <ErrorMessage
            message={error}
            onRetry={refreshWeather}
            onDismiss={clearError}
          />
        )}

        {/* Loading Indicator when initial or requested data is fetching */}
        {loading && !weatherData && (
          <LoadingState message="Fetching live meteorological data from Open-Meteo..." />
        )}

        {/* Main Weather Dashboard View */}
        {weatherData && (
          <div className={`dashboard-content ${loading ? 'is-reloading' : ''}`}>
            {/* Top Grid: Hero Current Weather & Details Cards */}
            <div className="dashboard-grid-top">
              <div className="hero-column">
                <CurrentWeather
                  location={selectedLocation}
                  weather={weatherData}
                  unit={unit}
                  onRefresh={refreshWeather}
                  loading={loading}
                />
              </div>

              <div className="details-column">
                <WeatherDetails
                  weather={weatherData}
                  unit={unit}
                />
              </div>
            </div>

            {/* Middle Section: 24-Hour Hourly Forecast */}
            <HourlyForecast
              hourlyData={weatherData.hourly}
              unit={unit}
            />

            {/* Bottom Section: 7-Day Daily Forecast */}
            <DailyForecast
              dailyData={weatherData.daily}
              unit={unit}
            />
          </div>
        )}

        {/* Empty / Welcome State if no location is selected and no data */}
        {!loading && !weatherData && !error && (
          <EmptyState onSelectCity={selectLocation} />
        )}
      </main>

      {/* Application Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <p>
            <strong>WeatherWise</strong> — Week 4 ReactJS Internship Project •{' '}
            <span className="api-credit">
              Weather Data by{' '}
              <a
                href="https://open-meteo.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                Open-Meteo
              </a>{' '}
              (Public Non-Commercial API)
            </span>
          </p>
          <p className="footer-subtext">
            Built with React 18, Vite, Lucide Icons, and Vanilla CSS3 Architecture.
          </p>
        </div>
      </footer>
    </div>
  );
}
