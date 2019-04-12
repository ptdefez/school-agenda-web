import axios from 'axios';

const http = axios.create({
    baseURL: 'http://localhost:3001',
    withCredentials: true
});
http.interceptors.response.use(
    response => response,
    error => {
      console.error(error);
      if (error.status === 403) {
        window.location = '/login';
      } else {
        return Promise.reject(error);
      }
    }
  )

export default http;