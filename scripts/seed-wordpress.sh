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

set_seo_fields_for_post() {
  slug="$1"
  seo_title="$2"
  seo_description="$3"
  canonical_url="$4"
  og_image="$5"

  post_id="$(wp post list --name="$slug" --post_type=post --field=ID --format=ids)"

  if [ -z "$post_id" ]; then
    echo "Warning: post with slug '$slug' not found for SEO field update."
    return
  fi

  wp post meta update "$post_id" seo_title "$seo_title" >/dev/null
  wp post meta update "$post_id" seo_description "$seo_description" >/dev/null
  wp post meta update "$post_id" canonical_url "$canonical_url" >/dev/null
  wp post meta update "$post_id" og_image "$og_image" >/dev/null
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

set_seo_fields_for_post \
  "designing-an-seo-first-content-platform" \
  "Designing an SEO-first Content Platform | Engineering Stack Portal" \
  "Architecture foundations and key trade-offs to build an SEO-first editorial platform." \
  "${SITE_URL}/article/designing-an-seo-first-content-platform" \
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80"

set_seo_fields_for_post \
  "how-to-structure-slugs-and-taxonomy" \
  "How to Structure Slugs and Taxonomy | Engineering Stack Portal" \
  "Practical guidelines for stable slugs and maintainable taxonomy in content-heavy applications." \
  "${SITE_URL}/article/how-to-structure-slugs-and-taxonomy" \
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"

set_seo_fields_for_post \
  "content-preview-workflows-with-headless-cms" \
  "Content Preview Workflows with Headless CMS | Engineering Stack Portal" \
  "Preview workflow strategies for editorial teams using a headless CMS architecture." \
  "${SITE_URL}/article/content-preview-workflows-with-headless-cms" \
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80"

set_seo_fields_for_post \
  "baseline-analytics-events-for-editorial-products" \
  "Baseline Analytics Events for Editorial Products | Engineering Stack Portal" \
  "A baseline analytics event model to measure engagement in editorial products." \
  "${SITE_URL}/article/baseline-analytics-events-for-editorial-products" \
  "https://images.unsplash.com/photo-1551281044-8b1d7f2df8ad?auto=format&fit=crop&w=1200&q=80"

set_seo_fields_for_post \
  "domain-driven-content-modeling-in-nextjs" \
  "Domain-driven Content Modeling in Next.js | Engineering Stack Portal" \
  "How domain types reduce coupling and improve maintainability in Next.js content platforms." \
  "${SITE_URL}/article/domain-driven-content-modeling-in-nextjs" \
  "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80"

echo "WordPress seeded successfully with 5 posts, 3 categories, 3 authors, and SEO custom fields."
