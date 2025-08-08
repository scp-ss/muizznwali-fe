// src/components/AdComponent.tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom"; // assuming react-router, else you can adjust

const AdComponent = () => {
  const location = useLocation();
  const { pathname, search } = location;

  // 1) Effect for logging URL changes
  useEffect(() => {
    const url = `${pathname}${search}`;
    console.log("AdsenseComp -> router changed ", url);
  }, [pathname, search]);

  // 2) Effect for loading AdSense script and pushing ads
  useEffect(() => {
    // Skip ads in development mode or localhost
    if (
      import.meta.env.MODE === "development" ||
      (typeof window !== "undefined" && window.location.hostname === "localhost")
    ) {
      console.log("AdSense disabled in development mode");
      return;
    }

    try {
      // Load AdSense script only once
      if (!document.querySelector("script[src*='adsbygoogle.js']")) {
        const script = document.createElement("script");
        script.async = true;
        script.src =
          "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8243831335530194";
        script.crossOrigin = "anonymous";
        document.head.appendChild(script);
      }

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

  // Return null in dev mode or localhost to avoid empty <ins>
  if (
    import.meta.env.MODE === "development" ||
    (typeof window !== "undefined" && window.location.hostname === "localhost")
  ) {
    return null;
  }

  // Render AdSense container
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
