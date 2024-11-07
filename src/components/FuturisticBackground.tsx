import React, { useEffect, useRef } from 'react';

const FuturisticBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();


    function drawBackground() {
      ctx.fillStyle = '#0D0D0D';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    drawBackground();

    window.addEventListener('resize', () => {
      resizeCanvas();
      drawBackground();
    });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };

    // Commented out particle animation code
    /*
    const nodes: { x: number; y: number; connections: number[] }[] = [];
    const nodeCount = 100;
    const maxDistance = 150;

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        connections: []
      });
    }

    function drawNode(x: number, y: number) {
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 20, 147, 0.5)';
      ctx.fill();
    }

    function drawLine(x1: number, y1: number, x2: number, y2: number) {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = 'rgba(255, 20, 147, 0.2)'; 
      ctx.stroke();
    }

    function animate() {
      ctx.fillStyle = '#0D0D0D';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      nodes.forEach((node, i) => {
        node.y += Math.sin(Date.now() * 0.001 + i) * 0.5;
        if (node.y < 0) node.y = canvas.height;
        if (node.y > canvas.height) node.y = 0;

        drawNode(node.x, node.y);

        nodes.forEach((otherNode, j) => {
          if (i !== j) {
            const dx = node.x - otherNode.x;
            const dy = node.y - otherNode.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance) {
              drawLine(node.x, node.y, otherNode.x, otherNode.y);
            }
          }
        });
      });

      requestAnimationFrame(animate);
    }

    animate();
    */
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full z-0" 
      style={{ backgroundColor: '#0D0D0D' }}
    />
  );
};

export default FuturisticBackground;