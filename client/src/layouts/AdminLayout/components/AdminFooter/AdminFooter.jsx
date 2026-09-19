function AdminFooter({ compact = false }) {
  if (compact) {
    return (
      <footer className='shrink-0 border-t border-slate-200 bg-slate-50/60 px-5 py-3.5'>
        <p className='text-[10px] leading-4 text-slate-400'>© 2026 Học viện PTIT</p>
        <p className='text-[10px] leading-4 text-slate-400'>Admission Chatbot · v1.0.0</p>
      </footer>
    );
  }

  return (
    <footer className='border-t border-slate-200 bg-white'>
      <div className='flex min-h-14.5 flex-col items-center justify-center gap-1 px-6 py-3 text-center sm:flex-row sm:justify-between'>
        <p className='text-[11px] text-slate-400 sm:text-xs'>
          © 2026 Học viện Công nghệ Bưu chính Viễn thông (PTIT). All rights reserved.
        </p>

        <p className='text-[11px] text-slate-400'>PTIT Admission Chatbot • v1.0.0</p>
      </div>
    </footer>
  );
}

export default AdminFooter;
