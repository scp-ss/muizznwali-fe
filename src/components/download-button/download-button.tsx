"use client"; // Only needed if you want it to be interactive in Next.js App Router
import React from "react";

interface DownloadButtonProps {
  label: string;      // Button text
  fileName: string;   // File name for download
  fileUrl: string;    // Direct file URL
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ label, fileName, fileUrl }) => {
  // Error handling for missing props
  if (!fileName || !fileUrl) {
    console.error("DownloadButton: Missing fileName or fileUrl");
    return (
      <button
        disabled
        style={{
          opacity: 0.5,
          cursor: "not-allowed",
          padding: "10px 16px",
          borderRadius: "8px",
          backgroundColor: "#ccc",
          color: "#555",
          border: "none",
        }}
      >
        Invalid Download
      </button>
    );
  }

  const handleDownload = () => {
    try {
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("DownloadButton Error:", error);
      alert("⚠️ Download failed. Please try again.");
    }
  };

  return (
    <button
      onClick={handleDownload}
      style={{
        backgroundColor: "#4CAF50",
        color: "white",
        padding: "10px 16px",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
      }}
      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#45a049")}
      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4CAF50")}
    >
      {label}
    </button>
  );
};

export default DownloadButton;
