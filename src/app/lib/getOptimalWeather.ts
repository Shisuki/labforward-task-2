import { WeatherDataLocation, WeatherResponse } from './getWeather';

interface OptimalWeather {
    date: Date;
    location: string;
    weatherData: WeatherResponse;
}

export const getOptimalWeather = (weathers: WeatherDataLocation[]): OptimalWeather | Record<string, never> => {
    const maxSunshine = Math.max.apply(
        null,
        weathers.map((weather) =>
            weather.data.reduce((max, data) => (max = max > data.sunshine ? max : data.sunshine), 0),
        ),
    );

    const minPrecipitation = Math.min.apply(
        null,
        weathers.map((weather) =>
            weather.data.reduce((min, data) => (min = min <= data.precipitation ? min : data.precipitation), 0),
        ),
    );

    return weathers.reduce((optimalWeather, weatherLocation) => {
        weatherLocation.data.forEach((data) => {
            if (
                data.wind_speed < 30.0 &&
                data.temperature > 20.0 &&
                data.temperature < 30.0 &&
                data.sunshine === maxSunshine &&
                data.precipitation === minPrecipitation
            )
                optimalWeather = { date: data.timestamp, location: weatherLocation.address, weatherData: data };
        });
        return optimalWeather;
    }, {} as OptimalWeather);
};
