import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

type Submission = {
  universityId: string;
  email?: string | null;
  message: string;
  createdAt: string;
  ip?: string;
};

const DATA_DIR = path.join(process.cwd(), "src", "data", "submissions");
const FILE_PATH = path.join(DATA_DIR, "corrections.json");

const rateMap = new Map<string, number[]>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (rateMap.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  if (timestamps.length >= RATE_LIMIT) return true;
  timestamps.push(now);
  rateMap.set(ip, timestamps);
  return false;
}

async function ensureDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch {
    // ignore
  }
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "rate_limited" }, { status: 429 });
    }

    const body = await req.json();
    const { universityId, email, message } = body as any;

    if (!universityId || typeof universityId !== "string" || universityId.length > 100) {
      return NextResponse.json({ error: "invalid" }, { status: 400 });
    }
    if (!message || typeof message !== "string" || message.trim().length === 0 || message.length > 2000) {
      return NextResponse.json({ error: "invalid" }, { status: 400 });
    }
    if (email && (typeof email !== "string" || email.length > 200)) {
      return NextResponse.json({ error: "invalid" }, { status: 400 });
    }

    const entry: Submission = {
      universityId: universityId.slice(0, 100),
      email: email ? email.slice(0, 200) : null,
      message: message.trim().slice(0, 2000),
      createdAt: new Date().toISOString(),
    };

    await ensureDir();
    let existing: Submission[] = [];
    try {
      const raw = await fs.readFile(FILE_PATH, "utf8");
      existing = JSON.parse(raw) as Submission[];
    } catch {
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
