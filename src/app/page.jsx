import React from 'react';
import { InfiniteMarquee } from '@/components/animations/InfiniteMarquee';
import { ScrollVideoSequence } from '@/components/animations/ScrollVideoSequence';
import LiquidEther from '@/components/LiquidEther';
import { Hero } from './z-home-sections/Hero';

function Home() {
  return (
    <div>
      <Hero />
      <section className='min-h-screen bg-[#06291B]'></section>
      <section className='min-h-screen bg-[#06291B]'></section>
      <section className='min-h-screen bg-[#06291B]'></section>
    </div>
  );
}

export default Home;
