import { FileText, Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DOCUMENT_TYPES } from '../../constants/documents';

const DocumentToolbar = ({ search, onSearchChange, type, onTypeChange, sort, onSortChange }) => {
  return (
    <div className='rounded-2xl border border-gray-200 bg-white p-2.5 shadow-[0_8px_30px_rgba(15,23,42,0.06)]'>
      <div className='grid gap-2.5 md:grid-cols-[minmax(0,1fr)_220px_200px]'>
        <div className='relative flex items-center'>
          <Search size={18} className='absolute left-3.5 text-gray-400 pointer-events-none' />
          <Input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder='Tìm kiếm tài liệu, tên file...'
            className='h-11 pl-10 text-[13.5px] rounded-xl border-gray-200 focus-visible:ring-[#c8102e]/20'
          />
        </div>

        <Select value={type} onValueChange={onTypeChange}>
          <SelectTrigger className='h-11 rounded-xl border-gray-200 text-[13.5px] font-medium text-gray-800'>
            <div className='flex items-center gap-2 truncate'>
              <FileText size={17} className='text-gray-500 shrink-0' />
              <SelectValue />
            </div>
          </SelectTrigger>
          <SelectContent>
            {DOCUMENT_TYPES.map((item) => (
              <SelectItem key={item} value={item} className='text-[13px]'>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sort} onValueChange={onSortChange}>
          <SelectTrigger className='h-11 rounded-xl border-gray-200 text-[13.5px] font-medium text-gray-800'>
            <div className='flex items-center gap-2 truncate'>
              <SlidersHorizontal size={17} className='text-gray-500 shrink-0' />
              <SelectValue placeholder='Mới nhất' />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='Mới nhất' className='text-[13px]'>
              Mới nhất
            </SelectItem>
            <SelectItem value='Cũ nhất' className='text-[13px]'>
              Cũ nhất
            </SelectItem>
            <SelectItem value='Tên A - Z' className='text-[13px]'>
              Tên A - Z
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default DocumentToolbar;


