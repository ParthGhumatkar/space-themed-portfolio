import { useSlider }    from "@/hooks/useSlider";
import CustomCursor     from "@/components/CustomCursor";
import Nav              from "@/components/Nav";
import SlideStack       from "@/components/SlideStack";

export default function App() {
  const { currentSlide, prevSlide, isTransitioning, goTo } = useSlider(4);

  return (
    <>
      <CustomCursor />
      <Nav
        current={currentSlide}
        total={4}
        goTo={goTo}
      />
      <SlideStack
        currentSlide={currentSlide}
        prevSlide={prevSlide}
        isTransitioning={isTransitioning}
        goTo={goTo}
      />
    </>
  );
}
