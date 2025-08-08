import { Routes, Route, Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import HeavyDutyCalculator from "./pages/heavy-duty-calculator/hd-calc";
import PrivacyPolicy from "./pages/heavy-duty-calculator/privacy-policy/privacy-policy-of-hd-calc";
import WhatsAppSection from "./pages/whatsapp/whatsapp";
import "./App.css";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function App() {
  const location = useLocation();

  // 🧠 Trigger AdSense rendering on route change
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error", e);
    }
  }, [location.pathname]);

  // 🧠 Dynamic canonical URL
  const canonicalUrl = `https://muizznwali.com${location.pathname}`;

  return (
    <>
      <Helmet>
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <div style={{ display: "flex", fontFamily: "sans-serif" }}>
        
        {/* 🟨 Left Ad */}
        <div style={{ width: "160px", padding: "1rem" }}>
          <ins className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-4750351433435072"
            data-ad-slot="1234567890"
            data-ad-format="auto"
            data-full-width-responsive="true"></ins>
        </div>

        {/* 🧱 Main Content */}
        <div style={{ flex: 1, padding: "2rem" }}>
          <nav className="navbar">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/heavy-duty-calculator" className="nav-link">Heavy Duty Calculator</Link>
          </nav>

          <Routes>
            <Route path="/heavy-duty-calculator" element={<HeavyDutyCalculator />} />
            <Route path="/heavy-duty-calculator/privacypolicy" element={<PrivacyPolicy />} />
          </Routes>

          <WhatsAppSection />

          {location.pathname !== "/" && (
            <div className="back-to-home">
              <Link to="/" className="back-button">Back to Home Menu</Link>
            </div>
          )}
        </div>

        {/* 🟨 Right Ad */}
        <div style={{ width: "160px", padding: "1rem" }}>
          <ins className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-4750351433435072"
            data-ad-slot="0987654321"
            data-ad-format="auto"
            data-full-width-responsive="true"></ins>
        </div>
      </div>
    </>
  );
}
