import type { Metadata } from "next";
import { getContentRepository } from "../../../services";

export async function generateMetadata({
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
      description: "This article is not available."
    };
  }

  return {
    title: article.seo.title,
    description: article.seo.description,
    alternates: article.seo.canonicalUrl
      ? {
          canonical: article.seo.canonicalUrl
        }
      : undefined
  };
}
