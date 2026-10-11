import { COURSE } from "@/data/course";
import { captureAccessFromUrl, getAccessToken, hasAccess, revokeAccess } from "@/lib/course-store";

describe("public course data", () => {
  const lessons = COURSE.modules.flatMap((m) => m.lessons);

  it("keeps paid lesson text, videos and files out of the public site", () => {
    for (const lesson of lessons.filter((l) => !l.isFree)) {
      expect(lesson.content).toBeNull();
      expect(lesson.videoUrl).toBeNull();
      expect(lesson.resources).toEqual([]);
    }
  });

  it("still ships the free preview lessons in full", () => {
    const free = lessons.filter((l) => l.isFree);
    expect(free.length).toBeGreaterThan(0);
    for (const lesson of free) expect(lesson.content?.en.length).toBeGreaterThan(50);
  });

  it("ships quiz summaries only, never questions or answers", () => {
    for (const mod of COURSE.modules) {
      expect(mod.quiz.questionCount).toBeGreaterThan(0);
      expect(mod.quiz).not.toHaveProperty("questions");
    }
  });
});

describe("course access token in the browser", () => {
  beforeEach(() => {
    revokeAccess();
    window.history.replaceState(null, "", "/courses/learn/");
  });

  it("stores a personal link token and removes it from the address bar", () => {
    window.history.replaceState(null, "", "/courses/learn/?access=abc.def#top");
    captureAccessFromUrl();
    expect(getAccessToken()).toBe("abc.def");
    expect(hasAccess()).toBe(true);
    expect(window.location.search).toBe("");
    expect(window.location.hash).toBe("#top");
  });

  it("ignores the old hard-coded unlock flag", () => {
    localStorage.setItem("studycz_access", "true");
    expect(hasAccess()).toBe(false);
    expect(localStorage.getItem("studycz_access")).toBeNull();
  });
});
