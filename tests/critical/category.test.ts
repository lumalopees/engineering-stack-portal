import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import CategoryPage from "../../app/category/[slug]/page";

const mockGetCategoryBySlug = vi.fn();
const mockGetArticles = vi.fn();

vi.mock("../../services", () => ({
  getContentRepository: () => ({
    getCategoryBySlug: mockGetCategoryBySlug,
    getArticles: mockGetArticles
  })
}));

describe("CategoryPage", () => {
  beforeEach(() => {
    mockGetCategoryBySlug.mockReset();
    mockGetArticles.mockReset();
  });

  it("renders category content and related article links", async () => {
    mockGetCategoryBySlug.mockResolvedValue({
      id: "cat-1",
      name: "Software Architecture",
      slug: "software-architecture",
      description: "Category description"
    });
    mockGetArticles.mockResolvedValue([
      {
        id: "art-1",
        slug: "test-article",
        title: "Test article title",
        excerpt: "Excerpt",
        content: "<p>content</p>",
        publishedAt: "2026-01-01T00:00:00.000Z",
        author: { id: "auth-1", name: "Ana", slug: "ana" },
        category: { id: "cat-1", name: "Software Architecture", slug: "software-architecture" },
        seo: { title: "seo", description: "desc" }
      }
    ]);

    const element = await CategoryPage({
      params: Promise.resolve({ slug: "software-architecture" })
    });
    const html = renderToStaticMarkup(element);

    expect(html).toContain("Software Architecture");
    expect(html).toContain("Articles in this category");
    expect(html).toContain("/article/test-article");
  });

  it("throws not found behavior when category slug does not exist", async () => {
    mockGetCategoryBySlug.mockResolvedValue(null);
    mockGetArticles.mockResolvedValue([]);

    await expect(
      CategoryPage({
        params: Promise.resolve({ slug: "category-that-does-not-exist" })
      })
    ).rejects.toThrow("NEXT_NOT_FOUND");
  });
});
