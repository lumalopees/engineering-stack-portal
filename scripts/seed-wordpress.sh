#!/usr/bin/env sh
set -eu

SITE_URL="${SITE_URL:-http://localhost:8080}"

wp core is-installed >/dev/null 2>&1 || wp core install \
  --url="$SITE_URL" \
  --title="Engineering Stack CMS" \
  --admin_user="admin" \
  --admin_password="admin123!" \
  --admin_email="admin@engineering-stack.local" \
  --skip-email

create_user_if_missing() {
  username="$1"
  email="$2"
  display_name="$3"

  if ! wp user get "$username" >/dev/null 2>&1; then
    wp user create "$username" "$email" \
      --role=author \
      --display_name="$display_name" \
      --user_pass="author123!"
  fi
}

create_user_if_missing "ana" "ana@engineering-stack.local" "Ana Costa"
create_user_if_missing "bruno" "bruno@engineering-stack.local" "Bruno Lima"
create_user_if_missing "carla" "carla@engineering-stack.local" "Carla Nogueira"

ANA_ID="$(wp user get ana --field=ID)"
BRUNO_ID="$(wp user get bruno --field=ID)"
CARLA_ID="$(wp user get carla --field=ID)"

get_or_create_category() {
  slug="$1"
  name="$2"
  description="$3"

  id="$(wp term list category --slug="$slug" --field=term_id --format=ids)"
  if [ -z "$id" ]; then
    wp term create category "$name" --slug="$slug" --description="$description" >/dev/null
    id="$(wp term list category --slug="$slug" --field=term_id --format=ids)"
  fi
  echo "$id"
}

ARCH_ID="$(get_or_create_category "software-architecture" "Software Architecture" "Architecture decisions and trade-offs.")"
SEO_ID="$(get_or_create_category "technical-seo" "Technical SEO" "SEO implementation for content platforms.")"
PROD_ID="$(get_or_create_category "product-engineering" "Product Engineering" "Engineering decisions for digital product teams.")"

create_post_if_missing() {
  slug="$1"
  title="$2"
  author_id="$3"
  category_id="$4"
  content="$5"
  excerpt="$6"

  existing_id="$(wp post list --name="$slug" --post_type=post --field=ID --format=ids)"
  if [ -z "$existing_id" ]; then
    wp post create \
      --post_type=post \
      --post_status=publish \
      --post_name="$slug" \
      --post_title="$title" \
      --post_author="$author_id" \
      --post_category="$category_id" \
      --post_content="$content" \
      --post_excerpt="$excerpt" >/dev/null
  fi
}

create_post_if_missing \
  "designing-an-seo-first-content-platform" \
  "Designing an SEO-first Content Platform" \
  "$ANA_ID" \
  "$ARCH_ID" \
  "An overview of architectural decisions for a content platform focused on search discoverability." \
  "Architecture foundations for SEO-first platforms."

create_post_if_missing \
  "how-to-structure-slugs-and-taxonomy" \
  "How to Structure Slugs and Taxonomy" \
  "$BRUNO_ID" \
  "$SEO_ID" \
  "Practical guidelines to keep URL slugs stable and taxonomy meaningful over time." \
  "Slug and taxonomy strategy for maintainable SEO."

create_post_if_missing \
  "content-preview-workflows-with-headless-cms" \
  "Content Preview Workflows with Headless CMS" \
  "$CARLA_ID" \
  "$PROD_ID" \
  "Trade-offs and implementation notes for editorial preview flows in a headless setup." \
  "Preview workflows for modern editorial teams."

create_post_if_missing \
  "baseline-analytics-events-for-editorial-products" \
  "Baseline Analytics Events for Editorial Products" \
  "$ANA_ID" \
  "$PROD_ID" \
  "A baseline event model to measure engagement and reading depth in content products." \
  "Analytics event baseline for editorial products."

create_post_if_missing \
  "domain-driven-content-modeling-in-nextjs" \
  "Domain-driven Content Modeling in Next.js" \
  "$BRUNO_ID" \
  "$ARCH_ID" \
  "How explicit domain types reduce coupling and improve maintainability in Next.js projects." \
  "Applying domain-driven modeling to content platforms."

echo "WordPress seeded successfully with 5 posts, 3 categories, and 3 authors."
