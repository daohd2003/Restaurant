import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_URL_API,
  timeout: 300000,
})

instance.interceptors.response.use(
    (response) => response.data,
    (error) => {
      console.log('error', error);
      return Promise.reject(error);
    }
  );

export default instance
