import type { Article, Category } from "../types";

export interface ContentRepository {
  getArticles(): Promise<Article[]>;
  getArticleBySlug(slug: string): Promise<Article | null>;
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | null>;
}
