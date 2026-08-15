const categories = [
  {
    name: 'Tuyển sinh',
    value: '38',
    percent: '44%',
    color: '#D71920',
  },
  {
    name: 'Học phí – Học bổng',
    value: '22',
    percent: '26%',
    color: '#F97316',
  },
  {
    name: 'Ngành học',
    value: '14',
    percent: '18%',
    color: '#FBBF24',
  },
  {
    name: 'Khác',
    value: '12',
    percent: '14%',
    color: '#94A3B8',
  },
];

function CategoryChart() {
  return (
    <div>
      <h2 className='mb-5 text-[15px] font-bold text-slate-900'>Phân loại câu hỏi tồn đọng</h2>

      <div className='flex flex-col items-center justify-center gap-7 sm:flex-row'>
        {/* Donut */}
        <div
          className='relative h-[170px] w-[170px] shrink-0 rounded-full'
          style={{
            background:
              'conic-gradient(#D71920 0deg 158deg, #F97316 158deg 252deg, #FBBF24 252deg 317deg, #94A3B8 317deg 360deg)',
          }}
        >
          <div className='absolute inset-[38px] flex items-center justify-center rounded-full bg-white'>
            <div className='text-center'>
              <p className='text-2xl font-bold text-slate-900'>86</p>

              <p className='text-[10px] text-slate-400'>câu hỏi</p>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className='w-full max-w-[220px] space-y-4'>
          {categories.map((category) => (
            <div key={category.name} className='flex items-center gap-2'>
              <span
                className='h-3 w-3 rounded-sm'
                style={{
                  backgroundColor: category.color,
                }}
              />

              <span className='flex-1 text-[11px] text-slate-600'>{category.name}</span>

              <span className='text-[11px] font-semibold text-slate-700'>{category.value}</span>

              <span className='w-8 text-right text-[10px] text-slate-400'>
                ({category.percent})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryChart;
