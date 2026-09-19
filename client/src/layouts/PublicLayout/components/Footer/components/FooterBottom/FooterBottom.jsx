const FooterBottom = () => {
  return (
    <div className='border-t border-white/10 bg-black/10'>
      <div className='mx-auto flex max-w-350 flex-col items-center justify-between gap-3 px-8 py-4 text-[11px] text-white/70 md:flex-row lg:px-10'>
        {/* Copyright */}
        <p className='text-center md:text-left'>
          © 2026 Học viện Công nghệ Bưu chính Viễn thông (PTIT). All rights reserved.
        </p>

        {/* Policies */}
        <div className='flex items-center gap-4'>
          <a href='#' className='transition hover:text-white'>
            Chính sách bảo mật
          </a>

          <span className='text-white/30'>|</span>

          <a href='#' className='transition hover:text-white'>
            Điều khoản sử dụng
          </a>
        </div>
      </div>
    </div>
  );
};

export default FooterBottom;
