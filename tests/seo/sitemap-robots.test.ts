import { beforeEach, describe, expect, it, vi } from "vitest";

const mockGetArticles = vi.fn();
const mockGetCategories = vi.fn();

vi.mock("../../services", () => ({
  getContentRepository: () => ({
    getArticles: mockGetArticles,
    getCategories: mockGetCategories
  })
}));

vi.mock("../../lib/site-config", () => ({
  getSiteUrl: () => "https://portal.test"
}));

describe("SEO routes", () => {
  beforeEach(() => {
    mockGetArticles.mockReset();
    mockGetCategories.mockReset();
  });

  it("builds sitemap entries for static, article and category routes", async () => {
    mockGetArticles.mockResolvedValue([
      {
        id: "art-1",
        slug: "test-article",
        title: "Article",
        excerpt: "Excerpt",
        content: "<p>content</p>",
        publishedAt: "2026-01-01T00:00:00.000Z",
        updatedAt: "2026-01-02T00:00:00.000Z",
        author: { id: "auth-1", name: "Ana", slug: "ana" },
        category: { id: "cat-1", name: "Architecture", slug: "architecture" },
        seo: { title: "SEO title", description: "SEO description" }
      }
    ]);
    mockGetCategories.mockResolvedValue([
      { id: "cat-1", name: "Architecture", slug: "architecture", description: "desc" }
    ]);

    const sitemapModule = await import("../../app/sitemap");
    const entries = await sitemapModule.default();

    expect(entries.some((entry) => entry.url === "https://portal.test")).toBe(true);
    expect(entries.some((entry) => entry.url === "https://portal.test/article/test-article")).toBe(
      true
    );
    expect(entries.some((entry) => entry.url === "https://portal.test/category/architecture")).toBe(
      true
    );
  });

  it("returns robots policy with sitemap and host references", async () => {
    const robotsModule = await import("../../app/robots");
    const robots = robotsModule.default();

    expect(robots.host).toBe("https://portal.test");
    expect(robots.sitemap).toBe("https://portal.test/sitemap.xml");
    expect(Array.isArray(robots.rules)).toBe(true);
  });
});
