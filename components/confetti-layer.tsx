"use client";

import React from "react";

type Props = {
  className?: string;
  count?: number;
  colorAClass?: string; // e.g. "bg-emerald-500/80"
  colorBClass?: string; // e.g. "bg-emerald-400/80"
};

export default function ConfettiLayer({
  className = "",
  count = 24,
  colorAClass = "bg-emerald-500/80",
  colorBClass = "bg-emerald-400/80",
}: Props) {
  const confetti = React.useMemo(() => Array.from({ length: count }), [count]);

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      {confetti.map((_, i) => (
        <span
          key={i}
          className={`confetti inline-block h-2 w-2 rotate-45 rounded-[1px] opacity-70 ${
            i % 2 ? colorAClass : colorBClass
          }`}
          style={{
            left: `${(i * 37) % 100}%`,
            animationDelay: `${(i % 12) * 0.25}s`,
            animationDuration: `${6 + (i % 6)}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes fallConfetti {
          0% { transform: translate3d(0, -120%, 0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translate3d(0, 120vh, 0) rotate(360deg); opacity: 0.6; }
        }
        .confetti {
          position: absolute;
          top: -10%;
          animation-name: fallConfetti;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform, opacity;
        }
      `}</style>
    </div>
  );
}
