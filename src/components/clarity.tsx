"use client";

import Script from "next/script";

export default function Clarity() {
  const id = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;
  if (!id || process.env.NODE_ENV !== "production") return null;

  return (
    <Script id="clarity-init" strategy="afterInteractive">
      {`(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", ${JSON.stringify(id)});`}
    </Script>
  );
}
