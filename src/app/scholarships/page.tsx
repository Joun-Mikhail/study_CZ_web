import React from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { scholarships } from "@/data/scholarships";

export default function Page() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Scholarships & Funding</h1>
      <p className="text-text-muted mb-6">Find common scholarship routes and tips for applying.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {scholarships.map((s) => (
          <GlassCard key={s.id} href={s.link || "#"} className="p-4">
            <h2 className="text-lg font-semibold mb-1">{s.name.en}</h2>
            <div className="text-sm text-text-secondary mb-2">{s.provider.en}</div>
            <p className="text-sm text-text-muted mb-3">{s.eligibility.en}</p>
            <p className="text-sm text-text-secondary mb-2"><strong>Coverage:</strong> {s.coverage.en}</p>
            <p className="text-xs text-text-muted">Deadline: {s.deadline.en}</p>
          </GlassCard>
        ))}
      </div>
    </main>
  );
}
