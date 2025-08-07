import { useState } from "react";
import { Link } from "react-router-dom";
import DownloadButton from "../../components/download-button/download-button.tsx";
import "./hd-calc.css";
import AboutSection from "./small-abt-section.tsx";

export default function HeavyDutyCalculator() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="calculator-container">
      <h1>Heavy Duty Calculator</h1>
      <p>
        This application is designed to perform heavy-duty calculations
        efficiently and reliably.
      </p>

      <div className="calculator-ui">
        <p>[Calculator UI Placeholder]</p>
      </div>
<AboutSection />
      <hr className="section-divider" />
      <h1>Download</h1>
      <button className="download-button" onClick={() => setShowModal(true)}>
        Download Heavy Duty Calculator (ANDROID)
      </button>

      <div className="privacy-button-container">
        <Link to="/heavy-duty-calculator/privacypolicy" className="privacy-button">
          View Privacy Policy
        </Link>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setShowModal(false)}>
              &times;
            </button>
            

            
            <h2>Before You Download</h2>
            <p>
              This app is verified by <strong>Google Play Console</strong> and complies with all
              relevant <strong>U.S. laws</strong> and <strong>AdMob policies</strong>.
            </p>
            <p>
              Please review the{" "}
              <Link to="/heavy-duty-calculator/privacypolicy">Privacy Policy</Link> before downloading.
            </p>

            <DownloadButton
              label="Take Me to Download"
              fileName="Heavy Duty Calculator.apk"
              fileUrl="https://drive.google.com/uc?export=download&id=1Y3pgi55guof5MMgT0QqCtYjXspwnWQqI"
            />
          </div>
        </div>
      )}
    </div>
  );
}

