import fs from "fs/promises";
import path from "path";

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
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">University Corrections</h1>
      {entries.length === 0 ? (
        <p className="text-sm text-gray-600">No corrections submitted yet.</p>
      ) : (
        <div className="overflow-auto border rounded">
          <table className="min-w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">University ID</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Message</th>
                <th className="px-4 py-2">Submitted</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((e, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-4 py-2 align-top">{e.universityId}</td>
                  <td className="px-4 py-2 align-top">{e.email || "—"}</td>
                  <td className="px-4 py-2 align-top whitespace-pre-wrap max-w-[60ch]">{e.message}</td>
                  <td className="px-4 py-2 align-top">{new Date(e.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
