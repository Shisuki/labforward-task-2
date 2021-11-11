import axios from 'axios';
import { HttpStatusCodes } from '.';
import { BaseError } from './ErrorHandler';

export interface WeatherResponse {
    timestamp: Date;
    wind_speed: number;
    temperature: number;
    sunshine: number;
    precipitation: number;
}

export interface WeatherDataLocation {
    data: WeatherResponse[];
    address: string;
}

export const getWeather = async (
    address: string,
    lat: number,
    lng: number,
    dateFrom: Date,
    dateTo: Date,
): Promise<WeatherDataLocation | undefined> => {
    try {
        const { data } = await axios.get(
            `https://api.brightsky.dev/weather?date=${dateFrom.toISOString()}&last_date=${dateTo.toISOString()}&lat=${lat}&lon=${lng}`,
        );

        const weatherData = data?.weather as WeatherResponse[] | undefined;

        if (!weatherData) return undefined;

        const weatherDataLocation = {
            data: weatherData,
            address,
        };

        return weatherDataLocation;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error(error);
        if (error.response.status === HttpStatusCodes.NOT_FOUND) return undefined;

        throw new BaseError('BrightSky Error', 422, error.message, true);
    }
};
