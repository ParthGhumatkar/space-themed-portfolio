import CustomCursor from "@/components/CustomCursor";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Stack from "@/components/Stack";
import Contact from "@/components/Contact";

const Index = () => (
  <>
    <CustomCursor />
    <Nav />
    <main>
      <Hero />
      <About />
      <Projects />
      <Stack />
      <Contact />
    </main>
  </>
);

export default Index;
