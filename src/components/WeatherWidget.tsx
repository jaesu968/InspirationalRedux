import React, { useState } from "react";
import { getWeatherData } from "../features/weatherWidget/weatherWidgetAPI";
import "./WeatherWidget.css";

interface WeatherData {
  temperature: number;
  description: string;
  icon: string;
  cityName?: string;
}

export const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!navigator.geolocation) throw new Error("Geolocation not supported");

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const data = await getWeatherData(latitude, longitude);
            setWeather(data);
          } catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            setError(message);
          } finally {
            setLoading(false);
          }
        },
        async () => {
          // Fallback: use IP-based location
          try {
            const resp = await fetch("https://ipapi.co/json/");
            if (!resp.ok) throw new Error("IP lookup failed");
            const ipData = await resp.json();
            const lat = parseFloat(ipData.latitude ?? ipData.lat);
            const lon = parseFloat(ipData.longitude ?? ipData.lon);
            const data = await getWeatherData(lat, lon);
            setWeather(data);
          } catch {
            setError("Unable to determine location");
          } finally {
            setLoading(false);
          }
        }
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setLoading(false);
    }
  };

  return (
    <div className="weather-widget">
      {!weather && !loading && !error && (
        <button onClick={fetchWeather}>Show Local Weather</button>
      )}
      {loading && <p>Loading weather...</p>}
      {error && <p>Error: {error}</p>}
      {weather && (
        <>
          <h4>Weather</h4>
          <img src={weather.icon} alt={weather.description} />
          <p>{weather.cityName}</p>
          <p>{weather.temperature}°C</p>
          <p>{weather.description}</p>
          <button onClick={fetchWeather}>Refresh</button>
        </>
      )}
    </div>
  );
};
