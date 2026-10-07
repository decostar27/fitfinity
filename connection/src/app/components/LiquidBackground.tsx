"use client";

import { useEffect, useState } from "react";

export default function LiquidBackground() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <div 
        className="liquid-bg-element"
        style={{
          width: '400px',
          height: '400px',
          background: 'rgba(255, 127, 17, 0.15)',
          left: mousePos.x - 200,
          top: mousePos.y - 200,
          transition: 'left 0.1s ease-out, top 0.1s ease-out',
        }}
      />
      <div 
        className="liquid-bg-element"
        style={{
          width: '600px',
          height: '600px',
          background: 'rgba(255, 255, 255, 0.03)',
          right: '-100px',
          bottom: '-100px',
          animation: 'float 20s infinite alternate ease-in-out',
        }}
      />
      <style jsx>{`
        @keyframes float {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-50px, -50px) scale(1.1); }
          100% { transform: translate(50px, -100px) scale(0.9); }
        }
      `}</style>
    </>
  );
}
