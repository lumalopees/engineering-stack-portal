import Link from "next/link";
import { notFound } from "next/navigation";
import { PageContainer } from "../../../components";
import { TrackOnMount } from "../../../lib/analytics/track-on-mount";
import { getContentRepository } from "../../../services";
import { generateArticleMetadata } from "./metadata";

export { generateArticleMetadata as generateMetadata };
export const revalidate = 300;

export default async function ArticlePage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const repository = getContentRepository();
  const article = await repository.getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <PageContainer>
      <TrackOnMount
        eventName="view_article"
        params={{
          article_slug: article.slug,
          category_slug: article.category.slug
        }}
      />
      <article>
        <header>
          <h1>{article.title}</h1>
          <p>{article.excerpt}</p>
          <p>
            <time dateTime={article.publishedAt}>
              {new Date(article.publishedAt).toLocaleDateString("en-US")}
            </time>{" "}
            - by {article.author.name} in{" "}
            <Link href={`/category/${article.category.slug}`}>{article.category.name}</Link>
          </p>
        </header>

        <section>
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </section>
      </article>
    </PageContainer>
  );
}
