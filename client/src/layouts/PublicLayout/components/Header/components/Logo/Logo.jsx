import { images } from '@/assets/images';
import { Link } from 'react-router-dom';

const Logo = () => (
  <Link to='/' className='shrink-0'>
    <img
      src={images.logo_ptit}
      alt='PTIT'
      className='block w-48 object-contain sm:w-56 lg:w-62.5'
    />
  </Link>
);

export default Logo;
