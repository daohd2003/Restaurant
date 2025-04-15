import axiosClient from './axiosClient';

const END_POINT = {
  CATEGORY: "category",
  CATEGORY_WITH_ITEMS: "category/with-menuitems"
};

export const getCategoryAPI = () => {
  return axiosClient.get(`${END_POINT.CATEGORY}`);
};

export const delCategoryAPI = (id) => {
  return axiosClient.delete(`${END_POINT.CATEGORY}/${id}`);
};

export const addCategoryAPI = (data) => {
  return axiosClient.post(`${END_POINT.CATEGORY}`, data);
};

export const editCategoryAPI = (data) => {
  return axiosClient.put(`${END_POINT.CATEGORY}`, data);
};

export const getCategoryWithMenuItemsAPI = () => {
  return axiosClient.get(`${END_POINT.CATEGORY_WITH_ITEMS}`);
};
