import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
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

// Fetching Data
export const fetchEvents = async () => (await api.get('/events')).data;
export const fetchInternships = async () => (await api.get('/internships')).data;

// Creating Data
export const createEvent = async (data) => (await api.post('/events', data)).data;
export const createInternship = async (data) => (await api.post('/internships', data)).data;

// Updating Data (Edit)
export const updateEvent = async (id, data) => (await api.put(`/events/${id}`, data)).data;
export const updateInternship = async (id, data) => (await api.put(`/internships/${id}`, data)).data;

// Deleting Data
export const deleteEvent = async (id) => (await api.delete(`/events/${id}`)).data;
export const deleteInternship = async (id) => (await api.delete(`/internships/${id}`)).data;

export default api;