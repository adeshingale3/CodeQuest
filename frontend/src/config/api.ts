export const API_BASE_URL = 'http://localhost:8000';

export const API_ENDPOINTS = {
    LOGIN: '/api/token/',  // Changed back to match Django's JWT endpoint
    REGISTER: '/api/auth/register/',
    PROFILE: '/api/auth/profile/',
    REFRESH_TOKEN: '/api/token/refresh/',
};