import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_URL_API,
  timeout: 300000,
})

// Thiếu interceptor để thêm token vào header
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

instance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.log('error', error);
    return Promise.reject(error);
  }
);

export default instance