import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const formatTime = (value) =>
  value
    ? new Date(value).toLocaleString('vi-VN', {
        dateStyle: 'short',
        timeStyle: 'short',
      })
    : '-';

function PendingQuestionList({ items = [] }) {
  return (
    <div>
      <div className='mb-5 flex items-center justify-between'>
        <h2 className='text-[15px] font-bold text-slate-900'>Lượt hỏi dạo gần đây</h2>

        <Link
          to='/admin/messages'
          className='text-[12px] font-medium text-[#D71920] hover:underline'
        >
          Xem tất cả
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Người dùng</TableHead>

            <TableHead>Phiên chat</TableHead>

            <TableHead className='text-right'>Thời gian</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {items.slice(0, 5).map((item, index) => (
            <motion.tr
              key={item.id || item.sessionToken}
              initial={{
                opacity: 0,
                x: -12,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: index * 0.09,
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                x: 3,
              }}
              className='border-b transition-colors hover:bg-slate-50'
            >
              <TableCell className='font-medium'>
                {item.username || item.userEmail || 'Khách'}
              </TableCell>

              <TableCell>
                <Badge className='bg-red-50 text-[#D71920]'>{item.title || 'Cần tư vấn'}</Badge>
              </TableCell>

              <TableCell className='text-right text-xs text-muted-foreground'>
                {formatTime(item.createdAt)}
              </TableCell>
            </motion.tr>
          ))}

          {!items.length ? (
            <TableRow>
              <TableCell colSpan={3} className='py-8 text-center text-sm text-muted-foreground'>
                Không có phiên chat tồn đọng.
              </TableCell>
            </TableRow>
          ) : null}
        </TableBody>
      </Table>
    </div>
  );
}

export default PendingQuestionList;
