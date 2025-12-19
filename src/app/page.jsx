import React from 'react';
import { Hero } from './z-home-sections/Hero';
import { ProductSummary } from './z-home-sections/ProductSummary';
import { ProductVideo } from './z-home-sections/ProductVideo';
import { OurStory } from './z-home-sections/OurStory';
import { Contact } from './z-home-sections/Contact';

async function Home() {
  await new Promise((resolve) => setTimeout(resolve, 4000));
  return (
    <div className=''>
      <Hero />
      <ProductSummary />
      <ProductVideo />
      <OurStory />
      <Contact />
      <section className='min-h-screen bg-blue-500'></section>
      <section className='min-h-screen bg-[#06291B]'></section>
      <section className='min-h-screen bg-[#06291B]'></section>
    </div>
  );
}

export default Home;
