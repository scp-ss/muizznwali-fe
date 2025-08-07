import { Routes, Route, Link, useLocation } from "react-router-dom";
import HeavyDutyCalculator from "./pages/heavy-duty-calculator/hd-calc";
import PrivacyPolicy from "./pages/heavy-duty-calculator/privacy-policy/privacy-policy-of-hd-calc";
import "./App.css";
import WhatsAppSection from "./pages/whatsapp/whatsapp";
export default function App() {
  const location = useLocation();
  const muizz = "If you are seeing ts it means u are either a dev that found foss project or u are a HAKOR OMG OMG PLZ PZL Z LZPZLP, "
  
  return (
    <div style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      {/*  Navbar */}
       <p id="twk"> {muizz}</p>
      <nav className="navbar">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/heavy-duty-calculator" className="nav-link">Heavy Duty Calculator</Link>
      </nav>
      <WhatsAppSection/>

      {/*  Routes */}
      <Routes>
        <Route path="/heavy-duty-calculator" element={<HeavyDutyCalculator />} />
        <Route path="/heavy-duty-calculator/privacypolicy" element={<PrivacyPolicy />} />
      </Routes>

      {/* ⬅️ Back Button (only show if not on home) */}
      {location.pathname !== "/" && (
        <div className="back-to-home">
          <Link to="/" className="back-button">
             Back to Home Menu
          </Link>
        </div>
      )}
    </div>
  );
}
