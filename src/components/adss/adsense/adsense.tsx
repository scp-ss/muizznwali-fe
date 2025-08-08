// src/components/AdComponent.tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const AdComponent = () => {
  const location = useLocation();
  const { pathname, search } = location;

  // Effect 1: Log URL changes
  useEffect(() => {
    const url = `${pathname}${search}`;
    console.log("AdsenseComp -> router changed ", url);
  }, [pathname, search]);

  // Effect 2: Dynamically load AdSense script and push ads
  useEffect(() => {
    // Disable ads in dev mode or localhost
    if (
      import.meta.env.MODE === "development" ||
      (typeof window !== "undefined" && window.location.hostname === "localhost")
    ) {
      console.log("AdSense disabled in development mode");
      return;
    }

    const scriptId = "adsense-script";

    // Add script if not already added
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.async = true;
      script.src =
        "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8243831335530194";
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
    }

    // Push ad after short delay to ensure script loaded
    const timeout = setTimeout(() => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("AdSense error:", e);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  // Render nothing in dev mode or localhost to avoid empty ads
  if (
    import.meta.env.MODE === "development" ||
    (typeof window !== "undefined" && window.location.hostname === "localhost")
  ) {
    return null;
  }

  // Render AdSense ad unit container
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
