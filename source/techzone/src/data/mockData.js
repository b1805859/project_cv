
export const CATEGORIES = [
  { id:1, name:'Laptop', icon:'💻', count:42 },
  { id:2, name:'PC Gaming', icon:'🖥️', count:28 },
  { id:3, name:'Tai nghe', icon:'🎧', count:65 },
  { id:4, name:'Bàn phím', icon:'⌨️', count:53 },
  { id:5, name:'Camera', icon:'📷', count:31 },
  { id:6, name:'Ổ cứng', icon:'💾', count:44 },
  { id:7, name:'Sạc dự phòng', icon:'🔋', count:38 },
  { id:8, name:'Màn hình', icon:'🖥', count:22 },
];

export const PRODUCTS = [
  { id:1, name:'MacBook Pro M3 14"', category:'Laptop', catId:1, price:42990000, oldPrice:49990000, rating:4.9, reviews:234, emoji:'💻', sold:1203, stock:15, brand:'Apple', specs:{ CPU:'Apple M3 Pro', RAM:'18GB', Storage:'512GB SSD', Display:'14" Liquid Retina XDR', Battery:'17 giờ' }, description:'MacBook Pro M3 mang lại hiệu suất đỉnh cao với chip Apple M3 Pro, màn hình Liquid Retina XDR sắc nét và thời lượng pin lên đến 17 giờ.', isNew:true, isHot:false },
  { id:2, name:'ASUS ROG Zephyrus G16', category:'Laptop', catId:1, price:38500000, oldPrice:45000000, rating:4.8, reviews:187, emoji:'🎮', sold:892, stock:8, brand:'ASUS', specs:{ CPU:'Intel Core Ultra 9', RAM:'32GB DDR5', Storage:'1TB SSD', Display:'16" 240Hz QHD', Battery:'13 giờ' }, description:'Laptop gaming mỏng nhẹ với màn hình 240Hz QHD, chip Intel Core Ultra 9 mạnh mẽ cho trải nghiệm gaming đỉnh cao.', isNew:false, isHot:true },
  { id:3, name:'Sony WH-1000XM5', category:'Tai nghe', catId:3, price:8990000, oldPrice:10990000, rating:4.9, reviews:412, emoji:'🎧', sold:3421, stock:52, brand:'Sony', specs:{ Driver:'30mm', Frequency:'4Hz–40kHz', ANC:'Có', Battery:'30 giờ', Connectivity:'Bluetooth 5.2' }, description:'Tai nghe chống ồn hàng đầu với 8 microphone, pin 30 giờ và chất lượng âm thanh Hi-Res Audio chuẩn Sony.', isNew:false, isHot:true },
  { id:4, name:'Keychron Q1 Pro', category:'Bàn phím', catId:4, price:3490000, oldPrice:3990000, rating:4.7, reviews:298, emoji:'⌨️', sold:2100, stock:40, brand:'Keychron', specs:{ Layout:'75%', Switch:'Gateron Jupiter Red', Body:'Nhôm CNC', Connection:'Wireless/Wired', RGB:'Có' }, description:'Bàn phím cơ không dây cao cấp với thân nhôm CNC, switch Gateron Jupiter Red và đèn RGB full.', isNew:true, isHot:false },
  { id:5, name:'Samsung Galaxy S24 FE 128GB', category:'Camera', catId:5, price:12490000, oldPrice:14990000, rating:4.6, reviews:156, emoji:'📱', sold:678, stock:24, brand:'Samsung', specs:{ Camera:'50MP + 8MP + 12MP', Display:'6.7" Dynamic AMOLED', Chip:'Exynos 2400', Battery:'4700mAh', Storage:'128GB' }, description:'Flagship kinh tế với camera 50MP AI và màn hình Dynamic AMOLED 120Hz, chip Exynos 2400 mạnh mẽ.', isNew:false, isHot:false },
  { id:6, name:'Western Digital Black SN850X 1TB', category:'Ổ cứng', catId:6, price:2690000, oldPrice:3290000, rating:4.8, reviews:341, emoji:'💾', sold:4512, stock:100, brand:'WD', specs:{ Interface:'PCIe Gen 4', ReadSpeed:'7300 MB/s', WriteSpeed:'6600 MB/s', Capacity:'1TB', Form:'M.2 2280' }, description:'SSD PCIe Gen 4 hàng đầu cho gaming với tốc độ đọc 7300 MB/s và tản nhiệt tích hợp.', isNew:false, isHot:false },
  { id:7, name:'Anker PowerCore III 26800mAh', category:'Sạc dự phòng', catId:7, price:1290000, oldPrice:1790000, rating:4.6, reviews:523, emoji:'🔋', sold:8934, stock:200, brand:'Anker', specs:{ Capacity:'26800mAh', Output:'65W PD', Ports:'USB-C x2, USB-A x1', Size:'15.8 x 7.2 x 2.7cm', Weight:'595g' }, description:'Sạc dự phòng 26800mAh với công suất 65W, đủ để sạc đầy laptop 2 lần và điện thoại 6 lần.', isNew:false, isHot:false },
  { id:8, name:'ASUS ROG Swift OLED PG27AQDM', category:'Màn hình', catId:8, price:19990000, oldPrice:23990000, rating:4.9, reviews:89, emoji:'🖥️', sold:312, stock:12, brand:'ASUS', specs:{ Panel:'OLED', Size:'27 inch', Resolution:'2560x1440', RefreshRate:'240Hz', ResponseTime:'0.03ms' }, description:'Màn hình gaming OLED 27" 240Hz với thời gian phản hồi 0.03ms, màu sắc cực kỳ sống động.', isNew:true, isHot:true },
  { id:9, name:'Logitech MX Master 3S', category:'Bàn phím', catId:4, price:2290000, oldPrice:2690000, rating:4.8, reviews:445, emoji:'🖱️', sold:5123, stock:65, brand:'Logitech', specs:{ DPI:'200–8000', Battery:'70 giờ', Connectivity:'Bluetooth/USB', Sensor:'Darkfield High Precision', Buttons:'7 nút' }, description:'Chuột không dây cao cấp với cuộn bánh xe siêu tốc, pin 70 giờ và kết nối đến 3 thiết bị.', isNew:false, isHot:false },
  { id:10, name:'DJI Osmo Pocket 3', category:'Camera', catId:5, price:11490000, oldPrice:12990000, rating:4.7, reviews:167, emoji:'🎬', sold:445, stock:18, brand:'DJI', specs:{ Sensor:'1-inch CMOS', Stabilization:'3-axis', Video:'4K/120fps', Battery:'166 phút', Storage:'MicroSD' }, description:'Gimbal camera nhỏ gọn với cảm biến 1 inch, quay 4K/120fps và chống rung 3 trục cơ học.', isNew:true, isHot:false },
  { id:11, name:'Apple AirPods Pro 2nd Gen', category:'Tai nghe', catId:3, price:6990000, oldPrice:7990000, rating:4.8, reviews:892, emoji:'🎵', sold:6234, stock:80, brand:'Apple', specs:{ ANC:'Active Noise Cancellation', Battery:'6 giờ (30 giờ với hộp)', Chip:'H2', Connectivity:'Bluetooth 5.3', Water:'IP54' }, description:'AirPods Pro thế hệ 2 với chip H2, ANC nâng cao và âm thanh không gian Spatial Audio.', isNew:false, isHot:true },
  { id:12, name:'Razer DeathAdder V3 Pro', category:'Bàn phím', catId:4, price:2890000, oldPrice:3390000, rating:4.7, reviews:234, emoji:'🎮', sold:1892, stock:35, brand:'Razer', specs:{ DPI:'100–30000', Battery:'90 giờ', Connectivity:'2.4GHz Wireless', Sensor:'Focus Pro 30K', Weight:'64g' }, description:'Chuột gaming không dây siêu nhẹ 64g với cảm biến 30K DPI và pin 90 giờ liên tục.', isNew:false, isHot:false },
];

export const ORDERS_MOCK = [
  { id:'TZ-2024-001', date:'2024-01-15', items:3, total:52480000, status:'COMPLETED', payment:'MoMo' },
  { id:'TZ-2024-002', date:'2024-01-20', items:1, total:8990000, status:'SHIPPING', payment:'COD' },
  { id:'TZ-2024-003', date:'2024-01-22', items:2, total:6180000, status:'PAID', payment:'MoMo' },
  { id:'TZ-2024-004', date:'2024-01-25', items:1, total:42990000, status:'PENDING', payment:'MoMo' },
];

export const CHATBOT_RULES = [
  { keywords:['laptop','máy tính xách tay'], response:'💻 TechZone có nhiều laptop xịn! Từ MacBook Pro M3 đến ASUS ROG. Bạn muốn xem laptop gaming hay văn phòng?', type:'TEXT', products:[1,2] },
  { keywords:['tai nghe','headphone','airpod'], response:'🎧 Chúng tôi có tai nghe từ Sony, Apple, Logitech! Tai nghe chống ồn hay in-ear?', type:'TEXT', products:[3,11] },
  { keywords:['bàn phím','keyboard'], response:'⌨️ Bàn phím cơ hay membrane? TechZone có Keychron, Razer và nhiều thương hiệu top!', type:'TEXT', products:[4,12] },
  { keywords:['giá','bao nhiêu','price'], response:'💰 Bạn hỏi giá sản phẩm nào? Vui lòng cho tôi biết tên sản phẩm bạn quan tâm!', type:'TEXT', products:[] },
  { keywords:['đơn hàng','order','vận chuyển','ship'], response:'📦 Để kiểm tra đơn hàng, bạn cần đăng nhập vào tài khoản và vào mục "Đơn hàng của tôi". Hoặc liên hệ hotline 1800-TECHZONE!', type:'TEXT', products:[] },
  { keywords:['bảo hành','warranty'], response:'🛡️ TechZone bảo hành chính hãng: Laptop 12-24 tháng, Tai nghe 12 tháng, Phụ kiện 6 tháng. Tất cả có tem bảo hành TechZone!', type:'TEXT', products:[] },
  { keywords:['khuyến mãi','sale','giảm giá','discount'], response:'🔥 Hiện TechZone đang có chương trình Sale Tháng 1 với nhiều sản phẩm giảm đến 30%! Xem ngay tại trang chủ.', type:'TEXT', products:[] },
  { keywords:['thanh toán','payment','momo','cod'], response:'💳 TechZone hỗ trợ thanh toán: MoMo, COD (tiền mặt khi nhận hàng). Đặt hàng online, nhận tại nhà hoặc cửa hàng!', type:'TEXT', products:[] },
  { keywords:['sạc','pin','powerbank'], response:'🔋 Pin dự phòng Anker là lựa chọn số 1 tại TechZone! Dung lượng 10000-26800mAh, sạc nhanh PD 65W.', type:'TEXT', products:[7] },
  { keywords:['ổ cứng','ssd','hdd','storage'], response:'💾 SSD PCIe Gen 4 Western Digital tốc độ 7300 MB/s! Nâng cấp máy tính của bạn ngay hôm nay.', type:'TEXT', products:[6] },
];

export const DEFAULT_BOT_RESPONSE = '🤖 Xin chào! Tôi là TechBot, trợ lý ảo của TechZone. Tôi có thể giúp bạn tìm sản phẩm, hỏi giá, kiểm tra đơn hàng. Hãy thử hỏi: "Laptop gaming" hoặc "Tai nghe Sony"!';
export const SYSTEM_PROMPT = `Bạn là TechBot – trợ lý AI của TechZone, cửa hàng điện tử hàng đầu Việt Nam.
Sản phẩm nổi bật: MacBook Pro M3 (42.99M), ASUS ROG G16 (38.5M), Sony WH-1000XM5 (8.99M), Keychron Q1 Pro (3.49M), AirPods Pro 2 (6.99M), WD SN850X 1TB (2.69M), Anker 26800mAh (1.29M), ASUS ROG OLED 27" (19.99M).
Chính sách: BH Laptop 12-24th, đổi trả 7 ngày, thanh toán MoMo/COD, miễn ship đơn ≥5M.
Mã giảm giá: TECHZONE10 (10%), NEWUSER50K (50k), MOMO15 (15%), FREESHIP.
Trả lời ngắn gọn, thân thiện tiếng Việt, dùng emoji, tối đa 3-4 câu.`;

export async function callClaudeAPI(messages) {
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        model:'claude-sonnet-4-20250514', max_tokens:300, system:SYSTEM_PROMPT,
        messages: messages
          .filter(m => m.from === 'user' || m.from === 'bot')
          .map(m => ({ role: m.from==='user'?'user':'assistant', content: m.text }))
          .slice(-10),
      }),
    });
    const data = await res.json();
    return data.content?.[0]?.text || null;
  } catch(e) { return null; }
}


export const NOTIFS_INIT = [
  { id:1, icon:'📦', iconBg:'rgba(0,212,255,.15)', title:'Đơn hàng TZ-2024-002 đang giao', sub:'Dự kiến giao trong hôm nay', time:'5 phút trước', unread:true },
  { id:2, icon:'🎉', iconBg:'rgba(0,230,118,.12)', title:'Flash Sale bắt đầu!', sub:'Giảm đến 30% – chỉ còn hôm nay', time:'1 giờ trước', unread:true },
  { id:3, icon:'💳', iconBg:'rgba(123,47,247,.15)', title:'Thanh toán thành công', sub:'TZ-2024-003 – 6.180.000đ', time:'2 ngày trước', unread:false },
  { id:4, icon:'⭐', iconBg:'rgba(255,211,42,.12)', title:'Đánh giá sản phẩm', sub:'Bạn chưa đánh giá MacBook Pro M3', time:'3 ngày trước', unread:false },
  { id:5, icon:'🛡️', iconBg:'rgba(255,107,53,.12)', title:'Bảo hành sắp hết hạn', sub:'Tai nghe Sony WH-1000XM5 còn 30 ngày', time:'1 tuần trước', unread:false },
];


export const FLASH_SALE = [
  { ...PRODUCTS[2], flashPrice: 6990000, stock: 52, sold: 38 },
  { ...PRODUCTS[6], flashPrice: 890000,  stock: 200, sold: 156 },
  { ...PRODUCTS[5], flashPrice: 1990000, stock: 100, sold: 73 },
  { ...PRODUCTS[3], flashPrice: 2690000, stock: 40,  sold: 27 },
  { ...PRODUCTS[10], flashPrice: 5490000, stock: 80, sold: 61 },
  { ...PRODUCTS[8], flashPrice: 1790000, stock: 65,  sold: 44 },
];


export const BLOG_POSTS = [
  { id:1, emoji:'💻', tag:'Review', title:'MacBook Pro M3 sau 3 tháng sử dụng: Đáng mua không?', date:'15/01/2024', readTime:'5 phút', views:'12.4K', author:'Minh Tú' },
  { id:2, emoji:'🎮', tag:'Gaming', title:'TOP 5 laptop gaming tốt nhất 2024 dưới 40 triệu', date:'12/01/2024', readTime:'8 phút', views:'28.1K', author:'Hoàng Nam' },
  { id:3, emoji:'🎧', tag:'Audio', title:'Sony WH-1000XM5 vs Apple AirPods Pro: Nghe đâu hay hơn?', date:'10/01/2024', readTime:'6 phút', views:'9.8K', author:'Thu Hà' },
  { id:4, emoji:'⌨️', tag:'Accessories', title:'Bàn phím cơ cho người mới: Keychron hay Royal Kludge?', date:'08/01/2024', readTime:'4 phút', views:'7.2K', author:'Văn Long' },
  { id:5, emoji:'💾', tag:'Storage', title:'PCIe Gen 4 SSD: Có thực sự nhanh hơn Gen 3 trong thực tế?', date:'05/01/2024', readTime:'7 phút', views:'5.6K', author:'Bảo Trung' },
  { id:6, emoji:'🖥️', tag:'Monitor', title:'OLED vs IPS 2024: Chọn màn hình nào cho game và đồ họa?', date:'03/01/2024', readTime:'10 phút', views:'15.3K', author:'Kim Anh' },
];


export const BUNDLES = [
  {
    id:'bundle1', name:'Setup Gaming Đỉnh', discount:15,
    products:[PRODUCTS[1], PRODUCTS[2], PRODUCTS[7]],
    description:'Bộ setup hoàn hảo cho game thủ: Laptop ROG + Tai nghe Sony + Màn hình OLED',
  },
  {
    id:'bundle2', name:'Work From Home Pro', discount:10,
    products:[PRODUCTS[0], PRODUCTS[3], PRODUCTS[8]],
    description:'MacBook Pro + Bàn phím Keychron + Chuột MX Master – năng suất tối đa',
  },
];

