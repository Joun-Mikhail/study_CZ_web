import DeadlinesClient from "./DeadlinesClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Application Deadlines",
  description:
    "All upcoming Czech university application deadlines in one place. Sorted by date with days remaining. Check back weekly.",
};

export default function DeadlinesPage() {
  return <DeadlinesClient />;
}
