import ActivityList from './components/ActivityList/ActivityList';
import CategoryChart from './components/CategoryChart/CategoryChart';
import ConversationChart from './components/ConversationChart/ConversationChart';
import DashboardHeader from './components/DashboardHeader/DashboardHeader';
import PendingQuestionList from './components/PendingQuestionList/PendingQuestionList';
import StatisticsGrid from './components/StatisticsGrid/StatisticsGrid';

function Dashboard() {
  return (
    <div className='mx-auto max-w-[1600px]'>
      {/* Header */}
      <DashboardHeader />

      {/* Statistics */}
      <StatisticsGrid />

      {/* Charts */}
      <div className='mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[1.35fr_1fr]'>
        <div className='rounded-xl border border-slate-200 bg-white p-5'>
          <ConversationChart />
        </div>

        <div className='rounded-xl border border-slate-200 bg-white p-5'>
          <CategoryChart />
        </div>
      </div>

      {/* Bottom */}
      <div className='mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2'>
        <div className='rounded-xl border border-slate-200 bg-white p-5'>
          <PendingQuestionList />
        </div>

        <div className='rounded-xl border border-slate-200 bg-white p-5'>
          <ActivityList />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
