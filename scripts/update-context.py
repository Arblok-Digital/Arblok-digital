#!/usr/bin/env python3
"""Update PROJECT_CONTEXT.md section 9 with audit findings."""
import pathlib

p = pathlib.Path(__file__).parent.parent / "PROJECT_CONTEXT.md"
c = p.read_text(encoding="utf-8")

# Fix sitemap description
c = c.replace(
    "- [x] `public/sitemap.xml` — ✅ (updated hash → real paths)",
    "- [x] `public/sitemap.xml` — ✅ (auto-generated via `scripts/generate-sitemap.mjs`)"
)

# Add new audit section before "### Yang MANUAL:"
marker = "### Yang MANUAL:"
insert = """
### Yang UDAH done (AUDIT 22 JUL 2026 - SEO/IEO Fix):
- [x] Hapus fake Product/AggregateRating JSON-LD (risiko Google manual action) — ✅
- [x] Breadcrumb schema: update hash URLs → path routing URLs — ✅
- [x] Static article pages: `public/articles/[slug].html` — AI crawler readable tanpa JS — ✅
- [x] Sitemap auto-generated dari articles data (`scripts/generate-sitemap.mjs`) — ✅
- [x] Prerender script (`scripts/prerender-articles.mjs`) — generate HTML + JSON-LD baked — ✅
- [x] BlogPosting + FAQPage JSON-LD baked ke static HTML — ✅
- [x] GA4 ID (`G-GHKVV2YQE2`) — ✅
- [x] Google Search Console verification — ✅

### Yang PERLU dilakukan (POST AUDIT):
- [ ] Add individual article routes (`/articles/:slug`) untuk SEO optimal
- [ ] Google My Business listing — klaim + optimasi
- [ ] Testimonial ASLI dari klien → ganti placeholder reviews
- [ ] Prerender homepage (`/`) + `/consultant` untuk AI crawler
- [ ] Run `node scripts/prerender-articles.mjs` sebelum setiap build/deploy

"""
c = c.replace(marker, insert + marker)
p.write_text(c, encoding="utf-8")
print("PROJECT_CONTEXT.md updated")
