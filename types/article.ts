import type { Author } from "./author";
import type { Category } from "./category";

export type ArticleId = string;

export interface ArticleSeo {
  title: string;
  description: string;
  canonicalUrl?: string;
}

export interface Article {
  id: ArticleId;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  updatedAt?: string;
  author: Author;
  category: Category;
  tags?: string[];
  seo: ArticleSeo;
}
