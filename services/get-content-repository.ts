import { InMemoryContentRepository } from "./in-memory-content-repository";
import { WordPressContentRepository } from "./wordpress-content-repository";
import type { ContentRepository } from "./content-repository";
import { FallbackContentRepository } from "./fallback-content-repository";

function shouldUseFallbackWithCms(): boolean {
  const explicitFallbackMode = process.env.CMS_FALLBACK_MODE;

  if (explicitFallbackMode === "enabled") {
    return true;
  }

  if (explicitFallbackMode === "disabled") {
    return false;
  }

  return process.env.NODE_ENV !== "production";
}

export function getContentRepository(): ContentRepository {
  const fallbackRepository = new InMemoryContentRepository();

  if (process.env.CMS_BASE_URL) {
    const primaryRepository = new WordPressContentRepository();

    if (shouldUseFallbackWithCms()) {
      return new FallbackContentRepository(primaryRepository, fallbackRepository);
    }

    return primaryRepository;
  }

  return fallbackRepository;
}
