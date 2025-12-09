// this is a weather widget component 
// it will be placed in the upper right corner of the app
import React, { useEffect, useState } from 'react';
import { getWeatherData } from '../features/weatherWidget/weatherWidgetAPI';
import './WeatherWidget.css';

interface WeatherData {
    temperature: number;
    description: string;
    icon: string;
    cityName?: string;
}

export const WeatherWidget: React.FC = () => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition((position) => {
                        (async () => {
                            const { latitude, longitude } = position.coords;
                            const data = await getWeatherData(latitude, longitude);
                            setWeather(data);
                            setLoading(false);
                        })().catch((err) => {
                            const message = err instanceof Error ? err.message : String(err);
                            setError(message);
                            setLoading(false);
                        });
                    }, (geoError) => {
                        // If browser geolocation fails or is denied, try IP-based fallback
                        (async () => {
                            try {
                                const resp = await fetch('https://ipapi.co/json/');
                                if (!resp.ok) throw new Error('IP lookup failed');
                                const ipData = await resp.json();
                                const lat = parseFloat(ipData.latitude ?? ipData.lat ?? ipData.latitude);
                                const lon = parseFloat(ipData.longitude ?? ipData.lon ?? ipData.longitude);
                                if (Number.isFinite(lat) && Number.isFinite(lon)) {
                                    const data = await getWeatherData(lat, lon);
                                    setWeather(data);
                                } else {
                                    setError('Unable to determine location');
                                }
                            } catch (err) {
                                setError('Unable to get location');
                            } finally {
                                setLoading(false);
                            }
                        })();
                    });
                } else {
                    setError('Geolocation not supported');
                    setLoading(false);
                }
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : String(err);
                setError(errorMessage);
                setLoading(false);
            }
        };

        fetchWeather();
    }, []);

    if (loading) {
        return <div>Loading weather...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="weather-widget">
            {weather && (
                <>
                    <h4>Weather</h4>
                    <img src={weather.icon} alt={weather.description} />
                    <p>{weather.cityName}</p>
                    <p>{weather.temperature}°C</p>
                    <p>{weather.description}</p>
                </>
            )}
        </div>
    );
};