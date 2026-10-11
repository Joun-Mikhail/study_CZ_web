import type { Metadata } from "next";
import CourseAccessAdmin from "./CourseAccessAdmin";

export const metadata: Metadata = {
  title: "Course access link",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <CourseAccessAdmin />;
}
