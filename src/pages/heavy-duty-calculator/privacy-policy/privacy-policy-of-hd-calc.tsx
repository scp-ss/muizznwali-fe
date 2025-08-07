import React from "react";
import { Link } from "react-router-dom";
import "./privacy-policy-of-hd-cac.css";

const PrivacyPolicy: React.FC = () => {
  return (
    <div>
    <div className="privacy-policy">
      {/* 🔝 Top-right Back Button */}
      <div className="top-right-back">
        <Link to="/heavy-duty-calculator" className="back-button-static">
           Back
        </Link>
      </div>

      <h1> Privacy Policy</h1>
      <p><em>Last updated: August 7, 2025</em></p>

      <section>
        <p>
          Your privacy matters. This app is designed to respect your data while
          providing a smooth and personalized experience. Here's what we
          collect—and what we don't.
        </p>
      </section>

      <section>
        <h2> What We Collect</h2>
        <ul>
          <li><strong>No personal data</strong> is collected unless you choose to share it.</li>
          <li><strong>Calculation History</strong>: Occasionally stored anonymously to improve app functionality.</li>
          <li><strong>User Theme Preference</strong>: Saved locally to personalize your experience.</li>
          <li><strong>Crash Reports</strong>: Automatically collected to help fix bugs and improve stability.</li>
          <li><strong>Usage Metrics</strong> (rarely):
            <ul>
              <li>How many times you open the app</li>
              <li>How long you use it per session</li>
            </ul>
          </li>
          <li><strong>User Account ID</strong>: Used internally for analytics and debugging.</li>
          <li><strong>Email Interactions</strong>: If you contact us at <a href="mailto:muizznasir786@gmail.com">muizznasir786@gmail.com</a>, we may log:
            <ul>
              <li>The time your email was sent</li>
              <li>How many times you've contacted us</li>
            </ul>
          </li>
        </ul>
      </section>

      <section>
        <h2> Third-Party Services</h2>
        <p>We do <strong>not use any third-party SDKs or services</strong> except:</p>
        <ul>
          <li><strong>Google AdMob</strong>: Displays a banner ad at the bottom of the app. AdMob may collect:
            <ul>
              <li>Device ID</li>
              <li>Android version</li>
              <li>Download count</li>
              <li>Other diagnostic data</li>
            </ul>
          </li>
        </ul>
        <p>
          For more details, refer to{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google's Privacy Policy
          </a>.
        </p>
      </section>

      <section>
        <h2> Google Play Data</h2>
        <p>
          When you download the app from Google Play, certain data may be collected
          by Google Play itself. This is outside our control and handled by Google.
        </p>
        <ul>
          <li><strong>Device ID</strong></li>
          <li><strong>Android Version</strong></li>
          <li><strong>Download Count</strong></li>
          <li><strong>Other Diagnostic Data</strong></li>
        </ul>
        <p>
          For more information, refer to{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google's Privacy Policy
          </a>.
        </p>
      </section>

      <section>
        <h2>Compliance & Legal</h2>
        <p>
          This app complies with all applicable laws and regulations, including:
        </p>
        <ul>
          <li><strong>U.S. Export Laws</strong>: We follow all relevant export control laws and restrictions as required by the United States government.</li>
          <li><strong>Google Policies</strong>: We adhere to Google's developer policies, including those related to data safety, advertising, and user privacy.</li>
          <li><strong>Platform Guidelines</strong>: We respect the rules and standards of any platform where the app is distributed, including Google Play.</li>
        </ul>
        <p>
          We aim to maintain transparency, security, and compliance across all aspects of the app's development and distribution.
        </p>
      </section>

      <section>
        <h2>Need Help?</h2>
        <p>
          If you experience any issues or have questions, feel free to{" "}
          <strong>
            send an email to{" "}
            <a href="mailto:muizznasir786@gmail.com">muizznasir786@gmail.com</a>
          </strong>. We’re here to help.
        </p>
        <p>
          Ads served via Google AdMob are managed by Google. While we aim to block inappropriate content, we do not control individual ads. If you encounter an ad that seems inappropriate, please contact us at <a href="mailto:muizznasir786@gmail.com">muizznasir786@gmail.com</a> so we can investigate and report it.
        </p>
      </section>

      {/* ⬇️ Bottom Full-Width Back Button */}

    </div>
    <div className="bottom-back">
        <Link to="/heavy-duty-calculator" className="back-button-bottom">
           Back to Calculator
        </Link>
      </div>
    </div>
    
  );
};

export default PrivacyPolicy;
