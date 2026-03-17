import { CmsError } from "./errors";

function getCmsBaseUrl(): string {
  const cmsBaseUrl = process.env.CMS_BASE_URL;

  if (!cmsBaseUrl) {
    throw new CmsError("CMS_BASE_URL is not configured.");
  }

  return cmsBaseUrl.replace(/\/$/, "");
}

export async function cmsFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const baseUrl = getCmsBaseUrl();
  const url = `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;

  let response: Response;

  try {
    response = await fetch(url, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(init?.headers ?? {})
      },
      next: { revalidate: 60 }
    });
  } catch (error) {
    throw new CmsError(`Failed to connect to CMS endpoint: ${url}`, undefined, error);
  }

  if (!response.ok) {
    throw new CmsError(`CMS request failed for ${path}`, response.status);
  }

  try {
    return (await response.json()) as T;
  } catch (error) {
    throw new CmsError(`Invalid JSON payload from CMS endpoint: ${path}`, response.status, error);
  }
}
