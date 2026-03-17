import { notFound } from "next/navigation";
import { PageContainer } from "../../../components";
import { getContentRepository } from "../../../services";

export default async function CategoryPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const repository = getContentRepository();
  const category = await repository.getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  return (
    <PageContainer>
      <h1>{category.name}</h1>
      <p>{category.description}</p>
    </PageContainer>
  );
}
