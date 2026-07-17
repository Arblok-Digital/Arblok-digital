import React, { useState, useEffect } from "react";
import { BookOpen, Calendar, Clock, ArrowLeft, Tag, ChevronDown, ChevronUp, User, Sparkles } from "lucide-react";
import { Article, FAQItem } from "../types";
import { getArticlesData } from "../data/articles";
import { useLanguage } from "../LanguageContext";

export default function Articles() {
  const { language } = useLanguage();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("Semua");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const articlesData = getArticlesData(language);

  // Sync category filter when language changes
  useEffect(() => {
    setActiveCategory(language === "id" ? "Semua" : "All");
  }, [language]);

  // Sync selectedArticle if language changes (matching by id)
  useEffect(() => {
    if (selectedArticle) {
      const updated = articlesData.find((a) => a.id === selectedArticle.id);
      if (updated) {
        setSelectedArticle(updated);
      }
    }
  }, [language, articlesData]);

  const categories = language === "id"
    ? ["Semua", "Digitalisasi UMKM", "Kecerdasan Buatan (AI)", "Teknologi & Bisnis"]
    : ["All", "SMB Digitalization", "Artificial Intelligence (AI)", "Technology & Business"];

  const filteredArticles = (activeCategory === "Semua" || activeCategory === "All")
    ? articlesData
    : articlesData.filter((a) => a.category === activeCategory);

  // Dynamic SEO & IEO Schema.org Injector
  useEffect(() => {
    // Remove existing dynamic schemas to avoid duplication
    const existingScript = document.getElementById("arblok-dynamic-schema");
    if (existingScript) {
      existingScript.remove();
    }

    if (selectedArticle) {
      // 1. Create BlogPosting Schema
      const blogSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": selectedArticle.title,
        "description": selectedArticle.excerpt,
        "datePublished": selectedArticle.publishedAt,
        "author": {
          "@type": "Person",
          "name": selectedArticle.author.name,
          "jobTitle": selectedArticle.author.role
        },
        "publisher": {
          "@type": "Organization",
          "name": "Arblok Digital",
          "logo": {
            "@type": "ImageObject",
            "url": "https://arblok-digital.id/assets/logo.png" // Fallback URL
          }
        },
        "keywords": selectedArticle.tags.join(", ")
      };

      // 2. Create FAQPage Schema if FAQs exist (Critical for IEO!)
      let faqSchema = null;
      if (selectedArticle.faq && selectedArticle.faq.length > 0) {
        faqSchema = {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": selectedArticle.faq.map((item) => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.answer
            }
          }))
        };
      }

      // Combine into array
      const schemas = [blogSchema];
      if (faqSchema) schemas.push(faqSchema);

      const script = document.createElement("script");
      script.id = "arblok-dynamic-schema";
      script.type = "application/ld+json";
      script.innerHTML = JSON.stringify(schemas);
      document.head.appendChild(script);

      // Update Page Title for SEO
      document.title = `${selectedArticle.title} | Arblok Digital Blog`;
    } else {
      document.title = "Arblok Digital - Transformasi Digital & AI Tasikmalaya";
    }

    return () => {
      const script = document.getElementById("arblok-dynamic-schema");
      if (script) script.remove();
    };
  }, [selectedArticle]);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <section id="articles" className="py-24 bg-slate-950 text-white border-t border-slate-900 relative">
      <div className="absolute top-1/4 left-10 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Render Detailed Article View */}
        {selectedArticle ? (
          <article className="max-w-3xl mx-auto space-y-8" id={`article-${selectedArticle.id}`}>
            
            {/* Back Button */}
            <button
              onClick={() => {
                setSelectedArticle(null);
                setOpenFaqIndex(null);
                const section = document.getElementById("articles");
                if (section) section.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 font-mono text-xs uppercase tracking-wider bg-slate-900/60 hover:bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              {language === "id" ? "Kembali ke Blog" : "Back to Blog"}
            </button>

            {/* Category and Read time */}
            <header className="space-y-4">
              <div className="flex flex-wrap gap-3 items-center text-xs text-slate-400 font-mono">
                <span className="bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 px-2.5 py-1 rounded-full font-bold">
                  {selectedArticle.category}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <time dateTime={selectedArticle.publishedAt}>
                    {new Date(selectedArticle.publishedAt).toLocaleDateString(language === "id" ? "id-ID" : "en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  {selectedArticle.readTime}
                </span>
              </div>

              {/* Main Title */}
              <h1 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white leading-tight tracking-tight">
                {selectedArticle.title}
              </h1>

              {/* Author Badge */}
              <div className="flex items-center gap-3 py-4 border-b border-slate-900">
                <div className="p-2 bg-slate-900 rounded-full border border-slate-800 text-cyan-400">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{selectedArticle.author.name}</div>
                  <div className="text-[10px] sm:text-xs text-slate-500 font-mono">{selectedArticle.author.role}</div>
                </div>
              </div>
            </header>

            {/* Main Content Area */}
            <div className="font-sans text-slate-300 text-sm sm:text-base leading-relaxed space-y-6 article-body">
              {/* Pre-render content with nice typography splits */}
              {selectedArticle.content.split("\n\n").map((paragraph, index) => {
                if (paragraph.startsWith("### ")) {
                  return (
                    <h3 key={index} className="font-display font-bold text-lg sm:text-xl text-white pt-4 tracking-wide">
                      {paragraph.replace("### ", "")}
                    </h3>
                  );
                } else if (paragraph.startsWith("* ")) {
                  return (
                    <ul key={index} className="space-y-3.5 pl-5 list-none">
                      {paragraph.split("\n").map((li, liIdx) => (
                        <li key={liIdx} className="flex items-start gap-2.5">
                          <span className="mt-2 w-1.5 h-1.5 bg-cyan-400 rounded-full shrink-0" />
                          <span>{li.replace("* ", "")}</span>
                        </li>
                      ))}
                    </ul>
                  );
                } else if (paragraph.startsWith("1. ") || paragraph.match(/^\d+\.\s/)) {
                  return (
                    <ol key={index} className="space-y-3.5 pl-5 list-decimal">
                      {paragraph.split("\n").map((li, liIdx) => (
                        <li key={liIdx} className="text-slate-300">
                          {li.replace(/^\d+\.\s+/, "")}
                        </li>
                      ))}
                    </ol>
                  );
                } else {
                  // Standard paragraph with bold parsing
                  const parsedText = paragraph.split("**").map((text, i) => 
                    i % 2 === 1 ? <strong key={i} className="text-white">{text}</strong> : text
                  );
                  return (
                    <p key={index} className="text-slate-300">
                      {parsedText}
                    </p>
                  );
                }
              })}
            </div>

            {/* Tags footer */}
            <footer className="pt-6 border-t border-slate-900 flex flex-wrap gap-2 items-center">
              <span className="text-xs text-slate-500 font-mono flex items-center gap-1 mr-2">
                <Tag className="w-3.5 h-3.5" /> Tag:
              </span>
              {selectedArticle.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] bg-slate-900 border border-slate-800 text-slate-400 px-2.5 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </footer>

            {/* IEO FAQ Section - Interactive Accordion */}
            {selectedArticle.faq && selectedArticle.faq.length > 0 && (
              <section className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 sm:p-8 mt-12 space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
                  <h4 className="font-display font-bold text-sm sm:text-base text-white">
                    {language === "id" ? "FAQ & Ringkasan AI (Optimasi Pencarian AI / IEO)" : "FAQ & AI Summary (Optimized for AI Search / IEO)"}
                  </h4>
                </div>
                
                <div className="space-y-3">
                  {selectedArticle.faq.map((faq, faqIdx) => (
                    <div
                      key={faqIdx}
                      className="border border-slate-800/60 bg-slate-950/40 rounded-xl overflow-hidden transition-colors"
                    >
                      <button
                        onClick={() => toggleFaq(faqIdx)}
                        className="w-full text-left px-5 py-4 flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-200 hover:text-white hover:bg-slate-900/30 transition-all cursor-pointer"
                      >
                        <span>{faq.question}</span>
                        {openFaqIndex === faqIdx ? (
                          <ChevronUp className="w-4 h-4 text-cyan-400 shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                        )}
                      </button>
                      
                      <div
                        className={`transition-all duration-300 overflow-hidden ${
                          openFaqIndex === faqIdx ? "max-h-60 border-t border-slate-900" : "max-h-0"
                        }`}
                      >
                        <p className="p-5 text-xs sm:text-sm text-slate-400 leading-relaxed bg-slate-950/20">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* WhatsApp CTA Section specifically tailored for discussion on this article */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 mt-12">
              <div className="space-y-1.5">
                <h5 className="font-display font-bold text-sm sm:text-base text-white">
                  {language === "id" ? "Tertarik Menerapkan Solusi Ini di Bisnis Anda?" : "Interested in Implementing This Solution for Your Business?"}
                </h5>
                <p className="font-sans text-xs text-slate-400">
                  {language === "id" 
                    ? "Konsultasikan gratis dengan tim teknis Arblok Digital langsung di Tasikmalaya." 
                    : "Free consultation with the Arblok Digital engineering team based in Tasikmalaya."}
                </p>
              </div>
              <a
                href={`https://wa.me/6289508053795?text=Halo%20Arblok%20Digital%2C%20saya%20membaca%20artikel%20tentang%20${encodeURIComponent(selectedArticle.title)}%20dan%20tertarik%20berkonsultasi.`}
                target="_blank"
                rel="noreferrer"
                className="font-display text-xs sm:text-sm font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-5 py-3 rounded-xl shadow-lg shadow-cyan-500/10 transition-all text-center whitespace-nowrap"
              >
                {language === "id" ? "Diskusikan di WhatsApp" : "Discuss on WhatsApp"}
              </a>
            </div>

          </article>
        ) : (
          /* Render Article List View */
          <div className="space-y-16">
            
            {/* Header Title */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="font-mono text-xs text-cyan-400 tracking-widest uppercase font-semibold">
                {language === "id" ? "Edukasi & Wawasan" : "Education & Insights"}
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight">
                {language === "id" ? "Artikel Inovasi Teknologi" : "Technology Innovation Articles"}
              </h2>
              <p className="font-sans text-slate-400 text-sm sm:text-base leading-relaxed">
                {language === "id"
                  ? "Pelajari strategi akselerasi digital, tips otomatisasi, konsep koding bersih, dan rahasia integrasi Kecerdasan Buatan (AI) terapan untuk menumbuhkan produktivitas bisnis Anda."
                  : "Learn digital acceleration strategies, automation tips, clean coding concepts, and the secrets of applied Artificial Intelligence (AI) integration to grow your business productivity."}
              </p>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                    activeCategory === cat
                      ? "bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20"
                      : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Articles Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <article
                  key={article.id}
                  className="group bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="p-6 space-y-4">
                    {/* Meta info */}
                    <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
                      <span className="text-cyan-400 font-bold uppercase tracking-wider">
                        {article.category}
                      </span>
                      <span>{article.readTime}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-cyan-400 transition-colors line-clamp-2">
                      {article.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="font-sans text-slate-400 text-xs sm:text-sm leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>

                  {/* Card Action footer */}
                  <div className="px-6 pb-6 pt-4 border-t border-slate-950/40 flex items-center justify-between mt-auto">
                    <span className="font-mono text-[10px] text-slate-500">
                      {new Date(article.publishedAt).toLocaleDateString(language === "id" ? "id-ID" : "en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric"
                      })}
                    </span>
                    
                    <button
                      onClick={() => {
                        setSelectedArticle(article);
                        const section = document.getElementById("articles");
                        if (section) section.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="font-display text-xs font-semibold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 transition-all cursor-pointer"
                    >
                      {language === "id" ? "Baca Selengkapnya" : "Read Full Article"}
                      <BookOpen className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              ))}
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
