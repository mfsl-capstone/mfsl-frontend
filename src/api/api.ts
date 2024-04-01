import axios, {Method} from 'axios';
import config from './config/config';

// Base Axios instance
const api = axios.create({
    baseURL: config.apiUrl,
    headers: {
        'Content-Type': 'application/json',
        'Bypass-Tunnel-Reminder': 'true',
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
    console.log(process.env.NODE_ENV);
    return api({
        method,
        url,
        headers,
        params, // Added to support passing URL parameters
        data,
    });
};