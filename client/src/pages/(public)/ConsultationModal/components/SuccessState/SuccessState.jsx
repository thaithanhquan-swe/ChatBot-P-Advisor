import { CheckCircle2 } from 'lucide-react';

const SuccessState = ({ onClose }) => {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <CheckCircle2 size={64} className="mb-4 text-green-500" />
      <h3 className="mb-2 text-2xl font-bold text-gray-800">Gửi yêu cầu thành công!</h3>
      <p className="text-gray-600">
        Cán bộ tuyển sinh đã nhận được câu hỏi của bạn <br />
        Chúng tôi sẽ liên hệ lại trong vòng 24h tới
      </p>
      <button
        onClick={onClose}
        className="mt-6 rounded-lg bg-[#b30000] px-6 py-2.5 font-semibold text-white transition-colors hover:bg-red-800"
      >
        Đóng cửa sổ
      </button>
    </div>
  );
};

export default SuccessState;