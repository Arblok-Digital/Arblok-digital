import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Articles from "./components/Articles";
import AiConsultant from "./components/AiConsultant";
import Footer from "./components/Footer";
import { LanguageProvider } from "./LanguageContext";

export type TabId = "profile" | "articles" | "consultant";

function AppContent() {
  const [currentTab, setCurrentTab] = useState<TabId>("profile");

  // Sync state with URL hash on load or hash change to support bookmarking / SEO / AEO!
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === "#articles") {
        setCurrentTab("articles");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (hash === "#ai-consultant") {
        setCurrentTab("consultant");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (["#hero", "#about", "#services", "#portfolio"].includes(hash)) {
        setCurrentTab("profile");
        setTimeout(() => {
          const el = document.getElementById(hash.substring(1));
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 120);
      } else if (hash === "" || hash === "#") {
        setCurrentTab("profile");
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    // Trigger on mount
    handleHashChange();

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigateToTab = (tab: TabId, anchor?: string) => {
    setCurrentTab(tab);
    if (anchor) {
      window.location.hash = anchor;
      setTimeout(() => {
        const el = document.getElementById(anchor);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 120);
    } else {
      window.location.hash = tab === "profile" ? "hero" : tab === "articles" ? "articles" : "ai-consultant";
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Dynamic Top Navigation Bar */}
      <Navbar currentTab={currentTab} navigateToTab={navigateToTab} />

      {/* Main Sections */}
      <main className="transition-all duration-300">
        {currentTab === "profile" && (
          <div className="animate-fade-in">
            {/* Hero Section */}
            <Hero />

            {/* Visi, Misi & Core Architecture */}
            <About />

            {/* Services & Pillers */}
            <Services />

            {/* Portfolio Showcase */}
            <Portfolio />
          </div>
        )}

        {currentTab === "articles" && (
          <div className="animate-fade-in">
            {/* Dynamic & SEO/AEO-optimized Articles */}
            <Articles />
          </div>
        )}

        {currentTab === "consultant" && (
          <div className="animate-fade-in pt-12">
            {/* Interactive AI Sandbox Consultation */}
            <AiConsultant />
          </div>
        )}
      </main>

      {/* Footer Details */}
      <Footer navigateToTab={navigateToTab} />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
