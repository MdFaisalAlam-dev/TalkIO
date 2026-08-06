import { useEffect, useRef } from "react";
import gsap from "gsap";
import { LoaderIcon } from "lucide-react";
import { APP_NAME, AppLogo } from "./AppLogo";

function PageLoader() {
  const overlayRef = useRef(null);
  const welcomeRef = useRef(null);
  const logoContainerRef = useRef(null);
  const nameLetterRefs = useRef([]);
  const spinnerRef = useRef(null);

  // Clear tracking array on render to avoid duplication
  nameLetterRefs.current = [];
  const addToLetterRefs = (el) => {
    if (el && !nameLetterRefs.current.includes(el)) {
      nameLetterRefs.current.push(el);
    }
  };

  useEffect(() => {
    const tl = gsap.timeline();

    // Set initial structural states before animating
    gsap.set(nameLetterRefs.current, { opacity: 0, y: 30, filter: "blur(10px)" });
    gsap.set(logoContainerRef.current, { opacity: 0, scale: 0.3, rotation: -45 });

    // 1. "Welcome to" fades and shifts down smoothly (0.0s - 1.2s)
    tl.fromTo(welcomeRef.current, 
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    )
    .to(welcomeRef.current, { opacity: 0.4, duration: 0.6, delay: 0.2 })

    // 2. Logo premium scale, rotation, and pop in (1.2s - 2.2s)
    .to(logoContainerRef.current, {
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 1,
      ease: "back.out(1.7)"
    }, "-=0.2")

    // 3. Cinematic Text Reveal: Letter-by-letter stagger blur & rise (2.0s - 3.5s)
    .to(nameLetterRefs.current, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.8,
      stagger: 0.06,
      ease: "power4.out"
    }, "-=0.5")

    // 4. Subtle continuous background pulse & spinner spin loop
    gsap.to(spinnerRef.current, {
      rotation: 360,
      duration: 1.2,
      repeat: -1,
      ease: "linear"
    });

    // 5. Grand Exit Sequence: Screen curtains slide up elegantly (4.3s - 5.0s)
    tl.to([welcomeRef.current, logoContainerRef.current, nameLetterRefs.current, spinnerRef.current], {
      opacity: 0,
      y: -30,
      duration: 0.5,
      ease: "power3.in"
    }, 4.0)
    .to(overlayRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)", // Premium curtain slide
      duration: 0.8,
      ease: "power4.inOut"
    }, 4.2);

  }, []);

  // Premium dark modern style definitions
  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "#0a0a0c", // Deep premium obsidian black
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 99999,
      color: "#ffffff",
      fontFamily: "'Inter', sans-serif",
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // Base for exit clip animation
      overflow: "hidden"
    },
    welcomeText: {
      fontSize: "1.25rem",
      textTransform: "uppercase",
      letterSpacing: "0.25em",
      color: "#a1a1aa",
      marginBottom: "1.5rem",
      fontWeight: "400"
    },
    brandContainer: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      marginBottom: "3rem"
    },
    logoWrapper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    appName: {
      fontSize: "3.5rem",
      fontWeight: "800",
      letterSpacing: "-0.02em",
      display: "flex" // Keep letters inline
    },
    letter: {
      display: "inline-block"
    },
    spinnerWrapper: {
      position: "absolute",
      bottom: "10%"
    },
    icon: {
      color: "#3b82f6", // Premium structural brand color accent
      animation: "pulse 2s infinite"
    }
  };

  return (
    <div ref={overlayRef} style={styles.overlay}>
      {/* Subtitle */}
      <div ref={welcomeRef} style={styles.welcomeText}>
        Welcome to
      </div>

      {/* Main Brand Section */}
      <div style={styles.brandContainer}>
        <div ref={logoContainerRef} style={styles.logoWrapper}>
          <AppLogo size={64} /> {/* Adjust parameters based on your AppLogo definition */}
        </div>
        
        <h1 style={styles.appName}>
          {APP_NAME.split("").map((letter, index) => (
            <span
              key={index}
              ref={addToLetterRefs}
              style={{
                ...styles.letter,
                marginRight: letter === " " ? "1rem" : "0px" // Handle spaces safely
              }}
            >
              {letter}
            </span>
          ))}
        </h1>
      </div>

      {/* Modern Spinner Accent */}
      <div ref={spinnerRef} style={styles.spinnerWrapper}>
        <LoaderIcon size={28} style={styles.icon} />
      </div>
    </div>
  );
}

export default PageLoader;
