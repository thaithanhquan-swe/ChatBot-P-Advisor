import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1 className='text-red-300'>Home page</h1>
      <Link to='/chatai'>
        <button type='button'>Go to ChatAI</button>
      </Link>
    </div>
  );
}

export default Home;
