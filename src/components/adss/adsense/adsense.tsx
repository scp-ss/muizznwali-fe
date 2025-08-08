// src/components/AdComponent.tsx
import { useEffect } from "react";

const AdComponent = () => {
  useEffect(() => {
    try {
      // Load AdSense script only once
      if (!document.querySelector("script[src*='adsbygoogle.js']")) {
        const script = document.createElement("script");
        script.async = true;
        script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8243831335530194";
        script.crossOrigin = "anonymous";
        document.head.appendChild(script);
      }

      // Push ad when component mounts
      // Delay to ensure script is loaded
      const timeout = setTimeout(() => {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
          console.error("AdSense error:", e);
        }
      }, 500);

      return () => clearTimeout(timeout);
    } catch (err) {
      console.error("AdSense injection error:", err);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-8243831335530194"
      data-ad-slot="6621032401"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
};

export default AdComponent;
