import { useEffect } from "react";

// ✅ Extend window to define adsbygoogle
declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

const AdsenseAd: React.FC = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Adsbygoogle error:", e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-8243831335530194"
      data-ad-slot="1234567890" // ✅ Replace with your actual Ad Slot ID
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
};

export default AdsenseAd;
