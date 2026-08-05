import { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );

    camera.position.z = 35;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);

    container.appendChild(renderer.domElement);

    /* ------------------------------------------ */
    /*              PARTICLES                     */
    /* ------------------------------------------ */

    const PARTICLE_COUNT = 350;

    const positions = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }

    const geometry = new THREE.BufferGeometry();

    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const material = new THREE.PointsMaterial({
      color: "#3aa8ff",
      size: 0.18,
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);

    scene.add(particles);

    /* ------------------------------------------ */
    /*            Ambient Light                   */
    /* ------------------------------------------ */

    const ambient = new THREE.AmbientLight("#5ec3ff", 1.5);

    scene.add(ambient);

    /* ------------------------------------------ */
    /*              Mouse                         */
    /* ------------------------------------------ */

    const mouse = {
      x: 0,
      y: 0,
    };

    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", onMouseMove);

    /* ------------------------------------------ */
    /*             Resize                         */
    /* ------------------------------------------ */

    const onResize = () => {
      camera.aspect =
        container.clientWidth / container.clientHeight;

      camera.updateProjectionMatrix();

      renderer.setSize(
        container.clientWidth,
        container.clientHeight
      );
    };

    window.addEventListener("resize", onResize);

    /* ------------------------------------------ */
    /*              Animation                     */
    /* ------------------------------------------ */

    let frameId;

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      particles.rotation.y += 0.0008;
      particles.rotation.x += 0.0003;

      camera.position.x += (mouse.x * 3 - camera.position.x) * 0.03;
      camera.position.y += (-mouse.y * 3 - camera.position.y) * 0.03;

      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    /* ------------------------------------------ */

    return () => {
      cancelAnimationFrame(frameId);

      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);

      geometry.dispose();
      material.dispose();

      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="canvas-bg" />;
};

export default ThreeBackground;