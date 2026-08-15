import { Bell, FileText, MessageCircle, UserRound } from 'lucide-react';

const activities = [
  {
    title: 'Admin PTIT đã cập nhật FAQ: Học phí năm 2025',
    time: '10 phút trước',
    icon: FileText,
  },
  {
    title: 'Admin PTIT đã trả lời câu hỏi tồn đọng',
    time: '35 phút trước',
    icon: MessageCircle,
  },
  {
    title: 'User support@ptit.edu.vn đăng nhập hệ thống',
    time: '1 giờ trước',
    icon: UserRound,
  },
  {
    title: 'Admin PTIT đã thêm tài liệu mới: Đề án tuyển sinh 2025',
    time: '2 giờ trước',
    icon: FileText,
  },
  {
    title: 'Backup hệ thống hoàn tất',
    time: '3 giờ trước',
    icon: Bell,
  },
];

function ActivityList() {
  return (
    <div>
      <div className='mb-5 flex items-center justify-between'>
        <h2 className='text-[15px] font-bold text-slate-900'>Hoạt động hệ thống gần đây</h2>

        <button type='button' className='text-[12px] font-medium text-[#D71920] hover:underline'>
          Xem tất cả →
        </button>
      </div>

      <div className='space-y-1'>
        {activities.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className='flex items-center gap-3 rounded-lg px-2 py-3 hover:bg-slate-50'
            >
              <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-50 text-[#D71920]'>
                <Icon size={17} strokeWidth={1.7} />
              </div>

              <div className='min-w-0 flex-1'>
                <p className='truncate text-[12px] font-medium text-slate-700'>{item.title}</p>

                <p className='mt-1 text-[10px] text-slate-400'>{item.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ActivityList;
