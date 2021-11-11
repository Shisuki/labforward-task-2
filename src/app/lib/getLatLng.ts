import axios from 'axios';
import { BaseError } from './ErrorHandler';

export interface Location {
    address: string;
    lat: number;
    lng: number;
}

export const getLatLng = async (address: string): Promise<Location | undefined> => {
    const googleApiKey = process.env.GOOGLE_API_KEY;

    if (!googleApiKey) throw new Error('No GOOGLE_API_KEY provided');

    try {
        const { data } = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                address,
            )}&key=${googleApiKey}`,
        );

        const latLng = await data?.results[0]?.geometry?.location;
        if (!latLng) return undefined;

        return {
            address,
            ...latLng,
        };
    } catch (error) {
        throw new BaseError('Google GeoCoding Error', 422, (error as Error).message, true);
    }
};
