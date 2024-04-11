import axios, {Method} from 'axios';

// Base Axios instance
const api = axios.create({
    baseURL: 'http://backend.mfsl-game.ca',
    headers: {
        'Content-Type': 'application/json'
    },
});

export const makeAuthenticatedRequest = (
    method: Method,
    url: string,
    token: string | null = null, // Make token optional and default to null
    params?: any, // Added to support URL parameters
    data?: any
) => {
    const headers = token ? {Authorization: `Bearer ${token}`} : {};
    return api({
        method,
        url,
        headers,
        params, // Added to support passing URL parameters
        data,
    });
};