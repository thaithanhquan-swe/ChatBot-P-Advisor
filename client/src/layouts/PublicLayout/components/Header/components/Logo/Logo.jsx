import { images } from '@/assets/images';
import { Link } from 'react-router-dom';

const Logo = () => (
  <Link to='/' className='shrink-0'>
    <img src={images.logo_ptit} alt='PTIT' className='block w-62.5 object-contain' />
  </Link>
);

export default Logo;
