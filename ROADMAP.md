# Arblok Digital — Scaleup Roadmap

> **Purpose**: Dokumen ini untuk AI assistant (atau developer) yang melanjutkan project Arblok Digital. Baca dulu sebelum ngerjain apa-apa. Roadmap ini urut PRIORITAS — kerjain sesuai urutan, jangan skip phase.

**Owner**: Ardi — +62 895-0805-3795 / ardiblokchine@gmail.com
**Live URL**: https://arblok-digital.vercel.app/
**Repository**: GitHub (private/public depends on user setup)
**Base path**: `D:\DATA YAYAH\Arblok-Digital--main\Arblok-Digital--main`

---

## ⚡ PHASE 0: FOUNDATION (Done)

> Yang udah ada dan JANGAN di-refactor tanpa konfirmasi.

| Item | Status | Catatan |
|------|--------|---------|
| Vite 6 + React 19 + TS 5.8 | ✅ | Standard stack, stable |
| Tailwind CSS 4 | ✅ | Modern, tree-shakeable |
| Bilingual ID/EN | ✅ | LanguageContext + hardcoded patterns |
| Hash routing | ✅ | `#articles`, `#ai-consultant` — JANGAN migrate ke React Router (AI Studio iframe limit, tapi kalau LOCAL FULL bisa di-refactor nanti di Phase 5) |
| AI Consultant (3-tier API fallback) | ✅ | Gemini → NVIDIA → OpenRouter |
| Portfolio 7 projects | ✅ | Hardcoded in Portfolio.tsx |
| Articles with dynamic JSON-LD | ✅ | BlogPosting + FAQPage schema |
| Google AI Studio interop | ✅ | Meta tags di-inject oleh AI Studio runtime |
| PROJECT_CONTEXT.md + AGENTS.md | ✅ | Agent onboarding docs |

---

## 🎯 PHASE 1: SEO/IEO FOUNDATION (Urgent — 1-2 Jam)

> Foundation yang HARUS ada sebelum lanjut apa-apa. Priority: P0.

### 1.1 — robots.txt, sitemap.xml, llms.txt
**Lokasi**: `/public/`
**Files to create**:
- `/public/robots.txt` — allow all crawlers (GPTBot, Claude, Perplexity, Google, Bing) + sitemap reference
- `/public/sitemap.xml` — 6+ URLs (/, #about, #services, #portfolio, #articles, #ai-consultant)
- `/public/llms.txt` — perusahaan profile untuk AI crawler (llmstxt.org format)
- `/public/ai.txt` — alternatif untuk AI crawler (optional)
**Dependencies**: None
**Aman untuk dikerjakan?**: ✅ 100% — file baru, gak nge-break apapun

### 1.2 — vercel.json Security Headers
**File**: `/vercel.json`
**What to add**:
- HSTS (Strict-Transport-Security)
- X-Frame-Options: SAMEORIGIN
- X-Content-Type-Options: nosniff
- Permissions-Policy (no camera/mic/geo)
- Cache-Control for assets (immutable, 1 year)
**Dependencies**: None
**Aman untuk dikerjakan?**: ✅ 100% — additive, gak nge-break rewrites

### 1.3 — Hardcode Meta Tags Fallback di index.html
**File**: `/index.html`
**What to add**:
- Title (fallback untuk non-JS crawler)
- Meta description
- Canonical URL
- OG tags (title, description, image, locale)
- Twitter cards
- JSON-LD (LocalBusiness / ProfessionalService) sebagai fallback
**Note**: AI Studio inject meta runtime, tapi untuk safety net dan non-JS crawler, hardcoded fallback penting. Keduanya coexist — React akan timpa runtime kalau ada perubahan.
**Dependencies**: 1.2 (kalau ada, tapi gak mandatory)
**Aman untuk dikerjakan?**: ✅ 100% — additive, gak nge-break dynamic injection

### 1.4 — OG Image Branded
**Lokasi**: `/public/og-image.png`
**Spesifikasi**: 1200×630px, <200KB, dark tema + cyan/indigo gradient + "ARBLOK Digital" + tagline
**How to create**: Canva / Figma / image_generate tool (AI)
**Dependencies**: 1.1 (sitemap refer OG image)
**Aman untuk dikerjakan?**: ✅ 100% — asset baru

### ✅ PHASE 1 DONE CHECKLIST:
- [ ] https://arblok-digital.vercel.app/robots.txt → returns text file (not HTML)
- [ ] https://arblok-digital.vercel.app/sitemap.xml → valid XML
- [ ] https://arblok-digital.vercel.app/llms.txt → company profile
- [ ] https://securityheaders.com → grade A+
- [ ] https://search.google.com/test/rich-results → schema valid, no errors
- [ ] https://www.opengraph.xyz → OG image preview muncul

---

## 🚀 PHASE 2: CONTENT & SCHEMA EXPANSION (Medium — 2-4 Jam)

> SEO + IEO terbesar gain-nya ada di sini. Content is king.

### 2.1 — Testimonials / Review Schema
**Files affected**: `src/components/Portfolio.tsx` (atau bikin section baru)
**What to do**:
- Tambah section testimonials di homepage (bisa di antara Portfolio & Articles)
- Inject JSON-LD `Review` + `AggregateRating` schema
- Format: `{"@type":"Review","author":{"@type":"Person","name":"..."},"reviewRating":{"@type":"Rating","ratingValue":5}}`
**Impact**: Google rich snippet bintang 5, AI engine bisa quote testimonial
**Aman untuk dikerjakan?**: ⚠️ Perlu design + copywriting, tapi aman secara code

### 2.2 — FAQ Schema di Homepage
**File affected**: `src/components/Services.tsx` or baru section
**What to do**:
- Inject static FAQPage schema di halaman utama
- Top 5 pertanyaan yang sering ditanyain calon klien:
  1. Berapa biaya pembuatan website?
  2. Apa itu zero-cost hosting?
  3. Berapa lama proses development?
  4. Bisakah custom fitur?
  5. Apakah ada garansi?
**Impact**: IEO gold — ChatGPT suka jawab pakai FAQ schema
**Aman untuk dikerjakan?**: ✅ 100%

### 2.3 — Breadcrumb Schema
**File affected**: `src/App.tsx` or section headers
**What to do**:
- Inject `BreadcrumbList` schema per section
- Format: Home > Services, Home > Portfolio, etc.
**Impact**: Google SERP lebih rich, internal linking score naik
**Aman untuk dikerjakan?**: ✅ 100%

### 2.4 — Article Expansion
**File affected**: `src/data/articles.ts`
**Target**: From current ~2-3 articles → 6-8 articles
**Theme rekomendasi**:
1. ✅ "Siasat Jitu Arblok Digital" (existing)
2. ✅ "Digitalisasi UMKM Zero-Cost" (existing)
3. ⬜ "Panduan Memilih Software House untuk UMKM" (SEO: keyword volume tinggi)
4. ⬜ "Cara Digitalisasi RT/RW dengan Budget Minim" (SEO: kata kunci spesifik Tasikmalaya)
5. ⬜ "Perbandingan Monorepo vs Microservices untuk Startup" (SEO: tech audience)
6. ⬜ "Kenapa PWA Lebih Cocok untuk UMKM Indonesia dari Native App" (SEO: UMKM-related)
7. ⬜ "Integrasi AI Chatbot di Website UMKM — Step by Step" (SEO + Lead gen)
**Format per article**: Title, excerpt, content (markdown-style), tags, author, 3-5 FAQ items
**Dependencies**: None
**Impact**: SEO long-tail keywords, IEO depth, indexed pages quantity

### ✅ PHASE 2 DONE CHECKLIST:
- [ ] Testimonials + Review schema live
- [ ] FAQPage schema di homepage
- [ ] BreadcrumbList schema
- [ ] 6+ articles total
- [ ] Each article has minimum 3 FAQ items
- [ ] All schema validated at richresults.google.com

---

## 🔧 PHASE 3: TECHNICAL DEBT & REFACTOR (Medium — 3-6 Jam)

> Code quality + maintainability. Jangan kerjain sebelum Phase 1-2 selesai.

### 3.1 — DRY Backend: Extract ai-providers.ts
**Files affected**:
- `/src/lib/ai-providers.ts` (NEW)
- `/server.ts` (EDIT)
- `/api/chat.ts` (EDIT)
**What to do**:
- Extract `callGemini()`, `callNvidiaNim()`, `callOpenRouter()` ke `src/lib/ai-providers.ts`
- Extract system instruction ke `src/lib/system-prompts.ts`
- `server.ts` dan `api/chat.ts` jadi thin wrapper aja (5-10 baris)
**Aman untuk dikerjakan?**: ✅ Asal test after refactor

### 3.2 — Extract Portfolio Data ke JSON
**Files affected**:
- `/src/data/portfolio.ts` (NEW)
- `/src/components/Portfolio.tsx` (EDIT, hapus inline data)
**What to do**:
- Extract ~200 baris portfolio data ke `portfolio.ts`
- Portfolio.tsx import data, render loop
**Benefit**: Lebih maintainable, type-safe, siap integrasi CMS nanti
**Aman untuk dikerjakan?**: ✅

### 3.3 — Error Boundary
**File affected**: `src/components/ErrorBoundary.tsx` (NEW)
**What to do**:
- Bikin React Error Boundary component
- Wrap App di main.tsx
- Fallback UI yang graceful + CTA ke WhatsApp
**Aman untuk dikerjakan?**: ✅ 100% — additive safety net

### 3.4 — LanguageContext Cleanup (Optional)
**Files affected**: `src/LanguageContext.tsx`, all components
**What to do**:
- Opsi A (recommended): Keep current pattern (hardcode inline) — simpler, no refactor risk
- Opsi B (jagoan): Migrate semua component pakai `t("key")` function
**Recommendation**: Opsi A. Bilingual hardcode lebih explicit & readable di JSX. Translation table = dead code tapi fine.
**Aman untuk dikerjakan?**: ⚠️ Opsi B = high refactor risk. Skip unless Ardi explicitly asks.

### ✅ PHASE 3 DONE CHECKLIST:
- [ ] `src/lib/ai-providers.ts` — shared AI logic
- [ ] `src/lib/system-prompts.ts` — shared prompts
- [ ] `src/data/portfolio.ts` — data extracted
- [ ] `src/components/ErrorBoundary.tsx` — error safety
- [ ] `npm run build` sukses tanpa error
- [ ] AI consultant masih berfungsi setelah refactor

---

## 🏗️ PHASE 4: MONETIZATION & CONVERSION (Ongoing — 2-4 Jam)

> Lead generation & sales channel.

### 4.1 — Keunggulan / Stats Counter
**New section between Hero & About**
**What to do**:
- Animated counting numbers (7 Projek, 100% Kepuasan, 4+ Tahun, dll)
- Highlight Top 100 Google di hero section
**Aman untuk dikerjakan?**: ✅

### 4.2 — Schedule Consultation Button
**File**: Multiple (Navbar, Hero, Footer, Services)
**What to do**:
- Google Calendar / Calendly integration
- Atau WhatsApp link dengan pre-filled "Saya mau jadwalkan konsultasi..."
- CTA variant: "Konsultasi Gratis" (low barrier) vs "Pesan Sekarang" (high intent)
- A/B test mana yang konversi lebih tinggi
**Aman untuk dikerjakan?**: ✅

### 4.3 — Pricing Section (Strategis)
**New section atau modal**
**Note**: Owner sengaja tidak tampilkan harga publik — pricing negotiable. Tapi bisa tambah section yang explain pricing approach tanpa angka.
**What to do**:
- "Transparan & Fleksibel" section
- Range per kategori (PWA: 8-80jt, POS: 3-80jt, Marketplace: 15-120jt) — sesuai data di memory Ardi
- CTA: "Diskusikan Budget Anda" → WhatsApp
**Aman untuk dikerjakan?**: ⚠️ Butuh approval Ardi untuk tampilkan range harga

### 4.4 — Email Capture / Newsletter
**What to do**:
- Simple subscribe form di footer
- Hook ke Google Sheets / Supabase
- Welcome email manual (Ardi kirim)
**Aman untuk dikerjakan?**: ✅

### ✅ PHASE 4 DONE CHECKLIST:
- [ ] Stats counter section
- [ ] Schedule consultation CTA
- [ ] Pricing approach section (if approved)
- [ ] Email capture form

---

## 📈 PHASE 5: ADVANCED SEO & IEO (Strategic — Planning dulu)

> High impact tapi perlu riset & planning. Jangan dikerjain ASAP.

### 5.1 — React Router Migration
**File affected**: `src/App.tsx`, `src/main.tsx`, `vercel.json`
**What to do**:
- Migrate dari hash routing (`#articles`) ke path routing (`/articles`, `/portfolio`)
- Setup react-router-dom v7
- Vercel rewrites (current `"/(.*)" → "/index.html"` already handles this)
- Update all navigation links
**Keuntungan SEO**:
- Setiap halaman punya URL unique (GAK cuma satu URL dengan hash)
- Backlink equity per halaman
- Social share = link spesifik
- Google index per page, bukan cuma 1 landing page
- Sitemap jadi meaningful (/articles bukan /#articles)
**Keburukan & Risk**:
- BREAK AI Studio preview (tapi lo pindah ke local, jadi gak masalah)
- Refactor banyak component (Navbar links, Footer links, articles detail navigation)
- URL 301 redirect dari old hash → new path
**Timeline**: 3-5 jam refactor + testing
**Kapan kerjain**: After Phase 3

### 5.2 — PWA Manifest + Service Worker
**Files affected**:
- `/public/manifest.json` (NEW)
- `/public/sw.js` (NEW) atau pake vite-plugin-pwa
- `src/main.tsx` (register service worker)
**What to do**:
- `public/manifest.json` dengan proper icons, theme colors, display:standalone
- Service worker cache-first untuk assets
- Offline fallback page
**Keuntungan SEO/IEO**:
- Google PWA badge di SERP
- Install prompt di mobile (konversi higher)
- Faster load via SW cache
- SEO boost untuk mobile-first indexing
**Timeline**: 2-4 jam
**Kapan kerjain**: After Phase 4

### 5.3 — Local SEO (Google My Business + Maps)
**What to do**:
- Klaim Google My Business listing
- Optimasi Google Maps: "Arblok Digital Tasikmalaya"
- Review schema + lokal business schema (udah ada sebagian)
- Target keyword: "software house Tasikmalaya", "jasa pembuatan website Tasikmalaya"
**Timeline**: 2-3 jam (administratif, bukan coding)
**External action**: Ardi perlu urus GMB sendiri atau assign ke orang

### 5.4 — Multi-Region Target (Future)
**What to do**:
- Target domisili lain: Garut, Bandung, Jakarta
- Landing page per kota (atau subfolder /bandung, /garut)
- Testimonial lokal per daerah
- Hreflang per region: id_bandung, id_garut, id_jakarta
**Timeline**: After project stabil, ~month 3+
**Kapan kerjain**: Low priority, hanya kalau marketing effort hasil

### 5.5 — IEO Deep Optimization
**What to do**:
- "About us" page terpisah (bukan section doang) — AI crawler suka dedicated about page
- "Contact us" dengan ContactPage schema
- Company history, founders, team section
- Awards + certifications area
- Compare page: "Arblok vs Agency Lain" (IEO gold — AI bisa compare)

### ✅ PHASE 5 DONE CHECKLIST:
- [ ] React Router migration complete
- [ ] All old hash URLs redirect (canonical or 301)
- [ ] PWA manifest + service worker
- [ ] Google My Business listed
- [ ] Local SEO target keywords rank on page 1-3

---

## 🧪 PHASE 6: TESTING & MONITORING (Ongoing)

> Infrastruktur testing biar gak regression.

### 6.1 — Smoke Test Setup
**What to do**:
- Playwright untuk E2E test
- Scenarios: navigation flow, article open, AI consultant send message, portfolio filter, language switch
- Run before every push via git hook atau CI

### 6.2 — Lighthouse CI
**What to do**:
- Target: Performance 90+, Accessibility 95+, SEO 100
- Monitor setiap deploy
- Fix regression

### 6.3 — GA4 + Search Console
**What to do**:
- Google Analytics 4 setup
- Google Search Console verified
- Sitemap submitted
- Performance monitoring weekly

### 6.4 — Sentry Error Tracking
**What to do**:
- Sentry.io integration
- Error tracking + performance monitoring
- Source maps upload untuk readable stack traces

---

## 🌟 PHASE 7: FUTURE VISION (Quarter 2+)

> Scalability & new product growth.

### 7.1 — Monorepo Proper (NPM Workspaces)
**What to do**:
- Pisahkan shared logic ke packages/: `@arblok/shared-types`, `@arblok/ai-provider`, `@arblok/config`
- Sharing code dengan project lain (KasirPro, E-Warga, SekolahPro)
**Tech**: NPM Workspaces atau Turborepo

### 7.2 — CMS untuk Blog/Portfolio
**What to do**:
- Decap CMS / Tina CMS / Payload CMS
- Atau custom admin panel (React Admin)
- Editor bisa nulis article tanpa coding

### 7.3 — SSR/SSG Migration
**What to do**:
- Migrate dari Vite CSR ke Next.js atau Astro
- SSR = SEO native (gak perlu JS untuk meta tags)
- Astro = ringan, cocok untuk company profile
**Trade-off**: Perlu rewrite besar (~2-3 minggu)

### 7.4 — Multi-tenant Sales Portal
**What to do**:
- Dashboard buat Ardi manage leads, quotes, projects
- Integration dengan WhatsApp API (official) untuk automation
- Transaction history per client

---

## 📊 PRIORITY MATRIX

| Phase | Effort | SEO/IEO Impact | Complexity | Risk | Kerjain Kapan |
|-------|--------|----------------|------------|------|---------------|
| P1.1 - 3 SEO files | 15 min | 🔥🔥🔥🔥🔥 | Easy | None | **SEKARANG** |
| P1.2 - Headers | 5 min | 🔥🔥🔥 | Easy | None | **SEKARANG** |
| P1.3 - Meta fallback | 15 min | 🔥🔥🔥🔥 | Easy | None | **SEKARANG** |
| P1.4 - OG Image | 30 min | 🔥🔥🔥🔥 | Easy | None | **HARI INI** |
| P2.1 - Testimonials | 1-2 jam | 🔥🔥🔥🔥 | Medium | Low | **MINGGU INI** |
| P2.2 - FAQ schema | 30 min | 🔥🔥🔥🔥🔥 | Easy | None | **MINGGU INI** |
| P2.4 - Articles | 1-2 jam | 🔥🔥🔥🔥🔥 | Easy | None | **MINGGU INI** |
| P3.1 - DRY backend | 2-3 jam | 🧊 (opsional) | Medium | Medium | Next sprint |
| P3.3 - Error boundary | 30 min | 🧊 | Easy | None | Next sprint |
| P5.1 - React Router | 3-5 jam | 🔥🔥🔥🔥🔥 | Hard | Medium | Stabil dulu |
| P5.2 - PWA | 2-4 jam | 🔥🔥🔥 | Medium | Low | Stabil dulu |
| P6 - Testing | ongoing | 🧊 (indirect) | Medium | None | Ongoing |

**🔥 = SEO/IEO langsung naik**
**🧊 = Developer experience / code quality**

---

## 🚦 PRIORITAS EKSEKUSI — YANG HARUS DIKERJAIN

### KALAU CUMA PUNYA 30 MENIT:
1. ❗ robots.txt + sitemap.xml + llms.txt (Phase 1.1)
2. ❗ vercel.json headers (Phase 1.2)

### KALAU PUNYA 2 JAM:
3. ❗ Meta fallback index.html (Phase 1.3)
4. ❗ OG image branded (Phase 1.4)

### KALAU PUNYA 1 HARI:
5. ❗ Testimonials + Review schema (Phase 2.1)
6. ❗ FAQPage schema homepage (Phase 2.2)
7. ❗ 2-3 articles baru (Phase 2.4)
8. ❗ Error boundary (Phase 3.3)

### KALAU PUNYA 1 MINGGU:
9. ⬜ DRY backend refactor (Phase 3.1)
10. ⬜ Extract portfolio data (Phase 3.2)
11. ⬜ Stats counter section (Phase 4.1)
12. ⬜ Schedule CTA (Phase 4.2)

### KALAU PUNYA 2-4 MINGGU:
13. ⭐ React Router migration (Phase 5.1)
14. ⭐ PWA manifest + SW (Phase 5.2)
15. ⭐ Google My Business (Phase 5.3)
16. ⭐ Analytics + monitoring setup (Phase 6)

---

## ⚠️ ATURAN KERAS (JANGAN LANGGAR)

1. **JANGAN refactor** portfolio data atau LanguageContext tanpa konfirmasi Ardi
2. **JANGAN migrate ke React Router** sebelum Phase 1-3 selesai (prioritas salah)
3. **JANGAN deploy** ke production sebelum `npm run build` sukses
4. **JANGAN hapus** server.ts — masih dipake untuk `npm run dev`
5. **JANGAN pake** `npx vite` — GAK jalan di terminal Windows (pake `node node_modules/vite/bin/vite.js build`)
6. **JANGAN tolak client** karena budget — sales copy di AI Consultant udah diatur
7. **JANGAN hardcode** `stale date` di AGENTS.md — pakai "Last updated: [date]"
8. **JANGAN push** tanpa commit message yg jelas

---

## 👊 TONE OF COMMUNICATION

Kalau berinteraksi dengan Ardi (owner):
- Casual: "bro", "gue", "lu"
- Real-talk > over-promise
- Jangan sok tau — kalau ragu, tanya
- Fix one module at a time, confirm works before moving
- Prioritaskan yang immediately beneficial > yang cosmetic

---

## 🔗 REFERENCE DOCS

| Dokumen | Isi |
|---------|-----|
| `PROJECT_CONTEXT.md` | Full project context, structure, known issues |
| `AGENTS.md` | AI assistant onboarding rules |
| `ROADMAP.md` | **THIS FILE** — scaleup plan |
| Live site | https://arblok-digital.vercel.app/ |
| Schema.org validator | https://search.google.com/test/rich-results |
| Security headers test | https://securityheaders.com |
| OG preview | https://www.opengraph.xyz |

---

**Generated**: 17 Juli 2026
**Last updated by**: Hermes Agent (Nous Research)
**Owner**: Ardi — Arblok Digital

> "Dari nol membangun, dari keresahan menjadi karya. Gas terus bro!" 🔥
