'use client'

// components/ScrollVideoSequence.js
import React, { useRef, useEffect, useLayoutEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin once
gsap.registerPlugin(ScrollTrigger);

// Configuration
const frameCount = 122;
const imagePath = (index) =>
  `/images/vid-frames-1/frame_${String(index).padStart(4, "0")}.png`;

export const ScrollVideoSequence = ({className=''}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [images, setImages] = useState([]);
  const [context, setContext] = useState(null);

  // 1. Preload Images
  useEffect(() => {
    let loadedImages = 0;
    const imgs = [];

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = imagePath(i);
      img.onload = () => {
        loadedImages++;
        if (loadedImages === frameCount) {
          // If all images are loaded, set the state and draw the first frame
          setImages(imgs);
          const ctx = canvasRef.current.getContext("2d");
          setContext(ctx);
          // Initial draw
          if (imgs[0]) {
            ctx.drawImage(
              imgs[0],
              0,
              0,
              canvasRef.current.width,
              canvasRef.current.height,
            );
          }
        }
      };
      imgs.push(img);
    }
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

    // Create the GSAP ScrollTrigger timeline
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${frameCount * 50}px`, // Adjust scroll length as needed (e.g., 50px per frame)
        scrub: 0.5, // Link scroll position to timeline progress
        pin: true, // Keep the container pinned in the viewport
        pinSpacing: true,
        markers: false, // Set to true for debugging
      },
    });

    // Animate a simple proxy object from 1 to frameCount
    timeline.to(
      { frame: 1 },
      {
        frame: frameCount,
        ease: "none",
        onUpdate: function () {
          // Call the update function on every frame change
          updateImage(this.targets()[0].frame);
        },
      },
    );

    // Cleanup function for ScrollTrigger
    return () => {
      ScrollTrigger.killAll();
    };
  }, [images, context]); // Rerun effect when images are loaded

  return (
    // The container holds the canvas and is the element that gets pinned
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100vh", position: "relative" }}
      className={className}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          // Use object-fit like CSS to control how the video fills the container
          objectFit: "cover",
        }}
      />
      {/* Optional: Add a loading spinner while images are being preloaded */}
      {images.length < frameCount && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "rgba(0,0,0,0.8)",
            color: "white",
          }}
        >
          Preloading frames: {Math.round((images.length / frameCount) * 100)}%
        </div>
      )}
    </div>
  );
};


