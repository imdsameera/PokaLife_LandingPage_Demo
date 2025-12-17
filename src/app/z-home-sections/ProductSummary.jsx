'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export const ProductSummary = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const headerRef = useRef(null);
  const cranberryRef = useRef(null);
  const limeRef = useRef(null);
  const cranberryBlurredRef = useRef(null);
  const limeBlurredRef = useRef(null);
  const cranberryTextRef = useRef(null);
  const limeTextRef = useRef(null);

  useGSAP(() => {
    // Fade in the image when Hero's section 2 bottom reaches 50% viewport
    gsap.fromTo(
      imageRef.current,
      { opacity: 0, scale: 1 },
      {
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section-2',
          start: 'bottom 50%',
          end: 'bottom 50.001%',
          scrub: 1,
        },
      }
    );

    // Scale image down to 0.5 when .product-show reaches 50% of the screen
    gsap.to(imageRef.current, {
      scale: 0.7,
      ease: 'none',
      scrollTrigger: {
        trigger: '.product-show',
        start: 'top 50%',
        end: 'bottom 90%',
        scrub: 1,
      },
    });

    // Pin product header while product-show is in view
    ScrollTrigger.create({
      trigger: '.product-show',
      start: 'top top',
      end: 'bottom 80%',
      pin: headerRef.current,
      pinSpacing: true,
    });

    // Scale header down to 0.6 while pinned
    gsap.to(headerRef.current, {
      scale: 0.5,
      ease: 'none',
      scrollTrigger: {
        trigger: '.product-show',
        start: 'top 75%',
        end: 'bottom top',
        scrub: 1,
      },
    });

    // Subtle scroll animations for fruit images
    // Cranberry - parallax up with slight scale
    gsap.to(cranberryRef.current, {
      y: -80,
      scale: 2,
      rotation: 5,
      ease: 'none',
      scrollTrigger: {
        trigger: '.product-show',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });

    // Lime - parallax up with slight scale (different speed)
    gsap.to(limeRef.current, {
      y: -100,
      scale: 2,
      rotation: -5,
      ease: 'none',
      scrollTrigger: {
        trigger: '.product-show',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });

    // Cranberry blurred - slower parallax with scale
    gsap.to(cranberryBlurredRef.current, {
      y: -120,
      x: -200,
      scale: 2,
      rotation: 8,
      ease: 'none',
      scrollTrigger: {
        trigger: '.product-show',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });

    // Lime blurred - slower parallax with scale
    gsap.to(limeBlurredRef.current, {
      y: -140,
      x: 200,
      scale: 2,
      rotation: -8,
      ease: 'none',
      scrollTrigger: {
        trigger: '.product-show',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });

    // Fade out imageRef gradually when .product-video approaches
    gsap.to(imageRef.current, {
      opacity: 0,
      //   ease: 'none',
      scrollTrigger: {
        trigger: '.product-video',
        start: 'top 20%',
        end: 'top top',
        scrub: 1,
      },
    });
  });

  return (
    <>
      <section
        ref={sectionRef}
        className='product-summary relative bg-white text-white h-[50vh]'
      >
        <div
          ref={imageRef}
          className='fixed inset-0 w-screen h-screen opacity-0 z-50'
        >
          <Image
            src='/images/poka-original-black-bg.png'
            alt='Poka Life original'
            width={0}
            height={0}
            sizes='cover'
            style={{ width: '100%', height: '100%' }}
            className='w-full h-full object-cover'
          />
        </div>
      </section>

      <section
        className='product-show relative min-h-screen h-screen bg-cover bg-center bg-white pt-15 overflow-x-hidden'
        style={{ backgroundImage: "url('/images/product-summary-img.png')" }}
      >
        <div ref={headerRef} className='product-header'>
          <h1 className='text-teal-900 text-[6rem] font-bold text-center leading-non'>
            Coconut, just the way you like it.
          </h1>
          <h1 className='text-teal-600 text-[6rem] font-bold text-center leading-none'>
            What’s your flavour?
          </h1>
        </div>

        {/* Decorative fruits */}
        <Image
          ref={cranberryRef}
          src='/images/cranberry.png'
          alt='Cranberry'
          width={120}
          height={120}
          className='pointer-events-none select-none absolute left-[20%] bottom-[10%] h-auto'
        />
        <Image
          ref={limeRef}
          src='/images/lime.png'
          alt='Lime'
          width={120}
          height={120}
          className='pointer-events-none select-none absolute right-[10%] bottom-[15%] h-auto'
        />
        <Image
          ref={cranberryBlurredRef}
          src='/images/cranberry-blured.png'
          alt='Cranberry blurred'
          width={360}
          height={360}
          className='pointer-events-none select-none absolute left-[-6%] bottom-[30%] h-auto'
        />
        <Image
          ref={limeBlurredRef}
          src='/images/lime-blured.png'
          alt='Lime blurred'
          width={360}
          height={360}
          className='pointer-events-none select-none absolute right-[-6%] top-[30%] h-auto'
        />

        <Image
          ref={cranberryTextRef}
          src='/graphics/cranberry-text-red.png'
          alt='Cranberry text'
          width={360}
          height={360}
          className='pointer-events-none select-none absolute right-[-6%] top-[30%] h-auto'
        />

        <Image
          ref={limeTextRef}
          src='/graphics/lime-text-green.png'
          alt='Lime text'
          width={360}
          height={360}
          className='pointer-events-none select-none absolute right-[-6%] top-[30%] h-auto'
        />
      </section>
    </>
  );
};
