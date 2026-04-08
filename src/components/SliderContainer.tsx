import { useRef, useEffect } from "react";
import Slide01_Hero        from "@/components/slides/Slide01_Hero";
import Slide02_Projects    from "@/components/slides/Slide02_Projects";
import Slide03_StackAbout  from "@/components/slides/Slide03_StackAbout";
import Slide04_Contact     from "@/components/slides/Slide04_Contact";

interface Props {
  current: number;
  exiting: number | null;
  goTo: (idx: number) => void;
}

const SLIDES = [Slide01_Hero, Slide02_Projects, Slide03_StackAbout, Slide04_Contact];

const SliderContainer = ({ current, exiting, goTo }: Props) => {
  return (
    <div style={{
      position: "fixed", inset: 0,
      width: "100vw", height: "100vh",
      overflow: "hidden", zIndex: 1,
    }}>
      {SLIDES.map((SlideComp, idx) => {
        const isActive  = idx === current;
        const isExiting = idx === exiting;
        const visible   = isActive || isExiting;

        return (
          <div
            key={idx}
            className={isActive ? "slide-entering" : isExiting ? "slide-exiting" : ""}
            style={{
              position: "absolute", inset: 0,
              opacity: visible ? undefined : 0,
              pointerEvents: isActive ? "auto" : "none",
              zIndex: isActive ? 2 : isExiting ? 1 : 0,
            }}
          >
            <SlideComp isActive={isActive} goTo={goTo} />
          </div>
        );
      })}
    </div>
  );
};

export default SliderContainer;
