import React from "react";
import { InfiniteMarquee } from "@/components/animations/InfiniteMarquee";
import { ScrollVideoSequence } from "@/components/animations/ScrollVideoSequence";
import LiquidEther from "@/components/LiquidEther";

function Home() {
  return (
    <div>
      <section className={`section-home-hero min-h-screen bg-slate-900`}>
        <div className="hero-container relative w-full min-h-screen flex items-center justify-center">
          <div className="w-full h-svh z-1 absolute inset-0">
            <ScrollVideoSequence className="z-10" />
          </div>

          <LiquidEther
            colors={["#15543B", "#15543B", "#B2D138"]}
            mouseForce={20}
            cursorSize={100}
            isViscous={false}
            viscous={30}
            iterationsViscous={32}
            iterationsPoisson={32}
            resolution={0.5}
            isBounce={false}
            autoDemo={true}
            autoSpeed={0.5}
            autoIntensity={2.2}
            takeoverDuration={0.25}
            autoResumeDelay={3000}
            autoRampDuration={0.6}
          />

          <InfiniteMarquee>
            <h1 className="text-[12rem] text-white font-medium ">Freeze.</h1>
            <h1 className="text-[12rem] text-white font-medium ">Shake.</h1>
            <h1 className="text-[12rem] text-white font-medium ">Drink.</h1>
          </InfiniteMarquee>
        </div>
      </section>
      <section className="min-h-screen bg-[#06291B]"></section>
      <section className="min-h-screen bg-[#06291B]"></section>
      <section className="min-h-screen bg-[#06291B]"></section>
    </div>
  );
}

export default Home;
