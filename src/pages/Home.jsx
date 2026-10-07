import Hero from '../components/Hero';
import Announcement from '../components/Announcement';
import About from '../components/About';
import Excom from '../components/Excom';
import Programmes from '../components/Programmes';
import Gallery from '../components/Gallery';
import ComplaintCTA from '../components/ComplaintCTA';

export default function Home() {
  return (
    <main>
      <Announcement />
      <Hero />
      <About />
      <Excom />
      <Programmes />
      <Gallery />
      <ComplaintCTA />
    </main>
  );
}
