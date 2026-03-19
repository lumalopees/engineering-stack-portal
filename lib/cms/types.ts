export interface WpRenderedField {
  rendered: string;
}

export interface WpAuthorResponse {
  id: number;
  slug: string;
  name: string;
  description?: string;
}

export interface WpCategoryResponse {
  id: number;
  slug: string;
  name: string;
  description?: string;
}

export interface WpPostResponse {
  id: number;
  slug: string;
  date: string;
  modified: string;
  title: WpRenderedField;
  excerpt: WpRenderedField;
  content: WpRenderedField;
  categories: number[];
  _embedded?: {
    author?: WpAuthorResponse[];
    "wp:term"?: WpCategoryResponse[][];
  };
  yoast_head_json?: {
    title?: string;
    description?: string;
    canonical?: string;
  };
  meta?: {
    seo_title?: string;
    seo_description?: string;
    canonical_url?: string;
    og_image?: string;
  };
}
