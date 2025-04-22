import axiosClient from './axiosClient'

const END_POINT = {
  LOGIN: 'Auth/login',
  REGISTER: 'Auth/register',
}

// Đăng nhập
export const loginAPI = async (loginData) => {
  try {
    const response = await axiosClient.post(END_POINT.LOGIN, loginData)
    return response
  } catch (err) {
    console.error('Login error:', err)
    throw err
  }
}

// Đăng ký
export const registerAPI = async (registerData) => {
  try {
    const response = await axiosClient.post(END_POINT.REGISTER, registerData)
    return response
  } catch (err) {
    console.error('Register error:', err)
    throw err
  }
}
