import { Filter } from 'lucide-react';

const UserFilter = () => {
  return (
    <div className='rounded-xl border border-slate-200 bg-white p-5 h-fit'>
      <div className='mb-4 flex items-center gap-2 border-b pb-3'>
        <Filter className='h-5 w-5 text-gray-700' />
        <h3 className='font-bold text-gray-900'>Bộ lọc & Sắp xếp</h3>
      </div>

      <div className='space-y-4'>
        {/* Lọc theo vai trò */}
        <div>
          <label className='mb-1.5 block text-sm font-medium text-gray-700'>Vai trò</label>
          <select className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-red-500 focus:ring-red-500 outline-none'>
            <option value=''>Tất cả vai trò</option>
            <option value='ADMIN'>Admin</option>
            <option value='ADVISOR'>Advisor</option>
            <option value='USER'>User</option>
          </select>
        </div>

        {/* Lọc theo trạng thái */}
        <div>
          <label className='mb-1.5 block text-sm font-medium text-gray-700'>Trạng thái</label>
          <select className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-red-500 focus:ring-red-500 outline-none'>
            <option value=''>Tất cả trạng thái</option>
            <option value='ACTIVE'>Hoạt động (ACTIVE)</option>
            <option value='INACTIVE'>Vô hiệu hóa (INACTIVE)</option>
          </select>
        </div>

        <hr className='my-2 border-slate-100' />

        {/* Lọc theo ngày */}
        <div>
          <label className='mb-1.5 block text-sm font-medium text-gray-700'>Từ ngày</label>
          <input type='date' className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-red-500 focus:ring-red-500 outline-none' />
        </div>
        <div>
          <label className='mb-1.5 block text-sm font-medium text-gray-700'>Đến ngày</label>
          <input type='date' className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-red-500 focus:ring-red-500 outline-none' />
        </div>

        <hr className='my-2 border-slate-100' />

        {/* Sắp xếp */}
        <div>
          <label className='mb-1.5 block text-sm font-medium text-gray-700'>Sắp xếp theo</label>
          <select className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-red-500 focus:ring-red-500 outline-none'>
            <option value='createdAt'>Ngày tạo</option>
            <option value='updatedAt'>Ngày cập nhật</option>
            <option value='name'>Họ và tên</option>
            <option value='email'>Email</option>
          </select>
        </div>
        <div>
          <label className='mb-1.5 block text-sm font-medium text-gray-700'>Thứ tự</label>
          <select className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-red-500 focus:ring-red-500 outline-none'>
            <option value='DESC'>Mới nhất trước (Giảm dần)</option>
            <option value='ASC'>Cũ nhất trước (Tăng dần)</option>
          </select>
        </div>

        {/* Buttons */}
        <div className='mt-6 flex gap-2 pt-2'>
          <button className='w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'>
            Đặt lại
          </button>
          <button className='w-full rounded-lg bg-[#c8102e] px-4 py-2 text-sm font-medium text-white hover:bg-red-700'>
            Áp dụng
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserFilter;