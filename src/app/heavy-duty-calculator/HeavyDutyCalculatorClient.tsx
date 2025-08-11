"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import DownloadButton from "@/components/download-button/download-button";
import "@/css/hd-calc.css";
import AboutSection from "@/pageparts/hd-calc/small-abt-section";

export default function HeavyDutyCalculatorClient() {
  const [showModal, setShowModal] = useState(false);

  const openModal = useCallback(() => setShowModal(true), []);
  const closeModal = useCallback(() => setShowModal(false), []);

  return (
    <div className="calculator-container">
      <h1>Heavy Duty Calculator</h1>
      <p>
        This application is designed to perform heavy-duty calculations
        efficiently and reliably.
      </p>

      {/* Calculator UI placeholder */}
      <div className="calculator-ui">
        <p>[Calculator UI Placeholder]</p>
      </div>

      <AboutSection />

      <hr className="section-divider" />

      {/* Download Section */}
      <h1>Download</h1>
      <button className="download-button" onClick={openModal}>
        Download Heavy Duty Calculator (ANDROID)
      </button>

      {/* Privacy Policy Link */}
      <div className="privacy-button-container">
        <Link href="/heavy-duty-calculator/privacy-policy" className="privacy-button">
          View Privacy Policy
        </Link>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="download-modal-title"
        >
          <div className="modal-content">
            <button className="modal-close" aria-label="Close" onClick={closeModal}>
              &times;
            </button>

            <h2 id="download-modal-title">Before You Download</h2>
            <p>
              This app is verified by <strong>Google Play Console</strong> and complies with all relevant <strong>U.S. laws</strong> and{" "}
              <strong>AdMob policies</strong>.
            </p>
            <p>
              Please review the{" "}
              <Link href="/heavy-duty-calculator/privacypolicy">
                Privacy Policy
              </Link>{" "}
              before downloading.
            </p>

            <DownloadButton
              label="Download Now"
              fileName="Heavy Duty Calculator.apk"
              fileUrl="https://drive.google.com/uc?export=download&id=1Y3pgi55guof5MMgT0QqCtYjXspwnWQqI"
            />
          </div>
        </div>
      )}
    </div>
  );
}
