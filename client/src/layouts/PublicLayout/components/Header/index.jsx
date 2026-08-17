import { useEffect, useState } from 'react';

import { CircleQuestionMark, House, MessageCircleMore, User } from 'lucide-react';
import Logo from './components/Logo';
import Nav from './components/Nav';

const navItems = [
  {
    label: 'Trang chủ',
    href: '/',
    icon: House,
  },
  {
    label: 'Trang chat',
    href: '/chatai',
    icon: MessageCircleMore,
  },
  {
    label: 'FAQ',
    href: '#',
    icon: CircleQuestionMark,
  },
  {
    label: 'Yêu cầu tư vấn',
    href: '#',
    icon: User,
  },
];

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let previousScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isAtTop = currentScrollY < 10;

      setIsVisible(isAtTop || currentScrollY < previousScrollY);
      previousScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full  bg-white transition-all duration-700 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className='mx-auto flex h-18.75 max-w-350 items-center justify-between px-8'>
        <Logo />

        <Nav navItems={navItems} />
      </div>
    </header>
  );
};

export default Navbar;
