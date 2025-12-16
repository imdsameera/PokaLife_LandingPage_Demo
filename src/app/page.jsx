import React from 'react';
import { Hero } from './z-home-sections/Hero';
import { ProductSummary } from './z-home-sections/ProductSummary';
import { ProductVideo } from './z-home-sections/ProductVideo';
import { SpinningBadge } from '@/components/SpinningBadge';

function Home() {
  return (
    <div className=''>
      <SpinningBadge />
      <Hero />
      <ProductSummary />
      <ProductVideo />
      <section className='min-h-screen bg-[#06291B]'></section>
      <section className='min-h-screen bg-[#06291B]'></section>
      <section className='min-h-screen bg-[#06291B]'></section>
    </div>
  );
}

export default Home;
