# Engineering Stack Portal

SEO-first editorial portal blueprint for software engineering and digital product content.

## PT-BR | EN

| Português | English |
|-----------|---------|
| Este repositório documenta a fase inicial de concepção de um portal editorial SEO-first. O foco é definir escopo, intenção e estrutura técnica antes de qualquer implementação real. | This repository documents the initial conception phase of an SEO-first editorial portal. The focus is to define scope, intent, and technical structure before any real implementation. |

---

## Project Snapshot

| Categoria | PT-BR | EN |
|-----------|-------|----|
| Objetivo / Goal | Definir a arquitetura inicial para um portal de conteúdo técnico. | Define the initial architecture for a technical content portal. |
| Fase / Stage | Planejamento técnico inicial (sem lógica de negócio implementada). | Initial technical planning (no business logic implemented yet). |
| Direção / Direction | Estrutura clara para reduzir ambiguidades nas próximas fases. | Clear structure to reduce ambiguity in upcoming phases. |

---

## Functional Scope (v1.0)

| PT-BR | EN |
|------|----|
| Home com listagem de artigos | Home page with article listing |
| Página de artigo (SEO completo) | Article page (full SEO) |
| Página de categoria | Category page |
| Sistema de preview de conteúdo | Content preview system |
| Integração com CMS headless | Headless CMS integration |
| Instrumentação básica de analytics | Basic analytics instrumentation |
| Testes de páginas críticas | Critical page tests |

**Out of scope (PT-BR):** funcionalidades fora da lista acima.  
**Out of scope (EN):** any feature outside the list above.

---

## Phase 1 Progress

| Etapa | PT-BR | EN | Status |
|------|-------|----|--------|
| 1.1 | Repositório Git criado no GitHub sem README automático. | GitHub repository created without auto-generated README. | Done |
| 1.2 | Projeto inicializado com Next.js + TypeScript usando `app/` router. | Project initialized with Next.js + TypeScript using the `app/` router. | Done |
| 1.3 | Configurações técnicas iniciais aplicadas: ESLint, Prettier, `tsconfig` strict e limpeza de boilerplate. | Initial technical setup applied: ESLint, Prettier, strict `tsconfig`, and boilerplate cleanup. | Done |

## Phase 2 Progress

| Etapa | PT-BR | EN | Status |
|------|-------|----|--------|
| 2.1 | Estrutura de pastas definida para separar rotas, componentes, integrações, serviços, tipos e testes. | Folder structure defined to separate routes, components, integrations, services, types, and tests. | Done |
| 2.2 | Modelo de domínio inicial definido com tipos `Article`, `Category` e `Author`. | Initial domain model defined with `Article`, `Category`, and `Author` types. | Done |

## Phase 3 Progress

| Etapa | PT-BR | EN | Status |
|------|-------|----|--------|
| 3.1 | CMS escolhido: WordPress Headless. | Selected CMS: WordPress Headless. | Done |
| 3.2 | Conteúdo modelado na integração como `Article`, `Category` e `Author` mapeados de entidades WordPress (`posts`, `categories`, `author`). | Content modeled in the integration as `Article`, `Category`, and `Author` mapped from WordPress entities (`posts`, `categories`, `author`). | Done |
| 3.3 | Camada de acesso ao CMS criada com fetch centralizado, tipagem de payload e tratamento de erro. | CMS access layer created with centralized fetch, typed payloads, and error handling. | Done |

## Phase 4 Progress

| Etapa | PT-BR | EN | Status |
|------|-------|----|--------|
| 4.1 | Home com metadata básica, links semânticos e renderização com revalidação periódica (ISR). | Home with basic metadata, semantic links, and periodic revalidation rendering (ISR). | Done |
| 4.2 | Página de artigo com metadata dinâmica, Open Graph/Twitter cards e estrutura semântica com slug amigável. | Article page with dynamic metadata, Open Graph/Twitter cards, and semantic structure with friendly slug. | Done |
| 4.3 | `sitemap.xml` e `robots.txt` gerados automaticamente a partir das rotas públicas e conteúdo disponível. | `sitemap.xml` and `robots.txt` automatically generated from public routes and available content. | Done |
| 4.4 | Campos SEO customizados no WordPress registrados e publicados via REST (`seo_title`, `seo_description`, `canonical_url`, `og_image`) com mapeamento no Next.js. | Custom SEO fields in WordPress registered and exposed via REST (`seo_title`, `seo_description`, `canonical_url`, `og_image`) with mapping in Next.js. | Done |

## Phase 5 Progress

| Etapa | PT-BR | EN | Status |
|------|-------|----|--------|
| 5.1 | Testes de renderização implementados para Home, Artigo e Categoria. | Rendering behavior tests implemented for Home, Article, and Category pages. | Done |
| 5.2 | Testes de erro implementados para slugs inexistentes (`notFound`). | Error behavior tests implemented for non-existing slugs (`notFound`). | Done |
| 5.3 | Teste de componente crítico implementado (`PageContainer`). | Critical component test implemented (`PageContainer`). | Done |
| 5.4 | Testes do mapper WordPress implementados para validar prioridade de `meta.seo_*` e fallback seguro. | WordPress mapper tests implemented to validate `meta.seo_*` priority and safe fallback behavior. | Done |
| 5.5 | Testes de comportamento por ambiente implementados para `CMS_FALLBACK_MODE` (dev vs produção). | Environment behavior tests implemented for `CMS_FALLBACK_MODE` (dev vs production). | Done |
| 5.6 | Testes de `sitemap` e `robots` implementados para validar rotas SEO técnicas. | `sitemap` and `robots` tests implemented to validate technical SEO routes. | Done |
| 5.7 | Testes de integração HTTP implementados com MSW para validar pipeline CMS real sem dependência externa. | HTTP integration tests implemented with MSW to validate the real CMS pipeline without external dependency. | Done |

### WordPress Validation Snapshot (Local Instance)

Validation base URL used in `.env.local`: `http://localhost:8080`

| # | Article | Author | Slug |
|---|---------|--------|------|
| 1 | Domain-driven Content Modeling in Next.js | Bruno Lima | `domain-driven-content-modeling-in-nextjs` |
| 2 | Baseline Analytics Events for Editorial Products | Ana Costa | `baseline-analytics-events-for-editorial-products` |
| 3 | Content Preview Workflows with Headless CMS | Carla Nogueira | `content-preview-workflows-with-headless-cms` |
| 4 | How to Structure Slugs and Taxonomy | Bruno Lima | `how-to-structure-slugs-and-taxonomy` |
| 5 | Designing an SEO-first Content Platform | Ana Costa | `designing-an-seo-first-content-platform` |

SEO meta runtime check (`meta.seo_title`, `meta.seo_description`, `meta.canonical_url`, `meta.og_image`): **5/5 posts OK**.

### Local WordPress Runtime

| PT-BR | EN |
|-------|----|
| `docker-compose.wordpress.yml` sobe WordPress + MySQL localmente para desenvolvimento e validação da integração. | `docker-compose.wordpress.yml` starts local WordPress + MySQL for development and integration validation. |
| `scripts/seed-wordpress.sh` instala o CMS (se necessário), cria 3 autores/3 categorias/5 artigos e popula campos SEO customizados. | `scripts/seed-wordpress.sh` installs the CMS (if needed), creates 3 authors/3 categories/5 posts, and populates custom SEO fields. |
| A API é consumida via `/?rest_route=/wp/v2/...` para funcionar mesmo sem dependência de rewrite/permalink específico. | The API is consumed via `/?rest_route=/wp/v2/...` to work even without permalink/rewrite-specific setup. |

### How to Run Local WordPress

```bash
# 1) Start WordPress + MySQL
docker compose -f docker-compose.wordpress.yml up -d

# 2) Seed authors, categories, and posts
docker compose -f docker-compose.wordpress.yml run --rm --entrypoint sh -v "${PWD}/scripts:/work" wpcli -c "sh /work/seed-wordpress.sh"

# 3) Stop local CMS stack
docker compose -f docker-compose.wordpress.yml down
```

Admin access (local only): `http://localhost:8080/wp-admin`  
User: `admin` | Password: `admin123!`

Optional environment switch: `CMS_FALLBACK_MODE=enabled|disabled`  
Default behavior: fallback enabled in development, disabled in production.

### Decision Log (ADR-lite)

| ID | Decision (PT-BR) | Why / Rationale (PT-BR) | Risk / Trade-off (PT-BR) | Status |
|----|------------------|-------------------------|---------------------------|--------|
| D-001 | Usar Webpack nos scripts de `dev` e `build` (`--webpack`). | Evita falha do Turbopack em caminhos Windows com acentuação e mantém o ambiente estável para desenvolvimento. | Build um pouco mais lento que Turbopack em alguns cenários; reavaliar quando o bug for corrigido. | Applied |
| D-002 | Configurar `outputFileTracingRoot` no `next.config.ts`. | Remove aviso de múltiplos lockfiles e melhora previsibilidade do build no ambiente local. | Pode exigir revisão se a estrutura de monorepo mudar no futuro. | Applied |
| D-003 | Manter scaffold inicial minimalista com placeholders funcionais. | Prioriza validação da base técnica (rotas, build e lint) antes de investir em UI e integração real. | A interface inicial parece simples demais para demonstração visual imediata. | Applied |
| D-004 | Introduzir a pasta `services/` com contrato `ContentRepository` desacoplado da fonte de dados. | Permite evoluir de mock para CMS real sem acoplar páginas ao mecanismo de fetch. | Pode adicionar abstração cedo demais; precisa manter simplicidade nas próximas fases. | Applied |
| D-005 | Definir tipos de domínio explícitos (`Article`, `Category`, `Author`) em `types/`. | Reforça design orientado a domínio e cria linguagem ubíqua antes da integração com CMS. | Tipos podem mudar quando o schema real do CMS entrar; exige versionamento cuidadoso. | Applied |
| D-006 | Escolher WordPress Headless como CMS da Fase 3. | Simula cenário real de mercado com legado e permite consumir conteúdo real via REST API padronizada. | APIs e plugins podem variar entre instalações; mapeamentos precisam ser defensivos. | Applied |
| D-007 | Centralizar chamadas CMS em `lib/cms` e manter componentes sem `fetch` direto. | Preserva separação de responsabilidades, facilita teste e troca futura de fonte de dados. | Mais arquivos e camadas para manter; requer disciplina para evitar bypass da arquitetura. | Applied |
| D-008 | Provisionar instância WordPress local própria via Docker para validar a integração com conteúdo controlado. | Garante reprodutibilidade da validação, controle do conteúdo e independência de fontes públicas externas. | Exige Docker/WSL no ambiente local e manutenção de stack auxiliar (MySQL + WordPress). | Applied |
| D-009 | Consumir WordPress REST API via `rest_route` em vez de depender exclusivamente de `/wp-json`. | Reduz acoplamento com configuração de permalink/rewrite e melhora portabilidade entre instalações WordPress. | URLs de query string ficam menos amigáveis e podem exigir documentação explícita para manutenção futura. | Applied |
| D-010 | Usar estratégia de ISR (`revalidate`) para Home e páginas públicas de conteúdo. | Equilibra performance e atualização de conteúdo do CMS sem custo de renderização em toda requisição. | Conteúdo pode ficar desatualizado dentro da janela de revalidação. | Applied |
| D-011 | Centralizar metadados de SEO no App Router (layout + metadata dinâmica por artigo). | Garante consistência de SEO técnico e melhora compartilhamento social com Open Graph/Twitter. | Exige manutenção contínua de campos SEO para evitar metadata genérica. | Applied |
| D-012 | Gerar `sitemap.xml` e `robots.txt` a partir das rotas e dados reais. | Melhora rastreabilidade por buscadores e demonstra maturidade de produto público. | Requer revisão quando novas rotas públicas forem adicionadas. | Applied |
| D-013 | Aplicar fallback automático para repositório in-memory quando o CMS estiver indisponível em build/runtime. | Evita quebra do build e mantém rotas públicas operacionais durante indisponibilidade local do WordPress. | Pode mascarar indisponibilidade do CMS se monitoramento não estiver explícito. | Applied |
| D-014 | Registrar campos SEO customizados no WordPress via MU-plugin e expor na REST API. | Garante fonte editorial explícita para SEO (`seo_title`, `seo_description`, `canonical_url`, `og_image`) sem depender apenas de fallback. | Exige manutenção do plugin e governança de preenchimento no fluxo editorial. | Applied |
| D-015 | Endurecer pipeline de conteúdo: fallback só em desenvolvimento por padrão e comportamento estrito em produção. | Evita mascarar indisponibilidade de CMS em produção, mantendo DX local com fallback controlado (`CMS_FALLBACK_MODE`). | Configuração incorreta de ambiente pode causar falha de build/runtime até ajuste da variável. | Applied |
| D-016 | Priorizar testes de comportamento (renderização e erro) em vez de foco inicial em cobertura percentual. | Demonstra confiabilidade funcional real do produto público e reduz testes frágeis acoplados à implementação interna. | Cobertura numérica pode permanecer moderada até expandir suíte para camadas adicionais. | Applied |
| D-017 | Adotar `vitest` com testes server-side (`renderToStaticMarkup`) para páginas críticas no App Router. | Mantém execução rápida e simples, validando saída renderizada sem acoplar a suíte a infraestrutura E2E neste estágio. | Não substitui testes end-to-end de navegação real no browser. | Applied |
| D-018 | Adicionar testes de integração HTTP com MSW para o pipeline CMS WordPress. | Valida contrato de integração (fetch + mapping) com respostas controladas e reproduzíveis em CI/local. | Exige manutenção dos fixtures quando o contrato da API evoluir. | Applied |
| D-019 | Isolar testes de página de dependências externas com mocks explícitos do repositório de conteúdo. | Evita flakiness por estado de Docker/CMS e mantém feedback rápido e determinístico. | Pode ocultar regressões de integração se não houver suíte complementar (coberta por testes MSW). | Applied |

**Template (for next decisions):**  
`Decision:` ... | `Why:` ... | `Risk:` ... | `Status:` ...

**EN note:** Every relevant technical decision must include Decision + Why + Risk (ADR-lite).

---

## Repository Structure

> Estrutura inicial com base técnica funcional e arquitetura em evolução.  
> Initial scaffold with a functional technical baseline and evolving architecture.

### Pages (App)

| Área | Path | PT-BR | EN |
|------|------|-------|----|
| Home | `app/page.tsx` | Listagem de artigos | Article listing |
| Article | `app/article/[slug]/page.tsx` | Página de artigo (SEO completo) | Article page (full SEO) |
| Article SEO | `app/article/[slug]/metadata.ts` | Metadata e SEO do artigo | Article metadata and SEO |
| Category | `app/category/[slug]/page.tsx` | Página de categoria | Category page |
| Layout | `app/layout.tsx` | Layout raiz | Root layout |
| Sitemap | `app/sitemap.ts` | Geração dinâmica de sitemap | Dynamic sitemap generation |
| Robots | `app/robots.ts` | Regras de indexação e referência de sitemap | Indexing rules and sitemap reference |

### Reusable Components

| File | PT-BR | EN |
|------|-------|----|
| `components/index.ts` | Barrel de exportação de componentes | Components export barrel |
| `components/ui/page-container.tsx` | Componente base de container de página | Base page container component |

### Preview System

| File | PT-BR | EN |
|------|-------|----|
| `lib/preview/index.ts` | Entrada do módulo de preview | Preview module entry point |
| `lib/preview/preview-route.ts` | Lógica da rota de preview | Preview route logic |
| `app/api/preview/route.ts` | API route de preview | Preview API route |

### Headless CMS Integration

| File | PT-BR | EN |
|------|-------|----|
| `lib/cms/index.ts` | Entrada do módulo CMS | CMS module entry point |
| `lib/cms/client.ts` | Cliente HTTP centralizado para CMS | Centralized CMS HTTP client |
| `lib/cms/queries.ts` | Queries/fetch para endpoints WordPress | Queries/fetch for WordPress endpoints |
| `lib/cms/mappers.ts` | Mapeamento de payload WordPress para tipos de domínio | Mapping WordPress payloads to domain types |
| `lib/cms/types.ts` | Tipos de resposta da API WordPress | WordPress API response types |
| `lib/cms/errors.ts` | Erros padronizados da camada CMS | Standardized CMS-layer errors |
| `wordpress/mu-plugins/esp-seo-fields.php` | Registro de campos SEO customizados do WordPress no REST | Registers custom WordPress SEO fields in REST API |

### SEO and Site Config

| File | PT-BR | EN |
|------|-------|----|
| `lib/site-config.ts` | URL base do site para canonical, sitemap e robots | Site base URL for canonical, sitemap, and robots |

### Data Services

| File | PT-BR | EN |
|------|-------|----|
| `services/content-repository.ts` | Contrato de repositório de conteúdo | Content repository contract |
| `services/get-content-repository.ts` | Seleção da implementação de repositório por ambiente | Environment-based repository selection |
| `services/fallback-content-repository.ts` | Fallback controlado para in-memory quando permitido por ambiente | Controlled in-memory fallback when allowed by environment |
| `services/in-memory-content-repository.ts` | Implementação in-memory para desenvolvimento inicial | In-memory implementation for early development |
| `services/wordpress-content-repository.ts` | Implementação do repositório usando WordPress Headless | Repository implementation using WordPress Headless |
| `services/index.ts` | Barrel de exportação de serviços | Services export barrel |

### Shared Domain Types

| File | PT-BR | EN |
|------|-------|----|
| `types/article.ts` | Tipos de domínio para artigo e SEO | Domain types for article and SEO |
| `types/category.ts` | Tipo de domínio para categoria | Domain type for category |
| `types/author.ts` | Tipo de domínio para autor | Domain type for author |
| `types/index.ts` | Barrel de exportação de tipos | Types export barrel |

### Analytics

| File | PT-BR | EN |
|------|-------|----|
| `lib/analytics/index.ts` | Entrada do módulo analytics | Analytics module entry point |
| `lib/analytics/events.ts` | Eventos e tracking | Events and tracking |
| `lib/analytics/provider.tsx` | Provider de analytics | Analytics provider |

### Critical Page Tests

| File | PT-BR | EN |
|------|-------|----|
| `tests/critical/home.test.ts` | Testes da Home | Home page tests |
| `tests/critical/article.test.ts` | Testes da página de artigo | Article page tests |
| `tests/critical/category.test.ts` | Testes da página de categoria | Category page tests |
| `tests/components/page-container.test.tsx` | Teste de componente crítico reutilizável | Reusable critical component test |
| `tests/cms/mappers.test.ts` | Testes unitários do mapeamento WordPress para domínio | Unit tests for WordPress-to-domain mapping |
| `tests/services/get-content-repository.test.ts` | Testes de seleção de repositório por ambiente/fallback | Environment/fallback repository selection tests |
| `tests/seo/sitemap-robots.test.ts` | Testes de geração de sitemap e política de robots | Sitemap generation and robots policy tests |
| `tests/integration/wordpress-http.integration.test.ts` | Testes de integração HTTP do pipeline CMS com MSW | CMS pipeline HTTP integration tests with MSW |
| `tests/setup.ts` | Setup de mocks para módulos Next.js nos testes | Test setup with Next.js module mocks |
| `vitest.config.ts` | Configuração do runner de testes | Test runner configuration |

### CMS Local Infrastructure

| File | PT-BR | EN |
|------|-------|----|
| `docker-compose.wordpress.yml` | Orquestração local de WordPress + MySQL | Local orchestration for WordPress + MySQL |
| `scripts/seed-wordpress.sh` | Script idempotente para popular dados iniciais no CMS | Idempotent script to seed initial CMS data |

---

## Current Status

| PT-BR | EN |
|-------|----|
| Base técnica e integração com WordPress Headless concluídas: fetch centralizado, tipagem de payload, mapeamento para domínio e fallback controlado por ambiente (`CMS_FALLBACK_MODE`). | Technical foundation and WordPress Headless integration are completed: centralized fetch, typed payloads, domain mapping, and environment-controlled fallback (`CMS_FALLBACK_MODE`). |
| Validação realizada contra instância WordPress local própria (`http://localhost:8080`) com leitura de artigos, autores e categorias reais. | Validation completed against a project-owned local WordPress instance (`http://localhost:8080`) with real posts, authors, and categories. |
| Páginas públicas agora possuem fundamentos de SEO técnico: metadata, Open Graph, links semânticos, `sitemap.xml` e `robots.txt`. | Public pages now include technical SEO foundations: metadata, Open Graph, semantic links, `sitemap.xml`, and `robots.txt`. |
| Campos SEO customizados do WordPress já estão implementados no pipeline e priorizados no mapeamento da camada de conteúdo. | Custom WordPress SEO fields are implemented in the pipeline and prioritized in the content-layer mapping. |
| Fase 5 de testes implementada com foco em comportamento e integração: renderização, erros de rota, ambiente/fallback, SEO routes e pipeline HTTP do CMS. | Phase 5 tests are implemented with behavior and integration focus: rendering, route errors, environment/fallback, SEO routes, and CMS HTTP pipeline. |
| Integrações avançadas (autenticação CMS, workflows editoriais e analytics completo) ainda não foram implementadas. | Advanced integrations (CMS authentication, editorial workflows, and full analytics) are not implemented yet. |

---

## Next Steps

| PT-BR | EN |
|-------|----|
| Refinar UI pública da Home e páginas internas com design system inicial | Refine the public UI of Home and inner pages with an initial design system |
| Evolução do sistema de preview com validação e segurança | Evolve the preview system with validation and security |
| Evoluir schema do WordPress local para novos campos editoriais além de SEO (ex.: reading time, featured flag, compliance notes) | Evolve the local WordPress schema with new editorial fields beyond SEO (e.g., reading time, featured flag, compliance notes) |
| Definição e implementação de eventos de analytics | Define and implement analytics events |
| Adicionar testes end-to-end para navegação e fluxos editoriais críticos em browser real | Add end-to-end tests for navigation and critical editorial flows in a real browser |