import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Study in Czechia",
    short_name: "StudyCzechia",
    description:
      "Free guides, university matching, and expert support for students studying in the Czech Republic.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a1628",
    theme_color: "#11335a",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
