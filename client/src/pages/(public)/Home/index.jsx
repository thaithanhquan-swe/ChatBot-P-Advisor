import Hero from './components/Hero/Hero';
import FaqSection from './components/FaqSection/FaqSection';
import WhyUseSection from './components/WhyUseSection/WhyUseSection';
import FloatingChatPromo from './components/FloatingChatPromo/FloatingChatPromo';

function Home() {
  return (
    <div className=''>
      <Hero />
      <FaqSection />
      <WhyUseSection />
      <FloatingChatPromo />
    </div>
  );
}

export default Home;
