"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

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
    // Set initial state for fixed image
    gsap.set(imageRef.current, { opacity: 0, scale: 1, display: "block" });

    // Initial Fade In - triggered by Hero section 2
    gsap.fromTo(
      imageRef.current,
      { opacity: 0, scale: 1 },
      {
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section-2",
          start: "bottom 50%",
          end: "bottom 50.001%",
          scrub: 1,
        },
      }
    );

    // Scale Down during product-show scroll
    gsap.to(imageRef.current, {
      scale: 0.7,
      ease: "none",
      scrollTrigger: {
        trigger: ".product-show",
        start: "top 50%",
        end: "bottom 90%",
        scrub: 1,
      },
    });

    // Pin product header while product-show is in view
    ScrollTrigger.create({
      trigger: ".product-show",
      start: "top top",
      end: "bottom 85%",
      pin: headerRef.current,
      pinSpacing: true,
    });

    // Scale header down to 0.6 while pinned
    gsap.to(headerRef.current, {
      scale: 0,
      ease: "none",
      scrollTrigger: {
        trigger: ".product-show",
        start: "top 75%",
        end: "bottom top",
        scrub: 1,
      },
    });

    // Subtle scroll animations for fruit images
    // Cranberry - parallax up with slight scale
    gsap.to(cranberryRef.current, {
      y: -80,
      scale: 2,
      rotation: 5,
      ease: "none",
      scrollTrigger: {
        trigger: ".product-show",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    // Lime - parallax up with slight scale (different speed)
    gsap.to(limeRef.current, {
      y: -100,
      scale: 2,
      rotation: -5,
      ease: "none",
      scrollTrigger: {
        trigger: ".product-show",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    // Cranberry blurred - slower parallax with scale
    gsap.to(cranberryBlurredRef.current, {
      y: -120,
      x: -200,
      scale: 2,
      rotation: 8,
      ease: "none",
      scrollTrigger: {
        trigger: ".product-show",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    // Lime blurred - slower parallax with scale
    gsap.to(limeBlurredRef.current, {
      y: -140,
      x: 200,
      scale: 2,
      rotation: -8,
      ease: "none",
      scrollTrigger: {
        trigger: ".product-show",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    // Smooth Fade Out & Hide using Timeline
    // This handles both opacity fade and display:none in one smooth animation
    const tlFadeOut = gsap.timeline({
      scrollTrigger: {
        trigger: ".product-video",
        start: "top 80%",
        end: "top top",
        scrub: 1,
      },
    });

    tlFadeOut
      .to(imageRef.current, {
        opacity: 0,
        scale: 0.6,
        ease: "none",
      })
      .set(imageRef.current, { display: "none" });
    // The .set() automatically reverses when scrubbing back
  });

  return (
    <>
      <section
        ref={sectionRef}
        className="product-summary relative bg-white text-white h-[50vh]"
      >
        <div
          ref={imageRef}
          className="fixed inset-0 w-screen h-screen opacity-0 z-50"
        >
          <Image
            src="/images/poka-original-black-bg.png"
            alt="Poka Life original"
            width={0}
            height={0}
            sizes="cover"
            style={{ width: "100%", height: "100%" }}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      <section
        className="product-show relative min-h-screen h-screen bg-cover bg-center bg-white pt-10 overflow-x-hidden"
        style={{ backgroundImage: "url('/images/product-summary-img.png')" }}
      >
        <div ref={headerRef} className="product-header">
          <h1 className="text-teal-900 lg:text-[5rem] font-bold text-center leading-none uppercase">
            Coconut, just the <br /> way you like it.
          </h1>
          <h1 className="text-teal-600 lg:text-[5rem] font-bold text-center leading-none uppercase">
            What’s your flavour?
          </h1>
        </div>

        {/* Decorative fruits */}
        <Image
          ref={cranberryRef}
          src="/images/cranberry.png"
          alt="Cranberry"
          width={120}
          height={120}
          className="pointer-events-none select-none absolute left-[16%] bottom-[3%] h-auto"
        />
        <Image
          ref={limeRef}
          src="/images/lime.png"
          alt="Lime"
          width={120}
          height={120}
          className="pointer-events-none select-none absolute right-[10%] bottom-[6%] h-auto"
        />
        <Image
          ref={cranberryBlurredRef}
          src="/images/cranberry-blured.png"
          alt="Cranberry blurred"
          width={360}
          height={360}
          className="pointer-events-none select-none absolute left-[-6%] bottom-[30%] h-auto"
        />
        <Image
          ref={limeBlurredRef}
          src="/images/lime-blured.png"
          alt="Lime blurred"
          width={360}
          height={360}
          className="pointer-events-none select-none absolute right-[-6%] top-[30%] h-auto"
        />

        <Image
          ref={cranberryTextRef}
          src="/graphics/cranberry-text-red.png"
          alt="Cranberry text"
          width={180}
          height={180}
          className="pointer-events-none select-none absolute left-[16%] top-[50%] h-auto"
        />

        <Image
          ref={limeTextRef}
          src="/graphics/lime-text-green.png"
          alt="Lime text"
          width={180}
          height={180}
          className="pointer-events-none select-none absolute right-[16%] top-[50%] h-auto"
        />
      </section>
    </>
  );
};
