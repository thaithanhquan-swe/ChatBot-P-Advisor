// "iconKey" chỉ là một cái tên để component tự chọn icon tương ứng khi hiển thị.
export const popularQuestions = [
  { number: '01', iconKey: 'ClipboardList', question: 'Điều kiện xét tuyển vào PTIT là gì?' },
  { number: '02', iconKey: 'Wallet', question: 'Học phí của các ngành như thế nào?' },
  { number: '03', iconKey: 'GraduationCap', question: 'PTIT có những ngành đào tạo nào?' },
  { number: '04', iconKey: 'CalendarClock', question: 'Thời gian xét tuyển và nhập học khi nào?' },
  { number: '05', iconKey: 'Award', question: 'Có những loại học bổng nào cho sinh viên?' },
  { number: '06', iconKey: 'Building2', question: 'Ký túc xá và hỗ trợ sinh viên ra sao?' },
];

// ─── Dữ liệu trang FAQ ─────────────────────────────────────────────────────
export const faqCategories = [
  'Tất cả',
  'Ngành học',
  'Học phí',
  'Điều kiện xét tuyển',
  'Mốc thời gian',
];

export const faqData = [
  {
    id: 1,
    category: 'Ngành học',
    question: 'Trường có những ngành đào tạo nào về CNTT?',
    answer:
      'Học viện đào tạo các chuyên ngành: Công nghệ thông tin, An toàn thông tin, Kỹ thuật phần mềm, Khoa học máy tính, Hệ thống thông tin...',
  },
  {
    id: 2,
    category: 'Học phí',
    question: 'Học phí năm học sắp tới là bao nhiêu?',
    answer:
      'Học phí dự kiến dao động từ 24 - 28 triệu VNĐ/năm tùy thuộc vào ngành học và chương trình đào tạo.',
  },
  {
    id: 3,
    category: 'Điều kiện xét tuyển',
    question: 'Trường xét tuyển học bạ như thế nào?',
    answer:
      'Điều kiện xét tuyển học bạ thường yêu cầu thí sinh có điểm trung bình chung học tập 3 năm THPT đạt từ 7.5 trở lên, và điểm các môn trong tổ hợp xét tuyển không dưới 7.0.',
  },
  {
    id: 4,
    category: 'Mốc thời gian',
    question: 'Khi nào trường bắt đầu nhận hồ sơ xét tuyển sớm?',
    answer:
      'Học viện dự kiến nhận hồ sơ xét tuyển sớm theo phương thức kết hợp từ đầu tháng 5 đến cuối tháng 6. Vui lòng theo dõi thông báo chính thức.',
  },
  {
    id: 5,
    category: 'Ngành học',
    question: 'Ngành Công nghệ Đa phương tiện học những gì?',
    answer:
      'Ngành Công nghệ Đa phương tiện kết hợp giữa CNTT và thiết kế, báo chí, truyền thông, kỹ xảo điện ảnh...',
  },
];

// ─── Dữ liệu trang Chat (ChatAI) ───────────────────────────────────────────
export const capabilities = [
  { iconKey: 'BookOpenCheck', label: 'Thông tin tuyển sinh' },
  { iconKey: 'ClipboardList', label: 'Phương thức xét tuyển' },
  { iconKey: 'GraduationCap', label: 'Ngành đào tạo' },
  { iconKey: 'Award', label: 'Điểm chuẩn' },
  { iconKey: 'Wallet', label: 'Học phí' },
  { iconKey: 'CalendarClock', label: 'Hồ sơ & thời gian đăng ký' },
];

export const suggestedQuestions = [
  'PTIT có những phương thức xét tuyển nào?',
  'Điểm chuẩn năm 2025 là bao nhiêu?',
  'Ngành Công nghệ thông tin học những gì?',
  'Học phí PTIT bao nhiêu?',
  'Hồ sơ xét tuyển gồm những gì?',
];

export const conversationHistory = [
  { id: 'c1', title: 'Điểm chuẩn ngành Công nghệ thông tin 2025', time: '2 giờ trước' },
  { id: 'c2', title: 'Học phí ngành An toàn thông tin', time: 'Hôm qua' },
  { id: 'c3', title: 'Hồ sơ xét tuyển học bạ THPT', time: '3 ngày trước' },
];

const formatTime = () =>
  new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

// Each answer is a list of typed "blocks" so the message bubble can render
// rich content (paragraphs, bullet lists, highlighted notes, comparison
// tables, official links) instead of plain text only.
const answerBank = [
  {
    match: ['phương thức', 'xét tuyển'],
    blocks: [
      { type: 'text', content: 'PTIT hiện áp dụng 5 phương thức xét tuyển chính năm 2026:' },
      {
        type: 'list',
        items: [
          'Xét kết quả thi tốt nghiệp THPT',
          'Xét học bạ THPT (3 hoặc 5 học kỳ)',
          'Xét tuyển thẳng theo quy định Bộ GD&ĐT',
          'Xét chứng chỉ quốc tế (SAT, ACT, IELTS...)',
          'Xét tuyển kết hợp theo đề án riêng của Học viện',
        ],
      },
      {
        type: 'highlight',
        content:
          'Mỗi phương thức có chỉ tiêu và điều kiện riêng, thí sinh có thể đăng ký đồng thời nhiều phương thức.',
      },
      {
        type: 'link',
        label: 'Xem chi tiết đề án tuyển sinh 2026',
        href: 'https://tuyensinh.ptit.edu.vn/',
      },
    ],
    source: 'Đề án tuyển sinh PTIT 2026',
    followUps: ['Hỏi về phương thức xét tuyển học bạ', 'Xem điểm chuẩn'],
  },
  {
    match: ['ngành', 'chuyên ngành', 'công nghệ thông tin'],
    blocks: [
      {
        type: 'text',
        content:
          'Ngành Công nghệ thông tin tại PTIT trang bị kiến thức nền tảng về lập trình, cấu trúc dữ liệu, hệ thống mạng và định hướng chuyên sâu theo 2 nhóm:',
      },
      {
        type: 'list',
        items: [
          'Kỹ thuật phần mềm — phát triển ứng dụng, quy trình phần mềm',
          'Khoa học dữ liệu & AI — machine learning, phân tích dữ liệu lớn',
        ],
      },
      { type: 'text', content: 'Sinh viên được thực hành tại doanh nghiệp đối tác từ năm 3.' },
    ],
    source: 'Chương trình đào tạo ngành CNTT — PTIT 2026',
    followUps: ['Xem các ngành đào tạo khác', 'Học phí ngành CNTT bao nhiêu?'],
  },
  {
    match: ['điểm chuẩn', 'điểm sàn'],
    blocks: [
      {
        type: 'text',
        content:
          'Điểm chuẩn 2025 theo kết quả thi tốt nghiệp THPT (thang 30), một số ngành tiêu biểu:',
      },
      {
        type: 'table',
        columns: ['Ngành', 'Cơ sở Hà Nội', 'Cơ sở TP.HCM'],
        rows: [
          ['Công nghệ thông tin', '26.8', '25.9'],
          ['An toàn thông tin', '26.2', '25.3'],
          ['Marketing số', '24.5', '23.8'],
        ],
      },
      {
        type: 'highlight',
        content:
          'Điểm chuẩn theo học bạ và các phương thức khác được công bố riêng, thường thấp hơn 1–2 điểm.',
      },
    ],
    source: 'Thông báo điểm chuẩn PTIT 2025',
    followUps: ['Điểm chuẩn theo học bạ là bao nhiêu?', 'Xem các ngành đào tạo'],
  },
  {
    match: ['học phí'],
    blocks: [
      { type: 'text', content: 'Học phí năm học 2025–2026 theo chương trình đào tạo:' },
      {
        type: 'table',
        columns: ['Chương trình', 'Học phí / năm'],
        rows: [
          ['Đại trà', '27 – 29 triệu'],
          ['Chất lượng cao', '34 – 38 triệu'],
          ['Liên kết quốc tế', '55 – 65 triệu'],
        ],
      },
      {
        type: 'highlight',
        content: 'Học phí được điều chỉnh theo lộ trình hằng năm theo quy định của Nhà nước.',
      },
    ],
    source: 'Thông báo học phí PTIT năm học 2025–2026',
    followUps: ['Tìm hiểu học bổng', 'Học phí ngành CNTT bao nhiêu?'],
  },
  {
    match: ['hồ sơ', 'giấy tờ', 'thủ tục'],
    blocks: [
      { type: 'text', content: 'Hồ sơ xét tuyển cơ bản gồm:' },
      {
        type: 'list',
        items: [
          'Phiếu đăng ký xét tuyển',
          'Học bạ THPT (bản sao công chứng)',
          'Bằng/giấy chứng nhận tốt nghiệp THPT tạm thời',
          'Chứng chỉ ưu tiên (nếu có)',
          'Ảnh thẻ 3x4',
        ],
      },
      {
        type: 'text',
        content:
          'Hồ sơ nộp trực tuyến qua cổng tuyển sinh hoặc trực tiếp tại Học viện trong thời gian quy định.',
      },
      {
        type: 'link',
        label: 'Nộp hồ sơ trực tuyến tại đây',
        href: 'https://tuyensinh.ptit.edu.vn/',
      },
    ],
    source: 'Hướng dẫn hồ sơ tuyển sinh PTIT 2026',
    followUps: ['Thời hạn nộp hồ sơ đến khi nào?', 'Xem các phương thức xét tuyển'],
  },
  {
    match: ['học bổng'],
    blocks: [
      { type: 'text', content: 'PTIT có nhiều loại học bổng dành cho sinh viên:' },
      {
        type: 'list',
        items: [
          'Học bổng khuyến khích học tập (theo kết quả học kỳ)',
          'Học bổng tài năng cho thủ khoa đầu vào',
          'Học bổng doanh nghiệp tài trợ (FPT, Viettel, VNPT...)',
        ],
      },
      {
        type: 'highlight',
        content:
          'Tổng giá trị học bổng toàn khóa có thể lên đến 100% học phí với sinh viên xuất sắc.',
      },
    ],
    source: 'Quy chế học bổng PTIT 2025–2026',
    followUps: ['Học phí PTIT bao nhiêu?', 'Điều kiện nhận học bổng tài năng?'],
  },
];

const fallbackAnswer = {
  blocks: [
    {
      type: 'text',
      content:
        'Mình chưa tìm thấy thông tin phù hợp cho câu hỏi này. Bạn có thể thử hỏi theo cách khác, hoặc xem thông tin tuyển sinh chính thức của PTIT.',
    },
  ],
  source: null,
  followUps: ['PTIT có những ngành nào?', 'Học phí PTIT là bao nhiêu?'],
  isFallback: true,
};

export const getAnswerFor = (question) => ({
  ...(answerBank.find(({ match }) =>
    match.some((keyword) => question.toLowerCase().includes(keyword))
  ) ?? fallbackAnswer),
  time: formatTime(),
});

export const nowTime = formatTime;
