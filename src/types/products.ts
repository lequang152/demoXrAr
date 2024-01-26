export type Product = {
  id: string | number | undefined;
  name: string;
  price: number;
  saleLink: string;
  image: string;
  probability: number; // xác suất xuất hiện, càng cao thì càng dễ ra
  description: string;
};

export const MOCK_UNDEFINED_PRODUCT = {
  id: undefined,
  probability: Number(process.env.REACT_APP_MISSING_CHANCE) || 0.6,
  description: "",
  image: "",
  name: "",
  price: 0,
  saleLink: "",
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Nước rửa chén tinh chất gạo cao cấp Elysa 800ml",
    price: 350000,
    saleLink:
      "https://thgreenvietnam.com/hoa-pham/nuoc-rua-chen-tinh-chat-gao-cao-cap-elysa-800ml-p157",
    image:
      "https://stc.thgreenvietnam.com/uploads/2024/01/19/1_i65aa403f714a4.png",
    probability: 0.1,
    description: `
        Giới thiệu
    Nước rửa chén tinh chất gạo cao cấp Th Green 800ml

    Thành phần:
    Tinh chất gạo, Sodium lauryl sulfate, sulfate, sulfonater Linear alky benzenne, Vegatable glycerin received, gliter capb, water,... 

    Hướng dẫn sử dụng:
    Bước 1: đổ trực tiếp một lượng vừa phải vào miếng rửa chén đã được thấm nước.

    Bước 2: bóp nhẹ để tạo bọt rồi rửa chân Bước 3: sau đó tráng bát bằng nước sạch


    CHÚ Ý:
    Không được uống, để xa tầm tau với của trẻ em
    Nếu sản phẩm đinh vào mắt, rửa sạch bằng nước.
    Nếu nuốt phải sản phẩm, uống ngay một ly nước hoặc sửa nếu cần thì đến sở y tế.
    BẢO QUẢN: Lưu trú nơi thoáng mát tránh ảnh nắng trực tiếp
    TCC$: 02/2019 EPOLVN/QPVN
    `,
  },
  {
    id: 2,
    name: "Nước giặt xả cao cấp Elysa 6in1 Hương Tulip 4600ml",
    price: 260000,
    saleLink:
      "https://thgreenvietnam.com/hoa-pham/nuoc-giat-xa-cao-cap-elysa-6in1-huong-tulip-4600ml-p138",
    image:
      "https://stc.thgreenvietnam.com/uploads/2024/01/19/1_i65aa3d9bdc587.png",
    probability: 0.05,
    description: `
      Giới thiệu
  Nước giặt xả cao cấp Elysa 6in1 Hương Tulip 4600ml

  Nguyên liệu nhập khẩu tự nhiên, được sản xuất trên dây truyền công nghệ sinh học hiện đại khép kín

  An toàn cho mọi mọi loại da
  Đánh bay vết bẩn cứng đầu
  Hương thơm dễ chịu

  Thành phần:
  Sodium lauryl sulfate, Sulfonated linear alkyl benzên, Celluiose ether, Monopol Lae9, Water aroma,...

  Công thức đậm đặc gấp 2 lần giúp giặt sạch các vết bẩn trên quần áo, diệt vi khuẩn và chống bám bẩn trở lại
  Cân bằng độ PH trung tính, giúp bảo vệ quần áo bền lâu, không làm hại da tay
  Hàm lượng xả đươc tăng thêm giúp nhanh hết bọt, tiết kiệm nước và thời gian giặt
  Tính chất Sunfonated linear alkyl bezên làm mềm, xốp cho quần áo
  Phù hợp với cả giặt tay và giặt máy

  Hướng dẫn sử dụng:
  Giặt tay: Hòa 30-50ml dung dịch giặt xả, cho 10lít nước (dùng cho 10-15 bộ quần áo)
  Giặt máy: Cho 30-50ml dung dịch giặt xả (dùng cho 10-15 bộ quần áo). Nước giặt xả đậm đặc, đặc biệt an toàn cho quần áo trẻ nhỏ và mọi chất liệu lụa tơ tằm, len sợi cotton,...
    `,
  },
  {
    id: 3,
    name: "Nước tẩy đa năng Elysa 500ml",
    price: 100000,
    saleLink:
      "https://thgreenvietnam.com/hoa-pham/nuoc-tay-da-nang-elysa-500ml-p132",
    image:
      "https://stc.thgreenvietnam.com/uploads/2024/01/19/1_i65aa4654deeca.png",
    probability: 0.02,
    description: `
    Giới thiệu
    TẨY ĐA NĂNG ELYSA 500ml - Số tiêu chuẩn cơ sở Nhật Bản JIS K 3370:2019

    NGUYÊN LIỆU TỰ NHIÊN NHẬP KHẨU CHÂU ÂU

    Sodium lauryl Ether Sulfate, Acrylates copolymer Iso propyl alcohol, chất Toff

    CÔNG NGHỆ SINH HỌC VƯỢT TRỘI - AN TOÀN  

    Với công thức đa tác dụng sẽ giúp bạn lau, rửa sạch và diệt khuẩn cho mọi bề mặt và mang lại hương hoa thơm mát

    Với công thức độc đáo, giúp làm sạch mọi vết bẩn, ngay cả những vết bẩn lâu ngày, vết dầu mỡ, vết rỉ sét cặn xà phòng... Trả lại vẻ sáng bóng cho gian bếp và phòng tắm. Sản phẩm hiệu quả cho mọi bề mặt từ bề mặt gạch, men,..

    Đồng thời lưu hương thơm tươi mát, đem đến không gian dễ chịu tại nơi sử dụng.
    `,
  },
  {
    id: 4,
    name: "Áo giữ nhiệt",
    price: 250000,
    saleLink: "",
    image: "",
    probability: 0.01,
    description: "Giữ ấm cho mùa đông Hà Nội.",
  },
  {
    id: 5,
    name: "Giày thể thao Adidas cao cấp",
    price: 2000000,
    saleLink: "",
    image: "",
    probability: 0.05,
    description: "Đôi giày chạy cao cấp từ Adidas",
  },
];
