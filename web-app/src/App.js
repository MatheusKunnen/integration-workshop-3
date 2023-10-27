import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./hooks/auth";
import GlobalStyle from "./styles/global";
import AppRoutes from "./navigation/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
      <GlobalStyle />
    </BrowserRouter>
  );
}

export default App;
