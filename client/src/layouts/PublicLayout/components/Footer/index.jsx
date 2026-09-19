import FooterAbout from './components/FooterAbout/FooterAbout';
import FooterAdmission from './components/FooterAdmission/FooterAdmission';
import FooterBottom from './components/FooterBottom/FooterBottom';
import FooterContact from './components/FooterContact/FooterContact';
import FooterWorkingTime from './components/FooterWorkingTime/FooterWorkingTime';

const Footer = () => {
  return (
    <footer className='w-full bg-(--primary-color) text-white'>
      {/* Main Footer */}
      <div className='mx-auto max-w-350 px-8 py-8 lg:px-10'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-10'>
          <FooterAbout />

          <FooterAdmission />

          <FooterContact />

          <FooterWorkingTime />
        </div>
      </div>

      {/* Bottom */}
      <FooterBottom />
    </footer>
  );
};

export default Footer;
