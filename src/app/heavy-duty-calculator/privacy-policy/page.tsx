"use client";

import React from "react";
import "@/css/privacypolicy.css";

const PrivacyPolicy: React.FC = () => {
  return (
    <main className="privacy-policy-container">
      <h1>Privacy Policy</h1>

      <section>
        <h2>Introduction</h2>
        <p>
          We value your privacy and are committed to protecting your personal information.
          This Privacy Policy explains how we collect, use, and safeguard your data when you use the Heavy Duty Calculator app and related services.
        </p>
      </section>

      <section>
        <h2>Information We Collect</h2>
        <p>
          We do not collect any personal data through the app. However, third-party services (such as Google Play Console and AdMob) may collect data according to their own policies.
        </p>
      </section>

      <section>
        <h2>How We Use Information</h2>
        <p>
          Since we do not collect personal data, we do not use or share your information. Any data collected by third-party services is governed by their respective privacy policies.
        </p>
      </section>

      <section>
        <h2>Third-Party Services</h2>
        <p>
          Our app integrates with third-party services for analytics and advertising. We recommend reviewing their privacy policies for more information.
        </p>
      </section>

      <section>
        <h2>Your Choices</h2>
        <p>
          You may choose to disable ads or analytics in your device settings. We encourage you to review and control your privacy settings regularly.
        </p>
      </section>

      <section>
        <h2>Contact Us</h2>
        <p>
          If you have questions or concerns about this Privacy Policy, please contact us at <a href="mailto:privacy@muizznwali.com" className="email-link">privacy@muizznwali.com</a>.
        </p>
      </section>

      <footer>
        <p>© 2025 Muizz & Wali. All rights reserved.</p>
      </footer>
    </main>
  );
};

export default PrivacyPolicy;
