'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export const OurStory = () => {
  const sectionRef = useRef(null);
  const cranberryHandRef = useRef(null);
  const limeHandRef = useRef(null);
  const contentRef = useRef(null);
  const storyCardsRef = useRef(null);
  const leftCardRef = useRef(null);
  const middleCardRef = useRef(null);
  const rightCardRef = useRef(null);

  useGSAP(() => {
    // Animate cranberry hand from left
    gsap.from(cranberryHandRef.current, {
      x: -300,
      opacity: 0,
      duration: 0.5,
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 40%',
        end: 'top 30%',
        scrub: 1,
      },
    });

    // Animate lime hand from right
    gsap.from(limeHandRef.current, {
      x: 300,
      opacity: 0,
      duration: 0.5,
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 40%',
        end: 'top 30%',
        scrub: 1,
      },
    });

    // Fade in content
    gsap.from(contentRef.current, {
      y: 50,
      opacity: 0,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 40%',
        end: 'top 30%',
        scrub: 1,
      },
    });

    // Story Cards Animation - Spread out into 3-column grid
    // Left card slides to left to form left column
    gsap.to(leftCardRef.current, {
      x: -400,
      ease: 'none',
      scrollTrigger: {
        trigger: storyCardsRef.current,
        start: 'top 60%',
        end: 'center center',
        scrub: 1,
      },
    });

    // Right card slides to right to form right column
    gsap.to(rightCardRef.current, {
      x: 400,
      ease: 'none',
      scrollTrigger: {
        trigger: storyCardsRef.current,
        start: 'top 60%',
        end: 'center center',
        scrub: 1,
      },
    });
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className='our-story relative min-h-[80vh] bg-white flex items-center justify-center py-20 overflow-x-hidden'
      >
        {/* Cranberry Hand - Left */}
        <div
          ref={cranberryHandRef}
          className='absolute left-0 bottom-0 w-[300px] md:w-[300px] lg:w-[400px] pointer-events-none'
        >
          <Image
            src='/images/cranberry-hand.png'
            alt='Cranberry Hand'
            width={500}
            height={500}
            className='w-full h-auto'
          />
        </div>

        {/* Lime Hand - Right */}
        <div
          ref={limeHandRef}
          className='absolute right-0 bottom-0 w-[300px] md:w-[400px] lg:w-[500px] pointer-events-none'
        >
          <Image
            src='/images/lime-hand.png'
            alt='Lime Hand'
            width={600}
            height={600}
            className='w-full h-auto'
          />
        </div>

        {/* Content */}
        <div
          ref={contentRef}
          className='relative z-10 text-center max-w-3xl px-6'
        >
          <h2 className='text-5xl uppercase md:text-6xl lg:text-[10rem] font-bold text-gray-900 mb-6'>
            Our Story
          </h2>
          <p className='text-lg md:text-xl text-gray-600 mb-8 leading-relaxed text-[3rem]'>
            From Sri Lankan coconut groves to your hands, we bring nature's pure
            refreshment with every sip.
          </p>

          <Link href='/'>
            <button className='bg-white text-black font-bold tracking-[0.2em] border-4 border-black rounded-full px-12 py-4 cursor-pointer uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200'>
              Learn More
            </button>
          </Link>
        </div>
      </section>

      {/* Story Cards Section */}
      <section
        ref={storyCardsRef}
        className='story-cards relative min-h-[80vh] bg-white flex items-center justify-center py-2 overflow-hidden'
      >
        <div className='relative w-full max-w-7xl mx-auto px-6'>
          <div className='relative flex items-center justify-center h-[600px]'>
            {/* Left Card */}
            <div
              ref={leftCardRef}
              className='absolute w-[350px] h-[500px] rounded-2xl overflow-hidden shadow-2xl z-10'
            >
              <Image
                src='/images/story-1.jpg'
                alt='Story 1'
                fill
                className='object-cover'
              />
            </div>

            {/* Middle Card */}
            <div
              ref={middleCardRef}
              className='absolute w-[350px] h-[500px] rounded-2xl overflow-hidden shadow-2xl z-20'
            >
              <Image
                src='/images/story-2.jpg'
                alt='Story 2'
                fill
                className='object-cover'
              />
            </div>

            {/* Right Card */}
            <div
              ref={rightCardRef}
              className='absolute w-[350px] h-[500px] rounded-2xl overflow-hidden shadow-2xl z-10'
            >
              <Image
                src='/images/story-3.jpg'
                alt='Story 3'
                fill
                className='object-cover'
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
