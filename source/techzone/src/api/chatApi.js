import httpClient from "./httpClient";

export const chatApi = {
  sendMessage: (payload) => httpClient.post("/chat/messages", payload),
};
