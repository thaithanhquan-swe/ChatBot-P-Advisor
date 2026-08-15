import PendingFilter from './components/PendingFilter/PendingFilter';
import PendingHeader from './components/PendingHeader/PendingHeader';
import PendingQuestionTable from './components/PendingQuestionTable/PendingQuestionTable';
import PendingStatistics from './components/PendingStatistics/PendingStatistics';

function PendingQuestions() {
  return (
    <div className='mx-auto max-w-[1600px]'>
      <PendingHeader />
      <PendingStatistics />

      <div className='mt-5 grid grid-cols-[minmax(0,1fr)_254px] gap-5'>
        <PendingQuestionTable />
        <PendingFilter />
      </div>
    </div>
  );
}

export default PendingQuestions;
