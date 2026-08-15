import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

type Submission = {
  universityId: string;
  email?: string | null;
  message: string;
  createdAt: string;
};

const DATA_DIR = path.join(process.cwd(), "src", "data", "submissions");
const FILE_PATH = path.join(DATA_DIR, "corrections.json");

async function ensureDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (e) {
    // ignore
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { universityId, email, message } = body as any;
    if (!universityId || !message || typeof message !== "string") {
      return NextResponse.json({ error: "invalid" }, { status: 400 });
    }

    const entry: Submission = { universityId, email: email || null, message: message.trim(), createdAt: new Date().toISOString() };

    await ensureDir();
    let existing: Submission[] = [];
    try {
      const raw = await fs.readFile(FILE_PATH, "utf8");
      existing = JSON.parse(raw) as Submission[];
    } catch (e) {
      existing = [];
    }

    existing.push(entry);
    await fs.writeFile(FILE_PATH, JSON.stringify(existing, null, 2), "utf8");

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
