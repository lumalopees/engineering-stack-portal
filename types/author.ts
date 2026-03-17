export type AuthorId = string;

export interface Author {
  id: AuthorId;
  name: string;
  slug: string;
  bio?: string;
  avatarUrl?: string;
  role?: string;
}
