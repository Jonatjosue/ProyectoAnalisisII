// src/axiosConfig.js
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // Asegúrate de tener react-router-dom instalado

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8081/api', // Cambia esto a tu URL base
});

// Interceptor de solicitud
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Obtén el token del localStorage
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor de respuesta
axiosInstance.interceptors.response.use(
    (response) => {
        // Verifica si el encabezado X-Logout indica que el usuario debe ser deslogueado
        if (response.headers['x-logout'] === 'true') {
            // Elimina el token del localStorage
            localStorage.removeItem('token');
            // Redirige al usuario a la página de login (asumiendo que estás usando React Router)
            window.location.href = '/login'; // O usa useHistory() para redireccionar
        }
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
