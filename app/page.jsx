// import './aos.css';
import './animate.min.css';
import './bootstrap.min.css';
import './owl.carousel.min.css';
import './responsive.css';
import './style.css';

// importing All components
import Header from '@/components/Header';
// import Banner from '@/components/Banner';
import Footer from '@/components/Footer';
import HowItWorks from '@/components/HowItWorks';
import ProtocolSections from '@/components/ProtocolSections';
import Team from '@/components/Team';


export default function Home() {
  return (
    <main >
      <Header/>
      {/* <Banner/> */}
      <ProtocolSections/>
      <HowItWorks/>
      <Team/>
      <Footer/>
    </main>
  );
}
