import axios from 'axios';
import { API_PROXY_URL } from 'config/app'

export const searchBusinesses = async (location, latitude, longitude, radius, price, rating, term) => {
    try {
        const response = await axios.get(API_PROXY_URL, {
            params: {
                location: location || undefined,
                latitude: latitude || undefined,
                longitude: longitude || undefined,
                radius: radius || undefined,
                price: price || undefined,
                rating: rating || undefined,
                term: term || undefined,
                sort_by: 'rating',
                limit: 50,
                open_now: true,
            },
        });
        return response.data.businesses;
    } catch (error) {
        console.error('Error fetching data from Yelp API', error);
        throw error;
    }
}