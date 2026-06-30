import React, { useEffect, useRef } from 'react';

export default function WaveBackground({ theme }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track mouse coordinates
    const handleMouseMove = (event) => {
      mouseRef.current.targetX = event.clientX;
      mouseRef.current.targetY = event.clientY;
    };

    // Initialize mouse coordinates to center
    mouseRef.current.x = width / 2;
    mouseRef.current.y = height / 2;
    mouseRef.current.targetX = width / 2;
    mouseRef.current.targetY = height / 2;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Ribbon wave configurations (left and right margin decorative wavy bands)
    let phase = 0;

    const animate = () => {
      // Clear canvas (body styling handles main background color)
      ctx.clearRect(0, 0, width, height);

      // Define styling color based on theme
      const strokeColor = theme === 'dark' ? '#FFFFFF' : '#000000';
      const fillRibbonColor = theme === 'dark' ? '#1E1E22' : '#FFFFFF';
      const accentBlue = '#5CA1E6';

      // Mouse factor calculation for interactivity
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      const mouseFactorX = (mouseRef.current.x - width / 2) / (width / 2);
      const mouseFactorY = (mouseRef.current.y - height / 2) / (height / 2);

      // Increment animation phase
      phase += 0.015 * (1 + Math.abs(mouseFactorX) * 0.5);

      // 1. Draw Wavy Ribbon on Left Side
      ctx.beginPath();
      // Draw left boundary
      ctx.moveTo(-20, -20);
      
      const leftRibbonWidth = 60 + Math.abs(mouseFactorX) * 30;
      
      for (let y = -20; y <= height + 20; y += 10) {
        // Sine wave calculations with mouse coordinates shifting phase and amplitude
        const waveX = Math.sin(y * 0.005 + phase + mouseFactorY * 2) * (35 + mouseFactorX * 15);
        const currentX = leftRibbonWidth + waveX;
        ctx.lineTo(currentX, y);
      }
      
      ctx.lineTo(-20, height + 20);
      ctx.closePath();
      
      ctx.fillStyle = fillRibbonColor;
      ctx.fill();
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 3;
      ctx.stroke();

      // Secondary outline line on the left to add retro paper ribbon effect (bubble blue line)
      ctx.beginPath();
      for (let y = -20; y <= height + 20; y += 10) {
        const waveX = Math.sin(y * 0.005 + phase + mouseFactorY * 2) * (35 + mouseFactorX * 15);
        const currentX = (leftRibbonWidth - 12) + waveX;
        if (y === -20) {
          ctx.moveTo(currentX, y);
        } else {
          ctx.lineTo(currentX, y);
        }
      }
      ctx.strokeStyle = accentBlue;
      ctx.lineWidth = 2.5;
      ctx.stroke();


      // 2. Draw Wavy Ribbon on Right Side
      ctx.beginPath();
      ctx.moveTo(width + 20, -20);
      
      const rightRibbonWidth = width - (60 + Math.abs(mouseFactorX) * 30);
      
      for (let y = -20; y <= height + 20; y += 10) {
        // Right side sine wave offset by half PI
        const waveX = Math.sin(y * 0.005 + phase + Math.PI / 2 + mouseFactorY * 2) * (35 - mouseFactorX * 15);
        const currentX = rightRibbonWidth + waveX;
        ctx.lineTo(currentX, y);
      }
      
      ctx.lineTo(width + 20, height + 20);
      ctx.closePath();
      
      ctx.fillStyle = fillRibbonColor;
      ctx.fill();
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 3;
      ctx.stroke();

      // Secondary outline line on the right (bubble blue line)
      ctx.beginPath();
      for (let y = -20; y <= height + 20; y += 10) {
        const waveX = Math.sin(y * 0.005 + phase + Math.PI / 2 + mouseFactorY * 2) * (35 - mouseFactorX * 15);
        const currentX = (rightRibbonWidth + 12) + waveX;
        if (y === -20) {
          ctx.moveTo(currentX, y);
        } else {
          ctx.lineTo(currentX, y);
        }
      }
      ctx.strokeStyle = accentBlue;
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // 3. Draw a horizontal floating ribbon at the bottom (matching the pixel/doodle aesthetics)
      ctx.beginPath();
      for (let x = -20; x <= width + 20; x += 15) {
        const waveY = height * 0.95 + Math.sin(x * 0.003 - phase + mouseFactorX) * 20;
        if (x === -20) {
          ctx.moveTo(x, waveY);
        } else {
          ctx.lineTo(x, waveY);
        }
      }
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 3;
      ctx.stroke();

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 block pointer-events-none"
    />
  );
}
