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
    <CustomCursor />
    <Nav />
    <main>
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
