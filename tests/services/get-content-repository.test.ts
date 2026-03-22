import { afterEach, describe, expect, it, vi } from "vitest";
import {
  FallbackContentRepository,
  InMemoryContentRepository,
  WordPressContentRepository,
  getContentRepository
} from "../../services";

describe("getContentRepository", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns in-memory repository when CMS_BASE_URL is not set", () => {
    vi.stubEnv("CMS_BASE_URL", undefined);

    const repository = getContentRepository();

    expect(repository).toBeInstanceOf(InMemoryContentRepository);
  });

  it("uses fallback wrapper by default in development", () => {
    vi.stubEnv("CMS_BASE_URL", "http://localhost:8080");
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("CMS_FALLBACK_MODE", undefined);

    const repository = getContentRepository();

    expect(repository).toBeInstanceOf(FallbackContentRepository);
  });

  it("uses strict WordPress repository by default in production", () => {
    vi.stubEnv("CMS_BASE_URL", "https://cms.prod");
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("CMS_FALLBACK_MODE", undefined);

    const repository = getContentRepository();

    expect(repository).toBeInstanceOf(WordPressContentRepository);
  });

  it("enables fallback in production when explicitly requested", () => {
    vi.stubEnv("CMS_BASE_URL", "https://cms.prod");
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("CMS_FALLBACK_MODE", "enabled");

    const repository = getContentRepository();

    expect(repository).toBeInstanceOf(FallbackContentRepository);
  });

  it("disables fallback in development when explicitly requested", () => {
    vi.stubEnv("CMS_BASE_URL", "http://localhost:8080");
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("CMS_FALLBACK_MODE", "disabled");

    const repository = getContentRepository();

    expect(repository).toBeInstanceOf(WordPressContentRepository);
  });
});
