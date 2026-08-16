import type { Metadata } from "next";
import CoursesClient from "./CoursesClient";

export const metadata: Metadata = {
  title: "Czech Language Course",
  description: "Learn Czech online with structured lessons designed for international students preparing to study in the Czech Republic.",
};

export default function Page() {
  return <CoursesClient />;
}
