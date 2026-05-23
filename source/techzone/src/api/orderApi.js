import httpClient from './httpClient';

export const orderApi = {
  /**
   * Place a new order (Checkout)
   * @param {object} orderData OrderRequest schema
   * @returns {Promise<object>} ApiResponse with OrderResponse details
   */
  placeOrder: (orderData) => httpClient.post('/orders', orderData),

  /**
   * Retrieve details of a specific order
   * @param {string} orderId 
   * @returns {Promise<object>} ApiResponse with OrderResponse details
   */
  getOrderDetails: (orderId) => httpClient.get(`/orders/${orderId}`),

  /**
   * Fetch all orders (Admin only)
   * @returns {Promise<object>} ApiResponse with list of OrderResponse
   */
  fetchAllOrders: () => httpClient.get('/admin/orders'),

  /**
   * Update the status of an order (Admin only)
   * @param {string} orderId 
   * @param {string} status PENDING, PAID, SHIPPING, COMPLETED, CANCELLED
   * @returns {Promise<object>} ApiResponse with updated OrderResponse details
   */
  updateOrderStatus: (orderId, status) => {
    return httpClient.put(`/admin/orders/${orderId}/status`, { status });
  },
};
