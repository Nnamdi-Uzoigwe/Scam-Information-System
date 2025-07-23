import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import './App.css';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Repost from "./pages/Repost";
import Register from "./pages/Register";
import PageNotFound from "./pages/PageNotFound";
import ReportScam from "./sections/Dashboard/ReportScam";
import Contact from "./pages/Contact";
import ScamDetail from "./pages/ScamDetail";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./sections/Admin/AdminDashboard";
import ScrollToTop from "./components/ScrollToTop";
import SearchDatabase from "./pages/SearchDatabase";
import ProtectedRoute from "./components/ProtectedRoute";
import ViewReports from "./sections/Dashboard/ViewReports";
import SubmitTestimonial from "./sections/Dashboard/SubmitTestimonial";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const location = useLocation();

  
  const noFooterRoutes = ['/dashboard', '/login', '/register', '/report-scam', '/view-report', '/admin', '/admin/dashboard', '/submit-testimonial'];

  return (
    <div className="min-h-screen flex flex-col">
      
      {location.pathname !== '/dashboard' 
        && location.pathname !== '/login' 
        && location.pathname !== '/register' 
        && location.pathname !== '/report-scam'
        && location.pathname !== '/view-report'
        && location.pathname !== '/admin'
        && location.pathname !== '/admin/dashboard' 
        && location.pathname !== '/submit-testimonial' &&
        <Navbar />
      }

      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/repost" element={<Repost />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/report-scam" element={<ReportScam />} />
            <Route path="/view-report" element={<ViewReports />} />
            <Route path="/submit-testimonial" element={<SubmitTestimonial />} />
          </Route>
          <Route path="/search" element={<SearchDatabase />} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/scam/:id" element={<ScamDetail />} />

          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
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
      <ToastContainer />
    </BrowserRouter>
  );
}

export default AppWrapper;
