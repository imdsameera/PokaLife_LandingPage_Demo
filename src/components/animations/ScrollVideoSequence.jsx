'use client';

// components/ScrollVideoSequence.js
import React, { useRef, useEffect, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin once
gsap.registerPlugin(ScrollTrigger);

// Configuration
const frameCount = 122;
const imagePath = (index) =>
  `/images/vid-frames-1/frame_${String(index).padStart(4, '0')}.png`;

export const ScrollVideoSequence = ({
  className = '',
  endTriggerRef = null,
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [images, setImages] = useState([]);
  const [context, setContext] = useState(null);

  // 1. Optimized Progressive Image Loading
  useEffect(() => {
    const imgs = new Array(frameCount);
    let loadedCount = 0;
    const ctx = canvasRef.current?.getContext('2d');

    // Priority frames to load first (every 10th frame for initial playback)
    const priorityFrames = [];
    for (let i = 1; i <= frameCount; i += 10) {
      priorityFrames.push(i);
    }

    // Add first and last frames to priority
    if (!priorityFrames.includes(1)) priorityFrames.unshift(1);
    if (!priorityFrames.includes(frameCount)) priorityFrames.push(frameCount);

    const loadImage = (index) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = imagePath(index);
        img.onload = () => {
          imgs[index - 1] = img;
          loadedCount++;
          resolve();
        };
        img.onerror = () => {
          console.warn(`Failed to load frame ${index}`);
          resolve();
        };
      });
    };

    // Load priority frames first
    const loadPriorityFrames = async () => {
      await Promise.all(priorityFrames.map(loadImage));

      // Once priority frames are loaded, enable the canvas
      if (ctx && imgs[0]) {
        setContext(ctx);
        setImages([...imgs]);
        ctx.drawImage(
          imgs[0],
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
      }

      // Load remaining frames in background
      const remainingFrames = [];
      for (let i = 1; i <= frameCount; i++) {
        if (!priorityFrames.includes(i)) {
          remainingFrames.push(i);
        }
      }

      // Load remaining frames in chunks
      const chunkSize = 10;
      for (let i = 0; i < remainingFrames.length; i += chunkSize) {
        const chunk = remainingFrames.slice(i, i + chunkSize);
        await Promise.all(chunk.map(loadImage));
        setImages([...imgs]);
      }
    };

    loadPriorityFrames();

    return () => {
      imgs.forEach((img) => {
        if (img) img.src = '';
      });
    };
  }, []);

  // 2. Setup GSAP ScrollTrigger
  useLayoutEffect(() => {
    if (images.length === 0 || !context) return;

    const canvas = canvasRef.current;

    // Set the canvas dimensions to match the first loaded image size for initial ratio
    const firstImage = images[0];
    if (firstImage) {
      canvas.width = firstImage.width;
      canvas.height = firstImage.height;
    }

    // Function to update the canvas frame
    const updateImage = (index) => {
      const img = images[Math.floor(index)];
      if (img) {
        // Clear the canvas and draw the new frame, stretching to fill
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    };

    // Create the ScrollTrigger scoped to the Hero section
    // Pin until the center of section2Ref reaches the top of the screen
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: () => {
        if (endTriggerRef?.current && containerRef.current) {
          // Calculate scroll distance until center of section2Ref reaches top of viewport
          const endElement = endTriggerRef.current;
          const startElement = containerRef.current;

          // Get positions relative to document
          const startRect = startElement.getBoundingClientRect();
          const endRect = endElement.getBoundingClientRect();
          const scrollY = window.scrollY || window.pageYOffset;

          const startTop = startRect.top + scrollY;
          // Calculate the center point of section2Ref
          const endCenter = endRect.top + scrollY + endRect.height / 2;

          // Return the scroll distance needed for center of section2Ref to reach top
          return endCenter - startTop;
        }
        return 'bottom top';
      },
      scrub: true,
      pin: true,
      pinSpacing: true,
      markers: false,
      onUpdate: (self) => {
        // Progress maps to available frames
        const frameIndex = Math.min(
          Math.floor(self.progress * (frameCount - 1)) + 1,
          frameCount
        );
        updateImage(frameIndex);
      },
    });

    // Refresh ScrollTrigger to recalculate positions after layout
    ScrollTrigger.refresh();

    // Cleanup only this trigger instance
    return () => {
      trigger.kill();
    };
  }, [images, context, endTriggerRef]); // Rerun effect when images are loaded or endTriggerRef changes

  return (
    // The container holds the canvas and is the element that gets pinned
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100vh', position: 'relative' }}
      className={className}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          // Use object-fit like CSS to control how the video fills the container
          objectFit: 'cover',
        }}
      />
      {/* Optional: Add a loading spinner while images are being preloaded */}
      {images.length < frameCount && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'rgba(0,0,0,0.8)',
            color: 'white',
          }}
        >
          Preloading frames: {Math.round((images.length / frameCount) * 100)}%
        </div>
      )}
    </div>
  );
};
