// Connect to OpenWeather API using latitude and longitude
export const getWeatherData = async (latitude: number, longitude: number) => {
    try {
        const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
        if (!apiKey) throw new Error('Missing VITE_OPENWEATHER_API_KEY in environment');

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
        const response = await fetch(url);

        if (!response.ok) {
            console.error('API Error:', response.status, response.statusText);
            throw new Error(`Failed to fetch weather data: ${response.status}`);
        }

        const data = await response.json();
        return {
            cityName: data.name,
            temperature: data.main.temp,
            description: data.weather[0].description,
            icon: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
        };
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
};