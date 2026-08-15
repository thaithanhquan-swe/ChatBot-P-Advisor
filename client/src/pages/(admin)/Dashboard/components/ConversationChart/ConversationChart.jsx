function ConversationChart() {
  const points = [
    [20, 105],
    [85, 130],
    [150, 82],
    [215, 118],
    [280, 88],
    [345, 124],
    [410, 55],
  ];

  const path = points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point[0]} ${point[1]}`)
    .join(' ');

  return (
    <div>
      <div className='mb-5 flex items-center justify-between'>
        <h2 className='text-[15px] font-bold text-slate-900'>Lượt trò chuyện theo ngày</h2>

        <button
          type='button'
          className='rounded-lg border border-slate-200 px-3 py-2 text-[11px] text-slate-600'
        >
          7 ngày qua
        </button>
      </div>

      <div className='relative h-[260px] w-full overflow-hidden'>
        {/* Y axis */}
        <div className='absolute inset-y-0 left-0 flex w-8 flex-col justify-between py-2 text-[10px] text-slate-400'>
          <span>1,000</span>
          <span>800</span>
          <span>600</span>
          <span>400</span>
          <span>200</span>
          <span>0</span>
        </div>

        {/* Chart */}
        <div className='absolute inset-y-0 left-10 right-0'>
          <div className='absolute inset-0 flex flex-col justify-between py-2'>
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className='border-t border-slate-100' />
            ))}
          </div>

          <svg
            viewBox='0 0 430 150'
            preserveAspectRatio='none'
            className='absolute inset-2 h-[calc(100%-28px)] w-[calc(100%-8px)]'
          >
            <defs>
              <linearGradient id='chartFill' x1='0' x2='0' y1='0' y2='1'>
                <stop offset='0%' stopColor='#D71920' stopOpacity='0.12' />

                <stop offset='100%' stopColor='#D71920' stopOpacity='0' />
              </linearGradient>
            </defs>

            <path d={`${path} L 410 150 L 20 150 Z`} fill='url(#chartFill)' />

            <path
              d={path}
              fill='none'
              stroke='#D71920'
              strokeWidth='2.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />

            {points.map(([x, y], index) => (
              <circle
                key={index}
                cx={x}
                cy={y}
                r='3.5'
                fill='white'
                stroke='#D71920'
                strokeWidth='2'
              />
            ))}
          </svg>

          {/* X axis */}
          <div className='absolute bottom-0 left-0 right-0 flex justify-between text-[10px] text-slate-400'>
            <span>09/05</span>
            <span>10/05</span>
            <span>11/05</span>
            <span>12/05</span>
            <span>13/05</span>
            <span>14/05</span>
            <span>15/05</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConversationChart;
