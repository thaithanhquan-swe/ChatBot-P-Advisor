export const INITIAL_CONVERSATIONS = [
  {
    id: 'CS-1048', name: 'Nguyễn Minh Anh', initials: 'MA', email: 'minhanh.12@gmail.com', phone: '0912 345 678', topic: 'Điểm chuẩn ngành CNTT', status: 'waiting', unread: 2, time: '10:42', requestedAt: '10:38, 05/09/2026', preview: 'Em muốn hỏi kỹ hơn về cách quy đổi điểm ạ.',
    messages: [
      { id: 1, sender: 'bot', text: 'Theo thông tin tuyển sinh hiện tại, điểm xét tuyển được tính theo từng phương thức.', time: '10:34' },
      { id: 2, sender: 'user', text: 'Em học chương trình THPT 2025, điểm IELTS có được quy đổi không ạ?', time: '10:36' },
      { id: 3, sender: 'bot', text: 'Câu hỏi này cần cán bộ tuyển sinh kiểm tra theo đề án áp dụng cho hồ sơ của em.', time: '10:37' },
      { id: 4, sender: 'system', text: 'Người dùng yêu cầu được trao đổi với cán bộ tư vấn.', time: '10:38' },
      { id: 5, sender: 'user', text: 'Em muốn hỏi kỹ hơn về cách quy đổi điểm ạ.', time: '10:42' },
    ],
  },
  {
    id: 'CS-1047', name: 'Trần Gia Huy', initials: 'GH', email: 'giahuy@gmail.com', phone: '0988 120 456', topic: 'Hồ sơ xét tuyển', status: 'active', unread: 0, time: '10:25', requestedAt: '09:55, 05/09/2026', preview: 'Dạ em cảm ơn thầy cô.',
    messages: [
      { id: 1, sender: 'system', text: 'Người dùng yêu cầu được trao đổi với cán bộ tư vấn.', time: '09:55' },
      { id: 2, sender: 'advisor', text: 'Chào em, thầy cô có thể hỗ trợ gì về hồ sơ xét tuyển?', time: '10:02' },
      { id: 3, sender: 'user', text: 'Em có cần nộp bản sao học bạ có công chứng không ạ?', time: '10:05' },
      { id: 4, sender: 'advisor', text: 'Ở bước đăng ký trực tuyến em chỉ cần bản scan rõ nét. Bản công chứng sẽ bổ sung khi làm thủ tục nhập học.', time: '10:22' },
      { id: 5, sender: 'user', text: 'Dạ em cảm ơn thầy cô.', time: '10:25' },
    ],
  },
  {
    id: 'CS-1044', name: 'Lê Thu Trang', initials: 'TT', email: 'thutrang@gmail.com', phone: '0905 778 899', topic: 'Học phí và học bổng', status: 'waiting', unread: 1, time: '09:18', requestedAt: '09:15, 05/09/2026', preview: 'Cho em hỏi điều kiện duy trì học bổng?',
    messages: [
      { id: 1, sender: 'system', text: 'Người dùng yêu cầu được trao đổi với cán bộ tư vấn.', time: '09:15' },
      { id: 2, sender: 'user', text: 'Cho em hỏi điều kiện duy trì học bổng?', time: '09:18' },
    ],
  },
  {
    id: 'CS-1039', name: 'Phạm Quốc Bảo', initials: 'QB', email: 'quocbao@gmail.com', phone: '0934 221 108', topic: 'Ký túc xá', status: 'closed', unread: 0, time: 'Hôm qua', requestedAt: '15:20, 04/09/2026', preview: 'Em đã nắm được thông tin rồi ạ.',
    messages: [
      { id: 1, sender: 'user', text: 'Em muốn hỏi về thủ tục đăng ký ký túc xá.', time: '15:20' },
      { id: 2, sender: 'advisor', text: 'Em có thể đăng ký sau khi nhận thông báo trúng tuyển. Nhà trường sẽ gửi hướng dẫn kèm hồ sơ nhập học.', time: '15:35' },
      { id: 3, sender: 'user', text: 'Em đã nắm được thông tin rồi ạ.', time: '15:38' },
    ],
  },
];

export const STATUS_META = {
  waiting: { label: 'Đang chờ', className: 'bg-amber-50 text-amber-700 ring-amber-200' },
  active: { label: 'Đang tư vấn', className: 'bg-blue-50 text-blue-700 ring-blue-200' },
  closed: { label: 'Đã kết thúc', className: 'bg-slate-100 text-slate-600 ring-slate-200' },
};
