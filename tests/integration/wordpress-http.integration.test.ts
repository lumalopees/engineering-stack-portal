import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { CmsError } from "../../lib/cms";
import { WordPressContentRepository } from "../../services";

const server = setupServer(
  http.get("http://cms.local/", ({ request }) => {
    const url = new URL(request.url);
    const restRoute = url.searchParams.get("rest_route");
    const slug = url.searchParams.get("slug");

    if (restRoute === "/wp/v2/posts") {
      if (slug === "test-post") {
        return HttpResponse.json([
          {
            id: 10,
            slug: "test-post",
            date: "2026-01-01T00:00:00.000Z",
            modified: "2026-01-02T00:00:00.000Z",
            title: { rendered: "Test post title" },
            excerpt: { rendered: "<p>Test post excerpt</p>" },
            content: { rendered: "<p>Test post content</p>" },
            categories: [1],
            meta: {
              seo_title: "Custom SEO title",
              seo_description: "Custom SEO description",
              canonical_url: "https://portal.test/article/test-post",
              og_image: "https://cdn.test/og.jpg"
            },
            _embedded: {
              author: [{ id: 2, name: "Ana Costa", slug: "ana-costa" }],
              "wp:term": [[{ id: 1, name: "Architecture", slug: "architecture" }]]
            }
          }
        ]);
      }

      if (slug) {
        return HttpResponse.json([]);
      }

      return HttpResponse.json([
        {
          id: 10,
          slug: "test-post",
          date: "2026-01-01T00:00:00.000Z",
          modified: "2026-01-02T00:00:00.000Z",
          title: { rendered: "Test post title" },
          excerpt: { rendered: "<p>Test post excerpt</p>" },
          content: { rendered: "<p>Test post content</p>" },
          categories: [1],
          meta: {
            seo_title: "Custom SEO title",
            seo_description: "Custom SEO description",
            canonical_url: "https://portal.test/article/test-post",
            og_image: "https://cdn.test/og.jpg"
          },
          _embedded: {
            author: [{ id: 2, name: "Ana Costa", slug: "ana-costa" }],
            "wp:term": [[{ id: 1, name: "Architecture", slug: "architecture" }]]
          }
        }
      ]);
    }

    if (restRoute === "/wp/v2/categories") {
      return HttpResponse.json([{ id: 1, name: "Architecture", slug: "architecture" }]);
    }

    return HttpResponse.json({ message: "Unhandled route" }, { status: 404 });
  })
);

describe("WordPress HTTP integration", () => {
  beforeAll(() => {
    server.listen({ onUnhandledRequest: "error" });
  });

  afterEach(() => {
    server.resetHandlers();
    vi.unstubAllEnvs();
  });

  afterAll(() => {
    server.close();
  });

  beforeEach(() => {
    vi.stubEnv("CMS_BASE_URL", "http://cms.local");
  });

  it("maps WordPress API payload into domain entities", async () => {
    const repository = new WordPressContentRepository();

    const articles = await repository.getArticles();
    const singleArticle = await repository.getArticleBySlug("test-post");

    expect(articles).toHaveLength(1);
    expect(articles[0].seo.title).toBe("Custom SEO title");
    expect(articles[0].seo.ogImageUrl).toBe("https://cdn.test/og.jpg");
    expect(articles[0].author.name).toBe("Ana Costa");
    expect(singleArticle?.slug).toBe("test-post");
    expect(singleArticle?.seo.canonicalUrl).toBe("https://portal.test/article/test-post");
  });

  it("propagates CMS errors when API is unavailable", async () => {
    server.use(
      http.get("http://cms.local/", ({ request }) => {
        const url = new URL(request.url);
        if (url.searchParams.get("rest_route") === "/wp/v2/posts") {
          return HttpResponse.json({ message: "Internal server error" }, { status: 500 });
        }

        return HttpResponse.json([]);
      })
    );

    const repository = new WordPressContentRepository();

    await expect(repository.getArticles()).rejects.toBeInstanceOf(CmsError);
  });
});
