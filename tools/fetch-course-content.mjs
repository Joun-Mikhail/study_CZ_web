// Downloads the paid course content from the private repository at build
// time, into netlify/course-content/content.json (git-ignored). The course
// functions ship it via `included_files` in netlify.toml.
//
// Netlify environment variables (scope: Builds):
//   COURSE_REPO        e.g. "Joun-Mikhail/study_CZ_course"
//   COURSE_REPO_TOKEN  fine-grained GitHub token, read-only "Contents" on that repo
// Without them the build still succeeds; the course API then answers 503.
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const repo = process.env.COURSE_REPO?.trim();
const token = process.env.COURSE_REPO_TOKEN?.trim();
const out = path.resolve("netlify/course-content/content.json");

if (!repo || !token) {
  console.log("fetch-course-content: COURSE_REPO / COURSE_REPO_TOKEN not set, skipping (paid lessons unavailable)");
  process.exit(0);
}

const res = await fetch(`https://api.github.com/repos/${repo}/contents/content.json`, {
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github.raw+json",
    "X-GitHub-Api-Version": "2022-11-28",
  },
});
if (!res.ok) {
  console.error(`fetch-course-content: GitHub answered ${res.status}`);
  process.exit(1);
}
const text = await res.text();
const content = JSON.parse(text);
if (content.version !== 1 || typeof content.lessons !== "object") {
  console.error("fetch-course-content: content.json has an unexpected shape");
  process.exit(1);
}
await mkdir(path.dirname(out), { recursive: true });
await writeFile(out, text);
console.log(
  `fetch-course-content: ${Object.keys(content.lessons).length} lessons, ${Object.keys(content.quizzes ?? {}).length} quizzes`
);
