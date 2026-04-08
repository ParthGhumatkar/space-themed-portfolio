import { useSlider }       from "@/hooks/useSlider";
import CustomCursor        from "@/components/CustomCursor";
import Nav                 from "@/components/Nav";
import SliderContainer     from "@/components/SliderContainer";

export default function App() {
  const slider = useSlider(4);

  return (
    <>
      <CustomCursor />
      <Nav
        current={slider.current}
        total={4}
        goTo={slider.goTo}
      />
      <SliderContainer
        current={slider.current}
        exiting={slider.exiting}
        goTo={slider.goTo}
      />
    </>
  );
}
