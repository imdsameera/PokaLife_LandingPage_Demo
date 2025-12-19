'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

export const PageLoader = () => {
  const loaderRef = useRef(null);
  const bottleContainerRef = useRef(null);
  const whiteBottleRef = useRef(null);
  const colorBottleRef = useRef(null);
  const colorBottleMaskRef = useRef(null);
  const progressBarRef = useRef(null);
  const progressTextRef = useRef(null);
  const circlesRef = useRef([]);
  const splashRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);

        // Splash effect when loading completes
        if (splashRef.current) {
          gsap.to(splashRef.current, {
            scale: 1.5,
            opacity: 0.8,
            duration: 0.3,
            ease: 'power2.out',
          });
        }

        // Animate out after loading completes
        setTimeout(() => {
          const tl = gsap.timeline({
            onComplete: () => {
              setIsLoading(false);
              document.body.style.overflow = 'unset';
            },
          });

          tl.to(
            [progressTextRef.current, progressBarRef.current?.parentElement],
            {
              opacity: 0,
              y: 20,
              duration: 0.3,
            }
          )
            .to(
              bottleContainerRef.current,
              {
                scale: 1.2,
                y: -30,
                duration: 0.4,
              },
              '-=0.2'
            )
            .to(
              [whiteBottleRef.current, colorBottleRef.current],
              {
                opacity: 0,
                scale: 0.8,
                duration: 0.4,
              },
              '-=0.2'
            )
            .to(
              circlesRef.current,
              {
                scale: 3,
                opacity: 0,
                stagger: 0.05,
                duration: 0.4,
              },
              '-=0.3'
            )
            .to(
              loaderRef.current,
              {
                clipPath: 'circle(0% at 50% 50%)',
                duration: 0.8,
                ease: 'power4.inOut',
              },
              '-=0.3'
            );
        }, 500);
      }

      if (progressTextRef.current) {
        progressTextRef.current.textContent = `${Math.floor(progress)}%`;
      }

      if (progressBarRef.current) {
        gsap.to(progressBarRef.current, {
          scaleX: progress / 100,
          duration: 0.3,
          ease: 'power2.out',
        });
      }

      // Animate bottle filling based on progress
      if (colorBottleMaskRef.current) {
        gsap.to(colorBottleMaskRef.current, {
          clipPath: `inset(${100 - progress}% 0 0 0)`,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    }, 150);

    // Prevent scrolling during load
    document.body.style.overflow = 'hidden';

    // Entrance animations
    const tl = gsap.timeline();

    // Set initial state for color bottle mask
    if (colorBottleMaskRef.current) {
      gsap.set(colorBottleMaskRef.current, {
        clipPath: 'inset(100% 0 0 0)',
      });
    }

    tl.from(circlesRef.current, {
      scale: 0,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: 'back.out(1.7)',
    })
      .from(
        bottleContainerRef.current,
        {
          scale: 0,
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: 'back.out(1.5)',
        },
        '-=0.4'
      )
      .from(
        whiteBottleRef.current,
        {
          opacity: 0,
          scale: 0.8,
          duration: 0.5,
        },
        '-=0.5'
      )
      .from(
        progressBarRef.current?.parentElement,
        {
          scaleX: 0,
          opacity: 0,
          duration: 0.5,
        },
        '-=0.3'
      )
      .from(
        progressTextRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.4,
        },
        '-=0.3'
      );

    // Floating animation for circles
    circlesRef.current.forEach((circle, i) => {
      gsap.to(circle, {
        y: '+=20',
        duration: 2 + i * 0.3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });

    // Subtle floating animation for bottle
    if (bottleContainerRef.current) {
      gsap.to(bottleContainerRef.current, {
        y: '+=10',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }

    return () => {
      clearInterval(interval);
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div
      ref={loaderRef}
      className='fixed inset-0 z-9999 bg-black flex items-center justify-center'
      style={{ clipPath: 'circle(100% at 50% 50%)' }}
    >
      {/* Floating circles */}
      <div className='absolute inset-0 overflow-hidden'>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            ref={(el) => (circlesRef.current[i] = el)}
            className='absolute rounded-full bg-white/5 backdrop-blur-sm'
            style={{
              width: `${100 + i * 80}px`,
              height: `${100 + i * 80}px`,
              left: `${15 + i * 15}%`,
              top: `${20 + i * 10}%`,
            }}
          />
        ))}
      </div>

      {/* Bottle Animation */}
      <div className='relative z-10 flex flex-col items-center'>
        {/* Bottle Container */}
        <div
          ref={bottleContainerRef}
          className='relative mb-16'
          style={{ width: '200px', height: '400px' }}
        >
          {/* White Bottle (Outline/Empty) */}
          <div
            ref={whiteBottleRef}
            className='absolute inset-0 flex items-center justify-center'
          >
            <Image
              src='/graphics/poka-loading-bottle-white.png'
              alt='Poka Bottle'
              width={200}
              height={400}
              className='w-full h-full object-contain drop-shadow-2xl'
              priority
            />
          </div>

          {/* Colorful Bottle (Fill) with mask */}
          <div
            ref={colorBottleMaskRef}
            className='absolute inset-0 flex items-center justify-center'
            style={{ clipPath: 'inset(100% 0 0 0)' }}
          >
            <div ref={colorBottleRef} className='w-full h-full relative'>
              <Image
                src='/graphics/poka-loading-bottle.png'
                alt='Poka Bottle Filled'
                width={200}
                height={400}
                className='w-full h-full object-contain drop-shadow-2xl'
                priority
              />

              {/* Liquid splash/glow effect */}
              <div
                ref={splashRef}
                className='absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-gradient-radial from-emerald-400/50 via-teal-400/30 to-transparent rounded-full blur-xl'
                style={{ transform: 'translateX(-50%) scale(0)' }}
              />
            </div>
          </div>
        </div>

        {/* Progress bar container */}
        <div className='w-64 h-1 bg-white/20 rounded-full overflow-hidden mb-4'>
          <div
            ref={progressBarRef}
            className='h-full bg-gradient-to-r from-emerald-400 to-teal-300 origin-left'
            style={{ transform: 'scaleX(0)' }}
          />
        </div>

        {/* Progress text */}
        <div
          ref={progressTextRef}
          className='text-white/80 text-sm font-medium tracking-widest'
        >
          0%
        </div>
      </div>
    </div>
  );
};
