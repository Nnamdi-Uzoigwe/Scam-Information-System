import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom"
import './App.css'
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import About from "./pages/About"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import Register from "./pages/Register"

function App() {
  return (
    <Router>
      <div>
      <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
