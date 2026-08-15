import { CircleHelp, FileText, MessageCircle, TrendingUp, Users } from 'lucide-react';
import StatisticCard from '../StatisticCard/StatisticCard';

const statistics = [
  {
    title: 'Cuộc trò chuyện',
    value: '1,248',
    change: '+12.5%',
    description: 'so với hôm qua',
    icon: MessageCircle,
  },
  {
    title: 'Câu hỏi tồn đọng',
    value: '86',
    change: '-8.2%',
    description: 'so với hôm qua',
    icon: CircleHelp,
  },
  {
    title: 'FAQ / Tài liệu',
    value: '358',
    change: '+5',
    description: 'mới cập nhật',
    icon: FileText,
  },
  {
    title: 'Người dùng',
    value: '1,532',
    change: '+18.7%',
    description: 'so với tuần trước',
    icon: Users,
  },
  {
    title: 'Tỷ lệ hài lòng',
    value: '92%',
    change: '+3.4%',
    description: 'so với tuần trước',
    icon: TrendingUp,
  },
];

function StatisticsGrid() {
  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5'>
      {statistics.map((item) => (
        <StatisticCard key={item.title} {...item} />
      ))}
    </div>
  );
}

export default StatisticsGrid;
