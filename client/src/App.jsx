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
import ScamDetail from "./pages/ScamDetail";
import RequireAuth from "./components/RequireAuth";
import ScrollToTop from "./components/ScrollToTop";
import SearchDatabase from "./pages/SearchDatabase";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const location = useLocation();

  
  const noFooterRoutes = ['/dashboard', '/login', '/register', '/report-scam'];

  return (
    <div className="min-h-screen flex flex-col">
      
      {location.pathname !== '/dashboard' 
        && location.pathname !== '/login' 
        && location.pathname !== '/register' 
        && location.pathname !== '/report-scam' &&
        <Navbar />
      }

      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/report-scam" element={<ReportScam />} />
          </Route>
          <Route path="/search" element={<SearchDatabase />} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/scam/:id" element={<ScamDetail />} />

          <Route path="/*" element={<PageNotFound />} /> 
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
      <ScrollToTop />
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;
