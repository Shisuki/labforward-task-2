import { Request, Response, NextFunction } from 'express';
import PartyPlanPayload from '../Payloads/PartyPlanPayload';
import { Api400Error, Api404Error } from '../../lib/ErrorHandler';
import { getLatLng, Location } from '../../lib/getLatLng';
import { getWeather, WeatherDataLocation } from '../../lib/getWeather';
import { getOptimalWeather } from '../../lib/getOptimalWeather';

export class PartyPlanController {
    public static get = async (req: Request, res: Response, next: NextFunction) => {
        const { from, to, locations } = req.query as unknown as PartyPlanPayload.shape;

        if (from >= to) return next(new Api400Error(`"From" date should be earlier than "To" date.`));

        const locationsLatLng = (await Promise.all(locations.map((location) => getLatLng(location)))).filter(
            (elem) => elem !== undefined,
        ) as Location[];

        const weathers = (
            await Promise.all(locationsLatLng.map(({ address, lat, lng }) => getWeather(address, lat, lng, from, to)))
        )
            .filter((elem) => elem !== undefined)
            .flat() as WeatherDataLocation[];

        const { date, location, weatherData } = getOptimalWeather(weathers);

        if (!weatherData) return next(new Api404Error('Could not find any optimal date withing the dateRange'));

        return res.status(200).json({ date, location });
    };
}
