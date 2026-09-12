import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

import { getCurrentUser } from '@/services/user-service';
import {
  assignConsultationRequest,
  getConsultationRequests,
  resolveConsultationRequest,
} from '@/services/consultation-request-service';
import ConsultationRequestFilter from './components/ConsultationRequestFilter/ConsultationRequestFilter';
import ConsultationRequestHeader from './components/ConsultationRequestHeader/ConsultationRequestHeader';
import ConsultationRequestTable from './components/ConsultationRequestTable/ConsultationRequestTable';
import ConsultationRequestStatistics from './components/ConsultationRequestStatistics/ConsultationRequestStatistics';

const emptyFilters = {
  keyword: '',
  status: '',
  createdFrom: '',
  createdTo: '',
  sortBy: 'createdAt',
  sortDirection: 'DESC',
};

const PAGE_SIZE = 10;

function ConsultationRequests() {
  const [filters, setFilters] = useState(emptyFilters);
  const [debouncedKeyword, setDebouncedKeyword] = useState('');
  const [page, setPage] = useState(0);
  const keywordTimerRef = useRef(null);

  const [pageData, setPageData] = useState({
    content: [],
    pageNumber: 0,
    pageSize: PAGE_SIZE,
    totalElements: 0,
    totalPages: 1,
    last: true,
  });

  const [counts, setCounts] = useState({
    total: 0,
    PENDING: 0,
    IN_PROGRESS: 0,
    RESOLVED: 0,
    CANCELLED: 0,
  });

  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [actionId, setActionId] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const loadUser = async () => {
      try {
        const user = await getCurrentUser();
        if (!cancelled) {
          setCurrentUser(user);
        }
      } catch (error) {
        if (!cancelled) {
          console.error(error);
        }
      }
    };

    loadUser();

    return () => {
      cancelled = true;
    };
  }, []);

  const loadData = async (filterParams = filters, pageIndex = page) => {
    try {
      setLoading(true);

      const [dataResult, totalRes, pendingRes, inProgressRes, resolvedRes] = await Promise.all([
        getConsultationRequests({
          keyword: filterParams.keyword?.trim() || undefined,
          status: filterParams.status || undefined,
          createdFrom: filterParams.createdFrom || undefined,
          createdTo: filterParams.createdTo || undefined,
          sortBy: filterParams.sortBy || 'createdAt',
          sortDirection: filterParams.sortDirection || 'DESC',
          page: pageIndex,
          size: PAGE_SIZE,
        }),
        getConsultationRequests({ size: 1 }),
        getConsultationRequests({ status: 'PENDING', size: 1 }),
        getConsultationRequests({ status: 'IN_PROGRESS', size: 1 }),
        getConsultationRequests({ status: 'RESOLVED', size: 1 }),
      ]);

      setPageData({
        content: dataResult?.content || [],
        pageNumber: dataResult?.pageNumber ?? pageIndex,
        pageSize: dataResult?.pageSize ?? PAGE_SIZE,
        totalElements: dataResult?.totalElements ?? 0,
        totalPages: dataResult?.totalPages ?? 1,
        last: dataResult?.last ?? true,
      });

      setCounts({
        total: totalRes?.totalElements ?? 0,
        PENDING: pendingRes?.totalElements ?? 0,
        IN_PROGRESS: inProgressRes?.totalElements ?? 0,
        RESOLVED: resolvedRes?.totalElements ?? 0,
        CANCELLED: 0,
      });
    } catch (error) {
      console.error(error);
      toast.error('Không thể tải danh sách yêu cầu tư vấn');
    } finally {
      setLoading(false);
    }
  };

  // Debounce keyword 400ms, các field khác apply ngay
  const handleFiltersChange = (updater) => {
    setFilters((current) => {
      const next = typeof updater === 'function' ? updater(current) : updater;
      const keywordChanged = next.keyword !== current.keyword;

      if (keywordChanged) {
        clearTimeout(keywordTimerRef.current);
        keywordTimerRef.current = setTimeout(() => {
          setDebouncedKeyword(next.keyword);
          setPage(0);
        }, 400);
      } else {
        setPage(0);
      }

      return next;
    });
  };

  useEffect(() => {
    loadData({ ...filters, keyword: debouncedKeyword }, page);
  }, [debouncedKeyword, filters.status, filters.createdFrom, filters.createdTo, filters.sortBy, filters.sortDirection, page]);

  const handleResetFilters = () => {
    clearTimeout(keywordTimerRef.current);
    setFilters(emptyFilters);
    setDebouncedKeyword('');
    setPage(0);
  };

  const handleAssign = async (item) => {
    try {
      setActionId(item.id);
      await assignConsultationRequest(item.id);
      toast.success('Đã nhận xử lý yêu cầu tư vấn');
      await loadData({ ...filters, keyword: debouncedKeyword }, page);
    } catch (error) {
      console.error(error);
      toast.error('Không thể nhận xử lý yêu cầu tư vấn');
    } finally {
      setActionId(null);
    }
  };

  const handleResolve = async (item) => {
    try {
      setActionId(item.id);
      await resolveConsultationRequest(item.id);
      toast.success('Đã hoàn thành tư vấn');
      await loadData({ ...filters, keyword: debouncedKeyword }, page);
    } catch (error) {
      console.error(error);
      toast.error('Không thể hoàn thành yêu cầu tư vấn');
    } finally {
      setActionId(null);
    }
  };

  return (
    <div className='mx-auto max-w-[1600px]'>
      <ConsultationRequestHeader />
      <ConsultationRequestStatistics counts={counts} />
      <ConsultationRequestFilter
        filters={filters}
        onChange={handleFiltersChange}
        onReset={handleResetFilters}
      />
      <div className='mt-5'>
        <ConsultationRequestTable
          pageData={pageData}
          loading={loading}
          actionId={actionId}
          currentUser={currentUser}
          onAssign={handleAssign}
          onResolve={handleResolve}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}

export default ConsultationRequests;

