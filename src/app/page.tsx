import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import VisiMisi from '@/components/VisiMisi';
import Programs from '@/components/Programs';
import Schedule from '@/components/Schedule';
import Gallery from '@/components/Gallery';
import Articles from '@/components/Articles';
import Pengurus from '@/components/Pengurus';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <About />
      <VisiMisi />
      <Programs />
      <Schedule />
      <Gallery />
      <Articles />
      <Pengurus />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
