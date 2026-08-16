"use client";

import React from "react";

export function HeroNetworkBackground() {
  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] sm:w-[950px] md:w-[1100px] h-[450px] sm:h-[550px] pointer-events-none flex items-center justify-center select-none z-0"
      style={{
        maskImage: "radial-gradient(ellipse 60% 55% at 50% 50%, black 40%, transparent 95%)",
        WebkitMaskImage: "radial-gradient(ellipse 60% 55% at 50% 50%, black 40%, transparent 95%)",
      }}
    >
      <svg
        viewBox="0 0 1000 600"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(202, 252, 0, 0.15)" />
            <stop offset="50%" stopColor="rgba(255, 255, 255, 0.05)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          <radialGradient id="coreHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(202, 252, 0, 0.7)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          <style>{`
            @keyframes pulseLine {
              0% { stroke-dashoffset: 80; opacity: 0.25; }
              50% { opacity: 1; }
              100% { stroke-dashoffset: 0; opacity: 0.25; }
            }
            @keyframes pulseNode {
              0%, 100% { r: 3.5px; opacity: 0.6; }
              50% { r: 6.5px; opacity: 1; }
            }
            @keyframes floatMesh {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-8px); }
            }
            .network-line {
              stroke: rgba(255, 255, 255, 0.22);
              stroke-width: 1.2;
            }
            .data-pulse {
              stroke: rgba(255, 255, 255, 0.9);
              stroke-width: 2;
              stroke-dasharray: 8 28;
              animation: pulseLine 5s linear infinite;
            }
            .data-pulse-fast {
              stroke: #CAFC00;
              stroke-width: 2.2;
              stroke-dasharray: 10 35;
              animation: pulseLine 3.5s linear infinite reverse;
            }
            .pulse-dot {
              animation: pulseNode 3.5s ease-in-out infinite;
            }
            .floating-mesh {
              animation: floatMesh 7s ease-in-out infinite;
            }
          `}</style>
        </defs>

        {/* Ambient Glow in the Center */}
        <circle cx="500" cy="270" r="320" fill="url(#centerGlow)" />

        {/* Concentric Orbit Rings */}
        <circle cx="500" cy="270" r="130" stroke="rgba(255,255,255,0.15)" strokeDasharray="3 6" strokeWidth="1" />
        <circle cx="500" cy="270" r="230" stroke="rgba(255,255,255,0.10)" strokeDasharray="4 8" strokeWidth="1" />
        <circle cx="500" cy="270" r="350" stroke="rgba(255,255,255,0.06)" strokeDasharray="6 12" strokeWidth="1" />

        <g className="floating-mesh">
          {/* Primary Structural Lines */}
          <line x1="500" y1="130" x2="350" y2="200" className="network-line" />
          <line x1="500" y1="130" x2="650" y2="200" className="network-line" />
          <line x1="350" y1="200" x2="240" y2="300" className="network-line" />
          <line x1="650" y1="200" x2="760" y2="300" className="network-line" />
          <line x1="240" y1="300" x2="330" y2="400" className="network-line" />
          <line x1="760" y1="300" x2="670" y2="400" className="network-line" />
          <line x1="330" y1="400" x2="500" y2="430" className="network-line" />
          <line x1="670" y1="400" x2="500" y2="430" className="network-line" />

          {/* Cross Web Connections */}
          <line x1="350" y1="200" x2="500" y2="270" className="network-line" />
          <line x1="650" y1="200" x2="500" y2="270" className="network-line" />
          <line x1="240" y1="300" x2="500" y2="270" className="network-line" />
          <line x1="760" y1="300" x2="500" y2="270" className="network-line" />
          <line x1="330" y1="400" x2="500" y2="270" className="network-line" />
          <line x1="670" y1="400" x2="500" y2="270" className="network-line" />
          <line x1="500" y1="130" x2="500" y2="270" className="network-line" />
          <line x1="500" y1="270" x2="500" y2="430" className="network-line" />

          {/* Outer Nodes Connections */}
          <line x1="240" y1="300" x2="130" y2="250" className="network-line" />
          <line x1="240" y1="300" x2="150" y2="380" className="network-line" />
          <line x1="760" y1="300" x2="870" y2="250" className="network-line" />
          <line x1="760" y1="300" x2="850" y2="380" className="network-line" />
          <line x1="350" y1="200" x2="280" y2="100" className="network-line" />
          <line x1="650" y1="200" x2="720" y2="100" className="network-line" />
          <line x1="330" y1="400" x2="250" y2="490" className="network-line" />
          <line x1="670" y1="400" x2="750" y2="490" className="network-line" />

          {/* Animated Data Pulses */}
          <line x1="500" y1="130" x2="350" y2="200" className="data-pulse" />
          <line x1="650" y1="200" x2="760" y2="300" className="data-pulse" />
          <line x1="760" y1="300" x2="500" y2="270" className="data-pulse-fast" />
          <line x1="240" y1="300" x2="330" y2="400" className="data-pulse" />
          <line x1="330" y1="400" x2="500" y2="430" className="data-pulse-fast" />
          <line x1="500" y1="270" x2="350" y2="200" className="data-pulse" />
          <line x1="500" y1="270" x2="650" y2="200" className="data-pulse" />

          {/* Hub Nodes */}
          <circle cx="500" cy="130" r="4" fill="#ffffff" />
          <circle cx="350" cy="200" r="4.5" fill="#ffffff" />
          <circle cx="650" cy="200" r="4.5" fill="#ffffff" />
          <circle cx="240" cy="300" r="5" fill="#ffffff" />
          <circle cx="760" cy="300" r="5" fill="#ffffff" />
          <circle cx="330" cy="400" r="4.5" fill="#ffffff" />
          <circle cx="670" cy="400" r="4.5" fill="#ffffff" />
          <circle cx="500" cy="430" r="4" fill="#ffffff" />

          {/* Outer Satellite Nodes */}
          <circle cx="130" cy="250" r="3" fill="#a1a1aa" />
          <circle cx="150" cy="380" r="3" fill="#a1a1aa" />
          <circle cx="870" cy="250" r="3" fill="#a1a1aa" />
          <circle cx="850" cy="380" r="3" fill="#a1a1aa" />
          <circle cx="280" cy="100" r="2.5" fill="#a1a1aa" />
          <circle cx="720" cy="100" r="2.5" fill="#a1a1aa" />
          <circle cx="250" cy="490" r="2.5" fill="#a1a1aa" />
          <circle cx="750" cy="490" r="2.5" fill="#a1a1aa" />

          {/* Center Core Node & Halo */}
          <circle cx="500" cy="270" r="24" fill="url(#coreHalo)" />
          <circle cx="500" cy="270" r="16" fill="none" stroke="rgba(202,252,0,0.4)" strokeWidth="1.5" />
          <circle cx="500" cy="270" r="6" fill="#CAFC00" className="pulse-dot" />

          {/* Vivid Colored Accent Nodes */}
          <circle cx="240" cy="300" r="3.5" fill="#c084fc" />
          <circle cx="760" cy="300" r="3.5" fill="#fbbf24" />
          <circle cx="350" cy="200" r="3.5" fill="#34d399" />
          <circle cx="650" cy="200" r="3.5" fill="#22d3ee" />
        </g>
      </svg>
    </div>
  );
}
