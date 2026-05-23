package com.hius.erms.service;

import com.hius.erms.io.ChatMessageRequest;
import com.hius.erms.io.ChatMessageResponse;

public interface ChatService {
    ChatMessageResponse sendMessage(ChatMessageRequest request);
}

