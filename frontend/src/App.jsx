import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/main";
import SignUpPage from "./pages/signup";
import LoginPage from "./pages/login";
import Cart from "./pages/cart";
import './App.css'

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
  )
}

export default App
