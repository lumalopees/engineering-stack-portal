import type { MetadataRoute } from "next";
import { getSiteUrl } from "../lib/site-config";
import { getContentRepository } from "../services";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const repository = getContentRepository();
  const [articles, categories] = await Promise.all([
    repository.getArticles(),
    repository.getCategories()
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      changeFrequency: "daily",
      priority: 1
    }
  ];

  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${siteUrl}/article/${article.slug}`,
    lastModified: article.updatedAt ?? article.publishedAt,
    changeFrequency: "weekly",
    priority: 0.8
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${siteUrl}/category/${category.slug}`,
    changeFrequency: "weekly",
    priority: 0.7
  }));

  return [...staticRoutes, ...articleRoutes, ...categoryRoutes];
}
