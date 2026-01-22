import axios from 'axios';

// Backend URL definition
const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
});

// Request Interceptor: Token ko har request ke header mein attach karta hai
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); 
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor: Global error logging ke liye
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.message || error.message;
        console.error('API Error:', message);
        return Promise.reject(error);
    }
);

// --- API Functions ---

// 1. Fetching Data
export const fetchEvents = async () => (await api.get('/events')).data;
export const fetchInternships = async () => (await api.get('/internships')).data;

// 2. Creating Data (Manual)
export const createEvent = async (data) => (await api.post('/events', data)).data;
export const createInternship = async (data) => (await api.post('/internships', data)).data;

// 3. Updating Data (Edit)
export const updateEvent = async (id, data) => (await api.put(`/events/${id}`, data)).data;
export const updateInternship = async (id, data) => (await api.put(`/internships/${id}`, data)).data;

// 4. Deleting Data
export const deleteEvent = async (id) => (await api.delete(`/events/${id}`)).data;
export const deleteInternship = async (id) => (await api.delete(`/internships/${id}`)).data;

// 5. Gemini AI Auto-Fetch Function (Naya Code)
export const triggerAutoFetch = async (rawText) => {
    try {
        // Hum 'api' (axios) use kar rahe hain taaki auth headers apne aap chale jayein
        const response = await api.post('/jobs/auto-fetch', { rawText });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default api;