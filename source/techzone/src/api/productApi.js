import httpClient from './httpClient';

export const productApi = {
  /**
   * Fetch all items with optional search parameters
   * @param {object} params { keyword, categoryId, brand }
   * @returns {Promise<object>} ApiResponse with list of ItemResponse
   */
  fetchItems: (params) => {
    return httpClient.get('/items', { params });
  },

  /**
   * Fetch detailed product specifications by ID
   * @param {string} itemId 
   * @returns {Promise<object>} ApiResponse with ItemResponse details
   */
  getItemById: (itemId) => httpClient.get(`/items/${itemId}`),

  /**
   * Create a new product (Admin only)
   * @param {object} productData 
   * @returns {Promise<object>} ApiResponse with created ItemResponse
   */
  createProduct: (productData) => httpClient.post('/admin/items', productData),

  /**
   * Update an existing product (Admin only)
   * @param {string} itemId 
   * @param {object} productData 
   * @returns {Promise<object>} ApiResponse with updated ItemResponse
   */
  updateProduct: (itemId, productData) => httpClient.put(`/admin/items/${itemId}`, productData),

  /**
   * Delete a product by ID (Admin only)
   * @param {string} itemId 
   * @returns {Promise<object>} ApiResponse with empty data
   */
  deleteProduct: (itemId) => httpClient.delete(`/admin/items/${itemId}`),
};
