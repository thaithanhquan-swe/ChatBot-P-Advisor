import { FileText, Globe, HelpCircle, Mail, Phone, User } from 'lucide-react';
import { useState } from 'react';

// Đường dẫn ảnh nét vẽ tòa nhà PTIT
import ptitLineArt from '../../../assets/images/store/truong_ptit_lineart.png';

import ConsultationForm from './components/ConsultationForm/ConsultationForm';
import SuccessState from './components/SuccessState/SuccessState';

const ConsultationPage = () => {
  const [formData, setFormData] = useState({
    question: 'Điểm chuẩn ngành Công nghệ thông tin năm 2024 của PTIT là bao nhiêu?',
    fullName: '',
    phone: '',
    email: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Vui lòng nhập họ tên';

    if (!formData.phone.trim() && !formData.email.trim()) {
      newErrors.contact = 'Vui lòng cung cấp SĐT hoặc Email để chúng tôi liên hệ';
    } else {
      if (formData.phone && !/(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(formData.phone)) {
        newErrors.phone = 'Số điện thoại không hợp lệ';
      }
      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Email không hợp lệ';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
      }, 1000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name] || errors.contact) {
      setErrors((prev) => ({ ...prev, [name]: '', contact: '' }));
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFormData({
      question: 'Điểm chuẩn ngành Công nghệ thông tin năm 2024 của PTIT là bao nhiêu?',
      fullName: '',
      phone: '',
      email: '',
    });
  };

  return (
    <div className='relative overflow-hidden min-h-[calc(100vh-80px)] bg-gray-50/60 py-10 px-4 sm:px-6 lg:px-8'>
      <div className='relative z-10 mx-auto max-w-7xl'>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-12'>
          
          {/* CỘT TRÁI: Giới thiệu & tiêu đề trang */}
          {/* Đã thêm "relative" vào cột trái để làm gốc tọa độ cho ảnh */}
          <div className='relative flex h-full flex-col lg:col-span-3 pt-4'>
            
            {/* Nội dung chữ được đẩy nổi lên trên z-10 */}
            <div className='relative z-10'>
              {/* Biểu tượng thư có dấu hỏi */}
              <div className='relative mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-red-50 text-[#c8102e]'>
                <Mail size={40} />
                <div className='absolute -top-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#c8102e] text-white shadow-md'>
                  <HelpCircle size={18} />
                </div>
              </div>

              {/* Tiêu đề */}
              <h1 className='mb-6 text-4xl font-extrabold tracking-tight text-gray-900 leading-tight'>
                Gửi yêu cầu <br />
                <span className='text-[#c8102e]'>tư vấn</span>
              </h1>

              {/* Nội dung thông báo */}
              <div className='space-y-4 text-sm text-gray-600 leading-relaxed'>
                <p className='font-medium text-gray-800'>
                  Rất tiếc, Chatbot chưa thể trả lời đầy đủ câu hỏi của bạn.
                </p>
                <p>
                  Vui lòng để lại thông tin, Cán bộ tuyển sinh của PTIT sẽ liên hệ và hỗ trợ bạn
                  trong thời gian sớm nhất (dưới 24h).
                </p>
              </div>
            </div>

            {/* ẢNH NỀN NÉT VẼ TÒA NHÀ - Chỉ hiển thị to ra ở cột trái */}
            <div className='absolute -bottom-10 -left-6 z-0 hidden lg:block opacity-25 pointer-events-none select-none'>
              <img
                src={ptitLineArt}
                alt='PTIT Background'
                className='w-[450px] max-w-none object-contain object-left-bottom'
              />
            </div>

          </div>

          {/* CỘT GIỮA: Form thông tin */}
          <div className='relative z-10 rounded-2xl bg-white p-6 shadow-sm border border-gray-100 sm:p-8 lg:col-span-6'>
            {isSuccess ? (
              <SuccessState onClose={handleReset} />
            ) : (
              <ConsultationForm
                formData={formData}
                errors={errors}
                isSubmitting={isSubmitting}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              />
            )}
          </div>

          {/* CỘT PHẢI: Quy trình & Kênh hỗ trợ */}
          <div className='relative z-10 flex flex-col gap-6 lg:col-span-3'>
            {/* Quy trình xử lý */}
            <div className='rounded-2xl bg-white p-6 shadow-sm border border-gray-100'>
              <h3 className='mb-5 text-base font-bold text-gray-900'>Quy trình xử lý yêu cầu</h3>

              <div className='relative space-y-6 pl-2'>
                <div className='absolute left-[21px] top-3 h-[calc(100%-24px)] w-[1px] border-l-2 border-dashed border-red-200' />

                {/* Bước 1 */}
                <div className='relative flex items-start gap-3.5'>
                  <div className='z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-50 text-[#c8102e]'>
                    <FileText size={16} />
                  </div>
                  <div>
                    <h4 className='text-sm font-bold text-gray-900'>1. Tiếp nhận yêu cầu</h4>
                    <p className='mt-0.5 text-xs text-gray-500 leading-normal'>
                      Hệ thống ghi nhận câu hỏi và thông tin của bạn.
                    </p>
                  </div>
                </div>

                {/* Bước 2 */}
                <div className='relative flex items-start gap-3.5'>
                  <div className='z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-50 text-[#c8102e]'>
                    <User size={16} />
                  </div>
                  <div>
                    <h4 className='text-sm font-bold text-gray-900'>2. Cán bộ tư vấn</h4>
                    <p className='mt-0.5 text-xs text-gray-500 leading-normal'>
                      Cán bộ tuyển sinh sẽ xem xét và phản hồi yêu cầu của bạn.
                    </p>
                  </div>
                </div>

                {/* Bước 3 */}
                <div className='relative flex items-start gap-3.5'>
                  <div className='z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-50 text-[#c8102e]'>
                    <Mail size={16} />
                  </div>
                  <div>
                    <h4 className='text-sm font-bold text-gray-900'>3. Liên hệ trong 24h</h4>
                    <p className='mt-0.5 text-xs text-gray-500 leading-normal'>
                      Chúng tôi sẽ liên hệ qua SĐT/Email mà bạn cung cấp.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Các kênh hỗ trợ khác */}
            <div className='rounded-2xl bg-white p-6 shadow-sm border border-gray-100'>
              <h3 className='mb-4 text-base font-bold text-gray-900'>Các kênh hỗ trợ khác</h3>

              <div className='space-y-4 text-xs'>
                <div className='flex items-start gap-3'>
                  <div className='flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-50 text-[#c8102e]'>
                    <Phone size={14} />
                  </div>
                  <div>
                    <p className='font-semibold text-gray-800'>Hotline tuyển sinh</p>
                    <p className='font-bold text-gray-900 text-sm'>024 3773 1861</p>
                  </div>
                </div>

                <div className='flex items-start gap-3'>
                  <div className='flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-50 text-[#c8102e]'>
                    <Mail size={14} />
                  </div>
                  <div>
                    <p className='font-semibold text-gray-800'>Email</p>
                    <p className='text-gray-900 font-medium'>tuyensinh@ptit.edu.vn</p>
                  </div>
                </div>

                <div className='flex items-start gap-3'>
                  <div className='flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-50 text-[#c8102e]'>
                    <Globe size={14} />
                  </div>
                  <div>
                    <p className='font-semibold text-gray-800'>Website</p>
                    <p className='text-gray-900 font-medium'>https://ptit.edu.vn</p>
                  </div>
                </div>

                <div className='flex items-start gap-3'>
                  <div className='flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-xs'>
                    f
                  </div>
                  <div>
                    <p className='font-semibold text-gray-800'>Facebook</p>
                    <p className='text-gray-900 font-medium'>fb.com/HocvienPTIT</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ConsultationPage;