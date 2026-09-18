import { BadgeCheck, ShieldCheck, UserRoundCog, Users } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function UserStatistics({ data, loading }) {
  const total = data?.totalUsers ?? 0;

  const items = [
    {
      label: 'Tổng người dùng',
      value: total,
      description: 'Tất cả tài khoản',
      icon: Users,
      iconClassName: 'bg-blue-50 text-blue-600',
    },
    {
      label: 'Đã xác thực',
      value: data?.verifiedUsers ?? 0,
      description: total
        ? `${Math.round(((data?.verifiedUsers ?? 0) / total) * 100)}% tổng tài khoản`
        : '0% tổng tài khoản',
      icon: BadgeCheck,
      iconClassName: 'bg-emerald-50 text-emerald-600',
    },
    {
      label: 'Tư vấn viên',
      value: data?.advisorCount ?? 0,
      description: 'Tài khoản advisor',
      icon: UserRoundCog,
      iconClassName: 'bg-orange-50 text-orange-600',
    },
    {
      label: 'Quản trị viên',
      value: data?.adminCount ?? 0,
      description: 'Tài khoản admin',
      icon: ShieldCheck,
      iconClassName: 'bg-red-50 text-red-600',
    },
  ];

  return (
    <section className='grid grid-cols-1 gap-3 min-[380px]:grid-cols-2 sm:gap-4 xl:grid-cols-4'>
      {items.map(({ label, value, description, icon: Icon, iconClassName }) => (
        <Card key={label}>
          <CardContent className='flex items-center gap-3 p-3 sm:gap-4 sm:p-5'>
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full sm:h-11 sm:w-11 ${iconClassName}`}
            >
              <Icon className='h-5 w-5' />
            </div>

            <div>
              <p className='text-sm text-muted-foreground'>{label}</p>

              {loading ? (
                <Skeleton className='my-1 h-7 w-20' />
              ) : (
                <p className='text-xl font-bold sm:text-2xl'>
                  {Number(value).toLocaleString('vi-VN')}
                </p>
              )}

              <p className='text-xs text-muted-foreground'>{description}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}

export default UserStatistics;
