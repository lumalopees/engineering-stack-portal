import type { Article, Author, Category } from "../../types";
import type { WpCategoryResponse, WpPostResponse } from "./types";

function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, "").trim();
}

function getMetaString(value: string | undefined): string | undefined {
  if (!value) {
    return undefined;
  }

  const normalized = value.trim();
  return normalized.length > 0 ? normalized : undefined;
}

function mapFallbackAuthor(): Author {
  return {
    id: "unknown-author",
    name: "Unknown author",
    slug: "unknown-author"
  };
}

export function mapWpCategoryToDomain(category: WpCategoryResponse): Category {
  return {
    id: String(category.id),
    name: category.name,
    slug: category.slug,
    description: category.description
  };
}

function mapEmbeddedCategory(post: WpPostResponse): Category | null {
  const terms = post._embedded?.["wp:term"];
  const categoryGroup = terms?.find((group) => group.length > 0);
  const category = categoryGroup?.[0];

  if (!category) {
    return null;
  }

  return mapWpCategoryToDomain(category);
}

function mapEmbeddedAuthor(post: WpPostResponse): Author {
  const embeddedAuthor = post._embedded?.author?.[0];

  if (!embeddedAuthor) {
    return mapFallbackAuthor();
  }

  return {
    id: String(embeddedAuthor.id),
    name: embeddedAuthor.name,
    slug: embeddedAuthor.slug,
    bio: embeddedAuthor.description
  };
}

export function mapWpPostToDomain(post: WpPostResponse): Article {
  const category =
    mapEmbeddedCategory(post) ??
    ({
      id: "uncategorized",
      name: "Uncategorized",
      slug: "uncategorized"
    } satisfies Category);

  const excerpt = stripHtml(post.excerpt.rendered);
  const content = post.content.rendered;
  const seoTitle = getMetaString(post.meta?.seo_title) ?? post.yoast_head_json?.title ?? stripHtml(post.title.rendered);
  const seoDescription =
    getMetaString(post.meta?.seo_description) ?? post.yoast_head_json?.description ?? excerpt;
  const canonicalUrl = getMetaString(post.meta?.canonical_url) ?? post.yoast_head_json?.canonical;
  const ogImageUrl = getMetaString(post.meta?.og_image);

  return {
    id: String(post.id),
    slug: post.slug,
    title: stripHtml(post.title.rendered),
    excerpt,
    content,
    publishedAt: post.date,
    updatedAt: post.modified,
    author: mapEmbeddedAuthor(post),
    category,
    seo: {
      title: seoTitle,
      description: seoDescription,
      canonicalUrl,
      ogImageUrl
    }
  };
}
