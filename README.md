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

### Decision Log (ADR-lite)

| ID | Decision (PT-BR) | Why / Rationale (PT-BR) | Risk / Trade-off (PT-BR) | Status |
|----|------------------|-------------------------|---------------------------|--------|
| D-001 | Usar Webpack nos scripts de `dev` e `build` (`--webpack`). | Evita falha do Turbopack em caminhos Windows com acentuação e mantém o ambiente estável para desenvolvimento. | Build um pouco mais lento que Turbopack em alguns cenários; reavaliar quando o bug for corrigido. | Applied |
| D-002 | Configurar `outputFileTracingRoot` no `next.config.ts`. | Remove aviso de múltiplos lockfiles e melhora previsibilidade do build no ambiente local. | Pode exigir revisão se a estrutura de monorepo mudar no futuro. | Applied |
| D-003 | Manter scaffold inicial minimalista com placeholders funcionais. | Prioriza validação da base técnica (rotas, build e lint) antes de investir em UI e integração real. | A interface inicial parece simples demais para demonstração visual imediata. | Applied |

**Template (for next decisions):**  
`Decision:` ... | `Why:` ... | `Risk:` ... | `Status:` ...

**EN note:** Every relevant technical decision must include Decision + Why + Risk (ADR-lite).

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
| Base técnica inicial concluída: projeto Next.js em funcionamento, rotas principais ativas e endpoint de preview com resposta placeholder. | Initial technical foundation completed: running Next.js project, main routes active, and preview endpoint returning placeholders. |
| Integrações reais com CMS/analytics e UI final ainda não foram implementadas. | Real CMS/analytics integrations and final UI are not implemented yet. |

---

## Next Steps

| PT-BR | EN |
|-------|----|
| Implementação da interface pública da Home e páginas internas | Implement the public UI for Home and inner pages |
| Evolução do sistema de preview com validação e segurança | Evolve the preview system with validation and security |
| Implementação da camada de integração real com CMS headless | Implement the real headless CMS integration layer |
| Definição e implementação de eventos de analytics | Define and implement analytics events |
| Escrita e execução de testes automatizados críticos | Write and run critical automated tests |