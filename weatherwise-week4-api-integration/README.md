# WeatherWise — Modern Real-Time Weather Dashboard
> **Week 4 ReactJS Internship Assignment:** API Integration and Data Handling

![WeatherWise Preview](screenshots/main_dashboard.png)

WeatherWise is a responsive weather dashboard application built with **React.js (v18)** and **Vite**, powered by the open-access **Open-Meteo Geocoding & Forecast APIs**. It showcases asynchronous data fetching, resilient error boundaries, real-time temperature conversion, 24-hour hourly trend exploration, and 7-day atmospheric projections wrapped in a glassmorphic UI.

---

## 🌟 Key Features

* 🔍 **Smart City Geocoding & Disambiguation**: Search global cities with automatic multi-match disambiguation (e.g., *Paris, France* vs *Paris, Texas, USA*).
* ⛅ **Current Atmospheric Conditions**: Live temperature, weather condition interpretation (WMO codes), apparent "feels-like" temperature, humidity, wind velocity, precipitation, and day/night detection.
* 🕒 **24-Hour Hourly Forecast**: Smooth horizontal scrollable timeline displaying hourly temperatures, weather icons, and precipitation probabilities.
* 📅 **7-Day Extended Forecast**: Daily projections with minimum/maximum temperature range visual bars, UV risk index ratings, and sunrise/sunset schedules.
* 🔄 **Instant Unit Conversion (°C / °F)**: Instant Celsius to Fahrenheit conversions without re-triggering network calls.
* 🕒 **Session-Based Search History**: Quick-access chip navigation for the 5 most recent unique location searches.
* ⚡ **Live Data Refresh**: One-click data synchronization with animated spinning feedback.
* 🛡️ **Robust Error & Loading States**: Shimmer skeleton loaders, input validation, and user-friendly error banners with retry mechanisms.

---

## 🛠️ Technology Stack

| Technology | Role | Purpose |
| :--- | :--- | :--- |
| **React 18** | Frontend Framework | Functional components, state management (`useState`), side-effects (`useEffect`), and custom hooks |
| **Vite 6** | Build Tool & Bundler | Ultra-fast HMR and optimized production bundling |
| **Vanilla CSS3** | Styling & Design System | Glassmorphism, CSS variables, CSS grid/flexbox, animations |
| **Lucide React** | Iconography | Weather condition icons, navigation indicators, status badges |
| **Open-Meteo APIs** | External Data Source | Free Geocoding and High-Resolution Forecast endpoints (no API key required) |

---

## 🌐 External API Endpoints

### 1. Geocoding Search Endpoint
```http
GET https://geocoding-api.open-meteo.com/v1/search?name={city}&count=5&language=en&format=json
```
* **Purpose**: Converts city name queries into geographic coordinates (latitude, longitude, timezone, country, administrative region).

### 2. Meteorological Forecast Endpoint
```http
GET https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,precipitation_probability,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&timezone={timezone}&forecast_days=7
```
* **Purpose**: Returns current conditions, next 24-hour hourly measurements, and 7-day daily summaries.

---

## 📁 Project Architecture

```
weatherwise-week4-api-integration/
├── index.html                  # HTML5 entry template with typography
├── package.json                # Project dependencies & scripts
├── vite.config.js              # Vite configuration
├── README.md                   # Project documentation
├── screenshots/                # Application verification screenshots
│   ├── main_dashboard.png
│   ├── search_success.png
│   ├── unit_toggle_fahrenheit.png
│   ├── city_disambiguation.png
│   ├── error_state.png
│   └── mobile_view.png
└── src/
    ├── main.jsx                # React DOM render entry point
    ├── App.jsx                 # Top-level application layout coordinator
    ├── index.css               # Core CSS design system & responsive styling
    ├── components/
    │   ├── Header.jsx          # Top navigation bar, brand title, and live time
    │   ├── SearchBar.jsx       # City search input & disambiguation dropdown
    │   ├── RecentSearches.jsx  # Recent search chips navigation
    │   ├── CurrentWeather.jsx  # Hero current condition showcase
    │   ├── WeatherDetails.jsx  # Atmospheric metric grid (Humidity, Wind, UV, Sun)
    │   ├── HourlyForecast.jsx  # 24-hour horizontal scrollable forecast
    │   ├── DailyForecast.jsx   # 7-day extended forecast with temp visualizer
    │   ├── UnitToggle.jsx      # Celsius / Fahrenheit toggle button
    │   ├── WeatherIcon.jsx     # Dynamic Lucide icon mapper
    │   ├── LoadingState.jsx    # Shimmer skeleton loader placeholders
    │   ├── ErrorMessage.jsx    # User-facing error notification banner
    │   └── EmptyState.jsx      # Welcome view with global destination suggestions
    ├── hooks/
    │   └── useWeather.js       # Custom React hook orchestrating weather state & API
    ├── services/
    │   └── weatherApi.js       # Asynchronous HTTP layer with AbortController
    └── utils/
        ├── weatherCodes.js     # WMO weather code interpreter & label mappings
        ├── temperature.js      # Metric/Imperial conversion math & UV categories
        └── dateFormat.js       # Timezone-aware date & time formatters
```

---

## 🚀 Getting Started Locally

### Prerequisites
* **Node.js**: v18.0.0 or higher
* **npm**: v9.0.0 or higher

### Installation & Run Steps

1. Navigate to the project directory:
   ```bash
   cd weatherwise-week4-api-integration
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. Build for production:
   ```bash
   npm run build
   ```

5. Preview production build:
   ```bash
   npm run preview
   ```

---

## 📸 Screenshots

| View | Screenshot |
| :--- | :--- |
| **Main Dashboard** | ![Main Dashboard](screenshots/main_dashboard.png) |
| **City Search & Weather** | ![City Search](screenshots/search_success.png) |
| **Fahrenheit Conversion** | ![Fahrenheit Toggle](screenshots/unit_toggle_fahrenheit.png) |
| **Disambiguation Dropdown**| ![City Disambiguation](screenshots/city_disambiguation.png) |
| **Error Handling** | ![Error Notice](screenshots/error_state.png) |
| **Mobile Responsiveness** | ![Mobile View](screenshots/mobile_view.png) |

---

## 🛡️ Error Handling & Data Resiliency

WeatherWise employs defensive programming across all data layers:
1. **Network Failure & Offline Handling**: Catches connection timeouts and network dropouts, rendering a friendly retry card.
2. **Invalid City Query Handling**: Gracefully informs the user when a query yields no matching locations.
3. **Empty Input Validation**: Trims input whitespace and blocks empty or 1-character queries before hitting the network.
4. **AbortController Request Cancellation**: Cancels in-flight HTTP requests when the user rapidly searches for a new city, preventing race conditions and stale response overwrites.
5. **Safe Data Normalization**: Protects against unexpected missing fields in API JSON payloads with fallback defaults.

---

## 📚 Internship Learning Outcomes

* Mastery of React functional components, `useState`, and `useEffect` lifecycle synchronization.
* Designing and implementing custom React hooks (`useWeather`) for clean separation of concerns.
* Asynchronous data fetching using `async/await`, `fetch`, and `AbortController`.
* Transforming complex third-party API data payloads into clean, domain-specific models.
* Building modern, accessible UI with CSS variables, Glassmorphism, and responsive breakpoints.
