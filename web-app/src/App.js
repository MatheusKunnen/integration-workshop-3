import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./hooks/auth";
import { WebsocketCommunicationProvider } from "./hooks/websocket";
import GlobalStyle from "./styles/global";
import AppRoutes from "./navigation/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <WebsocketCommunicationProvider>
          <AppRoutes />
        </WebsocketCommunicationProvider>
      </AuthProvider>
      <GlobalStyle />
    </BrowserRouter>
  );
}

export default App;
