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
      <UserFilter />
      <div className='mt-5 min-w-0 rounded-xl border border-slate-200 bg-white p-5'>
        <UserToolbar />
        <UserTable />
      </div>
    </div>
  );
}

export default UserManagement;
