package com.hius.erms.config;

import com.hius.erms.entity.BlogPostEntity;
import com.hius.erms.repository.BlogPostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class DataInitializerBlog {

    private final BlogPostRepository blogPostRepository;

    @Bean
    public CommandLineRunner initBlogs() {
        return args -> {
            if (blogPostRepository.count() > 0) {
                return;
            }

            log.info("Initializing mock blog posts...");

            List<BlogPostEntity> seeds = List.of(
                    BlogPostEntity.builder()
                            .blogId("1")
                            .emoji("\uD83D\uDCBB")
                            .tag("Review")
                            .title("MacBook Pro M3 sau 3 tháng sử dụng: Đăng mua không?")
                            .excerpt("Sau 3 tháng trải nghiệm thực tế với MacBook Pro M3, đây là những gì tôi nghĩ về hiệu năng, thời lượng pin và tính năng mới.")
                            .content("MacBook Pro M3 đã trở thành một phần không thể thiếu trong công việc hàng ngày của tôi. Sau 3 tháng sử dụng, tôi nhận thấy rằng đây là một chiếc laptop tuyệt vời dành cho những ai cần hiệu năng cao và sự ổn định.\n\n**Hiệu năng**\nChip M3 cung cấp hiệu năng tuyệt vời cho các tác vụ hàng ngày. Từ chỉnh sửa video, xử lý ảnh đến các công việc lập trình, tất cả đều chạy mượt mà. Không có bất kỳ độ trễ nào đáng chú ý.\n\n**Thời lượng pin**\nThời lượng pin có thể lên tới 18 giờ với mức sử dụng bình thường. Điều này rất tuyệt vời cho những ai thường di chuyển nhiều.\n\n**Khả cạnh tiêu cực**\nGiá thành khá cao, không phải ai cũng có khả năng mua. Ngoài ra, cổng kết nối hạn chế, bạn sẽ cần mua hub bổ sung.\n\n**Kết luận**\nMacBook Pro M3 là một chiếc laptop tuyệt vời nếu bạn có ngân sách. Nó cũng cung cấp hiệu năng, sự ổn định và thời lượng pin tuyệt vời. Tôi sẽ khuyên nghị nó cho bất kỳ ai cần một chiếc laptop mạnh mẽ cho công việc chuyển nghiệp.")
                            .date("15/01/2024")
                            .readTime("5 phút")
                            .views("12.4K")
                            .author("Minh Tự")
                            .build(),
                    BlogPostEntity.builder()
                            .blogId("2")
                            .emoji("\uD83C\uDFAE")
                            .tag("Gaming")
                            .title("TOP 5 laptop gaming tốt nhất 2024 dưới 40 triệu")
                            .excerpt("Danh sách các laptop gaming mạnh mẽ nhất năm 2024 với giá dưới 40 triệu, phù hợp cho mọi nhu cầu gaming.")
                            .content("Năm 2024 đem lại rất nhiều lựa chọn laptop gaming tuyệt vời. Dưới đây là top 5 laptop gaming tốt nhất dưới 40 triệu VND.\n\n**1. ASUS TUF Gaming A16** - 38 triệu\nVới hiệu năng mạnh mẽ, màn hình 165Hz và thiết kế bền bỉ, đây là lựa chọn hàng đầu cho game thủ.\n\n**2. MSI Cyborg** - 35 triệu\nLaptop gaming cân bằng tốt giữa hiệu năng và giá cả. Phù hợp cho game thủ có ngân sách hơn.\n\n**3. Lenovo Legion Pro** - 37 triệu\nThiết kế mỏng nhẹ và hiệu năng mạnh mẽ. Tuyệt vời cho những ai muốn tính di động cao.\n\n**4. Dell Alienware m16** - 39 triệu\nMàn hình 4K đỉnh, hiệu năng cao cấp, tuyệt vời cho những người chơi game chuyên nghiệp.\n\n**5. ASUS ROG Zephyrus** - 38 triệu\nThiết kế đẳng cấp, hiệu năng vượt trội, một trong những laptop gaming tốt nhất hiện nay.")
                            .date("12/01/2024")
                            .readTime("8 phút")
                            .views("28.1K")
                            .author("Hoàng Nam")
                            .build(),
                    BlogPostEntity.builder()
                            .blogId("3")
                            .emoji("\uD83C\uDFA7")
                            .tag("Audio")
                            .title("Sony WH-1000XM5 vs Apple AirPods Pro: Nghe đÃ¢u hay hơn?")
                            .excerpt("So sánh chi tiết giữa hai tai nghe chống ồn hàng đầu hiện nay về chất lượng âm thanh, thời lượng pin và tính năng.")
                            .content("Hai tai nghe này là những chiếc tai nghe chống ồn tốt nhất hiện nay. Hãy xem chúng so sánh với nhau thế nào.\n\n**Chất lượng âm thanh**\nSony WH-1000XM5 có bass mạnh mẽ hơn và âm thanh ấm áp. Apple AirPods Pro có âm thanh cân bằng hơn, rõ ràng hơn.\n\n**Chức năng chống ồn**\nCả hai đều xuất sắc trong chức năng chống ồn. Sony có lợi thế nhờ vào khả năng chống ồn ở tần số thấp.\n\n**Thời lượng pin**\nSony WH-1000XM5: Lên tới 8 giờ (40 giờ với hộp sạc)\nAirPods Pro: 6 giờ (30 giờ với hộp sạc)\n\n**Tính tương thích**\nAirPods Pro tuyệt vời với hệ sinh thái Apple. Sony hoạt động tốt với hầu hết các thiết bị.\n\n**Kết luận**\nChọn Sony nếu bạn muốn chất lượng âm thanh tốt nhất. Chọn AirPods Pro nếu bạn sử dụng các sản phẩm Apple.")
                            .date("10/01/2024")
                            .readTime("6 phút")
                            .views("9.8K")
                            .author("Thu Hà")
                            .build(),
                    BlogPostEntity.builder()
                            .blogId("4")
                            .emoji("\u2328\uFE0F")
                            .tag("Accessories")
                            .title("Bàn phím cơ cho người mới: Keychron hay Royal Kludge?")
                            .excerpt("Hướng dẫn chọn bàn phím cơ phù hợp cho người mới bắt đầu, so sánh giữa Keychron và Royal Kludge.")
                            .content("Nếu bạn là người mới biết đầu với bàn phím cơ, hãy xem bài viết này để chọn bàn phím phù hợp nhất.\n\n**Keychron**\nKeychron nổi tiếng với thiết kế mỏng, nhẹ và độ bền cao. Giá cả hợp lý, khoảng 1.5-3 triệu VND. Phù hợp cho người mới và dễ chuyển switch.\n\n**Royal Kludge**\nRoyal Kludge có hình thức đệp mắt, nhiều tùy chọn. Giá cả từ 1-3 triệu VND. Có wireless option rất tiện.\n\n**So sánh**\n- Giá: Cả hai đều rẻ, có thể chọn tùy theo tính năng\n- Chất lượng: Keychron ổn định hơn, Royal Kludge thời trang hơn\n- Hỗ trợ: Cả hai đều có cùng độ bền mạnh mẽ\n\n**Khuyến nghị**\nNếu bạn chỉ muốn bàn phím đơn giản, chọn Keychron. Nếu bạn muốn cái gì đó đẹp hơn và có tính năng wireless, chọn Royal Kludge.")
                            .date("08/01/2024")
                            .readTime("4 phút")
                            .views("7.2K")
                            .author("Văn Long")
                            .build(),
                    BlogPostEntity.builder()
                            .blogId("5")
                            .emoji("\uD83D\uDCBE")
                            .tag("Storage")
                            .title("PCIe Gen 4 SSD: Có thực sự nhanh hơn Gen 3 trong thực tế?")
                            .excerpt("Thử nghiệm thực tế tốc độ PCIe Gen 4 SSD so với Gen 3 trong các tác vụ hằng ngày và gaming.")
                            .content("Nhiều người thắc mắc liệu PCIe Gen 4 có thực sự nhanh hơn trong thực tế. Hãy xem kết quả của chúng tôi.\n\n**Tốc độ lí thuyết**\nGen 4: 7,400 MB/s\nGen 3: 3,500 MB/s\n\n**Tốc độ trong thực tế**\nPhần lớn các tác vụ hàng ngày giữa Gen 3 và Gen 4 gần như không có sự khác biệt. Bạn sẽ không nhận thấy sự khác biệt khi sử dụng thường ngày.\n\n**Gaming**\nThời gian tải game không khác biệt nhiều. Gen 4 chỉ nhanh hơn vài giây trong một số game nhất định.\n\n**Chỉnh sửa video 4K**\nĐây là nơi Gen 4 thực sự tỏa sáng. Khi làm việc với video 4K, Gen 4 nhanh hơn khoảng 30-40% so với Gen 3.\n\n**Kết luận**\nNếu bạn không làm việc với video 4K, Gen 3 vẫn đủ tốt. Nếu bạn làm việc chuyên nghiệp, đầu tư vào Gen 4 là xứng đáng.")
                            .date("05/01/2024")
                            .readTime("7 phút")
                            .views("5.6K")
                            .author("Bảo Trung")
                            .build(),
                    BlogPostEntity.builder()
                            .blogId("6")
                            .emoji("\uD83D\uDDA5\uFE0F")
                            .tag("Monitor")
                            .title("OLED vs IPS 2024: Chọn màn hình nào cho game và đồ họa?")
                            .excerpt("So sánh màn hình OLED và IPS năm 2024, ưu nhược điểm và lời khuyên chọn mua cho gaming và thiết kế.")
                            .content("Năm 2024 mang lại rất nhiều tùy chọn màn hình. OLED vs IPS - cái nào tốt hơn cho bạn?\n\n**OLED**\nĐiểm sáng: Độ tương phản vô hạn, thời gian phản ứng cực nhanh (0.3ms), màu sắc chính xác\nĐiểm yếu: Dễ bị burn-in, giá rất cao (10-20 triệu)\n\n**IPS**\nĐiểm sáng: Giá rẻ hơn (2-8 triệu), không lo burn-in, độ bền cao\nĐiểm yếu: Thời gian phản ứng chậm hơn, độ tương phản thấp hơn\n\n**Cho Gaming**\nOLED chiến thắng ngoạn mục. Thời gian phản ứng nhanh hơn, màu sắc đẹp hơn, tuyệt vời cho những game thủ chuyên nghiệp.\n\n**Cho Thiết kế/Chỉnh sửa ảnh**\nOLED tốt hơn với độ chính xác màu. IPS cũng đủ tốt và được nhiều designer chọn do giá cả.\n\n**Khuyến nghị**\nNếu có ngân sách, chọn OLED. Nếu ngân sách hạn chế hơn, IPS vẫn là lựa chọn tốt.")
                            .date("03/01/2024")
                            .readTime("10 phút")
                            .views("15.3K")
                            .author("Kim Anh")
                            .build()
            );

            blogPostRepository.saveAll(seeds);
            log.info("Seeded {} blog posts", seeds.size());
        };
    }
}

