import httpClient from './httpClient';

export const paymentApi = {
  /**
   * Request the MoMo gateway integration to generate a dynamic payment link
   * @param {string} orderId 
   * @param {number} amount 
   * @returns {Promise<object>} MomoCreateResponse containing payUrl
   */
  createMomoPayment: (orderId, amount) => {
    return httpClient.post('/momo/create', null, {
      params: { orderId, amount }
    });
  }
};
