import { InMemoryContentRepository } from "./in-memory-content-repository";
import { WordPressContentRepository } from "./wordpress-content-repository";
import type { ContentRepository } from "./content-repository";

export function getContentRepository(): ContentRepository {
  if (process.env.CMS_BASE_URL) {
    return new WordPressContentRepository();
  }

  return new InMemoryContentRepository();
}
