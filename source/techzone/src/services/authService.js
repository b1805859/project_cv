import { authApi } from '../api/authApi';

export const authService = {
  /**
   * Handle login, persist JWT token and user info locally
   * @param {string} email 
   * @param {string} password 
   * @returns {Promise<object>} Persisted user session data
   */
  async handleLogin(email, password) {
    const response = await authApi.login(email, password);
    const { token, role, email: userEmail } = response.data;
    
    localStorage.setItem('accessToken', token);
    const userSession = {
      email: userEmail,
      role: role,
      name: userEmail.split('@')[0], // Extract default name
    };
    localStorage.setItem('currentUser', JSON.stringify(userSession));
    
    return userSession;
  },

  /**
   * Handle user signup, registering via the new public auth register endpoint
   * @param {object} userData { name, email, password, phone, avatar }
   * @returns {Promise<object>} Created user response details
   */
  async handleRegister(userData) {
    const response = await authApi.register(userData);
    return response.data;
  },

  /**
   * Clear local session token and user info
   */
  handleLogout() {
    // notify server to clear refresh cookie (best-effort)
    try {
      authApi.logout().catch(() => {});
    } catch (e) {}
    localStorage.removeItem('accessToken');
    localStorage.removeItem('currentUser');
  },

  /**
   * Fetch current session info
   * @returns {object|null}
   */
  getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  },

  /**
   * Check if user is authenticated
   * @returns {boolean}
   */
  isAuthenticated() {
    return !!localStorage.getItem('accessToken');
  },

  /**
   * Check if currently logged in user has ADMIN role
   * @returns {boolean}
   */
  isAdmin() {
    const user = this.getCurrentUser();
    return user && user.role === 'ADMIN';
  }
};
