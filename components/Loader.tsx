import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0f172a] overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1e293b_0%,#0f172a_100%)] opacity-80"></div>
      
      {/* Container */}
      <div className="relative flex flex-col items-center justify-center">
        
        <svg width="400" height="400" viewBox="0 0 400 400" className="relative z-10 overflow-visible scale-75 md:scale-100">
          <defs>
            {/* Neon Gradient for Stroke */}
            <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22d3ee" />   {/* Cyan */}
              <stop offset="50%" stopColor="#3b82f6" />  {/* Blue */}
              <stop offset="100%" stopColor="#8b5cf6" /> {/* Violet */}
            </linearGradient>
            
            {/* Bright Gradient for Fill (White to Cyan for clarity) */}
            <linearGradient id="fillGradient" x1="0%" y1="0%" x2="0%" y2="100%">
               <stop offset="0%" stopColor="#ffffff" />
               <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>

            {/* Glow Filter */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Rotating Rings */}
          <g className="origin-center animate-[spin_8s_linear_infinite]">
             <circle cx="200" cy="200" r="160" fill="none" stroke="#334155" strokeWidth="1" className="opacity-30" />
             <circle 
                cx="200" cy="200" r="160" 
                fill="none" 
                stroke="url(#neonGradient)" 
                strokeWidth="2"
                strokeLinecap="round"
                style={{ strokeDasharray: "200 800" }}
             />
          </g>
          
           <g className="origin-center animate-[spin_12s_linear_infinite_reverse]">
             <circle cx="200" cy="200" r="130" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" className="opacity-20"/>
          </g>

          {/* Background Guide Text */}
          <text 
            x="50%" 
            y="50%" 
            dy=".35em" 
            textAnchor="middle" 
            className="text-7xl font-black tracking-widest opacity-20"
            style={{
                fontFamily: 'Cairo, sans-serif',
                fill: 'none',
                stroke: '#334155',
                strokeWidth: '1px',
            }}
          >
            AMER
          </text>

          {/* Animated Text: Draws strokes then Fills In */}
          <text 
            x="50%" 
            y="50%" 
            dy=".35em" 
            textAnchor="middle" 
            className="text-7xl font-black tracking-widest"
            style={{
                fontFamily: 'Cairo, sans-serif',
                fill: 'url(#fillGradient)',
                stroke: 'url(#neonGradient)',
                strokeWidth: '1.5px',
                strokeDasharray: '1500', 
                strokeDashoffset: '1500',
                filter: 'url(#glow)',
                animation: 'drawAndFill 4s ease-in-out infinite'
            }}
          >
            AMER
          </text>
        </svg>

        {/* Loading Indicator */}
        <div className="mt-8 font-mono text-cyan-400 text-xs tracking-[0.4em] opacity-80 flex items-center gap-3 animate-pulse">
            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]"></span>
            <span>INITIALIZING</span>
            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]"></span>
        </div>

        <style>{`
          @keyframes drawAndFill {
            0% {
              stroke-dashoffset: 1500;
              fill-opacity: 0;
            }
            40% {
              stroke-dashoffset: 0;
              fill-opacity: 0;
            }
            50% {
              stroke-dashoffset: 0;
              fill-opacity: 1;
            }
            80% {
              stroke-dashoffset: 0;
              fill-opacity: 1;
            }
            100% {
              stroke-dashoffset: 0;
              fill-opacity: 0;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Loader;