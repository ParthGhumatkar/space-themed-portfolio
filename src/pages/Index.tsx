import StarField from "../components/StarField";
import CustomCursor from "../components/CustomCursor";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import FloatingLogos from "../components/FloatingLogos";
import StatsBar from "../components/StatsBar";
import About from "../components/About";
import Tickers from "../components/Tickers";
import Projects from "../components/Projects";
import Stack from "../components/Stack";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const Index = () => (
  <>
    <StarField />
    <CustomCursor />
    <Nav />
    <main style={{ position: "relative", zIndex: 1 }}>
      <Hero />
      <FloatingLogos />
      <StatsBar />
      <About />
      <Tickers />
      <Projects />
      <Stack />
      <Contact />
    </main>
    <Footer />
  </>
);

export default Index;
