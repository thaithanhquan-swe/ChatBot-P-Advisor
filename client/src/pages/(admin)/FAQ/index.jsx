import FAQFilter from './components/FAQFilter/FAQFilter';
import FAQHeader from './components/FAQHeader/FAQHeader';
import FAQStatistics from './components/FAQStatistics/FAQStatistics';
import FAQTable from './components/FAQTable/FAQTable';
import FAQToolbar from './components/FAQToolbar/FAQToolbar';

function FAQ() {
  return (
    <div className='mx-auto max-w-[1600px]'>
      {/* Page header */}
      <FAQHeader />

      {/* Statistics */}
      <FAQStatistics />

      {/* Main content */}
      <div className='mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[1fr_250px]'>
        {/* FAQ table */}
        <div className='min-w-0 rounded-xl border border-slate-200 bg-white p-5'>
          <FAQToolbar />
          <FAQTable />
        </div>

        {/* Filter */}
        <FAQFilter />
      </div>
    </div>
  );
}

export default FAQ;
