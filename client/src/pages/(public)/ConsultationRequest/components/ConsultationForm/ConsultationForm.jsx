import { motion, useReducedMotion } from 'framer-motion';
import { Lock, Mail, MessageSquareText, Phone, Send, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const ConsultationForm = ({
  formData,
  errors,
  isSubmitting,
  userEmail,
  handleChange,
  handleSubmit,
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        prefersReducedMotion
          ? false
          : {
              opacity: 0,
            }
      }
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 0.35,
      }}
    >
      <div className='mb-6 flex items-start gap-3'>
        <motion.div
          initial={
            prefersReducedMotion
              ? false
              : {
                  scale: 0.85,
                  opacity: 0,
                }
          }
          animate={{
            scale: 1,
            opacity: 1,
          }}
          transition={{
            delay: 0.12,
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#c8102e]'
        >
          <MessageSquareText size={22} />
        </motion.div>

        <div>
          <h2 className='text-xl font-bold text-gray-900'>Thông tin yêu cầu tư vấn</h2>

          <p className='text-sm text-gray-500'>
            Vui lòng cung cấp thông tin để chúng tôi hỗ trợ bạn tốt hơn
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <div>
          <label className='mb-1.5 block text-sm font-semibold text-gray-800'>
            Câu hỏi của bạn
          </label>

          <textarea
            name='question'
            value={formData.question}
            onChange={handleChange}
            rows='4'
            maxLength={5000}
            placeholder='Nhập nội dung bạn cần cán bộ tuyển sinh tư vấn'
            className={`w-full resize-y rounded-xl border p-3 text-sm text-gray-700 outline-none transition-all duration-300 focus:border-[#c8102e] focus:ring-2 focus:ring-red-100 ${
              errors.question
                ? 'border-red-500 bg-red-50/20'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          />

          {errors.question && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className='mt-1 text-xs text-red-500'
            >
              {errors.question}
            </motion.p>
          )}
        </div>

        <div>
          <label className='mb-1.5 block text-sm font-semibold text-gray-800'>Số điện thoại</label>

          <div className='relative'>
            <Phone size={18} className='absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400' />

            <input
              type='text'
              name='phone'
              value={formData.phone}
              onChange={handleChange}
              placeholder='Nhập số điện thoại của bạn'
              className={`w-full rounded-xl border py-2.5 pl-10 pr-4 text-sm outline-none transition-all duration-300 focus:border-[#c8102e] focus:ring-2 focus:ring-red-100 ${
                errors.phone
                  ? 'border-red-500 bg-red-50/20'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            />
          </div>

          {errors.phone && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className='mt-1 text-xs text-red-500'
            >
              {errors.phone}
            </motion.p>
          )}
        </div>

        <div>
          <label className='mb-1.5 block text-sm font-semibold text-gray-800'>Email liên hệ</label>

          {userEmail ? (
            <div className='relative flex items-center gap-2.5 rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4'>
              <Mail
                size={18}
                className='absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400'
              />

              <span className='text-sm text-gray-700'>{userEmail}</span>
            </div>
          ) : (
            <div className='flex items-center gap-2 rounded-xl border border-dashed border-gray-200 bg-gray-50/80 px-4 py-2.5'>
              <Mail size={16} className='shrink-0 text-gray-400' />

              <span className='text-sm text-gray-500'>
                <Link to='/login' className='font-medium text-[#c8102e] hover:underline'>
                  Đăng nhập
                </Link>{' '}
                để tự động điền email liên hệ từ tài khoản của bạn
              </span>
            </div>
          )}
        </div>

        {errors.contact && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className='text-xs text-red-500'
          >
            {errors.contact}
          </motion.p>
        )}

        {errors.submit && (
          <motion.p
            role='alert'
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className='text-sm text-red-600'
          >
            {errors.submit}
          </motion.p>
        )}

        <motion.div
          whileHover={
            prefersReducedMotion
              ? undefined
              : {
                  x: 2,
                }
          }
          className='flex items-center gap-2.5 rounded-xl bg-red-50/80 p-3 text-xs text-gray-700'
        >
          <ShieldCheck size={18} className='shrink-0 text-[#c8102e]' />

          <span>Thông tin của bạn được bảo mật và chỉ dùng để hỗ trợ tư vấn tuyển sinh.</span>
        </motion.div>

        <motion.button
          type='submit'
          disabled={isSubmitting}
          whileHover={
            prefersReducedMotion || isSubmitting
              ? undefined
              : {
                  y: -2,
                  scale: 1.01,
                }
          }
          whileTap={
            isSubmitting
              ? undefined
              : {
                  scale: 0.985,
                }
          }
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 22,
          }}
          className='mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#c8102e] py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60'
        >
          <motion.span
            animate={
              isSubmitting
                ? {
                    x: [0, 3, 0],
                  }
                : {}
            }
            transition={{
              duration: 1,
              repeat: isSubmitting ? Infinity : 0,
            }}
          >
            <Send size={16} />
          </motion.span>

          {isSubmitting ? 'Đang gửi...' : 'Gửi yêu cầu tư vấn'}
        </motion.button>

        <p className='mt-2 flex items-center justify-center gap-1 text-center text-xs text-gray-500'>
          <Lock size={12} className='text-gray-400' />
          Bằng việc gửi thông tin, bạn đồng ý với{' '}
          <a href='#' className='font-medium text-red-600 underline hover:text-red-700'>
            Chính sách bảo mật
          </a>{' '}
          của PTIT.
        </p>
      </form>
    </motion.div>
  );
};

export default ConsultationForm;
