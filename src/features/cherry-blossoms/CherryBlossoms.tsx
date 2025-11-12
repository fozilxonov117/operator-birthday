import { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  speed: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  swing: number;
  swingSpeed: number;
  opacity: number;
}

export const CherryBlossoms = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    // Create petals
    const petals: Petal[] = [];
    const petalCount = 40;

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        speed: Math.random() * 0.8 + 0.3,
        size: Math.random() * 6 + 4,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 3 - 1.5,
        swing: Math.random() * 100,
        swingSpeed: Math.random() * 0.03 + 0.01,
        opacity: Math.random() * 0.4 + 0.5,
      });
    }

    // Draw petal shape (cherry blossom)
    const drawPetal = (petal: Petal) => {
      ctx.save();
      ctx.translate(petal.x, petal.y);
      ctx.rotate((petal.rotation * Math.PI) / 180);
      ctx.globalAlpha = petal.opacity;

      // Draw 5-petaled flower
      for (let i = 0; i < 5; i++) {
        ctx.save();
        ctx.rotate(((Math.PI * 2) / 5) * i);

        // Petal shape
        ctx.beginPath();
        ctx.fillStyle = '#ffc0cb'; // Pink
        ctx.ellipse(0, -petal.size / 2, petal.size / 2, petal.size, 0, 0, Math.PI * 2);
        ctx.fill();

        // Petal outline
        ctx.strokeStyle = '#ffb6c1'; // Light pink
        ctx.lineWidth = 0.5;
        ctx.stroke();

        ctx.restore();
      }

      // Center
      ctx.beginPath();
      ctx.fillStyle = '#fff4e6';
      ctx.arc(0, 0, petal.size / 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      petals.forEach((petal) => {
        drawPetal(petal);

        // Update position
        petal.y += petal.speed;
        petal.rotation += petal.rotationSpeed;
        petal.swing += petal.swingSpeed;
        petal.x += Math.sin(petal.swing) * 0.8;

        // Reset when petal goes off screen
        if (petal.y > canvas.height + petal.size) {
          petal.y = -petal.size;
          petal.x = Math.random() * canvas.width;
          petal.rotation = Math.random() * 360;
        }

        // Keep petals within horizontal bounds
        if (petal.x < -petal.size) petal.x = canvas.width + petal.size;
        if (petal.x > canvas.width + petal.size) petal.x = -petal.size;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      setCanvasSize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1000,
      }}
    />
  );
};
