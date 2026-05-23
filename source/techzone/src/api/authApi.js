import httpClient from './httpClient';

export const authApi = {
  /**
   * Send login credentials to Backend
   * @param {string} email 
   * @param {string} password 
   * @returns {Promise<object>} ApiResponse with AuthResponse details
   */
  login: (email, password) => {
    return httpClient.post('/auth/login', { email, password });
  },

  /**
   * Public user registration endpoint
   * @param {object} userData { name, email, password, phone, avatar }
   * @returns {Promise<object>} ApiResponse with UserResponse details
   */
  register: (userData) => {
    return httpClient.post('/auth/register', userData);
  }
};
