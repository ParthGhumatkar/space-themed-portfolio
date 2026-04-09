import React from "react";

interface Props {
  total: number;
  current: number;
  onDotClick: (i: number) => void;
}

const SlideProgress = ({ total, current, onDotClick }: Props) => {
  return (
    <div style={{
      position: 'fixed',
      right: 'clamp(1.5rem, 2.5vw, 2.5rem)',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 50,
      display: 'flex',
      flexDirection: 'column',
      gap: 'clamp(8px, 1.2vh, 12px)',
      pointerEvents: "auto",
    }}>
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onDotClick(i)}
          aria-label={`Go to slide ${i + 1}`}
          style={{
            position: "relative", display: "flex",
            alignItems: "center", justifyContent: "center",
            width: 24, height: 24,
            background: "none", border: "none",
            cursor: "none", padding: 0,
          }}
        >
          <div
            style={{
              backgroundColor: i === current ? "#C8A96E" : "rgba(200,169,110,0.35)",
              width:  i === current ? 8 : 'clamp(4px, 0.5vh, 5px)',
              height: i === current ? 'clamp(16px, 2.5vh, 24px)' : 'clamp(4px, 0.5vh, 5px)',
              borderRadius: 4,
              transition: "all 600ms cubic-bezier(0.4,0,0.2,1)",
            }}
          />
        </button>
      ))}
    </div>
  );
};

export default SlideProgress;
