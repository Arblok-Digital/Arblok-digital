import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "id" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// A simple dictionary for UI translation keys across the header/general layout
const translations: Record<Language, Record<string, string>> = {
  id: {
    // Navbar
    "nav.home": "Beranda",
    "nav.vision": "Visi & Misi",
    "nav.services": "Layanan",
    "nav.portfolio": "Portofolio",
    "nav.articles": "Artikel & Riset",
    "nav.consultant": "AI Consultant",
    "nav.cta": "Hubungi Kami",
    
    // Hero
    "hero.subtitle": "STUDIO TEKNOLOGI INOVATIF ASAL TASIKMALAYA",
    "hero.title1": "Dari Nol Membangun,",
    "hero.title2": "Dari Keresahan Menjadi Karya",
    "hero.desc": "Kami merancang dan mengembangkan perangkat lunak berstandar industri dengan arsitektur Monorepo (NPM Workspaces) yang tangguh, scalable, offline-first, dan terintegrasi kecerdasan buatan (AI) untuk UMKM hingga instansi pemerintahan.",
    "hero.cta_consultant": "Coba Konsultasi AI",
    "hero.cta_portfolio": "Lihat Portofolio",
    "hero.stats_projects": "Proyek Sukses",
    "hero.stats_clients": "Klien Puas",
    "hero.stats_support": "Dukungan Penuh",

    // About Section
    "about.title_indicator": "FILOSOFI & VISI",
    "about.heading": "Visi Arsitektur Tangguh & Efisiensi Tanpa Batas",
    "about.p1": "Arblok Digital didirikan atas komitmen kokoh untuk membantu UMKM lokal dan instansi publik mendigitalisasi proses kerja mereka. Kami merancang sistem dengan arsitektur berstandar tinggi namun tetap efisien dari segi pemeliharaan.",
    "about.vision_title": "Visi Kami",
    "about.vision_desc": "Menjadi motor penggerak digitalisasi nasional yang memberdayakan bisnis, UMKM, dan institusi pemerintahan melalui kecerdasan buatan (AI) dan teknologi web modern.",
    "about.mission_title": "Misi Kami",
    "about.mission_desc1": "Mengembangkan perangkat lunak dengan arsitektur tangguh (seperti monorepo/NPM Workspaces) dan skalabilitas tinggi.",
    "about.mission_desc2": "Menyederhanakan operasional lewat sistem digital yang intuitif.",
    "about.mission_desc3": "Mengintegrasikan kecerdasan buatan (AI) untuk meningkatkan efisiensi nyata.",

    // Services Section
    "services.title_indicator": "LAYANAN KAMI",
    "services.heading": "Solusi Teknologi Skalabel & Siap Pakai",
    "services.desc": "Kami menyediakan ekosistem produk SaaS siap pakai sekaligus layanan kustomisasi penuh sesuai dengan model bisnis atau kebutuhan birokrasi Anda.",
    "services.service1_title": "Aplikasi Kasir (KasirPro)",
    "services.service1_desc": "Sistem POS modern dengan varian F&B Cloud-Native (Offline PWA) dan Grosiran (Multi-gudang & tiered pricing otomatis).",
    "services.service2_title": "Digitalisasi Birokrasi (E-Warga)",
    "services.service2_desc": "Platform pengurusan surat kelurahan dari RT, RW, Kecamatan, hingga Disdukcapil dengan integrasi WA gratis.",
    "services.service3_title": "Custom Full-Stack Dev",
    "services.service3_desc": "Pengembangan web/app terintegrasi AI, database skalabel, dan real-time WebSocket dari nol.",

    // Portfolio Section
    "portfolio.title_indicator": "PORTOFOLIO UNGGULAN",
    "portfolio.heading": "Karya Nyata yang Diakui Global",
    "portfolio.desc": "Dari aplikasi kasir harian hingga sistem Web3 pemenang penghargaan global, setiap baris kode dirancang untuk performa puncak.",
    "portfolio.demo_btn": "Buka Aplikasi",
    "portfolio.status_ready": "Production-Ready",
    "portfolio.status_top": "Top 100 Global",

    // General Words
    "general.whatsapp": "Hubungi via WhatsApp",
    "general.back": "Kembali",
    "general.loading": "Memuat...",
    "general.read_more": "Baca Selengkapnya",
    "general.by": "Oleh",
    "general.read_time": "Waktu Baca",
  },
  en: {
    // Navbar
    "nav.home": "Home",
    "nav.vision": "Vision & Mission",
    "nav.services": "Services",
    "nav.portfolio": "Portfolio",
    "nav.articles": "Articles & Research",
    "nav.consultant": "AI Consultant",
    "nav.cta": "Contact Us",

    // Hero
    "hero.subtitle": "INNOVATIVE TECH STUDIO FROM TASIKMALAYA",
    "hero.title1": "Built from Ground Up,",
    "hero.title2": "Turning Struggles into Solutions",
    "hero.desc": "We design and develop industry-standard software powered by highly scalable Monorepo (NPM Workspaces) architectures. Offline-first, cost-efficient, and integrated with cutting-edge AI for businesses, SMBs, and local governments.",
    "hero.cta_consultant": "Try AI Consultation",
    "hero.cta_portfolio": "View Portfolio",
    "hero.stats_projects": "Active Projects",
    "hero.stats_clients": "Happy Clients",
    "hero.stats_support": "Full Support",

    // About Section
    "about.title_indicator": "PHILOSOPHY & VISION",
    "about.heading": "Resilient Architecture & Boundless Efficiency",
    "about.p1": "Arblok Digital was founded with a solid commitment to helping local businesses, SMBs, and public institutions digitize their workflows. We design software with high standards, ensuring robust performance and zero-cost maintenance models.",
    "about.vision_title": "Our Vision",
    "about.vision_desc": "To be the engine of national digital transformation, empowering businesses, SMBs, and government sectors with artificial intelligence (AI) and modern web technologies.",
    "about.mission_title": "Our Mission",
    "about.mission_desc1": "Developing enterprise-grade software using robust architectures (like Monorepo/NPM Workspaces) and high scalability.",
    "about.mission_desc2": "Simplifying complex operations through highly intuitive, user-friendly digital systems.",
    "about.mission_desc3": "Integrating cutting-edge AI features to create tangible, real-world operational efficiency.",

    // Services Section
    "services.title_indicator": "OUR SERVICES",
    "services.heading": "Scalable & Ready-to-Deploy Tech Solutions",
    "services.desc": "We offer a suite of mature ready-to-deploy SaaS solutions, alongside full custom-development services tailored to your unique business model.",
    "services.service1_title": "POS Software (KasirPro)",
    "services.service1_desc": "Modern POS engine with Cloud-Native F&B variants (Offline PWA) and Wholesale models (Multi-warehouse & auto tiered-pricing).",
    "services.service2_title": "Bureacracy Digitalization (E-Warga)",
    "services.service2_desc": "Village-level certificate flow (RT, RW, District, to Civil Registry) using a serverless zero-cost WA integration.",
    "services.service3_title": "Custom Full-Stack Dev",
    "services.service3_desc": "Custom end-to-end web/app development integrating high-performance databases, AI models, and real-time WebSockets.",

    // Portfolio Section
    "portfolio.title_indicator": "FEATURED PORTFOLIO",
    "portfolio.heading": "Tangible Products, Globally Recognized",
    "portfolio.desc": "From daily cash register tools to award-winning Web3 applications, every single line of code is engineered for maximum performance.",
    "portfolio.demo_btn": "Live Demo",
    "portfolio.status_ready": "Production-Ready",
    "portfolio.status_top": "Top 100 Global",

    // General Words
    "general.whatsapp": "Contact via WhatsApp",
    "general.back": "Go Back",
    "general.loading": "Loading...",
    "general.read_more": "Read More",
    "general.by": "By",
    "general.read_time": "Read Time",
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("arblok_lang");
    if (saved === "id" || saved === "en") return saved;
    return "id";
  });

  useEffect(() => {
    localStorage.setItem("arblok_lang", language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || translations["id"][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
