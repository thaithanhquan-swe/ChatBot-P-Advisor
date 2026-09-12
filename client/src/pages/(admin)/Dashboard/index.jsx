import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

import {
  getRegisteredUserChatSessions,
  getWaitingChatSessions,
} from '@/services/chat-session-service';
import { getConsultationRequests } from '@/services/consultation-request-service';
import { getDocuments } from '@/services/document-service';
import { getFaqsForManagement } from '@/services/faq-service';
import { getUserStatistics } from '@/services/user-service';

import ActivityList from './components/ActivityList/ActivityList';
import CategoryChart from './components/CategoryChart/CategoryChart';
import ConversationChart from './components/ConversationChart/ConversationChart';
import DashboardHeader from './components/DashboardHeader/DashboardHeader';
import PendingQuestionList from './components/PendingQuestionList/PendingQuestionList';
import StatisticsGrid from './components/StatisticsGrid/StatisticsGrid';

const getTotal = (page) => page?.totalElements ?? page?.totalItems ?? page?.total ?? 0;

const getItems = (page) => page?.content ?? page?.data ?? page?.items ?? [];

function DashboardLoading() {
  return (
    <div className='space-y-5'>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5'>
        {Array.from({ length: 5 }).map((_, index) => (
          <Card key={index}>
            <CardContent className='space-y-4 p-5'>
              <Skeleton className='h-11 w-11 rounded-full' />
              <Skeleton className='h-8 w-24' />
              <Skeleton className='h-4 w-32' />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className='min-h-72'>
            <CardContent className='space-y-4 p-5'>
              <Skeleton className='h-5 w-48' />
              <Skeleton className='h-52 w-full' />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    let active = true;

    const loadDashboard = async () => {
      try {
        const [
          users,
          chats,
          waiting,
          faqs,
          documents,
          consultations,
          pendingConsultations,
          inProgressConsultations,
          resolvedConsultations,
        ] = await Promise.all([
          getUserStatistics(),
          getRegisteredUserChatSessions(0, 100),
          getWaitingChatSessions(0, 6),
          getFaqsForManagement({
            page: 0,
            size: 100,
            sortBy: 'updatedAt',
            sortDirection: 'DESC',
          }),
          getDocuments({
            page: 0,
            size: 1,
          }),
          getConsultationRequests({
            page: 0,
            size: 6,
            sortBy: 'createdAt',
            sortDirection: 'DESC',
          }),
          getConsultationRequests({ status: 'PENDING', page: 0, size: 1 }),
          getConsultationRequests({ status: 'IN_PROGRESS', page: 0, size: 1 }),
          getConsultationRequests({ status: 'RESOLVED', page: 0, size: 1 }),
        ]);

        if (!active) return;

        setData({
          statistics: {
            chats: getTotal(chats),
            pending: getTotal(waiting),
            resources: getTotal(faqs) + getTotal(documents),
            users: users?.totalUsers ?? users?.userCount ?? 0,
          },
          chats: getItems(chats),
          faqs: getItems(faqs),
          waiting: getItems(waiting),
          consultations: getItems(consultations),
          consultationStats: {
            PENDING: getTotal(pendingConsultations),
            IN_PROGRESS: getTotal(inProgressConsultations),
            RESOLVED: getTotal(resolvedConsultations),
          },
        });
      } catch {
        if (active) {
          setError('Không thể tải dữ liệu Dashboard. Vui lòng thử lại sau.');
        }
      }
    };

    void loadDashboard();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className='mx-auto max-w-[1600px]'>
      <DashboardHeader />

      {error ? (
        <motion.div
          initial={
            prefersReducedMotion
              ? false
              : {
                  opacity: 0,
                  y: -8,
                }
          }
          animate={{
            opacity: 1,
            y: 0,
          }}
        >
          <Card className='mb-5 border-red-200 bg-red-50'>
            <CardContent className='flex items-center gap-3 p-4 text-sm text-red-700'>
              <AlertCircle size={18} />
              {error}
            </CardContent>
          </Card>
        </motion.div>
      ) : null}

      {!data ? (
        <DashboardLoading />
      ) : (
        <motion.div
          initial='hidden'
          animate='visible'
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          <motion.div
            variants={{
              hidden: {
                opacity: 0,
                y: 16,
              },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
          >
            <StatisticsGrid statistics={data.statistics} />
          </motion.div>

          <motion.div
            variants={{
              hidden: {
                opacity: 0,
                y: 18,
              },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
            className='mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[1.35fr_1fr]'
          >
            <Card className='transition-shadow duration-300 hover:shadow-md'>
              <CardContent className='p-5'>
                <ConversationChart sessions={data.chats} />
              </CardContent>
            </Card>

            <Card className='transition-shadow duration-300 hover:shadow-md'>
              <CardContent className='p-5'>
                <CategoryChart
                  consultations={data.consultations}
                  consultationStats={data.consultationStats}
                />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            variants={{
              hidden: {
                opacity: 0,
                y: 18,
              },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
            className='mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2'
          >
            <Card className='transition-shadow duration-300 hover:shadow-md'>
              <CardContent className='p-5'>
                <PendingQuestionList items={data.waiting} />
              </CardContent>
            </Card>

            <Card className='transition-shadow duration-300 hover:shadow-md'>
              <CardContent className='p-5'>
                <ActivityList faqs={data.faqs} consultations={data.consultations} />
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default Dashboard;
