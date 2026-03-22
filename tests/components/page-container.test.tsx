import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { PageContainer } from "../../components";

describe("PageContainer", () => {
  it("wraps children inside semantic main landmark", () => {
    const html = renderToStaticMarkup(
      <PageContainer>
        <section>Critical content</section>
      </PageContainer>
    );

    expect(html).toContain("<main>");
    expect(html).toContain("Critical content");
    expect(html).toContain("</main>");
  });
});
