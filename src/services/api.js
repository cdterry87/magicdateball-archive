// api.js

import axios from 'axios';

const apiKey = 'pS8i0UyHrqi2_XVhRP50ojrIL1s6-77sJ-uqICyY4sfm60lpoXPZ-_whyZroNzTTdqNZSwwx4RdnCoUb_N0M1eQrLwM4REhaXbECEPQhs2SzijJvDjcbSzQgIdSnXXYx';
const apiUrl = 'https://magicdateball.vercel.app:3001/api/businesses/search';       // Prod endpoint
// const apiUrl = 'http://localhost:3001/api/businesses/search';       // Proxy endpoint
// const apiUrl = 'https://api.yelp.com/v3/businesses/search';      // Direct endpoint

const headers = {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
};

export const searchBusinesses = async (location, price, radius, rating, term) => {
    try {
        const response = await axios.get(apiUrl, {
            headers,
            params: {
                location,
                price,
                radius,
                rating,
                term,
                sort_by: 'rating',
                limit: 25,
                open_now: true,
            },
        });
        return response.data.businesses;
    } catch (error) {
        console.error('Error fetching data from Yelp API', error);
        throw error;
    }
};

export default {
    searchBusinesses,
};
