package com.hius.erms.controller;

import com.hius.erms.io.ApiResponse;
import com.hius.erms.io.ChatMessageRequest;
import com.hius.erms.io.ChatMessageResponse;
import com.hius.erms.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/chat")
public class ChatController {

    private final ChatService chatService;

    @PostMapping("/messages")
    public ApiResponse<ChatMessageResponse> sendMessage(@RequestBody ChatMessageRequest request) {
        return ApiResponse.<ChatMessageResponse>builder()
                .message("Chat message processed")
                .data(chatService.sendMessage(request))
                .build();
    }
}

