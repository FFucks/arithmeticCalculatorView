
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8081'
});

api.interceptors.request.use((config) => {
    const authentication = localStorage.getItem('Authorization');
    if (authentication) {
        config.headers.Authorization = authentication;
    }
    const userBalance = localStorage.getItem('userBalance');
    if (userBalance) {
        config.headers.userBalance = userBalance;
    }
    const userId = localStorage.getItem('userId');
    if (userId) {
        config.headers.userId = userId;
    }
    return config;
});

export default api;
