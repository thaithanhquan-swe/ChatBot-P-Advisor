import { ChevronDown } from 'lucide-react';

const Nav = ({ navItems }) => {
  return (
    <nav className='hidden h-full items-center gap-8 lg:flex'>
      {navItems.map((item) => (
        <div
          key={item.label}
          className={`group relative flex h-full items-center ${
            item.active ? 'text-(--primary-color)' : 'text-gray-800'
          }`}
        >
          <a
            href={item.href}
            className={`flex h-full items-center gap-1.5 whitespace-nowrap text-[14px] transition-colors ${
              item.active ? 'font-semibold' : 'font-medium hover:text-(--primary-color)'
            }`}
          >
            {item.label}

            {item.dropdown && (
              <ChevronDown
                size={14}
                strokeWidth={1.8}
                className='transition-transform duration-200 group-hover:rotate-180'
              />
            )}
          </a>

          {item.active && (
            <span className='absolute bottom-0 left-0 h-0.75 w-full rounded-t bg-(--primary-color)' />
          )}
        </div>
      ))}

      <a
        href='#'
        className='flex h-11 items-center justify-center text-white rounded-lg bg-(--primary-color) px-5 text-[13px] font-semibold transition-all duration-200 hover:shadow-lg'
      >
        Tuyển sinh 2026
      </a>
    </nav>
  );
};

export default Nav;
