import axiosClient from './axiosClient';

const END_POINT = {
  LOGIN: 'Auth/login',
  REGISTER: 'Auth/register',
  REFRESH_TOKEN: 'Auth/refresh-token',
  LOGOUT: 'Auth/logout',
};

// Authentication APIs
export const authAPI = {
  // Đăng nhập
  login: async (loginData) => {
    try {
      const response = await axiosClient.post(END_POINT.LOGIN, {
        email: loginData.email,
        password: loginData.password,
        deviceId: navigator.userAgent || 'web-unknown',
      });

      // Lưu tokens vào localStorage
      localStorage.setItem('accessToken', response.token.accessToken);
      localStorage.setItem('refreshToken', response.token.refreshToken);

      return {
        success: true,
        data: response.token,
      };
    } catch (err) {
      return handleApiError(err);
    }
  },

  // Đăng ký
  register: async (registerData) => {
    try {
      const response = await axiosClient.post(END_POINT.REGISTER, registerData);
      return {
        success: true,
        data: response.token,
      };
    } catch (err) {
      return handleApiError(err);
    }
  },

  // Làm mới token
  refreshToken: async (refreshData) => {
    try {
      const response = await axiosClient.post(END_POINT.REFRESH_TOKEN, {
        accessToken: refreshData.accessToken,
        refreshToken: refreshData.refreshToken,
      });

      return {
        success: true,
        data: response.token,
      };
    } catch (err) {
      return handleApiError(err);
    }
  },

  // Đăng xuất
  logout: async () => {
    try {
      await axiosClient.post(END_POINT.LOGOUT);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      return { success: true };
    } catch (err) {
      return handleApiError(err);
    }
  },
};

// Xử lý lỗi API
const handleApiError = (err) => {
  // Lỗi từ validation trong hàm login
  if (err.message.includes('Server returned') || err.message.includes('Authentication failed')) {
    return {
      success: false,
      error: 'Please check your credentials and try again' // Trả về string thay vì object
    };
  }

  // Lỗi network
  if (err.code === 'ERR_NETWORK') {
    return {
      success: false,
      error: 'Cannot connect to server. Check your internet connection.' // String
    };
  }

  // Lỗi từ server (4xx, 5xx)
  if (err.response) {
    const serverResponse = err.response.data || {};
    return {
      success: false,
      error: serverResponse.message || serverResponse.title || `Server error (${err.response.status})` // String
    };
  }

  // Lỗi không xác định
  return {
    success: false,
    error: err.message || 'Unknown error occurred' // String
  };
};