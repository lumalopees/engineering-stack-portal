import { notFound } from "next/navigation";
import { PageContainer } from "../../../components";
import { getContentRepository } from "../../../services";

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
      <h1>{article.title}</h1>
      <p>{article.excerpt}</p>
    </PageContainer>
  );
}
