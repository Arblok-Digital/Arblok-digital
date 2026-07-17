import React from "react";
import { Cpu, Globe2, Waypoints, ShoppingBag, Code2, Coins, ArrowRight } from "lucide-react";
import { useLanguage } from "../LanguageContext";

export default function Services() {
  const { language } = useLanguage();

  const services = language === "id" ? [
    {
      id: "web-apps",
      title: "Pembuatan Website & PWA",
      icon: <Globe2 className="w-6 h-6 text-cyan-400" />,
      description: "Kami merancang Landing Page premium, Company Profile interaktif, atau Progressive Web App (PWA) modern berkecepatan tinggi yang dapat langsung diinstal di perangkat handphone pengguna tanpa proses rumit.",
      details: [
        "Landing page konversi tinggi & SEO-Friendly",
        "PWA siap instalasi mobile (hemat kuota & responsif)",
        "Desain UI/UX eksklusif, bukan template pasaran",
        "Integrasi domain kustom & analytics siap pakai"
      ]
    },
    {
      id: "marketplace-platform",
      title: "Marketplace & Platform Bisnis",
      icon: <ShoppingBag className="w-6 h-6 text-indigo-400" />,
      description: "Butuh platform e-commerce kustom, sistem kasir (POS), atau portal multi-vendor? Kami siap membangun platform tangguh dengan manajemen produk serta alur transaksi yang sangat mulus.",
      details: [
        "Sistem e-commerce & katalog produk interaktif",
        "Multi-vendor marketplace & dashboard seller",
        "Sistem manajemen transaksi & kasir digital (POS)",
        "Keamanan gerbang pembayaran (Payment Gateway)"
      ]
    },
    {
      id: "custom-logic-pipeline",
      title: "Custom Software & Pipeline Logika",
      icon: <Waypoints className="w-6 h-6 text-emerald-400" />,
      description: "Ini merupakan spesialisasi kami. Kami mampu menerjemahkan alur kerja operasional, bisnis, atau birokrasi instansi Anda menjadi baris kode terstruktur dengan sistem pipa otorisasi serta transisi status (pipeline) yang otomatis dan fleksibel.",
      details: [
        "Pipa alur persetujuan dinamis (RT ➔ RW ➔ Kecamatan)",
        "Sistem status dokumen & pelacakan real-time",
        "Keamanan mutakhir lewat PostgreSQL Row Level Security",
        "Validasi data berlapis & manajemen hak akses kustom"
      ]
    },
    {
      id: "ai-integration",
      title: "Otomatisasi Sistem & Kognitif Data (AI)",
      icon: <Cpu className="w-6 h-6 text-purple-400" />,
      description: "Kami menanamkan kecerdasan buatan (AI) terapan langsung ke dalam pipa server-side sistem Anda secara aman. Memungkinkan analisis otonom, klasifikasi berkas otomatis, ekstraksi data terstruktur (OCR kognitif), dan penanganan logika operasional rumit tanpa sewa server virtual yang mahal.",
      details: [
        "Klasifikasi berkas otonom & ekstraksi data terstruktur langsung ke database",
        "Server-Side AI Proxy (Keamanan tinggi, API Key tersembunyi, & proteksi RLS)",
        "Pipa automasi cerdas terintegrasi alur kerja (workflow) kustom",
        "Sistem notifikasi mandiri hemat kuota & hemat biaya pihak ketiga"
      ]
    }
  ] : [
    {
      id: "web-apps",
      title: "Web & PWA Development",
      icon: <Globe2 className="w-6 h-6 text-cyan-400" />,
      description: "We craft premium Landing Pages, interactive Company Profiles, or modern Progressive Web Apps (PWAs) that users can install directly onto their home screen without App Store friction.",
      details: [
        "High-conversion, SEO-optimized landing pages",
        "Mobile-ready PWA installations (lightweight & responsive)",
        "Bespoke UI/UX design, zero generic templates",
        "Custom domain & web analytics integration"
      ]
    },
    {
      id: "marketplace-platform",
      title: "E-Commerce & Marketplaces",
      icon: <ShoppingBag className="w-6 h-6 text-indigo-400" />,
      description: "Need a custom e-commerce engine, point-of-sale (POS) system, or multi-vendor portal? We engineer resilient platforms with seamless cart-to-checkout transactions.",
      details: [
        "Interactive catalog & secure e-commerce architecture",
        "Multi-vendor marketplaces with seller dashboards",
        "POS cash registers & digital ledger integrations",
        "Secure payment gateway & localized checkout"
      ]
    },
    {
      id: "custom-logic-pipeline",
      title: "Custom Software & Pipelines",
      icon: <Waypoints className="w-6 h-6 text-emerald-400" />,
      description: "Our specialty. We translate your manual operations, paper-based workflows, or bureaucracy into a streamlined digital engine with rule-based authorization and status pipelines.",
      details: [
        "Dynamic certificate approval pipelines (e.g., RT ➔ RW ➔ District)",
        "Document tracing & real-time transition feeds",
        "PostgreSQL Row Level Security (RLS) security models",
        "Multi-layer data validation & custom access control rules"
      ]
    },
    {
      id: "ai-integration",
      title: "Cognitive Systems & Data Automation (AI)",
      icon: <Cpu className="w-6 h-6 text-purple-400" />,
      description: "We inject applied artificial intelligence directly into your secure server-side pipelines. Automate unstructured document classification, extract OCR data securely, and handle complex operational decisions without virtual server overhead.",
      details: [
        "Autonomous document classification & structured data extraction to database",
        "Secure Server-Side AI Proxy (API key protection & database-level RLS)",
        "Intelligent automation pipelines integrated with custom workflow logic",
        "Resource-efficient, zero-cost notification networks minimizing 3rd-party fees"
      ]
    }
  ];

  return (
    <section id="services" className="py-24 bg-slate-950 text-white relative">
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="font-mono text-xs text-cyan-400 tracking-widest uppercase font-semibold">
            {language === "id" ? "APA YANG BISA KAMI BANTU?" : "HOW CAN WE HELP YOU?"}
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight">
            {language === "id" ? "Layanan Rekayasa Perangkat Lunak & Sistem Kustom" : "Software Engineering & Custom System Services"}
          </h2>
          <p className="font-sans text-slate-400 text-sm sm:text-base leading-relaxed">
            {language === "id" ? (
              <>
                Arblok Digital bukan sekadar pembuat web biasa. Kami adalah agensi rekayasa perangkat lunak profesional di Tasikmalaya yang merancang <strong className="text-white">website, aplikasi mobile, marketplace, dan software kustom</strong> dengan logika bisnis serta pipa alur kerja (pipeline workflow) yang dapat sepenuhnya disesuaikan dengan kebutuhan Anda.
              </>
            ) : (
              <>
                Arblok Digital is not just a standard web agency. We are a professional software engineering studio from Tasikmalaya that engineers custom <strong className="text-white">websites, mobile apps, marketplaces, and software</strong> with bespoke business logic and workflow pipelines tailored exactly to your needs.
              </>
            )}
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((svc) => (
            <div
              key={svc.id}
              className="relative group rounded-2xl bg-slate-900 border border-slate-800 p-8 hover:border-slate-700 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-6">
                {/* Icon wrapper */}
                <div className="inline-flex p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200">
                  {svc.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-lg sm:text-xl text-white group-hover:text-cyan-400 transition-colors">
                    {svc.title}
                  </h3>
                  <p className="font-sans text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {svc.description}
                  </p>
                </div>
                {/* Detailed features list */}
                <ul className="space-y-2.5 pt-4 border-t border-slate-800/80">
                  {svc.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                      <span className="mt-1.5 w-1 h-1 bg-cyan-400 rounded-full shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Pipeline & Zero-Cost Highlight Section */}
        <div className="mt-16 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center gap-6 justify-between">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400 shrink-0">
              <Waypoints className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h4 className="font-display font-bold text-base sm:text-lg text-white">
                {language === "id" ? "Punya Alur Kerja Spesifik? Kami Buatkan Logika & Pipelinenya!" : "Have a Specific Workflow? We'll Engineer Your Logic & Pipelines!"}
              </h4>
              <p className="font-sans text-slate-400 text-xs sm:text-sm max-w-4xl leading-relaxed">
                {language === "id" ? (
                  <>
                    Setiap bisnis atau instansi memiliki alur kerja yang unik. Di Arblok Digital, Anda bebas menentukan bagaimana transisi status data berjalan, siapa personil yang berwenang menyetujui dokumen, aturan validasi yang wajib dilalui berkas, hingga jalur tujuan pengiriman notifikasi otomatis. Seluruh logika tersebut kami rancang secara modular berbasis standar arsitektur monorepo tingkat industri.
                  </>
                ) : (
                  <>
                    Every business or agency has unique workflows. At Arblok Digital, you have full control over data transition pipelines, authorized approval staff, strict validation checks, and automatic notification triggers. We design all this modularly using industry-grade monorepo architectures.
                  </>
                )}
              </p>
            </div>
          </div>
          <a
            href="https://wa.me/6289508053795?text=Halo%20Arblok%20Digital%2C%20saya%20mau%20konsultasi%20bikin%20software%20dengan%20pipeline%20dan%20logika%20kustom."
            target="_blank"
            rel="noreferrer"
            className="font-display text-xs sm:text-sm font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-5 py-3 rounded-xl transition-all shadow-lg shadow-cyan-500/10 shrink-0 inline-flex items-center gap-1.5 cursor-pointer"
          >
            {language === "id" ? "Diskusikan Pipeline Anda" : "Discuss Your Pipeline"} <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Special Cost Optimization highlight banner */}
        <div className="mt-8 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 justify-between">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 shrink-0">
              <Coins className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-display font-bold text-base sm:text-lg text-white">
                {language === "id" ? "Filosofi Optimasi Biaya Operasional (Zero-Cost Hosting)" : "Operating Cost Optimization Philosophy (Zero-Cost Hosting)"}
              </h4>
              <p className="font-sans text-slate-400 text-xs sm:text-sm max-w-3xl leading-relaxed">
                {language === "id" ? (
                  <>
                    Kami merancang sistem dengan integrasi langsung ke database cloud yang dilindungi oleh Row Level Security (RLS) PostgreSQL. Sistem ini mengizinkan aplikasi berjalan tanpa memerlukan server backend terdedikasi yang menyala terus-menerus, menghemat pengeluaran bulanan Anda hingga Rp 0,- (Zero-Cost Hosting).
                  </>
                ) : (
                  <>
                    We design systems that connect directly to cloud databases protected by PostgreSQL Row Level Security (RLS). This permits apps to run without dedicated backend servers active 24/7, keeping your monthly operation cost at $0/month (Zero-Cost Hosting) for typical workloads.
                  </>
                )}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

