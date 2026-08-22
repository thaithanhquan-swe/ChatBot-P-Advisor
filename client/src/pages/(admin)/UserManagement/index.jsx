import UserFilter from './components/UserFilter/UserFilter';
import UserHeader from './components/UserHeader/UserHeader';
import UserTable from './components/UserTable/UserTable';
import UserToolbar from './components/UserToolbar/UserToolbar';

function UserManagement() {
  return (
    <div className='mx-auto max-w-[1600px]'>
      {/* Header trang và Breadcrumb */}
      <UserHeader />

      {/* Nội dung chính chia cột */}
      <div className='mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[1fr_250px]'>
        
        {/* Khối bên trái: Bảng và Thanh công cụ */}
        <div className='min-w-0 rounded-xl border border-slate-200 bg-white p-5'>
          <UserToolbar />
          <UserTable />
        </div>

        {/* Khối bên phải: Bộ lọc */}
        <UserFilter />
        
      </div>
    </div>
  );
}

export default UserManagement;