import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import HomePage from "../../app/page";

const mockGetArticles = vi.fn();

vi.mock("../../services", () => ({
  getContentRepository: () => ({
    getArticles: mockGetArticles
  })
}));

describe("HomePage", () => {
  beforeEach(() => {
    mockGetArticles.mockReset();
    mockGetArticles.mockResolvedValue([
      {
        id: "art-1",
        slug: "test-article",
        title: "Test Article",
        excerpt: "Excerpt",
        content: "Content",
        publishedAt: "2026-01-01T00:00:00.000Z",
        author: { id: "auth-1", name: "Ana", slug: "ana" },
        category: { id: "cat-1", name: "Software Architecture", slug: "software-architecture" },
        seo: { title: "SEO title", description: "SEO description" }
      }
    ]);
  });

  it("renders article listing and semantic links", async () => {
    const element = await HomePage();
    const html = renderToStaticMarkup(element);

    expect(html).toContain("Engineering Stack Portal");
    expect(html).toContain("Latest Articles");
    expect(html).toContain("/article/test-article");
    expect(html).toContain("/category/software-architecture");
  });
});
