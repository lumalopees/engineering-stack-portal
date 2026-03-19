import type { Metadata } from "next";
import { getSiteUrl } from "../../../lib/site-config";
import { getContentRepository } from "../../../services";

const siteUrl = getSiteUrl();

export async function generateArticleMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const repository = getContentRepository();
  const article = await repository.getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article not found",
      description: "This article is not available.",
      robots: {
        index: false,
        follow: false
      }
    };
  }

  const articleUrl = `${siteUrl}/article/${article.slug}`;
  const canonicalUrl = article.seo.canonicalUrl ?? articleUrl;
  const ogImages = article.seo.ogImageUrl ? [{ url: article.seo.ogImageUrl }] : undefined;

  return {
    title: article.seo.title,
    description: article.seo.description,
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      type: "article",
      url: canonicalUrl,
      title: article.seo.title,
      description: article.seo.description,
      images: ogImages,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author.name],
      section: article.category.name
    },
    twitter: {
      card: "summary_large_image",
      title: article.seo.title,
      description: article.seo.description,
      images: article.seo.ogImageUrl ? [article.seo.ogImageUrl] : undefined
    }
  };
}
