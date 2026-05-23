package com.hius.erms.config;

import com.hius.erms.entity.CategoryEntity;
import com.hius.erms.entity.ItemEntity;
import com.hius.erms.entity.UserEntity;
import com.hius.erms.repository.CategoryRepository;
import com.hius.erms.repository.ItemRepository;
import com.hius.erms.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class DataInitializer {

    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final ItemRepository itemRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    public CommandLineRunner initData() {
        return args -> {
            // 1. Initialize Admin Account
            String adminEmail = "admin@techzone.vn";
            if (!userRepository.existsByEmail(adminEmail)) {
                log.info("Initializing default Admin account...");
                UserEntity admin = UserEntity.builder()
                        .userId(UUID.randomUUID().toString())
                        .email(adminEmail)
                        .name("Admin TechZone")
                        .password(passwordEncoder.encode("admin123"))
                        .phone("0123456789")
                        .avatar("")
                        .role("ADMIN")
                        .build();
                userRepository.save(admin);
                log.info(
                        "Admin account successfully initialized: email={}, password=admin123",
                        adminEmail);
            }

            // 2. Initialize Categories
            Map<Integer, CategoryEntity> categoryMap = new HashMap<>();
            if (categoryRepository.count() == 0) {
                log.info("Initializing mock e-commerce Categories...");

                Object[][] categoriesMock = {
                        {1, "Laptop", "💻", "rgba(0, 212, 255, 0.15)"},
                        {2, "PC Gaming", "🖥️", "rgba(255, 107, 53, 0.12)"},
                        {3, "Tai nghe", "🎧", "rgba(123, 47, 247, 0.15)"},
                        {4, "Bàn phím", "⌨️", "rgba(0, 230, 118, 0.12)"},
                        {5, "Camera", "📷", "rgba(255, 211, 42, 0.12)"},
                        {6, "Ổ cứng", "💾", "rgba(255, 107, 53, 0.12)"},
                        {7, "Sạc dự phòng", "🔋", "rgba(123, 47, 247, 0.15)"},
                        {8, "Màn hình", "🖥", "rgba(0, 212, 255, 0.15)"}
                };

                for (Object[] cat : categoriesMock) {
                    Integer id = (Integer) cat[0];
                    String name = (String) cat[1];
                    String icon = (String) cat[2];
                    String bgColor = (String) cat[3];

                    CategoryEntity category = CategoryEntity.builder()
                            .categoryId("CAT-" + id)
                            .name(name)
                            .icon(icon)
                            .bgColor(bgColor)
                            .description(
                                    name + " high quality e-commerce category")
                            .imgUrl("")
                            .build();

                    CategoryEntity savedCat = categoryRepository.save(category);
                    categoryMap.put(id, savedCat);
                }
                log.info("Successfully initialized 8 standard categories.");
            } else {
                // Populate the local map from existing DB records
                categoryRepository.findAll().forEach(cat -> {
                    if (cat.getCategoryId().startsWith("CAT-")) {
                        try {
                            int id = Integer.parseInt(
                                    cat.getCategoryId().substring(4));
                            categoryMap.put(id, cat);
                        } catch (NumberFormatException e) {
                            // ignore if not parsing
                        }
                    }
                });
            }

            // 3. Initialize Products (Items)
            if (itemRepository.count() == 0 && !categoryMap.isEmpty()) {
                log.info("Initializing mock e-commerce Products (Items)...");

                // Product details matching mockData.js with high quality stock images from Unsplash
                Object[][] productsMock = {
                        {
                                1, "MacBook Pro M3 14\"", 1, 42990000.0, 49990000.0, 4.9, 234, "💻", 1203, 15, "Apple",
                                "{\"CPU\":\"Apple M3 Pro\",\"RAM\":\"18GB\",\"Storage\":\"512GB SSD\",\"Display\":\"14\\\" Liquid Retina XDR\",\"Battery\":\"17 giờ\"}",
                                "MacBook Pro M3 mang lại hiệu suất đỉnh cao với chip Apple M3 Pro, màn hình Liquid Retina XDR sắc nét và thời lượng pin lên đến 17 giờ.",
                                true, false, "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500"
                        },
                        {
                                2, "ASUS ROG Zephyrus G16", 1, 38500000.0, 45000000.0, 4.8, 187, "🎮", 892, 8, "ASUS",
                                "{\"CPU\":\"Intel Core Ultra 9\",\"RAM\":\"32GB DDR5\",\"Storage\":\"1TB SSD\",\"Display\":\"16\\\" 240Hz QHD\",\"Battery\":\"13 giờ\"}",
                                "Laptop gaming mỏng nhẹ với màn hình 240Hz QHD, chip Intel Core Ultra 9 mạnh mẽ cho trải nghiệm gaming đỉnh cao.",
                                false, true, "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500"
                        },
                        {
                                3, "Sony WH-1000XM5", 3, 8990000.0, 10990000.0, 4.9, 412, "🎧", 3421, 52, "Sony",
                                "{\"Driver\":\"30mm\",\"Frequency\":\"4Hz–40kHz\",\"ANC\":\"Có\",\"Battery\":\"30 giờ\",\"Connectivity\":\"Bluetooth 5.2\"}",
                                "Tai nghe chống ồn hàng đầu với 8 microphone, pin 30 giờ và chất lượng âm thanh Hi-Res Audio chuẩn Sony.",
                                false, true, "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
                        },
                        {
                                4, "Keychron Q1 Pro", 4, 3490000.0, 3990000.0, 4.7, 298, "⌨️", 2100, 40, "Keychron",
                                "{\"Layout\":\"75%\",\"Switch\":\"Gateron Jupiter Red\",\"Body\":\"Nhôm CNC\",\"Connection\":\"Wireless/Wired\",\"RGB\":\"Có\"}",
                                "Bàn phím cơ không dây cao cấp với thân nhôm CNC, switch Gateron Jupiter Red và đèn RGB full.",
                                true, false, "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=500"
                        },
                        {
                                5, "Samsung Galaxy S24 FE 128GB", 5, 12490000.0, 14990000.0, 4.6, 156, "📱", 678, 24, "Samsung",
                                "{\"Camera\":\"50MP + 8MP + 12MP\",\"Display\":\"6.7\\\" Dynamic AMOLED\",\"Chip\":\"Exynos 2400\",\"Battery\":\"4700mAh\",\"Storage\":\"128GB\"}",
                                "Flagship kinh tế với camera 50MP AI và màn hình Dynamic AMOLED 120Hz, chip Exynos 2400 mạnh mẽ.",
                                false, false, "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500"
                        },
                        {
                                6, "Western Digital Black SN850X 1TB", 6, 2690000.0, 3290000.0, 4.8, 341, "💾", 4512, 100, "WD",
                                "{\"Interface\":\"PCIe Gen 4\",\"ReadSpeed\":\"7300 MB/s\",\"WriteSpeed\":\"6600 MB/s\",\"Capacity\":\"1TB\",\"Form\":\"M.2 2280\"}",
                                "SSD PCIe Gen 4 hàng đầu cho gaming với tốc độ đọc 7300 MB/s và tản nhiệt tích hợp.",
                                false, false, "https://images.unsplash.com/photo-1597872200319-382d7cd6f963?w=500"
                        },
                        {
                                7, "Anker PowerCore III 26800mAh", 7, 1290000.0, 1790000.0, 4.6, 523, "🔋", 8934, 200, "Anker",
                                "{\"Capacity\":\"26800mAh\",\"Output\":\"65W PD\",\"Ports\":\"USB-C x2, USB-A x1\",\"Size\":\"15.8 x 7.2 x 2.7cm\",\"Weight\":\"595g\"}",
                                "Sạc dự phòng 26800mAh với công suất 65W, đủ để sạc đầy laptop 2 lần và điện thoại 6 lần.",
                                false, false, "https://images.unsplash.com/photo-1609592424109-dd9892f1b179?w=500"
                        },
                        {
                                8, "ASUS ROG Swift OLED PG27AQDM", 8, 19990000.0, 23990000.0, 4.9, 89, "🖥️", 312, 12, "ASUS",
                                "{\"Panel\":\"OLED\",\"Size\":\"27 inch\",\"Resolution\":\"2560x1440\",\"RefreshRate\":\"240Hz\",\"ResponseTime\":\"0.03ms\"}",
                                "Màn hình gaming OLED 27\" 240Hz với thời gian phản hồi 0.03ms, màu sắc cực kỳ sống động.",
                                true, true, "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500"
                        },
                        {
                                9, "Logitech MX Master 3S", 4, 2290000.0, 2690000.0, 4.8, 445, "🖱️", 5123, 65, "Logitech",
                                "{\"DPI\":\"200–8000\",\"Battery\":\"70 giờ\",\"Connectivity\":\"Bluetooth/USB\",\"Sensor\":\"Darkfield High Precision\",\"Buttons\":\"7 nút\"}",
                                "Chuột không dây cao cấp với cuộn bánh xe siêu tốc, pin 70 giờ và kết nối đến 3 thiết bị.",
                                false, false, "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500"
                        },
                        {
                                10, "DJI Osmo Pocket 3", 5, 11490000.0, 12990000.0, 4.7, 167, "🎬", 445, 18, "DJI",
                                "{\"Sensor\":\"1-inch CMOS\",\"Stabilization\":\"3-axis\",\"Video\":\"4K/120fps\",\"Battery\":\"166 phút\",\"Storage\":\"MicroSD\"}",
                                "Gimbal camera nhỏ gọn với cảm biến 1 inch, quay 4K/120fps và chống rung 3 trục cơ học.",
                                true, false, "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500"
                        },
                        {
                                11, "Apple AirPods Pro 2nd Gen", 3, 6990000.0, 7990000.0, 4.8, 892, "🎵", 6234, 80, "Apple",
                                "{\"ANC\":\"Active Noise Cancellation\",\"Battery\":\"6 giờ (30 giờ với hộp)\",\"Chip\":\"H2\",\"Connectivity\":\"Bluetooth 5.3\",\"Water\":\"IP54\"}",
                                "AirPods Pro thế hệ 2 với chip H2, ANC nâng cao và âm thanh không gian Spatial Audio.",
                                false, true, "https://images.unsplash.com/photo-1588449668365-d15e397f6787?w=500"
                        },
                        {
                                12, "Razer DeathAdder V3 Pro", 4, 2890000.0, 3390000.0, 4.7, 234, "🎮", 1892, 35, "Razer",
                                "{\"DPI\":\"100–30000\",\"Battery\":\"90 giờ\",\"Connectivity\":\"2.4GHz Wireless\",\"Sensor\":\"Focus Pro 30K\",\"Weight\":\"64g\"}",
                                "Chuột gaming không dây siêu nhẹ 64g với cảm biến 30K DPI và pin 90 giờ liên tục.",
                                false, false, "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500"
                        }
                };

                for (Object[] prod : productsMock) {
                    Integer id = (Integer) prod[0];
                    String name = (String) prod[1];
                    Integer catId = (Integer) prod[2];
                    BigDecimal price = BigDecimal.valueOf((Double) prod[3]);
                    BigDecimal oldPrice = BigDecimal.valueOf((Double) prod[4]);
                    Double rating = (Double) prod[5];
                    Integer reviews = (Integer) prod[6];
                    String emoji = (String) prod[7];
                    Integer sold = (Integer) prod[8];
                    Integer stock = (Integer) prod[9];
                    String brand = (String) prod[10];
                    String specs = (String) prod[11];
                    String desc = (String) prod[12];
                    Boolean isNew = (Boolean) prod[13];
                    Boolean isHot = (Boolean) prod[14];
                    String imgUrl = (String) prod[15];

                    CategoryEntity catEntity = categoryMap.get(catId);
                    if (catEntity != null) {
                        ItemEntity item = ItemEntity.builder()
                                .itemId("ITEM-" + id)
                                .name(name)
                                .price(price)
                                .oldPrice(oldPrice)
                                .rating(rating)
                                .reviews(reviews)
                                .emoji(emoji)
                                .sold(sold)
                                .stock(stock)
                                .brand(brand)
                                .specs(specs)
                                .description(desc)
                                .isNew(isNew)
                                .isHot(isHot)
                                .imgUrl(imgUrl)
                                .category(catEntity)
                                .build();

                        itemRepository.save(item);
                    }
                }
                log.info("Successfully initialized 12 mock products.");
            }
        };
    }
}
