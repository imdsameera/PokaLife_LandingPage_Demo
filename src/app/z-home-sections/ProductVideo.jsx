'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export const ProductVideo = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);

  useGSAP(() => {
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
      className='product-video bg-[#06291B] flex items-center justify-center py-20'
    >
      <div
        ref={videoContainerRef}
        className='video-container w-full flex items-center justify-center'
      >
        <div className='video-box rounded-[4rem] overflow-x-hidden w-full max-w-sm aspect-[9/16] scale-[1]'>
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
