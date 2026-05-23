import httpClient from './httpClient';

export const fileApi = {
  /**
   * Upload an image to Cloudinary via backend
   * @param {File} file The image file object from input type="file"
   * @returns {Promise<object>} ApiResponse containing fileUrl and fileName
   */
  uploadFile: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return httpClient.post('/files/upload', formData);
  },
};
