"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export const InfiniteMarquee = ({
  children,
  direction = "left", // "left" or "right"
  duration = 15, // seconds for one full loop
  className = "",
  pauseOnHover = false,
  gap = "1rem", // Control spacing between items
}) => {
  const marqueeContainerRef = useRef(null);
  const marqueeTrackRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    const track = marqueeTrackRef.current;
    if (!track) return;

    // Calculate the width of one complete set of children
    const loopWidth = track.scrollWidth / 2;

    // Determine animation direction
    const startX = direction === "left" ? 0 : -loopWidth;
    const endX = direction === "left" ? -loopWidth : 0;

    // Create the animation
    tweenRef.current = gsap.fromTo(
      track,
      { x: startX },
      {
        x: endX,
        ease: "none",
        duration: duration,
        repeat: -1,
      },
    );

    // Clean up on unmount
    return () => {
      if (tweenRef.current) {
        tweenRef.current.kill();
      }
    };
  }, [direction, duration]);

  // Pause on hover functionality
  const handleMouseEnter = () => {
    if (pauseOnHover && tweenRef.current) {
      tweenRef.current.pause();
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover && tweenRef.current) {
      tweenRef.current.resume();
    }
  };

  return (
    <div
      ref={marqueeContainerRef}
      className={`relative w-full overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={marqueeTrackRef}
        className="flex items-center whitespace-nowrap"
        style={{
          willChange: "transform",
          gap: gap, // Apply gap between items
        }}
      >
        {/* Render children twice for seamless loop */}
        {[...Array(2)].map((_, index) => (
          <div
            key={index}
            className="flex items-center"
            style={{ gap: gap }} // Same gap within each copy
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  );
};
