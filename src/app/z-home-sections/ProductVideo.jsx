'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export const ProductVideo = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);
  const bgImageRef = useRef(null);

  useGSAP(() => {
    // Animate background image: scale down but keep blur
    gsap.fromTo(
      bgImageRef.current,
      {
        scale: 1.3,
        filter: 'blur(10px)',
      },
      {
        scale: 1,
        filter: 'blur(10px)', // Keep blur even after scaling down
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      }
    );

    //Text marquee
    gsap.to('.innerText1', {
      x: -1000,
      scrollTrigger: {
        target: '.innerText1',
        scrub: 1,
      },
    });
    gsap.to('.innerText2', {
      x: 1000,
      scrollTrigger: {
        target: '.innerText2',
        scrub: 1,
      },
    });

    gsap.to('.innerText3', {
      x: -1000,
      scrollTrigger: {
        target: '.innerText3',
        scrub: 1,
      },
    });

    const video = videoRef.current;
    if (!video) return;

    // Wait for video metadata to load
    const handleLoadedMetadata = () => {
      const videoDuration = video.duration;
      // Calculate scroll distance based on video duration (more duration = more scroll)
      // Use 300px per second of video for slower, smoother frame-by-frame playback
      const scrollDistance = videoDuration * 300;

      // Pin the section and control video playback frame by frame
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${scrollDistance}`,
        pin: true,
        pinSpacing: true,
        scrub: 1, // Smooth scrubbing for frame-by-frame effect
        onUpdate: (self) => {
          // Map scroll progress (0-1) to video time (0 to duration)
          const progress = self.progress;
          video.currentTime = progress * videoDuration;
        },
      });
    };

    // Ensure video doesn't autoplay
    video.pause();

    if (video.readyState >= 1) {
      // Metadata already loaded
      handleLoadedMetadata();
    } else {
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
    }

    // Cleanup
    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className='product-video bg-[#06291B] h-screen flex items-center justify-center py-20 relative overflow-hidden'
    >
      {/* Animated Background Image */}
      <div ref={bgImageRef} className='absolute inset-0 w-full h-full -z-0'>
        <Image
          src='/images/tropical-forest.png'
          alt='Tropical Forest Background'
          fill
          className='object-cover'
          priority
        />
        {/* Dark overlay for better text readability */}
        <div className='absolute inset-0 bg-black/50' />
      </div>

      <div className='relative z-10 text-white text-center text-2xl font-bold w-full min-h-screen flex flex-col items-center justify-center gap-0 overflow-x-hidden text-nowrap'>
        <h1 className='innerText1 text-[10rem] text-center text-white uppercase font-medium leading-none'>
          Tropical Refreshment, Daily Dose.
        </h1>
        <h1
          className='innerText2 text-[10rem] text-center text-transparent uppercase font-medium leading-none'
          style={{
            WebkitTextStroke: '2px white',
            textStroke: '2px white',
          }}
        >
          Hydrate. Energize. Feel Alive.
        </h1>
        <h1 className='innerText3 text-[10rem] text-center text-white uppercase font-medium leading-none'>
          Nature's Best Taste, Now.
        </h1>
      </div>

      {/* Video Container */}
      <div
        ref={videoContainerRef}
        className='video-container absolute inset-0 w-full min-h-screen flex items-center justify-center z-20'
      >
        <div className='video-box rounded-[4rem] overflow-x-hidden w-full max-w-sm aspect-9/16 scale-[1]'>
          <video
            ref={videoRef}
            src='/poka-original.mp4'
            className='w-full h-full object-cover'
            muted
            playsInline
            preload='metadata'
          />
        </div>
      </div>
    </section>
  );
};
