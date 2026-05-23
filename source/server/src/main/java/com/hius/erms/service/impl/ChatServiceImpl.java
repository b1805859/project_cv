package com.hius.erms.service.impl;

import com.hius.erms.io.ChatMessageRequest;
import com.hius.erms.io.ChatMessageResponse;
import com.hius.erms.entity.ItemEntity;
import com.hius.erms.repository.ItemRepository;
import com.hius.erms.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {

    private final ItemRepository itemRepository;

    @Override
    public ChatMessageResponse sendMessage(ChatMessageRequest request) {
        String userMessage = request == null ? null : request.getMessage();
        String msg = userMessage == null ? "" : userMessage.trim();

        // Fallback "AI pending" logic: keyword match products
        String normalized = msg.toLowerCase(Locale.ROOT);

        List<String> keywords = extractKeywords(normalized);
        List<ItemEntity> candidates = itemRepository.findAll();

        // If no keyword match, still provide some products so FE can render a PRODUCT_LIST
        if (keywords.isEmpty() && !candidates.isEmpty()) {
            return ChatMessageResponse.builder()
                    .text("Mình có thể gợi ý sản phẩm phù hợp. Bạn muốn xem theo nhu cầu nào (gaming/ học tập/ quay chụp/ lưu trữ)?")
                    .productIds(candidates.stream().limit(4).map(ItemEntity::getItemId).toList())
                    .build();
        }

        List<String> productIds = candidates.stream()
                .filter(it -> matches(it, keywords, normalized))
                .limit(4)
                .map(it -> it.getItemId())
                .collect(Collectors.toList());

        String replyText = buildReplyText(msg, productIds.size());

        // FE expects productIds to be a list of itemId strings
        return ChatMessageResponse.builder()
                .text(replyText)
                .productIds(productIds)
                .build();
    }

    private boolean matches(ItemEntity it, List<String> keywords, String normalized) {
        if (it == null) return false;
        String name = safeLower(it.getName());
        String brand = safeLower(it.getBrand());
        String specs = safeLower(it.getSpecs());

        for (String k : keywords) {
            if (k.isBlank()) continue;
            if (name.contains(k) || brand.contains(k) || specs.contains(k)) {
                return true;
            }
        }
        // lightweight brand/name match
        return normalized.length() > 2 && (name.contains(normalized) || brand.contains(normalized));
    }

    private List<String> extractKeywords(String normalized) {
        if (normalized.isBlank()) return Collections.emptyList();
        // simple tokenization
        String[] tokens = normalized
                .replaceAll("[^a-z0-9\s]", " ")
                .split("\\s+");
        return Arrays.stream(tokens)
                .filter(t -> t.length() >= 3)
                .distinct()
                .toList();
    }

    private String buildReplyText(String msg, int matchedCount) {
        if (matchedCount > 0) {
            return "Mình đã tìm thấy vài sản phẩm phù hợp cho yêu cầu của bạn: \"" + msg + "\". Bạn có muốn xem chi tiết thêm không?";
        }
        return "Mình có thể gợi ý sản phẩm phù hợp. Bạn cho mình biết nhu cầu chính (gaming/ học tập/ quay chụp/ lưu trữ) và ngân sách khoảng bao nhiêu?";
    }

    private String safeLower(Object v) {
        if (v == null) return "";
        return String.valueOf(v).toLowerCase(Locale.ROOT);
    }
}

