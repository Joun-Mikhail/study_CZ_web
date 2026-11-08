import type { Metadata } from "next";
import WelcomeClient from "./WelcomeClient";

export const metadata: Metadata = {
  title: "Welcome to the course",
  description: "Your course purchase is being confirmed. This page unlocks the First 90 Days in Czechia course on this device.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <WelcomeClient />;
}
