import React, { useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function App() {
  const [showContent, setShowContent] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Set initial states
    gsap.set(".dtg-logo", {
      svgOrigin: "400 300",
      transformOrigin: "center center",
    });
    gsap.set(".last-page-heading", { scale: 0, opacity: 0, y: 100 });

    // Intro animation timeline
    const introTl = gsap.timeline();
    introTl
      .set("#dtg-text-d", { opacity: 1, duration: 1, delay: 0.5 })
      .to("#dtg-text-t", { opacity: 1, duration: 1, delay: 0.5 })
      .to("#dtg-text-g", { opacity: 1, duration: 1, delay: 0.5 })
      .to(".dtg-logo", { rotate: 10, duration: 1.5, ease: "Power4.easeInOut" })
      .to(".dtg-logo", {
        scale: 10,
        duration: 1.5,
        delay: -1,
        ease: "Expo.easeInOut",
        opacity: 0,
        onUpdate: function () {
          if (this.progress() >= 0.9) {
            const svgElement = document.querySelector(".svg");
            if (svgElement) svgElement.remove();
            setShowContent(true);
            this.kill();
          }
        },
      });

    // Floating arrow animation
    gsap.to(".scroll-arrow", {
      y: 10,
      repeat: -1,
      duration: 1,
      ease: "power1.inOut",
      yoyo: true,
    });

    // Main reveal animation
    gsap.to(".main", {
      scale: 1,
      rotate: 0,
      delay: -0.5,
      duration: 2,
      ease: "Expo.easeInOut",
    });
    gsap.to(".character", {
      rotate: 0,
      bottom: 0,
      delay: -0.5,
      duration: 2,
      ease: "Expo.easeInOut",
    });
    gsap.to(".sky", {
      rotate: 0,
      delay: -0.5,
      duration: 2,
      ease: "Expo.easeInOut",
    });

    // Scroll-based panel animation
    // Scroll-based panel animation
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".page2",
        start: "bottom bottom",
        end: "+=400",
        scrub: true,
        markers: true,
        pin: true,
      },
    });

    scrollTl
      .to(".topPanel", { yPercent: -100, ease: "power2.out" })
      .to(".bottomPanel", { yPercent: 100, ease: "power2.out" }, "<");

    // Last page scroll animation
    ScrollTrigger.create({
      trigger: ".last-page",
      start: "top center",
      markers: true,
      onEnter: () => {
        gsap.to(".last-page-heading", {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 5,
          ease: "power3.out",
        });
      },
    });

    // Mouse movement parallax effect
    const main = document.querySelector(".main");
    if (main) {
      main.addEventListener("mousemove", function (e) {
        const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
        const yMove = (e.clientY / window.innerHeight - 0.5) * 40;
        gsap.to(".main-text", { x: xMove * 1.4, y: yMove * 1.4 });
        gsap.to(".sky", { x: xMove, y: yMove });
        gsap.to(".bg", { x: xMove * 0.5, y: yMove * 0.5 });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      introTl.kill();
      scrollTl.kill();
      if (main) main.removeEventListener("mousemove", () => {});
    };
  }, [showContent]);

  return (
    <>
      <div
        className="circle w-20 h-20 fixed bg-orange-500 z-[9999] rounded-full pointer-events-none mix-blend-difference"
        style={{
          transform: `translate(${cursorPosition.x - 40}px, ${
            cursorPosition.y - 40
          }px)`,
          transition: "transform 0.1s ease-out",
        }}
      />
      <div className="svg flex items-center justify-center fixed top-0 left-0 w-full h-screen z-[100] overflow-hidden bg-black">
        <svg
          viewBox="0 0 800 600"
          preserveAspectRatio="xMidYMid slice"
          width="100%"
          height="100%"
        >
          <defs>
            <mask id="logoMask">
              <rect width="800" height="600" fill="black" />
              <g className="dtg-logo">
                <text
                  className="dtg-text"
                  id="dtg-text-d"
                  x="200"
                  y="300"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                  style={{ opacity: 0 }}
                >
                  D
                </text>
                <text
                  className="dtg-text"
                  id="dtg-text-t"
                  x="400"
                  y="300"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                  style={{ opacity: 0 }}
                >
                  T
                </text>
                <text
                  className="dtg-text"
                  id="dtg-text-g"
                  x="600"
                  y="300"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                  style={{ opacity: 0 }}
                >
                  G
                </text>
              </g>
            </mask>
          </defs>

          <image
            href="./bg.png"
            width="800"
            height="600"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#logoMask)"
          />
        </svg>
      </div>
      {showContent && (
        <div className=" overflow-hidden">
          <div className="main bg-black h-full w-screen rotate-[-19deg] scale-[1.5] overflow-hidden">
            <div className="landing h-screen w-full relative overflow-hidden">
              <img
                className="sky absolute top-0 left-0 object-cover w-full h-full scale-[1.2] rotate-[-30deg]"
                src="./sky.png"
                alt=""
              />
              <img
                className="bg absolute top-0 left-0 object-cover w-full h-full scale-[1.2]"
                src="./bg.png"
                alt=""
              />

              <h1 className="main-text absolute top-[20%] left-[40%] text-white scale-[4]">
                DOWNTOWN
              </h1>
              <h1 className="main-text absolute top-[30%] left-[50%] text-white scale-[4]">
                GANGSTA
              </h1>

              <img
                className="character absolute bottom-[-20%] left-[40%] object-cover scale-[1.2] rotate-[-35deg]"
                src="./character.png"
                alt=""
              />
              <div className="btmbar absolute bottom-0 w-full py-15 px-10 bg-gradient-to-t from-black to-transparent">
                <div className="scroll-indicator flex direction-column align-center justify-center text-white absolute top-[10%] left-[10%] transform -translate-x-1/2">
                  <span className="text-xl mb-2">Scroll Down</span>
                  <svg
                    className="scroll-arrow w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                  </svg>
                </div>
                <img
                  className="absolute bottom-[5%] right-[2%] h-[60%]"
                  src="./ps5.png"
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className="page2 h-screen w-screen bg-black  flex flex-col relative">
            <h1 className="text-5xl  font-bold text-white text-center  mt-auto mb-auto">
              Welcome to the world
            </h1>
            <div className="topPanel absolute top-0 left-0 h-1/2 w-full bg-white flex justify-center ">
              <span className="absolute bottom-[-10%] text-8xl font-bold text-black">
                DOWNTOWN
              </span>
            </div>

            <div className="bottomPanel absolute  bottom-0 left-0 h-1/2 w-full bg-white flex justify-center ">
              <span className="text-8xl absolute top-[-10%] font-bold text-black">
                DOWNTOWN
              </span>
            </div>
          </div>

          <div className="last-page animation relative w-full h-screen bg-black">
            <h1 className="last-page-heading text-white text-9xl absolute top-[30%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 font-bold">
              COMING SOON
            </h1>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
