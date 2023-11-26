import axios from 'axios';

const API_PROXY_URL = process.env.REACT_APP_API_PROXY_SERVER_URL + '/api/businesses/search';

export const searchBusinesses = async (isGeolocationEnabled, location, latitude, longitude, radius, price, rating, term) => {
    // Only send the specific location-based input fields based on whether geolocation is enabled
    if (isGeolocationEnabled) {
        location = undefined;
    } else {
        latitude = undefined;
        longitude = undefined;
        radius = undefined;
    }

    // If isGeolocationEnabled is false and location is empty, return null
    if (!isGeolocationEnabled && !location) {
        return {
            error: true
        };
    }

    // When price is specified, get all values before it and turn it into a comma separated list
    const allPrices = ['1', '2', '3', '4'];
    const priceIndex = allPrices.indexOf(price);
    let priceRange = '1,2,3,4';
    if (priceIndex !== -1) {
        priceRange = allPrices.slice(0, priceIndex + 1).join(',');
    }

    // Try to fetch data from the Yelp API
    try {
        const response = await axios.get(API_PROXY_URL, {
            params: {
                location: location || undefined,
                latitude: latitude || undefined,
                longitude: longitude || undefined,
                radius: radius || undefined,
                price: priceRange || undefined,
                rating: rating || undefined,
                term: term || undefined,
                sort_by: 'rating',
                limit: 50,
                open_now: true,
            },
        });
        return response.data.businesses;
    } catch (error) {
        throw error;
    }
}