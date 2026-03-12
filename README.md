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

## Repository Structure

> Estrutura inicial sem implementação funcional.  
> Initial scaffold without functional implementation.

### Pages (App)

| Área | Path | PT-BR | EN |
|------|------|-------|----|
| Home | `app/page.tsx` | Listagem de artigos | Article listing |
| Article | `app/article/[slug]/page.tsx` | Página de artigo (SEO completo) | Article page (full SEO) |
| Article SEO | `app/article/[slug]/metadata.ts` | Metadata e SEO do artigo | Article metadata and SEO |
| Category | `app/category/[slug]/page.tsx` | Página de categoria | Category page |
| Layout | `app/layout.tsx` | Layout raiz | Root layout |

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
| `lib/cms/client.ts` | Cliente do CMS | CMS client |
| `lib/cms/queries.ts` | Queries / fetch de conteúdo | Content queries/fetching |

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

---

## Current Status

| PT-BR | EN |
|-------|----|
| Nenhuma integração, lógica de dados ou funcionalidade foi implementada até o momento. | No integrations, data logic, or functional features have been implemented yet. |
| Esta estrutura representa exclusivamente o planejamento técnico inicial. | This structure represents only the initial technical planning stage. |

---

## Next Steps

| PT-BR | EN |
|-------|----|
| Definição da stack técnica final | Define the final technical stack |
| Implementação das páginas públicas | Implement public pages |
| Integração com CMS headless | Integrate with a headless CMS |
| Estratégia de SEO e analytics | Define SEO and analytics strategy |
| Escrita de testes automatizados | Write automated tests |