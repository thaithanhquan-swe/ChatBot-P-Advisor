import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

const AnswerBlock = ({ block }) => {
  switch (block.type) {
    case 'text':
      return <p className='text-[14.5px] leading-relaxed text-gray-800'>{block.content}</p>;

    case 'list':
      return (
        <ul className='flex flex-col gap-1.5'>
          {block.items.map((item) => (
            <li key={item} className='flex items-start gap-2 text-[14px] leading-relaxed text-gray-700'>
              <CheckCircle2 size={15} className='mt-0.5 shrink-0 text-(--primary-color)' />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );

    case 'highlight':
      return (
        <div className='rounded-(--radius-card) border border-(--primary-color-border) bg-(--primary-color-soft) px-3.5 py-2.5 text-[13px] leading-relaxed text-gray-700'>
          {block.content}
        </div>
      );

    case 'table':
      return (
        <div className='overflow-x-auto rounded-(--radius-card) border border-(--border-subtle)'>
          <table className='w-full min-w-full text-left text-[13px]'>
            <thead>
              <tr className='bg-(--surface-muted)'>
                {block.columns.map((col) => (
                  <th key={col} className='px-3 py-2 font-semibold text-gray-700'>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className='border-t border-(--border-subtle)'>
                  {row.map((cell, j) => (
                    <td key={j} className='px-3 py-2 text-gray-600'>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case 'link':
      return (
        <a
          href={block.href}
          className='inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-(--primary-color) underline decoration-(--primary-color-border) underline-offset-2 hover:decoration-(--primary-color)'
        >
          {block.label}
          <ArrowUpRight size={14} />
        </a>
      );

    default:
      return null;
  }
};

export default AnswerBlock;
