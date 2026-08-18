import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FAQ.css';

// Dữ liệu mẫu (Tạm thời dùng trước khi có API từ Cán bộ tuyển sinh)
const MOCK_FAQS = [
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

const CATEGORIES = ['Tất cả', 'Ngành học', 'Học phí', 'Điều kiện xét tuyển', 'Mốc thời gian'];

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [expandedId, setExpandedId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Mô phỏng việc gọi API lấy dữ liệu (Không cache để đồng bộ real-time)
  useEffect(() => {
    const fetchFAQs = async () => {
      setIsLoading(true);
      // TODO: Thay thế khối này bằng API thật
      setTimeout(() => {
        setFaqs(MOCK_FAQS);
        setIsLoading(false);
      }, 500);
    };
    fetchFAQs();
  }, []);

  // Logic tìm kiếm và lọc kết hợp
  const filteredFaqs = faqs.filter((faq) => {
    const matchCategory = activeCategory === 'Tất cả' || faq.category === activeCategory;
    const matchSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  const toggleAccordion = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleAskInChat = (question) => {
    // Chuyển hướng sang trang Chat và truyền câu hỏi qua state để trang Chat tự động điền
    navigate('/chatai', { state: { initialQuestion: question } });
  };

  return (
    <div className='faq-container'>
      <div className='faq-header'>
        <h1>Câu hỏi thường gặp</h1>
        <p>Tìm kiếm nhanh câu trả lời cho các thắc mắc về tuyển sinh PTIT</p>
      </div>

      <div className='faq-controls'>
        <div className='search-bar'>
          <input
            type='text'
            placeholder='Tìm kiếm câu hỏi, từ khóa ...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className='category-filters'>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => {
                setActiveCategory(cat);
                setExpandedId(null); // Đóng các mục đang mở khi đổi tab
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className='faq-list'>
        {isLoading ? (
          <div className='loading'>Đang tải dữ liệu...</div>
        ) : filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq) => (
            <div key={faq.id} className={`faq-item ${expandedId === faq.id ? 'expanded' : ''}`}>
              <div className='faq-question' onClick={() => toggleAccordion(faq.id)}>
                <span className='question-text'>{faq.question}</span>
                <span className='icon'>{expandedId === faq.id ? '−' : '+'}</span>
              </div>

              <div className='faq-answer-container'>
                <div className='faq-answer'>
                  <p>{faq.answer}</p>
                  <div className='faq-actions'>
                    <button className='ask-chat-btn' onClick={() => handleAskInChat(faq.question)}>
                      <i className='chat-icon'>💬</i> Hỏi AI chi tiết hơn
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className='no-results'>
            Không tìm thấy câu hỏi phù hợp với từ khóa "{searchTerm}".
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQ;
