import { useTheme } from "../hooks/useTheme";
import { useIsMobile } from "../hooks/useIsMobile";

interface ScrollProgressProps {
  activeSlide: number;
  totalSlides: number;
  onDotClick: (idx: number) => void;
}

const ScrollProgress = ({ activeSlide, totalSlides, onDotClick }: ScrollProgressProps) => {
  const { theme } = useTheme();
  const accentColor = theme === "dark" ? "#2A6B4A" : "#7C6AF7";
  const isMobile = useIsMobile();

  return (
    <div style={{
      position: "fixed",
      right: isMobile ? "auto" : 28,
      left: isMobile ? 16 : "auto",
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 100,
      display: "flex",
      flexDirection: "column",
      gap: 12,
      alignItems: "center",
    }}>
      {Array.from({ length: totalSlides }, (_, i) => (
        <button
          key={i}
          onClick={() => onDotClick(i)}
          aria-label={`Go to slide ${i + 1}`}
          style={{
            width: activeSlide === i ? 2 : 4,
            height: activeSlide === i ? 20 : 4,
            borderRadius: activeSlide === i ? 2 : "50%",
            background: activeSlide === i ? accentColor : "rgba(255,255,255,0.2)",
            border: "none",
            padding: 0,
            transition: "all 0.3s ease",
            cursor: "none",
          }}
        />
      ))}
    </div>
  );
};

export default ScrollProgress;
