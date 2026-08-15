"use client";

import { useEffect } from "react";

export default function Analytics() {
  useEffect(() => {
    const id = process.env.NEXT_PUBLIC_ANALYTICS_ID;
    if (!id) {
      // Placeholder: no analytics ID configured.
      console.log("[Analytics] placeholder: NEXT_PUBLIC_ANALYTICS_ID not set.");
      return;
    }

    // Example Google Analytics placeholder integration.
    const gtagScript = document.createElement("script");
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    gtagScript.async = true;
    document.head.appendChild(gtagScript);

    const inline = document.createElement("script");
    inline.innerHTML = `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${id}', { page_path: window.location.pathname });`;
    document.head.appendChild(inline);

    return () => {
      // cleanup not strictly necessary for analytics script
    };
  }, []);

  return null;
}
