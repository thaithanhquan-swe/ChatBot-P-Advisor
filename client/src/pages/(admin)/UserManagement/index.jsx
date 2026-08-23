import UserFilter from './components/UserFilter/UserFilter';
import UserHeader from './components/UserHeader/UserHeader';
import UserTable from './components/UserTable/UserTable';
import UserToolbar from './components/UserToolbar/UserToolbar';
import UserStatistics from './components/UserStatistics/UserStatistics';

function UserManagement() {
  return (
    <div className='mx-auto max-w-[1600px]'>
      <UserHeader />
      <UserStatistics />

      <div className='mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[1fr_250px]'>
        <div className='min-w-0 rounded-xl border border-slate-200 bg-white p-5'>
          <UserToolbar />
          <UserTable />
        </div>
        <UserFilter />
      </div>
    </div>
  );
}

export default UserManagement;
