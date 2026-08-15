import React from "react";
import UniversityListClient from "./UniversityListClient";
import { universities } from "@/data/universities";

type Props = {
  searchParams?: { q?: string } | Promise<{ q?: string }>;
};

function unique<T>(arr: T[]) {
  return Array.from(new Set(arr));
}

export default function Page() {
  // Render fully static: perform no server-side access to `searchParams`.
  // All filtering/searching is handled client-side in `UniversityListClient`.
  const cities = unique(universities.map((u) => u.city)).sort();
  const fields = unique(universities.flatMap((u) => u.fields)).sort();

  return <UniversityListClient initialList={universities} initialQ={""} cities={cities} fields={fields} />;
}
