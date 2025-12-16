'use client';

import React, { useRef } from 'react';
import { ScrollVideoSequence } from '@/components/animations/ScrollVideoSequence';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useGSAP } from '@gsap/react';
import { InfiniteMarquee } from '@/components/animations/InfiniteMarquee';

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);

  useGSAP(() => {
    gsap.to(section1Ref.current, {
      scrollTrigger: {
        trigger: section1Ref.current,
        start: 'top top',
        end: '+=800 center',
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
        markers: false,
      },
    });

    //Text Marquee Opacity with scroll trigger
    gsap.to('.text-marquee', {
      opacity: 0,
      scrollTrigger: {
        trigger: '.text-marquee',
        start: 'top top',
        end: '+=500 center',
        scrub: 1,
      },
    });

    // Sec 2 Text opacity + tracking with scroll trigger
    gsap.to('.sec-2-header', {
      opacity: 0,
      letterSpacing: '2rem',
      scrollTrigger: {
        trigger: section2Ref.current,
        start: 'top top',
        end: 'bottom center',
        scrub: 1,
      },
    });

    // Hero background zoom from in to normal on scroll
    gsap.fromTo(
      '.hero-bg img',
      { scale: 1.4, filter: 'blur(5px)' },
      {
        scale: 1,
        filter: 'blur(0px)',
        ease: 'none',
        scrollTrigger: {
          trigger: section1Ref.current,
          endTrigger: section2Ref.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      }
    );

    // Fade out ScrollVideoSequence as section 2 bottom crosses mid-screen
    gsap.to('.scroll-video-sequence', {
      opacity: 0,
      scrollTrigger: {
        trigger: section2Ref.current,
        start: 'bottom 50%',
        end: 'bottom 49%',
        scrub: 1,
      },
    });
  });

  return (
    <div className='hero relative min-h-[200vh]'>
      <div className='hero-bg fixed inset-0 -z-10'>
        <img
          src='/images/hero-bg.png'
          alt='Poka Life hero background'
          className='w-full h-full object-cover'
        />
        <div className='absolute inset-0 bg-black/10' />
      </div>
      <div className='absolute inset-0 z-10'>
        <ScrollVideoSequence
          className='scroll-video-sequence absolute inset-0 z-0'
          startFrame={1}
          endFrame={122}
          scrollPerFrame={50}
          endTriggerRef={section2Ref}
        />
      </div>
      <section
        ref={section1Ref}
        className='bg-transparent flex flex-col items-center justify-center min-h-screen m-0 p-0 w-full'
      >
        <div className='w-full min-h-screen flex items-center justify-center m-0 p-0'>
          <InfiniteMarquee className='text-marquee'>
            <h1 className='text-white text-[12rem] font-bold'>Freeze.</h1>
            <h1 className='text-white text-[12rem] font-bold'>Shake.</h1>
            <h1 className='text-white text-[12rem] font-bold'>Drink.</h1>
          </InfiniteMarquee>
        </div>
      </section>

      <section
        ref={section2Ref}
        className='bg-transparent flex flex-col items-center justify-center min-h-screen m-0 p-0 w-full'
      >
        <div className='w-full min-h-screen flex items-center justify-center m-0 p-0 overflow-x-hidden'>
          <h1 className='sec-2-header text-white text-[10rem] font-medium uppercase text-center leading-none'>
            The Ultimate King Coconut Drink
          </h1>
        </div>
      </section>
    </div>
  );
};
