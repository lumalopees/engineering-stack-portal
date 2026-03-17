import type { Article, Category } from "../types";
import type { ContentRepository } from "./content-repository";

const categories: Category[] = [
  {
    id: "cat-1",
    name: "Software Architecture",
    slug: "software-architecture",
    description: "System design, architecture patterns, and trade-offs."
  }
];

const articles: Article[] = [
  {
    id: "art-1",
    slug: "why-seo-first-architecture-matters",
    title: "Why SEO-First Architecture Matters",
    excerpt: "How architecture decisions affect content discoverability and growth.",
    content: "Placeholder content for early architecture validation.",
    publishedAt: "2026-03-13T00:00:00.000Z",
    author: {
      id: "author-1",
      name: "Engineering Team",
      slug: "engineering-team",
      role: "Editorial Staff"
    },
    category: categories[0],
    tags: ["seo", "architecture"],
    seo: {
      title: "Why SEO-First Architecture Matters",
      description: "A practical view on SEO-first architecture decisions."
    }
  }
];

export class InMemoryContentRepository implements ContentRepository {
  async getArticles(): Promise<Article[]> {
    return articles;
  }

  async getArticleBySlug(slug: string): Promise<Article | null> {
    return articles.find((article) => article.slug === slug) ?? null;
  }

  async getCategories(): Promise<Category[]> {
    return categories;
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    return categories.find((category) => category.slug === slug) ?? null;
  }
}
