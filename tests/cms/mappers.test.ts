import { describe, expect, it } from "vitest";
import { mapWpPostToDomain } from "../../lib/cms";
import type { WpPostResponse } from "../../lib/cms";

function createWpPost(overrides: Partial<WpPostResponse> = {}): WpPostResponse {
  return {
    id: 1,
    slug: "test-post",
    date: "2026-01-01T00:00:00.000Z",
    modified: "2026-01-02T00:00:00.000Z",
    title: { rendered: "Default title" },
    excerpt: { rendered: "<p>Default excerpt</p>" },
    content: { rendered: "<p>Default content</p>" },
    categories: [10],
    _embedded: {
      author: [{ id: 20, name: "Ana", slug: "ana" }],
      "wp:term": [[{ id: 10, name: "Architecture", slug: "architecture" }]]
    },
    ...overrides
  };
}

describe("mapWpPostToDomain", () => {
  it("prioritizes custom SEO meta fields over fallback sources", () => {
    const post = createWpPost({
      meta: {
        seo_title: "Meta SEO title",
        seo_description: "Meta SEO description",
        canonical_url: "https://portal.test/article/test-post",
        og_image: "https://cdn.test/og-image.jpg"
      },
      yoast_head_json: {
        title: "Yoast title",
        description: "Yoast description",
        canonical: "https://yoast.test/canonical"
      }
    });

    const result = mapWpPostToDomain(post);

    expect(result.seo.title).toBe("Meta SEO title");
    expect(result.seo.description).toBe("Meta SEO description");
    expect(result.seo.canonicalUrl).toBe("https://portal.test/article/test-post");
    expect(result.seo.ogImageUrl).toBe("https://cdn.test/og-image.jpg");
  });

  it("falls back to Yoast and content fields when SEO meta is missing", () => {
    const post = createWpPost({
      title: { rendered: "Rendered title" },
      excerpt: { rendered: "<p>Rendered excerpt</p>" },
      yoast_head_json: {
        title: "Yoast fallback title",
        description: "Yoast fallback description"
      }
    });

    const result = mapWpPostToDomain(post);

    expect(result.seo.title).toBe("Yoast fallback title");
    expect(result.seo.description).toBe("Yoast fallback description");
    expect(result.excerpt).toBe("Rendered excerpt");
  });
});
