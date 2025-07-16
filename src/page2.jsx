import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Page2 = () => {
  const topPanelRef = useRef(null);
  const bottomPanelRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".trigger-section",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });

    tl.to(topPanelRef.current, {
      y: -window.innerHeight / 2,
      ease: "power2.out",
    }).to(bottomPanelRef.current, {
      y: window.innerHeight / 2,
      ease: "power2.out",
    }, "<"); // "<" syncs both animations
  }, []);

  return (
    <div className="relative h-screen w-screen bg-white overflow-hidden">
      {/* Top Panel */}
      <div
        ref={topPanelRef}
        className="absolute top-0 h-1/2 w-full bg-white z-10 flex items-center justify-center"
      >
        <span className="text-6xl font-bold text-black">DOWNTOWN</span>
      </div>

      {/* Sticky Section */}
      <section className="trigger-section sticky top-0 h-screen flex items-center justify-center bg-black">
        <h1 className="absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl font-bold text-white">
          Welcome to the world
        </h1>
      </section>

      {/* Bottom Panel */}
      <div
        ref={bottomPanelRef}
        className="absolute bottom-0 h-1/2 w-full bg-white z-10 flex items-center justify-center"
      >
        <span className="text-6xl font-bold text-black">DOWNTOWN</span>
      </div>
    </div>
  );
};

export default Page2;

