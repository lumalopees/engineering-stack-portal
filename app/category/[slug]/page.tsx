import Link from "next/link";
import { notFound } from "next/navigation";
import { PageContainer } from "../../../components";
import { TrackOnMount } from "../../../lib/analytics/track-on-mount";
import { getContentRepository } from "../../../services";

export const revalidate = 300;

export default async function CategoryPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const repository = getContentRepository();
  const category = await repository.getCategoryBySlug(slug);
  const allArticles = await repository.getArticles();

  if (!category) {
    notFound();
  }

  const categoryArticles = allArticles.filter((article) => article.category.slug === category.slug);

  return (
    <PageContainer>
      <TrackOnMount
        eventName="view_category"
        params={{
          category_slug: category.slug,
          article_count: categoryArticles.length
        }}
      />
      <section>
        <header>
          <h1>{category.name}</h1>
          <p>{category.description}</p>
        </header>

        <h2>Articles in this category</h2>
        <ul>
          {categoryArticles.map((article) => (
            <li key={article.id}>
              <Link href={`/article/${article.slug}`}>{article.title}</Link>
            </li>
          ))}
        </ul>
      </section>
    </PageContainer>
  );
}
