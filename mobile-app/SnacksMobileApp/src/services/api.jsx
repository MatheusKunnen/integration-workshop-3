import axios from 'axios';

const api = axios.create({
    baseURL: 'https://snacks.mkunnen.dynv6.net/',
});

export default api;