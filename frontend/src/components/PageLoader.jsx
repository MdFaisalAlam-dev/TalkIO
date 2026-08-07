import { useEffect, useRef } from "react";
import gsap from "gsap";
import { APP_NAME, AppLogo } from "./AppLogo";

// ─────────────────────────────────────────────────────────────────────────────
// PAGE LOADER
//
// A 5-second premium intro built entirely with GSAP.
//
// Act 1 — Awakening  (0.0 – 1.8s): A soft ambient bloom expands from darkness.
// Act 2 — Arrival    (0.7 – 1.8s): The logo rises through the bloom, clearing.
// Act 3 — The Line   (1.7 – 2.5s): A thin rule unfurls from center outward.
// Act 4 — The Name   (2.1 – 3.3s): Letters float upward one by one.
// Act 5 — The Sheen  (3.3 – 4.1s): A single whisper of light crosses the name.
// Act 6 — Departure  (4.1 – 5.0s): Everything drifts up and dissolves quietly.
// ─────────────────────────────────────────────────────────────────────────────
function PageLoader() {
  const overlayRef  = useRef(null);
  const bloomRef    = useRef(null);
  const contentRef  = useRef(null);
  const logoRef     = useRef(null);
  const lineRef     = useRef(null);
  const nameWrapRef = useRef(null);
  const shineRef    = useRef(null);
  const letterRefs  = useRef([]);

  const appLetters = APP_NAME.split("");

  useEffect(() => {
    const letters = letterRefs.current.filter(Boolean);
    const tl = gsap.timeline();

    // ── Initial States ────────────────────────────────────────────────────
    // All set explicitly with gsap.set() to avoid any from() conflicts.
    gsap.set(overlayRef.current,  { opacity: 0 });
    gsap.set(bloomRef.current,    { scale: 0.08, opacity: 0 });
    gsap.set(logoRef.current,     { opacity: 0, y: 24, filter: "blur(10px)" });
    gsap.set(lineRef.current,     { scaleX: 0, opacity: 0, transformOrigin: "center center" });
    gsap.set(letters,             { opacity: 0, y: 30, filter: "blur(3px)" });
    gsap.set(shineRef.current,    { x: "-130%" });

    // ─────────────────────────────────────────────────────────────────────
    // ACT 1 — AWAKENING
    // The overlay fades in. A large, diffuse bloom of light slowly expands
    // from the center — like a room becoming aware of itself.
    // ─────────────────────────────────────────────────────────────────────
    tl
      .to(overlayRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: "none",
      })
      .to(bloomRef.current, {
        scale: 1,
        opacity: 1,
        duration: 2.0,
        ease: "power1.out",
      }, 0.1)

    // ─────────────────────────────────────────────────────────────────────
    // ACT 2 — ARRIVAL
    // The logo rises from below, shedding blur as it reaches its position.
    // power4.out: arrives quickly then settles with grace.
    // ─────────────────────────────────────────────────────────────────────
      .to(logoRef.current, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.1,
        ease: "power4.out",
      }, 0.7)

    // ─────────────────────────────────────────────────────────────────────
    // ACT 3 — THE LINE
    // A thin 1px rule unfurls from the center with expo easing —
    // fast at the start, snapping to stillness at full width.
    // This moment "introduces" the name before it appears.
    // ─────────────────────────────────────────────────────────────────────
      .to(lineRef.current, {
        scaleX: 1,
        opacity: 1,
        duration: 0.85,
        ease: "expo.inOut",
      }, 1.7)

    // ─────────────────────────────────────────────────────────────────────
    // ACT 4 — THE NAME
    // Letters rise upward through blur and settle into clarity, staggered
    // so each one follows the last with a 50ms offset.
    // ─────────────────────────────────────────────────────────────────────
      .to(letters, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.72,
        ease: "power4.out",
        stagger: 0.05,
      }, 2.12)

    // ─────────────────────────────────────────────────────────────────────
    // ACT 5 — THE SHEEN
    // Once the name is fully revealed, a single, barely-visible band of
    // light passes across it once and is gone. A whisper, not a flash.
    // ─────────────────────────────────────────────────────────────────────
      .to(shineRef.current, {
        x: "230%",
        duration: 0.95,
        ease: "power1.inOut",
      }, 3.35)

    // ─────────────────────────────────────────────────────────────────────
    // ACT 6 — DEPARTURE
    // The content quietly drifts upward while fading — not a dramatic exit,
    // just a graceful dissolution. The bloom contracts. The overlay clears.
    // ─────────────────────────────────────────────────────────────────────
      .to(contentRef.current, {
        y: -22,
        opacity: 0,
        filter: "blur(7px)",
        duration: 0.55,
        ease: "power3.in",
      }, 4.1)
      .to(bloomRef.current, {
        scale: 0.55,
        opacity: 0,
        duration: 0.52,
        ease: "power2.in",
      }, 4.14)
      .to(overlayRef.current, {
        opacity: 0,
        duration: 0.46,
        ease: "power2.in",
      }, 4.44);

    return () => tl.kill();
  }, []);

  // ── RENDER ────────────────────────────────────────────────────────────────
  return (
    <div ref={overlayRef} style={S.overlay}>

      {/*
        Ambient Bloom
        A large, extremely soft radial gradient.
        Barely visible at the edges — the light source is implied, not shown.
      */}
      <div ref={bloomRef} style={S.bloom} />

      {/*
        Content Column: Logo → Line → Name
        All three animate independently but read as one unified reveal.
      */}
      <div ref={contentRef} style={S.content}>

        {/* Logo */}
        <div ref={logoRef} style={S.logoWrap}>
          <AppLogo size={68} />
        </div>

        {/* Separator line — 1px, fades at both ends */}
        <div ref={lineRef} style={S.line} />

        {/*
          Name + Sheen
          nameWrap has overflow: hidden to clip the sheen as it passes.
        */}
        <div ref={nameWrapRef} style={S.nameWrap}>

          <h1 style={S.name}>
            {appLetters.map((char, i) => (
              <span
                key={i}
                ref={el => { letterRefs.current[i] = el; }}
                style={S.letter}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>

          {/* Sheen: a translucent band that crosses once */}
          <div ref={shineRef} style={S.shine} />

        </div>

      </div>
    </div>
  );
}

export default PageLoader;

// ─────────────────────────────────────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────────────────────────────────────
const S = {

  // Root overlay — warm dark, barely-perceptible diagonal gradient
  // Avoids the flatness of pure #000 while remaining deeply neutral
  overlay: {
    position: "fixed",
    inset: 0,
    zIndex: 99999,
    background: "linear-gradient(150deg, #0E0D14 0%, #09080D 55%, #0D0C13 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    opacity: 0,
  },

  // The bloom: 640px soft circle, positioned dead center
  // Two radial layers: a brighter core that falls off to a cooler outer ring
  bloom: {
    position: "absolute",
    width: "640px",
    height: "640px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "50%",
    background: [
      "radial-gradient(circle at 50% 45%,",
      "  rgba(255, 252, 248, 0.065) 0%,",
      "  rgba(210, 200, 255, 0.022) 45%,",
      "  transparent 70%",
      ")",
    ].join(" "),
    pointerEvents: "none",
  },

  // Central flex column — all three elements align on their centers
  content: {
    position: "relative",
    zIndex: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1.75rem",
  },

  // Logo container — the drop-shadow is barely visible, just enough to
  // lift the mark from the background without creating a halo
  logoWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    filter: "drop-shadow(0 2px 24px rgba(255, 255, 255, 0.07))",
  },

  // 1px separator line — gradient fades at both ends so it has no hard edge
  // scaleX animates from 0 at transformOrigin: center, giving the
  // impression that it "grows" outward from the center point
  line: {
    width: "116px",
    height: "1px",
    background: [
      "linear-gradient(90deg,",
      "  transparent 0%,",
      "  rgba(255, 255, 255, 0.22) 25%,",
      "  rgba(255, 255, 255, 0.22) 75%,",
      "  transparent 100%",
      ")",
    ].join(" "),
    flexShrink: 0,
  },

  // Wrapper for the name — overflow:hidden is required to clip the sheen
  nameWrap: {
    position: "relative",
    overflow: "hidden",
  },

  // App name — weight 500 reads as confident without being heavy
  // Letter spacing 0.09em: open and airy, a premium typographic choice
  // clamp() keeps it proportional from mobile to large screens
  name: {
    margin: 0,
    padding: 0,
    paddingBottom: "0.1em",   // clip buffer so descenders aren't cut by overflow:hidden
    fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)",
    fontWeight: 500,
    letterSpacing: "0.09em",
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    color: "#ECE7DF",
    lineHeight: 1.05,
    userSelect: "none",
  },

  // Individual letter spans — each driven by its own GSAP tween
  letter: {
    display: "inline-block",
    willChange: "transform, opacity, filter",
  },

  // Sheen — a translucent diagonal band, ~40% of the name width
  // Starts at x: -130%, moves to x: 230% in one pass via GSAP
  // mixBlendMode "overlay" makes it interact gently with the text color
  shine: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "42%",
    height: "100%",
    background: [
      "linear-gradient(105deg,",
      "  transparent 20%,",
      "  rgba(255, 255, 255, 0.09) 50%,",
      "  transparent 80%",
      ")",
    ].join(" "),
    mixBlendMode: "overlay",
    pointerEvents: "none",
  },
};