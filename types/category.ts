export type CategoryId = string;

export interface Category {
  id: CategoryId;
  name: string;
  slug: string;
  description?: string;
}
