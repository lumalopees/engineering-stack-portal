import {
  fetchWpCategories,
  fetchWpCategoryBySlug,
  fetchWpPostBySlug,
  fetchWpPosts,
  mapWpCategoryToDomain,
  mapWpPostToDomain
} from "../lib/cms";
import type { Article, Category } from "../types";
import type { ContentRepository } from "./content-repository";

export class WordPressContentRepository implements ContentRepository {
  async getArticles(): Promise<Article[]> {
    const posts = await fetchWpPosts();
    return posts.map(mapWpPostToDomain);
  }

  async getArticleBySlug(slug: string): Promise<Article | null> {
    const post = await fetchWpPostBySlug(slug);
    return post ? mapWpPostToDomain(post) : null;
  }

  async getCategories(): Promise<Category[]> {
    const categories = await fetchWpCategories();
    return categories.map(mapWpCategoryToDomain);
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    const category = await fetchWpCategoryBySlug(slug);
    return category ? mapWpCategoryToDomain(category) : null;
  }
}
