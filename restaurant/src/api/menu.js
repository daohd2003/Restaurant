import axiosClient from './axiosClient';

const END_POINT = {
  MENU: 'menu',
};

export const getAllMenuItemsAPI = async () => {
  try {
    const response = await axiosClient.get(`${END_POINT.MENU}`);
    // Trả về toàn bộ response để xử lý linh hoạt ở component
    return response;
  } catch (err) {
    console.error('Error fetching menu items:', err);
    throw err; // Ném lỗi để component có thể bắt và xử lý
  }
};