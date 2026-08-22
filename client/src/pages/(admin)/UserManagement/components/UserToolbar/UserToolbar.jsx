import { Search } from 'lucide-react';

const UserToolbar = () => {
  return (
    <div className='mb-4 flex items-center justify-between'>
      {/* Search Bar */}
      <div className='relative w-full max-w-md'>
        <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
          <Search className='h-5 w-5 text-gray-400' />
        </div>
        <input
          type='text'
          className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-red-500 focus:ring-red-500 outline-none'
          placeholder='Tìm kiếm theo họ tên hoặc email...'
        />
      </div>
    </div>
  );
};

export default UserToolbar;