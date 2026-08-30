import AdminBreadcrumb from '@/components/AdminBreadcrumb/AdminBreadcrumb';

function ConsultationRequestHeader() {
  return (
    <div className='mb-5'>
      <div>
        <AdminBreadcrumb pageTitle='Yêu cầu tư vấn' />

        <h1 className='text-[27px] font-bold tracking-tight text-slate-900'>Yêu cầu tư vấn</h1>
        <p className='mt-1 text-[13px] text-slate-500'>
          Tiếp nhận, theo dõi và hoàn thành các yêu cầu tư vấn của người dùng.
        </p>
      </div>

    </div>
  );
}

export default ConsultationRequestHeader;
