import { PageContainer } from "../components";
import { InMemoryContentRepository } from "../services";

export default async function HomePage() {
  const repository = new InMemoryContentRepository();
  const articles = await repository.getArticles();

  return (
    <PageContainer>
      <h1>Engineering Stack Portal</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            {article.title} - {article.category.name}
          </li>
        ))}
      </ul>
    </PageContainer>
  );
}
