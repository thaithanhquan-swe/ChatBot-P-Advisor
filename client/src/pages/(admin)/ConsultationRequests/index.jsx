import { useMemo, useState } from 'react';
import ConsultationRequestFilter from './components/ConsultationRequestFilter/ConsultationRequestFilter';
import ConsultationRequestHeader from './components/ConsultationRequestHeader/ConsultationRequestHeader';
import ConsultationRequestTable from './components/ConsultationRequestTable/ConsultationRequestTable';
import ConsultationRequestStatistics from './components/ConsultationRequestStatistics/ConsultationRequestStatistics';

const emptyFilters = { keyword: '', status: '', createdFrom: '', createdTo: '', sortBy: 'createdAt', sortDirection: 'DESC' };
const initialRequests = [
  { id: 'CR-2026-001', question: 'Em muốn được tư vấn về ngành Công nghệ thông tin.', email: 'minhan@gmail.com', phone: '0912345678', status: 'PENDING', assignedStaffId: null, createdAt: '2026-08-30T09:30:00', resolvedAt: null },
  { id: 'CR-2026-002', question: 'Cho em hỏi về học phí và chính sách học bổng.', email: 'thutrang@gmail.com', phone: '0987654321', status: 'IN_PROGRESS', assignedStaffId: 'current-advisor', createdAt: '2026-08-29T14:15:00', resolvedAt: null },
  { id: 'CR-2026-003', question: 'Em cần tư vấn các phương thức xét tuyển năm nay.', email: 'quanghuy@gmail.com', phone: null, status: 'RESOLVED', assignedStaffId: 'advisor-02', createdAt: '2026-08-28T08:45:00', resolvedAt: '2026-08-29T10:20:00' },
  { id: 'CR-2026-004', question: 'Nhờ thầy cô tư vấn về ký túc xá.', email: null, phone: '0905123456', status: 'CANCELLED', assignedStaffId: null, createdAt: '2026-08-27T16:00:00', resolvedAt: null },
];

function ConsultationRequests() {
  const [filters, setFilters] = useState(emptyFilters);
  const [appliedFilters, setAppliedFilters] = useState(emptyFilters);
  const [requests, setRequests] = useState(initialRequests);
  const [page, setPage] = useState(0);
  const currentUser = { id: 'current-advisor', roles: [{ name: 'ADVISOR' }] };

  const filteredRequests = useMemo(() => {
    const keyword = appliedFilters.keyword.trim().toLowerCase();
    return requests
      .filter((item) => {
        const matchesKeyword = !keyword || [item.question, item.email, item.phone].some((value) => value?.toLowerCase().includes(keyword));
        const matchesStatus = !appliedFilters.status || item.status === appliedFilters.status;
        const createdDate = item.createdAt.slice(0, 10);
        return matchesKeyword && matchesStatus && (!appliedFilters.createdFrom || createdDate >= appliedFilters.createdFrom) && (!appliedFilters.createdTo || createdDate <= appliedFilters.createdTo);
      })
      .sort((a, b) => {
        const result = String(a[appliedFilters.sortBy] || '').localeCompare(String(b[appliedFilters.sortBy] || ''));
        return appliedFilters.sortDirection === 'ASC' ? result : -result;
      });
  }, [requests, appliedFilters]);

  const counts = { total: requests.length, PENDING: 0, IN_PROGRESS: 0, RESOLVED: 0, CANCELLED: 0 };
  requests.forEach((item) => { counts[item.status] += 1; });
  const pageData = { content: filteredRequests, pageNumber: page, totalElements: filteredRequests.length, totalPages: 1, last: true };

  const updateStatus = (item, status) => setRequests((items) => items.map((request) => request.id === item.id ? { ...request, status, assignedStaffId: status === 'IN_PROGRESS' ? currentUser.id : request.assignedStaffId, resolvedAt: status === 'RESOLVED' ? new Date().toISOString() : request.resolvedAt } : request));
  const applyFilters = (event) => { event.preventDefault(); setPage(0); setAppliedFilters({ ...filters }); };
  const resetFilters = () => { setFilters(emptyFilters); setAppliedFilters(emptyFilters); setPage(0); };

  return (
    <div className='mx-auto max-w-[1600px]'>
      <ConsultationRequestHeader />
      <ConsultationRequestStatistics counts={counts} />
      <ConsultationRequestFilter filters={filters} onChange={setFilters} onApply={applyFilters} onReset={resetFilters} />
      <div className='mt-5'><ConsultationRequestTable pageData={pageData} loading={false} actionId={null} currentUser={currentUser} onAssign={(item) => updateStatus(item, 'IN_PROGRESS')} onResolve={(item) => updateStatus(item, 'RESOLVED')} onPageChange={setPage} /></div>
    </div>
  );
}

export default ConsultationRequests;
