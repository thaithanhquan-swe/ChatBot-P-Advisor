import { images } from '@/assets/images';

const DocumentHero = () => {
  return (
    <section className='relative overflow-hidden border-b border-gray-100 bg-[#f8fafc]'>
      <div className='absolute inset-y-0 right-0 hidden w-[55%] lg:block'>
        <img src={images.truong_ptit} alt='' className='h-full w-full object-cover object-center opacity-30' />
        <div className='absolute inset-0 bg-gradient-to-r from-[#f8fafc] via-[#f8fafc]/45 to-white/20' />
      </div>

      <div className='container relative py-10 sm:py-12 lg:py-11'>
        <div className='max-w-2xl'>
          <h1 className='text-[34px] leading-tight font-extrabold tracking-[-0.02em] text-gray-950 sm:text-[42px]'>
            Tài liệu <span className='text-(--primary-color)'>tuyển sinh</span>
          </h1>
          <p className='mt-3 max-w-xl text-[14.5px] leading-6 text-gray-600 sm:text-[15px]'>
            Cung cấp các tài liệu chính thức về tuyển sinh, đào tạo và các thông tin hữu ích của Học viện Công nghệ Bưu chính Viễn thông.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DocumentHero;
