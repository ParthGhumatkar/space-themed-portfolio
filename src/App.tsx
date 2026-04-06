import { ThemeProvider } from "./hooks/useTheme";
import Index from "./pages/Index";

function App() {
  return (
    <ThemeProvider>
      <Index />
    </ThemeProvider>
  );
}

export default App;
