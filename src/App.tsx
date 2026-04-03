import { useTheme } from "./hooks/useTheme";
import Index from "./pages/Index";

function App() {
  useTheme();
  return <Index />;
}

export default App;
