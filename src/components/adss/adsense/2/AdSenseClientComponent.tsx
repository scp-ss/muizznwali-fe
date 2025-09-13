"use client";
import React, { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
//import { isMobile } from "react-device-detect";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const AdSenseClientComponent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const url = `${pathname}?${searchParams}`;
  console.log('MidbaseCmp -> router changed ', url);

  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;

    const existingScript = document.querySelector(
      'script[src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4354027605127587"]'
    );

    if (existingScript) return;

    const handleScriptLoad = () => {
      if (window.adsbygoogle && adRef.current) {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
          console.error('AdSense error:', err);
        }
      }
    };

    const scriptElement = document.createElement('script');
    scriptElement.async = true;
    scriptElement.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4354027605127587';
    scriptElement.crossOrigin = 'anonymous';
    scriptElement.onload = handleScriptLoad;
    document.head.appendChild(scriptElement);

    return () => {
      if (scriptElement.parentNode) {
        scriptElement.parentNode.removeChild(scriptElement);
      }
    };
  }, []);

  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  return (
    <div style={{ overflow: "hidden", margin: "5px" }}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-4354027605127587"
        data-ad-slot="4429111582"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdSenseClientComponent;
