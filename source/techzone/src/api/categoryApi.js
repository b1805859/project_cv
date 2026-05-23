import httpClient from './httpClient';

export const categoryApi = {
  /**
   * Fetch all categories (Public)
   * @returns {Promise<object>} ApiResponse with list of CategoryResponse
   */
  fetchCategories: () => httpClient.get('/categories'),

  /**
   * Create a new category (Admin only)
   * @param {object} categoryData { name, description, bgColor, imgUrl, icon }
   * @returns {Promise<object>} ApiResponse with created CategoryResponse
   */
  createCategory: (categoryData) => httpClient.post('/admin/categories', categoryData),

  /**
   * Delete a category by ID (Admin only)
   * @param {string} categoryId 
   * @returns {Promise<object>} ApiResponse with empty data
   */
  deleteCategory: (categoryId) => httpClient.delete(`/admin/categories/${categoryId}`),
};
