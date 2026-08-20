import { useState } from 'react';
import ConsultationForm from './components/ConsultationForm/ConsultationForm';
import ConsultationIntro from './components/ConsultationIntro/ConsultationIntro';
import ConsultationProcess from './components/ConsultationProcess/ConsultationProcess';
import SuccessState from './components/SuccessState/SuccessState';
import SupportChannels from './components/SupportChannels/SupportChannels';

const initialFormData = {
  question: 'Điểm chuẩn ngành Công nghệ thông tin năm 2024 của PTIT là bao nhiêu?',
  fullName: '',
  phone: '',
  email: '',
};

const ConsultationRequestPage = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Vui lòng nhập họ tên';

    if (!formData.phone.trim() && !formData.email.trim()) {
      newErrors.contact = 'Vui lòng cung cấp SĐT hoặc Email để chúng tôi liên hệ';
    } else {
      if (formData.phone && !/(84|0[35789])([0-9]{8})\b/.test(formData.phone)) {
        newErrors.phone = 'Số điện thoại không hợp lệ';
      }
      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Email không hợp lệ';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1000);
  };

  const handleChange = ({ target: { name, value } }) => {
    setFormData((current) => ({ ...current, [name]: value }));
    if (errors[name] || errors.contact) {
      setErrors((current) => ({ ...current, [name]: '', contact: '' }));
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFormData(initialFormData);
  };

  return (
    <main className='relative min-h-[calc(100vh-80px)] overflow-hidden bg-gray-50/60 px-4 py-10 sm:px-6 lg:px-8'>
      <div className='relative z-10 mx-auto max-w-7xl'>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-12'>
          <ConsultationIntro />

          <section className='relative z-10 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8 lg:col-span-6'>
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
          </section>

          <aside className='relative z-10 flex flex-col gap-6 lg:col-span-3'>
            <ConsultationProcess />
            <SupportChannels />
          </aside>
        </div>
      </div>
    </main>
  );
};

export default ConsultationRequestPage;
