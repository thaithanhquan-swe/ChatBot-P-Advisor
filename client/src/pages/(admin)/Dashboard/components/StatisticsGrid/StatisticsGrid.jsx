import { CircleHelp, FileText, MessageCircle, TrendingUp, Users } from 'lucide-react';
import { motion } from 'framer-motion';

import StatisticCard from '../StatisticCard/StatisticCard';

function StatisticsGrid({ statistics }) {
  const items = [
    {
      title: 'Cuộc trò chuyện',
      value: statistics.chats,
      icon: MessageCircle,
    },
    {
      title: 'Câu hỏi tồn đọng',
      value: statistics.pending,
      icon: CircleHelp,
    },
    {
      title: 'FAQ / Tài liệu',
      value: statistics.resources,
      icon: FileText,
    },
    {
      title: 'Người dùng',
      value: statistics.users,
      icon: Users,
    },
    {
      title: 'Tỷ lệ hài lòng',
      value: 'N/A',
      icon: TrendingUp,
    },
  ];

  return (
    <motion.div
      initial='hidden'
      animate='visible'
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.11,
            delayChildren: 0.05,
          },
        },
      }}
      className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5'
    >
      {items.map((item, index) => (
        <StatisticCard key={item.title} {...item} index={index} />
      ))}
    </motion.div>
  );
}

export default StatisticsGrid;
