import { useEffect, useRef } from 'react';

interface Leaf {
  x: number;
  y: number;
  speed: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  swing: number;
  swingSpeed: number;
  color: string;
  type: 'maple' | 'oak';
}

const LEAF_COLORS = [
  '#d97706', // Orange
  '#dc2626', // Red
  '#b91c1c', // Dark Red
  '#ea580c', // Deep Orange
  '#a16207', // Golden Brown
  '#f59e0b', // Amber
  '#92400e', // Brown
];

export const FallingLeaves = () => {
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

    // Create leaves
    const leaves: Leaf[] = [];
    const leafCount = 35;

    for (let i = 0; i < leafCount; i++) {
      leaves.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        speed: Math.random() * 1.5 + 0.5,
        size: Math.random() * 12 + 8,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 3 - 1.5,
        swing: Math.random() * 100,
        swingSpeed: Math.random() * 0.03 + 0.01,
        color: LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)],
        type: Math.random() > 0.5 ? 'maple' : 'oak',
      });
    }

    // Draw maple leaf shape (realistic with stem)
    const drawMapleLeaf = (leaf: Leaf) => {
      const size = leaf.size;
      ctx.fillStyle = leaf.color;
      
      // Draw stem first
      ctx.fillStyle = '#8B4513'; // Brown stem
      ctx.fillRect(-size * 0.05, size * 1.2, size * 0.1, size * 0.4);
      
      // Main leaf body
      ctx.fillStyle = leaf.color;
      ctx.beginPath();
      
      // Center top point
      ctx.moveTo(0, -size * 1.3);
      
      // Right side - upper lobe
      ctx.lineTo(size * 0.2, -size * 0.9);
      ctx.lineTo(size * 0.5, -size * 1.1);
      ctx.lineTo(size * 0.6, -size * 0.7);
      ctx.lineTo(size * 0.4, -size * 0.5);
      
      // Right side - middle lobe
      ctx.lineTo(size * 0.8, -size * 0.6);
      ctx.lineTo(size * 1.1, -size * 0.3);
      ctx.lineTo(size * 0.9, 0);
      ctx.lineTo(size * 0.5, -size * 0.1);
      
      // Right side - lower lobe
      ctx.lineTo(size * 0.7, size * 0.3);
      ctx.lineTo(size * 0.8, size * 0.7);
      ctx.lineTo(size * 0.5, size * 0.8);
      ctx.lineTo(size * 0.3, size * 0.5);
      
      // Bottom center
      ctx.lineTo(size * 0.15, size * 1.2);
      ctx.lineTo(0, size * 1.0);
      ctx.lineTo(-size * 0.15, size * 1.2);
      
      // Left side - lower lobe
      ctx.lineTo(-size * 0.3, size * 0.5);
      ctx.lineTo(-size * 0.5, size * 0.8);
      ctx.lineTo(-size * 0.8, size * 0.7);
      ctx.lineTo(-size * 0.7, size * 0.3);
      
      // Left side - middle lobe
      ctx.lineTo(-size * 0.5, -size * 0.1);
      ctx.lineTo(-size * 0.9, 0);
      ctx.lineTo(-size * 1.1, -size * 0.3);
      ctx.lineTo(-size * 0.8, -size * 0.6);
      
      // Left side - upper lobe
      ctx.lineTo(-size * 0.4, -size * 0.5);
      ctx.lineTo(-size * 0.6, -size * 0.7);
      ctx.lineTo(-size * 0.5, -size * 1.1);
      ctx.lineTo(-size * 0.2, -size * 0.9);
      
      ctx.closePath();
      ctx.fill();
      
      // Add gradient effect for realism
      const gradient = ctx.createRadialGradient(0, 0, size * 0.3, 0, 0, size * 1.5);
      gradient.addColorStop(0, leaf.color);
      gradient.addColorStop(1, shadeColor(leaf.color, -20));
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Draw detailed veins
      ctx.strokeStyle = 'rgba(139, 69, 19, 0.5)';
      ctx.lineWidth = size * 0.08;
      ctx.lineCap = 'round';
      
      // Main central vein
      ctx.beginPath();
      ctx.moveTo(0, -size * 1.3);
      ctx.lineTo(0, size * 1.2);
      ctx.stroke();
      
      // Upper veins
      ctx.lineWidth = size * 0.05;
      ctx.beginPath();
      ctx.moveTo(0, -size * 0.8);
      ctx.lineTo(size * 0.5, -size * 1.0);
      ctx.moveTo(0, -size * 0.8);
      ctx.lineTo(-size * 0.5, -size * 1.0);
      ctx.stroke();
      
      // Middle veins
      ctx.beginPath();
      ctx.moveTo(0, -size * 0.2);
      ctx.lineTo(size * 0.9, -size * 0.2);
      ctx.moveTo(0, -size * 0.2);
      ctx.lineTo(-size * 0.9, -size * 0.2);
      ctx.stroke();
      
      // Lower veins
      ctx.lineWidth = size * 0.04;
      ctx.beginPath();
      ctx.moveTo(0, size * 0.5);
      ctx.lineTo(size * 0.6, size * 0.6);
      ctx.moveTo(0, size * 0.5);
      ctx.lineTo(-size * 0.6, size * 0.6);
      ctx.stroke();
      
      // Add subtle shadow for depth
      ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
      ctx.shadowBlur = size * 0.3;
      ctx.shadowOffsetX = size * 0.1;
      ctx.shadowOffsetY = size * 0.1;
    };
    
    // Helper function to darken/lighten colors
    const shadeColor = (color: string, percent: number): string => {
      const num = parseInt(color.replace('#', ''), 16);
      const amt = Math.round(2.55 * percent);
      const R = (num >> 16) + amt;
      const G = (num >> 8 & 0x00FF) + amt;
      const B = (num & 0x0000FF) + amt;
      return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255))
        .toString(16).slice(1);
    };
    
    // Draw oak leaf shape
    const drawOakLeaf = (leaf: Leaf) => {
      const size = leaf.size;
      
      // Draw stem
      ctx.fillStyle = '#8B4513'; // Brown stem
      ctx.fillRect(-size * 0.05, size * 1.0, size * 0.1, size * 0.3);
      
      ctx.fillStyle = leaf.color;
      ctx.beginPath();
      
      // Oak leaf with rounded lobes
      ctx.moveTo(0, -size * 1.0);
      // Right side lobes
      ctx.quadraticCurveTo(size * 0.4, -size * 0.8, size * 0.6, -size * 0.5);
      ctx.quadraticCurveTo(size * 0.3, -size * 0.5, size * 0.5, -size * 0.2);
      ctx.quadraticCurveTo(size * 0.7, -size * 0.1, size * 0.8, size * 0.2);
      ctx.quadraticCurveTo(size * 0.5, size * 0.2, size * 0.5, size * 0.5);
      ctx.quadraticCurveTo(size * 0.6, size * 0.7, size * 0.4, size * 1.0);
      ctx.quadraticCurveTo(size * 0.1, size * 0.9, 0, size * 1.0);
      // Left side lobes
      ctx.quadraticCurveTo(-size * 0.1, size * 0.9, -size * 0.4, size * 1.0);
      ctx.quadraticCurveTo(-size * 0.6, size * 0.7, -size * 0.5, size * 0.5);
      ctx.quadraticCurveTo(-size * 0.5, size * 0.2, -size * 0.8, size * 0.2);
      ctx.quadraticCurveTo(-size * 0.7, -size * 0.1, -size * 0.5, -size * 0.2);
      ctx.quadraticCurveTo(-size * 0.3, -size * 0.5, -size * 0.6, -size * 0.5);
      ctx.quadraticCurveTo(-size * 0.4, -size * 0.8, 0, -size * 1.0);
      ctx.closePath();
      ctx.fill();
      
      // Add gradient
      const gradient = ctx.createRadialGradient(0, 0, size * 0.2, 0, 0, size * 1.2);
      gradient.addColorStop(0, leaf.color);
      gradient.addColorStop(1, shadeColor(leaf.color, -15));
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Draw central vein
      ctx.strokeStyle = 'rgba(139, 69, 19, 0.4)';
      ctx.lineWidth = size * 0.06;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(0, -size * 1.0);
      ctx.lineTo(0, size * 1.0);
      ctx.stroke();
      
      // Add shadow
      ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
      ctx.shadowBlur = size * 0.3;
      ctx.shadowOffsetX = size * 0.1;
      ctx.shadowOffsetY = size * 0.1;
    };

    // Draw leaf shape
    const drawLeaf = (leaf: Leaf) => {
      ctx.save();
      ctx.translate(leaf.x, leaf.y);
      ctx.rotate((leaf.rotation * Math.PI) / 180);
      
      // Reset shadow before drawing
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      if (leaf.type === 'maple') {
        drawMapleLeaf(leaf);
      } else {
        drawOakLeaf(leaf);
      }

      ctx.restore();
    };

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      leaves.forEach((leaf) => {
        drawLeaf(leaf);

        // Update position
        leaf.y += leaf.speed;
        leaf.rotation += leaf.rotationSpeed;
        leaf.swing += leaf.swingSpeed;
        leaf.x += Math.sin(leaf.swing) * 0.5;

        // Reset when leaf goes off screen
        if (leaf.y > canvas.height + leaf.size) {
          leaf.y = -leaf.size;
          leaf.x = Math.random() * canvas.width;
          leaf.rotation = Math.random() * 360;
        }

        // Keep leaves within horizontal bounds
        if (leaf.x < -leaf.size) leaf.x = canvas.width + leaf.size;
        if (leaf.x > canvas.width + leaf.size) leaf.x = -leaf.size;
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

