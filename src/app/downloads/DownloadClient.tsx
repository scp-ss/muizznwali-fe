"use client";

import React from "react";
//import type { Metadata } from "next"; 

const downloads = [
  {
    name: "Heavy Duty Calculator v1.0",
    file: "/files/hd-calculator.apk",
    size: "2.3 MB",
    type: "apk"
  },
  {
    name: "User Guide",
    file: "/files/user-guide.pdf",
    size: "1.1 MB",
    type: "PDF"
  }
];
{/*
  export const metadata: Metadata = {
  title: "Downloads - Muizz N Wali",
  description: "Downloadpage for Muizz N Wali website",
};
 */}

const DownloadsPageClient = () => {
  return (
    <div className="container">
      <h1>Downloads</h1>
      <p>Click on a file to download.</p>
      <ul className="download-list">
        {downloads.map((item, idx) => (
          <li key={idx} className="download-item">
            <div>
              <strong>{item.name}</strong>
              <span className="file-info">
                ({item.type} · {item.size})
              </span>
            </div>
            <a href={item.file} download className="download-btn">
              ⬇ Download
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DownloadsPageClient;
