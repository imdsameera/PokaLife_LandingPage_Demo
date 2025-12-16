'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export const SpinningBadge = ({ rotationDegrees = 180, href = '#' }) => {
  const badgeRef = useRef(null);

  useGSAP(() => {
    gsap.to(badgeRef.current, {
      rotation: rotationDegrees,
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    });
  }, [rotationDegrees]);

  return (
    <div
      ref={badgeRef}
      className='spinning-badge fixed bottom-12 right-12 z-50'
      style={{ width: '100px', height: '100px' }}
    >
      <Link href={href}>
        <Image
          src='/graphics/poka-badge.svg'
          alt='Poka Badge'
          width={100}
          height={100}
          className='w-full h-full'
        />
      </Link>
    </div>
  );
};
