import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ArticlePage from "../../app/article/[slug]/page";

const mockGetArticleBySlug = vi.fn();

vi.mock("../../services", () => ({
  getContentRepository: () => ({
    getArticleBySlug: mockGetArticleBySlug
  })
}));

describe("ArticlePage", () => {
  beforeEach(() => {
    mockGetArticleBySlug.mockReset();
  });

  it("renders article content when slug exists", async () => {
    mockGetArticleBySlug.mockResolvedValue({
      id: "art-1",
      slug: "test-article",
      title: "Test article title",
      excerpt: "Test article excerpt",
      content: "<p>Test article content</p>",
      publishedAt: "2026-01-01T00:00:00.000Z",
      author: { id: "auth-1", name: "Engineering Team", slug: "engineering-team" },
      category: { id: "cat-1", name: "Software Architecture", slug: "software-architecture" },
      seo: { title: "SEO title", description: "SEO description" }
    });

    const element = await ArticlePage({
      params: Promise.resolve({ slug: "test-article" })
    });
    const html = renderToStaticMarkup(element);

    expect(html).toContain("Test article title");
    expect(html).toContain("Engineering Team");
    expect(html).toContain("/category/software-architecture");
  });

  it("throws not found behavior when slug does not exist", async () => {
    mockGetArticleBySlug.mockResolvedValue(null);

    await expect(
      ArticlePage({
        params: Promise.resolve({ slug: "slug-that-does-not-exist" })
      })
    ).rejects.toThrow("NEXT_NOT_FOUND");
  });
});
