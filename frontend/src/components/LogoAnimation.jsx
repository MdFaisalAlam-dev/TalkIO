import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const LogoAnimation = () => {
  const logoRef = useRef();

  useEffect(() => {
    gsap.to(logoRef.current, {
      y: -8,
      duration: 2.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(".loader-logo img", {
      rotate: 4,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      transformOrigin: "center center",
    });

    gsap.to(".loader-logo img", {
      scale: 1.05,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <div
      ref={logoRef}
      className="loader-logo flex items-center justify-center"
    >
      <div className="logo-glow"></div>

      <img
        src="/logo.png" // <-- Put your logo inside /public/logo.png
        alt="TalkIO"
        className="w-24 h-24 rounded-3xl shadow-2xl"
      />
    </div>
  );
};

export default LogoAnimation;