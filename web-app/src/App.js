import { Routes, Route } from "react-router-dom"
import NFCAuth from "./pages/LoginPages/NFCAuth"
import ImageAuth from "./pages/LoginPages/ImageAuth"
import FailedAuth from "./pages/LoginPages/FailedAuth"
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <NFCAuth/> } />
        <Route path="image-auth" element={ <ImageAuth/> } />
        <Route path="failed-auth" element={ <FailedAuth/> } />
      </Routes>
    </div>
  )
}

export default App