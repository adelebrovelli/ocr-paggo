import axios from 'axios';

const API_URL = 'http://localhost:3000'; 

export async function login(email, password) {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error;
    } else {
      throw new Error('Network or unexpected error');
    }
  }
}


export async function register(name, email, password) {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, { name, email, password });
    return response.data;
  } catch (error) {
    console.error('Register Error:', error.response ? error.response.data : error.message);
    throw error.response?.data?.message || 'Registration failed';
  }
}

