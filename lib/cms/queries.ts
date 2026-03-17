import { cmsFetch } from "./client";
import type { WpCategoryResponse, WpPostResponse } from "./types";

const WP_API_PREFIX = "/?rest_route=/wp/v2";

export async function fetchWpPosts(): Promise<WpPostResponse[]> {
  return cmsFetch<WpPostResponse[]>(`${WP_API_PREFIX}/posts&per_page=20&_embed=author,wp:term`);
}

export async function fetchWpPostBySlug(slug: string): Promise<WpPostResponse | null> {
  const posts = await cmsFetch<WpPostResponse[]>(
    `${WP_API_PREFIX}/posts&slug=${encodeURIComponent(slug)}&_embed=author,wp:term`
  );

  return posts[0] ?? null;
}

export async function fetchWpCategories(): Promise<WpCategoryResponse[]> {
  return cmsFetch<WpCategoryResponse[]>(`${WP_API_PREFIX}/categories&per_page=50`);
}

export async function fetchWpCategoryBySlug(slug: string): Promise<WpCategoryResponse | null> {
  const categories = await cmsFetch<WpCategoryResponse[]>(
    `${WP_API_PREFIX}/categories&slug=${encodeURIComponent(slug)}`
  );

  return categories[0] ?? null;
}
