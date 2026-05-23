import { chatApi } from "../api/chatApi";

function normalizeChatResponse(response) {
  const data = response?.data ?? response ?? {};
  return {
    text: data.text ?? data.reply ?? data.message ?? "",
    productIds: data.productIds ?? data.products ?? [],
  };
}

export const chatService = {
  async sendMessage(messages, message) {
    const response = await chatApi.sendMessage({ messages, message });
    return normalizeChatResponse(response);
  },
};
