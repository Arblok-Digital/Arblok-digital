import React from "react";
import { Target, Eye, Settings, ShieldAlert, Award, Network } from "lucide-react";
import { useLanguage } from "../LanguageContext";

export default function About() {
  const { language } = useLanguage();

  const content = {
    id: {
      badge: "Filosofi Inovasi",
      heading: "Visi & Misi Arblok Digital",
      subheading: "Menyatukan keandalan arsitektur monorepo dengan kepintaran kecerdasan buatan (AI) untuk menghadirkan platform digital yang tangguh, efisien, dan siap bersaing di masa depan.",
      vision_title: "Visi Utama Kami",
      vision_desc: "Menjadi motor penggerak digitalisasi nasional yang memberdayakan bisnis, UMKM, dan institusi melalui kecerdasan buatan (AI) dan teknologi web modern. Kami bercita-cita membangun fondasi digital yang cerdas, efisien, dan inklusif demi kemandirian teknologi yang berawal dari Tasikmalaya.",
      mission_title: "Misi Strategis Kami",
      m1_title: "Perangkat Lunak Kokoh: ",
      m1_desc: "Mengembangkan solusi piranti lunak berstandar industri dengan arsitektur tangguh dan monorepo terorganisir untuk mempermudah skalabilitas masa depan.",
      m2_title: "Efisiensi Birokrasi: ",
      m2_desc: "Menyederhanakan proses operasional, administrasi, dan alur birokrasi yang kompleks melalui sistem digital yang ramah pengguna.",
      m3_title: "Integrasi AI Terapan: ",
      m3_desc: "Memasukkan logika kecerdasan buatan (AI) secara nyata untuk mengotomasi pekerjaan repetitif, menghemat waktu, dan memangkas biaya.",
      banner_badge: "Arsitektur Masa Depan: Monorepo (NPM Workspaces)",
      banner_title: "Membangun dengan Fondasi Bersama (Shared Codebase)",
      banner_desc: "Di Arblok Digital, kami menghindari penulisan logika redundan. Dengan Monorepo, seluruh logika transisi status (workflow pipeline), validasi hak akses, dan model database diisolasi dalam modul khusus (@e-warga/logic dan @e-warga/supabase). Ketika sistem dikembangkan lebih lanjut (seperti membuat dashboard kecamatan terpisah), aplikasi baru tersebut dapat mengimpor logika yang sama dalam sekejap tanpa duplikasi kode.",
      stat_reusable: "Kode Reusable",
      stat_dup: "Duplikasi Logika",
    },
    en: {
      badge: "Innovation Philosophy",
      heading: "Our Vision & Mission",
      subheading: "Combining the reliability of monorepo architectures with the intelligence of AI to build robust, highly efficient, and future-ready digital platforms.",
      vision_title: "Our Core Vision",
      vision_desc: "To be the engine of digital transformation that empowers businesses, SMBs, and local governments through artificial intelligence (AI) and modern web technology. We aspire to build digital baselines that are smart, efficient, inclusive, and engineered locally from Tasikmalaya for the world.",
      mission_title: "Strategic Missions",
      m1_title: "Robust Engineering: ",
      m1_desc: "Developing enterprise-grade software using clean monorepo architecture (NPM Workspaces) to facilitate smooth, non-disruptive future scaling.",
      m2_title: "Operational Simplification: ",
      m2_desc: "Streamlining complex operations, administrative workflows, and bureaucratic procedures via highly intuitive digital systems.",
      m3_title: "Applied AI Integration: ",
      m3_desc: "Injecting practical AI capabilities to automate repetitive workflows, save manual labor hours, and cut operational overhead.",
      banner_badge: "Future Architecture: Monorepo (NPM Workspaces)",
      banner_title: "Building on a Shared Codebase",
      banner_desc: "At Arblok Digital, we reject redundant code. With a Monorepo workspace, all workflow pipeline transitions, authorization logic, and database schemas are isolated into dedicated local packages (@e-warga/logic and @e-warga/supabase). If you need an additional platform in the future (e.g. an analytical dashboard), the new app imports the exact same business logic in seconds.",
      stat_reusable: "Reusable Code",
      stat_dup: "Logic Duplication",
    }
  };

  const cur = content[language];

  return (
    <section id="about" className="py-24 bg-slate-900 text-white relative overflow-hidden border-t border-slate-800">
      {/* Decorative Blur BG */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="font-mono text-xs text-cyan-400 tracking-widest uppercase font-semibold">
            {cur.badge}
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight">
            {cur.heading}
          </h2>
          <p className="font-sans text-slate-400 text-sm sm:text-base leading-relaxed">
            {cur.subheading}
          </p>
        </div>

        {/* Visi & Misi Bento Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* Visi Card */}
          <div className="relative group rounded-2xl bg-slate-950 p-8 border border-slate-800 hover:border-slate-700/80 transition-all duration-300">
            <div className="flex items-start space-x-5">
              <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-all duration-300">
                <Eye className="w-6 h-6" />
              </div>
              <div className="space-y-4">
                <h3 className="font-display font-bold text-xl text-white tracking-wide">
                  {cur.vision_title}
                </h3>
                <p className="font-sans text-slate-300 text-sm sm:text-base leading-relaxed">
                  {cur.vision_desc}
                </p>
              </div>
            </div>
          </div>

          {/* Misi Card */}
          <div className="relative group rounded-2xl bg-slate-950 p-8 border border-slate-800 hover:border-slate-700/80 transition-all duration-300">
            <div className="flex items-start space-x-5">
              <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300">
                <Target className="w-6 h-6" />
              </div>
              <div className="space-y-4">
                <h3 className="font-display font-bold text-xl text-white tracking-wide">
                  {cur.mission_title}
                </h3>
                <ul className="space-y-3.5 font-sans text-slate-300 text-sm sm:text-base">
                  <li className="flex items-start gap-2.5">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-cyan-400 rounded-full shrink-0" />
                    <span>
                      <strong>{cur.m1_title}</strong>{cur.m1_desc}
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-cyan-400 rounded-full shrink-0" />
                    <span>
                      <strong>{cur.m2_title}</strong>{cur.m2_desc}
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-cyan-400 rounded-full shrink-0" />
                    <span>
                      <strong>{cur.m3_title}</strong>{cur.m3_desc}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>

        {/* Monorepo & Zero-Cost Architecture Explanation Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-slate-950 to-slate-900 border border-slate-800 p-8 lg:p-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 font-mono text-xs text-indigo-400 uppercase tracking-widest font-bold">
                <Network className="w-4 h-4" />
                {cur.banner_badge}
              </div>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                {cur.banner_title}
              </h3>
              <p className="font-sans text-slate-300 text-xs sm:text-sm leading-relaxed">
                {cur.banner_desc}
              </p>
            </div>

            <div className="md:col-span-4 grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 text-center">
                <div className="font-display font-extrabold text-2xl text-cyan-400">100%</div>
                <div className="font-sans text-[10px] text-slate-400 mt-1 uppercase tracking-wider">
                  {cur.stat_reusable}
                </div>
              </div>
              <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 text-center">
                <div className="font-display font-extrabold text-2xl text-indigo-400">Zero</div>
                <div className="font-sans text-[10px] text-slate-400 mt-1 uppercase tracking-wider">
                  {cur.stat_dup}
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
