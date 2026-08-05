import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { LoaderCircle } from "lucide-react";

import "./loading.css";

import LogoAnimation from "./LogoAnimation";
import LoadingText from "./LoadingText";
import ThreeBackground from "./ThreeBackground";

const PageLoader = () => {
  const loaderRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: {
        ease: "power4.out",
      },
    });

    /* ---------------- Background Glow ---------------- */

    tl.fromTo(
      ".loader-gradient",
      {
        scale: 0,
        opacity: 0,
      },
      {
        scale: 1.4,
        opacity: 1,
        duration: 1.2,
      }
    );

    /* ---------------- Logo ---------------- */

    tl.fromTo(
      ".loader-logo",
      {
        y: 40,
        opacity: 0,
        scale: 0.6,
        rotate: -20,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotate: 0,
        duration: 1.2,
        ease: "elastic.out(1,0.6)",
      },
      "-=0.7"
    );

    /* ---------------- Welcome Text ---------------- */

    tl.to(".welcome-line", {
      opacity: 1,
      y: 0,
      duration: 0.7,
    });

    /* ---------------- TalkIO Letters ---------------- */

    tl.to(
      ".loading-letter",
      {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.45,
        ease: "back.out(1.7)",
      },
      "-=0.3"
    );

    /* ---------------- Subtitle ---------------- */

    tl.to(
      ".loading-subtitle",
      {
        opacity: 1,
        y: -5,
        duration: 0.6,
      },
      "-=0.2"
    );

    /* ---------------- Footer ---------------- */

    tl.to(
      ".loader-footer",
      {
        opacity: 0.7,
        duration: 0.5,
      },
      "-=0.3"
    );

    /* ---------------- Spinner ---------------- */

    tl.to(".loader-spinner", {
      opacity: 1,
      duration: 0.3,
    });

    /* ---------------- Infinite Animations ---------------- */

    gsap.to(".logo-glow", {
      scale: 1.3,
      opacity: 0.3,
      repeat: -1,
      yoyo: true,
      duration: 2,
      ease: "sine.inOut",
    });

    gsap.to(".loader-spinner", {
      rotate: 360,
      duration: 1,
      repeat: -1,
      ease: "none",
      transformOrigin: "center center",
    });

    /* ---------------- Exit ---------------- */

    tl.to(loaderRef.current, {
      delay: 1.4,
      opacity: 0,
      scale: 0.95,
      filter: "blur(20px)",
      duration: 0.8,
      ease: "power3.inOut",
    });

    return () => {
      tl.kill();
      gsap.killTweensOf(".logo-glow");
      gsap.killTweensOf(".loader-spinner");
    };
  }, []);

  return (
    <div ref={loaderRef} className="loader-wrapper">
      <ThreeBackground />

      <div className="loader-gradient" />

      <div className="loader-content">
        <LogoAnimation />

        <LoadingText />

        <p className="loading-subtitle">
          Where Conversations Flow
        </p>

        <div className="loader-spinner">
          <LoaderCircle size={22} strokeWidth={2} />
        </div>
      </div>

      <div className="loader-footer">
        POWERED BY GSAP × THREE.JS
      </div>
    </div>
  );
};

export default PageLoader;