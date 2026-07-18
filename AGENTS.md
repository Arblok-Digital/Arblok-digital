# AGENTS.md — Onboarding untuk AI Assistant

> File ini dibaca OTOMATIS sama AI assistant (Claude Code, Codex, Cursor, AI Studio agent, dll) di awal sesi project ini. **BACA DULU** sebelum nanya atau ngerjain apa-apa.

---

## Konteks Singkat

Ini project **Arblok Digital** — company profile website + AI consultant demo, di-deploy di Vercel, source code di GitHub. Live di https://arblok-digital.vercel.app/

Detail lengkap ada di `PROJECT_CONTEXT.md` (baca juga).

---

## 3 Aturan Utama (JANGAN DILANGGAR)

### 1. TANYA DULU, KERJAIN KEMUDIAN
- **JANGAN ngerjain sesuatu yang break functionality existing** tanpa konfirmasi
- **JANGAN asumsi** — kalau ragu, tanya Ardi
- **JANGAN refactor** yang belum diminta (Portfolio.tsx 443 baris masih OK, biarin)

### 2. IKUTI KONVENSI YANG ADA
- **No "AI" di marketing copy** — pakai "kecerdasan buatan", "sistem otomatis", "teknologi pintar", atau technical names (Gemini, NVIDIA NIM, etc)
- **Bilingual pattern**: hardcode inline `language === "id" ? ... : ...`, BUKAN pakai `t("key")` di components
- **DEPRECATED: Hash routing** — sudah dimigrasi ke React Router path routing (`/articles`, `/consultant`). Old hash redirect masih support backward compat (`#articles` → `/articles`)
- **WhatsApp CTA format**: `https://wa.me/6289508053795` dengan `?text=` pre-filled kalau dari article/portfolio

### 3. FIX ONE MODULE AT A TIME
- Jangan big-bang refactor
- Test per module sebelum lanjut
- Confirm works sebelum move on

---

## Workflow Notes

### Build & deploy:
- Project ini di-build di **Google AI Studio** (cloud), BUKAN local
- Tapi source mirror di local (folder `D:\DATA YAYAH\Arblok-Digital-\Arblok-Digital--main`)
- Push dari AI Studio **ATAU** git push dari local → GitHub → Vercel auto-deploy
- `vercel.json` TIDAK di-overwrite oleh AI Studio (aman)

### Kalau user kerja di local (bukan AI Studio):
- File `index.html` di source = template Vite polos (13 baris)
- Meta tags & JSON-LD live = di-inject di cloud AI Studio, TIDAK visible di zip download
- Verify di live site (curl) daripada percaya source code untuk SEO state

### Kalau user kerja di AI Studio (cloud):
- File yang lo edit = file di cloud sandbox
- Rate limit sering kena untuk edit panjang
- `create_file` tool bisa bikin file baru di `/public/` (robots.txt, sitemap.xml, dll)
- Selalu confirm push success sebelum declare done

---

## Yang JANGAN dilakukan (Common Mistakes)

| ❌ Jangan | ✅ Harusnya |
|----------|-----------|
| Refactor Portfolio.tsx tanpa diminta | Biarin 443 baris, data BAKED IN masih OK |
| Refactor LanguageContext (biarin dead code) | Biarin, components hardcode bilingual |
| Hapus server.ts (DRY) | Tinggalin, Express masih dipake untuk local dev |
| Migrate balik ke hash routing | React Router path routing sudah live & tested, backward compat via OldHashRedirect |
| Pakai `t("key")` di component baru | Hardcode inline `language === "id" ? ... : ...` |
| Tolak client karena budget | Selalu tawarkan starter/MVP (sesuai system prompt) |
| Edit `metadata.json` atau `.aistudio/` | Itu internal AI Studio, jangan disentuh |

---

## Yang BOLEH dilakukan (Safe Operations)

- ✅ Bikin file baru di `/public/` (robots.txt, sitemap.xml, llms.txt, og-image.png)
- ✅ Edit `vercel.json` (security headers, rewrites)
- ✅ Nambah/edit articles di `src/data/articles.ts`
- ✅ Tambah portfolio item (tapi edit `src/components/Portfolio.tsx`, JANGAN bikin file baru)
- ✅ Edit meta tags atau schema (tapi verify live setelah push)
- ✅ Bug fix tanpa refactor besar

---

## Quick Reference

**Stack**: React 19 + Vite 6 + TypeScript 5.8 + Tailwind 4
**Backend**: Express (local) + Vercel serverless (prod)
**AI SDK**: @google/genai v2.4
**Live URL**: https://arblok-digital.vercel.app/
**Owner**: Ardi (Tasikmalaya) — WhatsApp +6289508053795
**Branding**: dark theme, cyan/indigo accent
**Languages**: ID + EN bilingual

---

## Kalau Pertama Kali接手:

1. Baca `PROJECT_CONTEXT.md` (context lengkap)
2. Skim `src/App.tsx` (pahami routing structure)
3. Skim `src/components/Articles.tsx` (pahami dynamic JSON-LD pattern)
4. Skim `api/chat.ts` ATAU `server.ts` (pahami backend pattern)
5. Tanya Ardi kalau ada yang gak jelas — JANGAN asumsi

---

**Last updated**: 17 Juli 2026
