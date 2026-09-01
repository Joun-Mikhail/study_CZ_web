import type { Metadata } from "next";
import LearnDashboard from "./LearnDashboard";

export const metadata: Metadata = {
  title: "Course Dashboard — Your First 90 Days",
  description: "Access your course modules, lessons, and quizzes. Track your progress through the First 90 Days in Czechia course.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <LearnDashboard />;
}
