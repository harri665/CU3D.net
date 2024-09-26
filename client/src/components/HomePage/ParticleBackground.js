import React, { useRef, useEffect } from "react";

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const particles = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles.current = [];
      for (let i = 0; i < (canvas.width * canvas.height) / 6000; i++) {
        particles.current.push(createParticle(canvas));
      }
    };

    const createParticle = (canvas) => {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: Math.random() / 5 + 0.1,
        opacity: 1,
        fadeDelay: Math.random() * 600 + 100,
        fadeStart: Date.now() + Math.random() * 600 + 100,
        fadingOut: false,
      };
    };

    const updateParticles = () => {
      particles.current.forEach((particle) => {
        particle.y -= particle.speed;
        if (particle.y < 0) {
          Object.assign(particle, createParticle(canvas));
          particle.y = canvas.height;
        }
        if (!particle.fadingOut && Date.now() > particle.fadeStart) {
          particle.fadingOut = true;
        }
        if (particle.fadingOut) {
          particle.opacity -= 0.008;
          if (particle.opacity <= 0) {
            Object.assign(particle, createParticle(canvas));
          }
        }
      });
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.current.forEach((particle) => {
        ctx.fillStyle = `rgba(${255 - Math.random() * 127}, 255, 255, ${particle.opacity})`;
        ctx.fillRect(particle.x, particle.y, 0.4, Math.random() * 2 + 1);
      });
    };

    const animate = () => {
      updateParticles();
      drawParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none" />;
};

export default ParticleBackground;
