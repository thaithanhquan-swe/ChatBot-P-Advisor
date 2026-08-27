import PendingFilter from './components/PendingFilter/PendingFilter';
import PendingHeader from './components/PendingHeader/PendingHeader';
import PendingQuestionTable from './components/PendingQuestionTable/PendingQuestionTable';
import PendingStatistics from './components/PendingStatistics/PendingStatistics';

function PendingQuestions() {
  return (
    <div className='mx-auto max-w-[1600px]'>
      <PendingHeader />
      <PendingStatistics />
      <PendingFilter />
      <div className='mt-5'>
        <PendingQuestionTable />
      </div>
    </div>
  );
}

export default PendingQuestions;
