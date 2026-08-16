import fs from "fs/promises";
import path from "path";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

type Submission = {
  universityId: string;
  email?: string | null;
  message: string;
  createdAt: string;
};

export default async function CorrectionsPage() {
  const dataPath = path.join(process.cwd(), "src", "data", "submissions", "corrections.json");
  let entries: Submission[] = [];
  try {
    const raw = await fs.readFile(dataPath, "utf8");
    entries = JSON.parse(raw) as Submission[];
  } catch (e) {
    entries = [];
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 pt-24 pb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">University Corrections</h1>
            <p className="text-sm text-text-muted mt-1">{entries.length} submission{entries.length !== 1 ? "s" : ""}</p>
          </div>
        </div>

        {entries.length === 0 ? (
          <div className="rounded-2xl border border-border-subtle bg-surface/80 p-12 text-center">
            <p className="text-text-secondary">No corrections submitted yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-border-subtle">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border-subtle bg-surface/60">
                  <th className="px-4 py-3 font-medium text-text-secondary">University ID</th>
                  <th className="px-4 py-3 font-medium text-text-secondary">Email</th>
                  <th className="px-4 py-3 font-medium text-text-secondary">Message</th>
                  <th className="px-4 py-3 font-medium text-text-secondary">Submitted</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((e, i) => (
                  <tr key={i} className="border-b border-border-subtle last:border-b-0 hover:bg-surface/40 transition-colors">
                    <td className="px-4 py-3 align-top text-text-primary font-mono text-xs">{e.universityId}</td>
                    <td className="px-4 py-3 align-top text-text-secondary">{e.email || "—"}</td>
                    <td className="px-4 py-3 align-top text-text-primary whitespace-pre-wrap max-w-[60ch]">{e.message}</td>
                    <td className="px-4 py-3 align-top text-text-muted whitespace-nowrap">{new Date(e.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
