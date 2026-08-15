"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { universities } from "@/data/universities";
import Link from "next/link";

export default function SearchClient() {
  const params = useSearchParams();
  const q = (params?.get("q") || "").trim().toLowerCase();

  const results = q
    ? universities.filter((u) => {
        return (
          u.name.toLowerCase().includes(q) ||
          u.city.toLowerCase().includes(q) ||
          u.fields.join(" ").toLowerCase().includes(q)
        );
      })
    : [];

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-4">Search universities</h1>

      <p className="text-text-muted mb-6">Query: "{q || ""}"</p>

      {q === "" ? (
        <p className="text-text-secondary">Enter a search term in the navbar to look for universities.</p>
      ) : results.length === 0 ? (
        <p className="text-text-secondary">No results found.</p>
      ) : (
        <ul className="grid gap-4">
          {results.map((u) => (
            <li key={u.id} className="p-4 rounded-lg border border-border-subtle bg-midnight/5">
              <Link href={`/university/${u.id}`} className="text-lg font-semibold text-text-primary hover:underline">
                {u.name}
              </Link>
              <div className="text-sm text-text-secondary mt-1">{u.city} — {u.fields.join(", ")}</div>
              <p className="mt-2 text-text-muted text-sm">{u.blurb.en}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
