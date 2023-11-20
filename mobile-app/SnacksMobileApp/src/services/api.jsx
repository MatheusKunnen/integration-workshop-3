import axios from 'axios';

const api = axios.create({
    baseURL: 'https://snacks-mkunnen.vitalsoftware.com.py/',
});

export default api;