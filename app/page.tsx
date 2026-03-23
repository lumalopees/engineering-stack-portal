import Link from "next/link";
import type { Metadata } from "next";
import { PageContainer } from "../components";
import { TrackOnMount } from "../lib/analytics/track-on-mount";
import { getSiteUrl } from "../lib/site-config";
import { getContentRepository } from "../services";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Home",
  description:
    "Latest software engineering and product articles with SEO-first editorial architecture.",
  alternates: {
    canonical: siteUrl
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Engineering Stack Portal",
    description:
      "Latest software engineering and product articles with SEO-first editorial architecture."
  }
};

export const revalidate = 300;

export default async function HomePage() {
  const repository = getContentRepository();
  const articles = await repository.getArticles();

  return (
    <PageContainer>
      <TrackOnMount eventName="view_home" params={{ article_count: articles.length }} />
      <header>
        <h1>Engineering Stack Portal</h1>
        <p>SEO-first editorial platform for software engineering and digital product content.</p>
      </header>

      <section aria-labelledby="latest-articles-heading">
        <h2 id="latest-articles-heading">Latest Articles</h2>
        <ul>
          {articles.map((article) => (
            <li key={article.id}>
              <article>
                <h3>
                  <Link href={`/article/${article.slug}`}>{article.title}</Link>
                </h3>
                <p>{article.excerpt}</p>
                <p>
                  <time dateTime={article.publishedAt}>
                    {new Date(article.publishedAt).toLocaleDateString("en-US")}
                  </time>{" "}
                  - <Link href={`/category/${article.category.slug}`}>{article.category.name}</Link>
                </p>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </PageContainer>
  );
}
