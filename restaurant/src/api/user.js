import axiosClient from './axiosClient'

const END_POINT = {
  PROFILE: 'User/profile',
};

export const getUserProfile = async () => {
  try {
    const response = await axiosClient.get(END_POINT.PROFILE);
    return response;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const updateProfile = async (profileData) => {
  try {
    const response = await axiosClient.put(END_POINT.PROFILE, profileData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};
