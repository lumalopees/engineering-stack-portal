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

### WordPress Validation Snapshot (Local Instance)

Validation base URL used in `.env.local`: `http://localhost:8080`

| # | Article | Author | Slug |
|---|---------|--------|------|
| 1 | Domain-driven Content Modeling in Next.js | Bruno Lima | `domain-driven-content-modeling-in-nextjs` |
| 2 | Baseline Analytics Events for Editorial Products | Ana Costa | `baseline-analytics-events-for-editorial-products` |
| 3 | Content Preview Workflows with Headless CMS | Carla Nogueira | `content-preview-workflows-with-headless-cms` |
| 4 | How to Structure Slugs and Taxonomy | Bruno Lima | `how-to-structure-slugs-and-taxonomy` |
| 5 | Designing an SEO-first Content Platform | Ana Costa | `designing-an-seo-first-content-platform` |

### Local WordPress Runtime

| PT-BR | EN |
|-------|----|
| `docker-compose.wordpress.yml` sobe WordPress + MySQL localmente para desenvolvimento e validação da integração. | `docker-compose.wordpress.yml` starts local WordPress + MySQL for development and integration validation. |
| `scripts/seed-wordpress.sh` instala o CMS (se necessário) e cria 3 autores, 3 categorias e 5 artigos. | `scripts/seed-wordpress.sh` installs the CMS (if needed) and creates 3 authors, 3 categories, and 5 posts. |
| A API é consumida via `/?rest_route=/wp/v2/...` para funcionar mesmo sem dependência de rewrite/permalink específico. | The API is consumed via `/?rest_route=/wp/v2/...` to work even without permalink/rewrite-specific setup. |

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

### Data Services

| File | PT-BR | EN |
|------|-------|----|
| `services/content-repository.ts` | Contrato de repositório de conteúdo | Content repository contract |
| `services/get-content-repository.ts` | Seleção da implementação de repositório por ambiente | Environment-based repository selection |
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

### CMS Local Infrastructure

| File | PT-BR | EN |
|------|-------|----|
| `docker-compose.wordpress.yml` | Orquestração local de WordPress + MySQL | Local orchestration for WordPress + MySQL |
| `scripts/seed-wordpress.sh` | Script idempotente para popular dados iniciais no CMS | Idempotent script to seed initial CMS data |

---

## Current Status

| PT-BR | EN |
|-------|----|
| Base técnica e integração inicial com WordPress Headless concluídas: fetch centralizado, tipagem de payload, mapeamento para domínio e fallback in-memory quando `CMS_BASE_URL` não está configurada. | Technical foundation and initial WordPress Headless integration are completed: centralized fetch, typed payloads, domain mapping, and in-memory fallback when `CMS_BASE_URL` is not configured. |
| Validação realizada contra instância WordPress local própria (`http://localhost:8080`) com leitura de artigos, autores e categorias reais. | Validation completed against a project-owned local WordPress instance (`http://localhost:8080`) with real posts, authors, and categories. |
| Integrações avançadas (schema editorial customizado no CMS, autenticação CMS, workflows editoriais, analytics completo e UI final) ainda não foram implementadas. | Advanced integrations (custom editorial CMS schema, CMS authentication, editorial workflows, full analytics, and final UI) are not implemented yet. |

---

## Next Steps

| PT-BR | EN |
|-------|----|
| Implementação da interface pública da Home e páginas internas (design system inicial) | Implement the public UI for Home and inner pages (initial design system) |
| Evolução do sistema de preview com validação e segurança | Evolve the preview system with validation and security |
| Evoluir schema do WordPress local para refletir campos editoriais completos (incluindo SEO customizado) | Evolve the local WordPress schema to support full editorial fields (including custom SEO fields) |
| Definição e implementação de eventos de analytics | Define and implement analytics events |
| Escrita e execução de testes automatizados críticos | Write and run critical automated tests |