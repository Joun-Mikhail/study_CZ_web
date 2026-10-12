import type { Metadata } from "next";
import VisualProto from "./VisualProto";

// Throwaway prototype for phase 3 B1. Never merged.
export const metadata: Metadata = { title: "Visual directions (prototype)", robots: { index: false, follow: false } };

export default function Page() {
  return <VisualProto />;
}
