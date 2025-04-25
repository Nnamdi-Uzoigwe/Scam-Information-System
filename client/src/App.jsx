import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import './App.css';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PageNotFound from "./pages/PageNotFound";
import ReportScam from "./sections/Dashboard/ReportScam";
import Contact from "./pages/Contact";

function App() {
  const location = useLocation();

  // List of routes where the Footer should not appear
  const noFooterRoutes = ['/dashboard', '/login', '/register'];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Conditionally render Navbar */}
      {location.pathname !== '/dashboard' && location.pathname !== '/login' && location.pathname !== '/register' && <Navbar />}

      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<PageNotFound />} /> 
          <Route path="/report" element={<ReportScam />} />
          <Route path="/contact" element={<Contact/>} />
        </Routes>
      </div>

      {/* Always render Footer, but hide on specific routes */}
      {!noFooterRoutes.includes(location.pathname) && <Footer />}
    </div>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;
