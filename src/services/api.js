import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/auth';

export const signUp = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Sign up failed.');
  }
};

export const signIn = async (data) => {
  try {
    const { email, password } = data;
    const response = await axios.get(`${API_BASE_URL}/login`, {
      params: { email, password }, // Pass email and password as query parameters
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Sign in failed.');
  }
};
