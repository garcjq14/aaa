
import React from 'react';
import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import Services from '@/components/home/Services';
import Portfolio from '@/components/home/Portfolio';
import Faq from '@/components/home/Faq';
import Contact from '@/components/home/Contact';

const HomePage = () => {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Faq />
      <Contact />
    </main>
  );
};

export default HomePage;
