import type { Article, Category } from "../types";
import type { ContentRepository } from "./content-repository";

function toErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return "Unknown error";
}

export class FallbackContentRepository implements ContentRepository {
  constructor(
    private readonly primary: ContentRepository,
    private readonly fallback: ContentRepository
  ) {}

  async getArticles(): Promise<Article[]> {
    try {
      return await this.primary.getArticles();
    } catch (error) {
      console.warn(
        `Primary content source unavailable for articles. Falling back to in-memory data. Cause: ${toErrorMessage(error)}`
      );
      return this.fallback.getArticles();
    }
  }

  async getArticleBySlug(slug: string): Promise<Article | null> {
    try {
      return await this.primary.getArticleBySlug(slug);
    } catch (error) {
      console.warn(
        `Primary content source unavailable for article slug "${slug}". Falling back to in-memory data. Cause: ${toErrorMessage(error)}`
      );
      return this.fallback.getArticleBySlug(slug);
    }
  }

  async getCategories(): Promise<Category[]> {
    try {
      return await this.primary.getCategories();
    } catch (error) {
      console.warn(
        `Primary content source unavailable for categories. Falling back to in-memory data. Cause: ${toErrorMessage(error)}`
      );
      return this.fallback.getCategories();
    }
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    try {
      return await this.primary.getCategoryBySlug(slug);
    } catch (error) {
      console.warn(
        `Primary content source unavailable for category slug "${slug}". Falling back to in-memory data. Cause: ${toErrorMessage(error)}`
      );
      return this.fallback.getCategoryBySlug(slug);
    }
  }
}
