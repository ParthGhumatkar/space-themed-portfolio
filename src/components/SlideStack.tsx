import React from "react";
import Slide01_Hero       from "@/components/slides/Slide01_Hero";
import Slide02_Projects   from "@/components/slides/Slide02_Projects";
import Slide03_StackAbout from "@/components/slides/Slide03_StackAbout";
import Slide04_Contact    from "@/components/slides/Slide04_Contact";
import SlideProgress      from "@/components/SlideProgress";

interface Props {
  currentSlide:    number;
  prevSlide:       number | null;
  isTransitioning: boolean;
  goTo:            (idx: number) => void;
}

const SLIDES = [Slide01_Hero, Slide02_Projects, Slide03_StackAbout, Slide04_Contact];

const SlideStack = ({ currentSlide, prevSlide, isTransitioning, goTo }: Props) => {
  return (
    <div style={{
      position: "fixed", inset: 0,
      width: "100vw", height: "100vh",
      overflow: "hidden", zIndex: 1,
      background: "#091a0d",
    }}>
      {SLIDES.map((SlideComp, i) => {
        const isActive  = i === currentSlide;
        const isExiting = i === prevSlide;

        return (
          <div
            key={i}
            style={{
              position: "absolute", inset: 0,
              zIndex:        isActive ? 2 : isExiting ? 1 : 0,
              opacity:       isActive ? 1 : 0,
              transition:    "opacity 900ms cubic-bezier(0.4,0,0.2,1)",
              pointerEvents: isActive ? "auto" : "none",
              willChange:    "opacity",
            }}
          >
            <SlideComp isActive={isActive} goTo={goTo} />
          </div>
        );
      })}

      <SlideProgress total={4} current={currentSlide} onDotClick={goTo} />
    </div>
  );
};

export default SlideStack;
