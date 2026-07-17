import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, Sparkles, User, Cpu, AlertTriangle, ArrowRight } from "lucide-react";
import { ChatMessage } from "../types";

export default function AiConsultant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Halo! Saya adalah AI Consultant dari Arblok Digital. Apakah Anda memiliki rencana untuk membangun aplikasi web modern, sistem otomatisasi, atau ingin mengintegrasikan kecerdasan buatan (AI) ke dalam proses operasional bisnis atau dinas Anda? Tanyakan saja kepada saya, mari kita diskusikan solusi teknologi terbaik yang efisien dan hemat biaya!",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [provider, setProvider] = useState<"auto" | "gemini" | "nvidia">("auto");
  const [activeModelInfo, setActiveModelInfo] = useState<string>("gemini (Auto)");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const starterPrompts = [
    {
      label: "Digitalisasi RT/RW",
      text: "Bagaimana cara digitalisasi birokrasi pengurusan surat warga di tingkat RT/RW agar gratis dan aman?"
    },
    {
      label: "Zero-Cost Hosting",
      text: "Bagaimana konsep Zero-Cost Hosting di Supabase menggunakan PostgreSQL Row Level Security (RLS)?"
    },
    {
      label: "Integrasi AI Chat",
      text: "Bagaimana cara mudah mengintegrasikan sistem Chatbot AI seperti ini ke website operasional internal perusahaan?"
    },
    {
      label: "Teknologi Kasir F&B",
      text: "Saya ingin membuat aplikasi kasir F&B berbasis web modern, arsitektur monorepo seperti apa yang cocok?"
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    setErrorMsg(null);
    const userMessage: ChatMessage = {
      role: "user",
      content: textToSend,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Map messages to simple API-friendly schema
      const historyToSend = [...messages, userMessage].map((msg) => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: historyToSend,
          provider: provider
        })
      });

      if (!response.ok) {
        let errorMsgStr = "Gagal menghubungi AI Server.";
        try {
          const errorData = await response.json();
          errorMsgStr = errorData.error || errorMsgStr;
        } catch {
          try {
            const textError = await response.text();
            if (textError) {
              errorMsgStr = textError.substring(0, 100);
            }
          } catch {}
        }
        throw new Error(errorMsgStr);
      }

      let data;
      try {
        data = await response.json();
      } catch {
        throw new Error("Gagal mengurai respons JSON dari server.");
      }

      if (data.modelUsed) {
        const shortModel = data.modelUsed.replace("nvidia/", "").replace("gemini-", "").replace("meta/", "");
        let providerName = "Gemini";
        if (data.provider === "nvidia") {
          providerName = "NVIDIA";
        } else if (data.provider === "openrouter") {
          providerName = "OpenRouter";
        }
        setActiveModelInfo(`${providerName} (${shortModel})`);
      }
      
      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: data.text || "Maaf, server tidak mengirimkan respons teks.",
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error("Chat error:", error);
      setErrorMsg(error.message || "Gagal mengirim pesan. Silakan coba sesaat lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ai-consultant" className="py-24 bg-slate-950 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="font-mono text-xs text-cyan-400 tracking-widest uppercase font-semibold">
            Interactive Sandbox
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight flex items-center justify-center gap-3">
            <Sparkles className="w-8 h-8 text-cyan-400 animate-pulse" />
            Arblok AI Consultant
          </h2>
          <p className="font-sans text-slate-400 text-sm sm:text-base">
            Uji kemampuan teknologi kecerdasan buatan kami langsung di sini. Konsultasikan ide digitalisasi Anda secara interaktif dan dapatkan rancangan sistem serta arsitektur solusi instan.
          </p>
        </div>

        {/* Chat Layout Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left panel: Info & Starters */}
          <div className="lg:col-span-3 flex flex-col justify-between space-y-6 bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 font-mono text-xs text-indigo-400 uppercase tracking-widest font-bold">
                <Cpu className="w-4 h-4 text-indigo-400" />
                Mengapa AI Consultant?
              </div>
              <h3 className="font-display font-bold text-lg text-white leading-snug">
                Analisis Kebutuhan Bisnis Secara Cerdas & Instan
              </h3>
              <p className="font-sans text-slate-400 text-xs leading-relaxed">
                Chatbot ini adalah bukti nyata kepiawaian Arblok Digital mengintegrasikan API bahasa tingkat lanjut (Gemini AI) di sisi server dengan Express proxy yang aman. Tanya apa saja terkait:
              </p>
              <ul className="space-y-2.5 font-sans text-slate-300 text-xs">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 bg-cyan-400 rounded-full shrink-0" />
                  <span>Struktur database, workflow pipeline, & hak akses.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 bg-cyan-400 rounded-full shrink-0" />
                  <span>Teknologi Web3, blockchain, & mikro-pembayaran.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 bg-cyan-400 rounded-full shrink-0" />
                  <span>Peningkatan efisiensi kerja UMKM atau Instansi.</span>
                </li>
              </ul>
            </div>

            {/* Starter templates */}
            <div className="space-y-3 pt-6 border-t border-slate-800/80">
              <span className="text-slate-400 text-xs font-mono tracking-wider block uppercase">
                Rekomendasi Pertanyaan:
              </span>
              <div className="flex flex-col gap-2">
                {starterPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    disabled={isLoading}
                    onClick={() => handleSendMessage(prompt.text)}
                    className="text-left text-xs bg-slate-950 hover:bg-slate-800 hover:text-cyan-400 px-3 py-2 rounded-lg border border-slate-800 transition-colors cursor-pointer w-full flex items-center justify-between group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>{prompt.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-0.5 group-hover:text-cyan-400 transition-all shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right panel: Active Chat SandBox */}
          <div className="lg:col-span-9 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col h-[700px] overflow-hidden">
            
            {/* Sandbox Title Header */}
            <div className="bg-slate-950 px-4 sm:px-6 py-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shrink-0">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="p-2 bg-gradient-to-tr from-cyan-500 to-indigo-600 rounded-lg text-white">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-slate-950" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-white">Console Konsultasi AI</h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500"></span>
                    </span>
                    <p className="font-mono text-[9px] text-slate-400 uppercase tracking-wider">
                      Model: <span className="text-cyan-400 font-bold">{activeModelInfo}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Provider Selector & Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex p-0.5 bg-slate-900 border border-slate-800 rounded-lg text-[10px] font-mono">
                  <button
                    type="button"
                    onClick={() => setProvider("auto")}
                    className={`px-2 py-1 rounded transition-all cursor-pointer ${
                      provider === "auto"
                        ? "bg-cyan-500 text-slate-950 font-bold"
                        : "text-slate-400 hover:text-white"
                    }`}
                    title="Auto-switch ke NVIDIA NIM jika Gemini limit"
                  >
                    Auto
                  </button>
                  <button
                    type="button"
                    onClick={() => setProvider("gemini")}
                    className={`px-2 py-1 rounded transition-all cursor-pointer ${
                      provider === "gemini"
                        ? "bg-indigo-600 text-white font-bold"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Gemini
                  </button>
                  <button
                    type="button"
                    onClick={() => setProvider("nvidia")}
                    className={`px-2 py-1 rounded transition-all cursor-pointer ${
                      provider === "nvidia"
                        ? "bg-emerald-600 text-white font-bold"
                        : "text-slate-400 hover:text-white"
                    }`}
                    title="NVIDIA NIM / OpenRouter (Llama, Nemotron, dll.)"
                  >
                    Nvidia NIM / OR
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setMessages([
                      {
                        role: "assistant",
                        content: "Halo! Sesi konsultasi telah dimulai kembali. Topik teknologi apa yang ingin Anda diskusikan kali ini?",
                        timestamp: new Date()
                      }
                    ]);
                    setErrorMsg(null);
                  }}
                  className="font-mono text-[10px] text-slate-400 hover:text-cyan-400 border border-slate-800 hover:border-slate-700 bg-slate-900/40 px-2.5 py-1.5 rounded transition-all cursor-pointer shrink-0"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-950/20">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-3 max-w-[85%] ${
                    msg.role === "user" ? "ml-auto flex-row-reverse space-x-reverse" : ""
                  }`}
                >
                  {/* Icon wrapper */}
                  <div
                    className={`p-2 rounded-xl shrink-0 text-white ${
                      msg.role === "user"
                        ? "bg-slate-800"
                        : "bg-gradient-to-tr from-cyan-500 to-indigo-600"
                    }`}
                  >
                    {msg.role === "user" ? <User className="w-4 h-4" /> : <Cpu className="w-4 h-4" />}
                  </div>

                  {/* Message bubble */}
                  <div
                    className={`rounded-2xl p-4 text-xs sm:text-sm leading-relaxed border ${
                      msg.role === "user"
                        ? "bg-slate-800 border-slate-700/60 text-slate-200 rounded-tr-none"
                        : "bg-slate-900 border-slate-800 text-slate-300 rounded-tl-none shadow-md"
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.content}</p>
                    <span className="block font-mono text-[9px] text-slate-500 mt-2 text-right">
                      {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </div>
              ))}

              {/* Chatbot Loading State */}
              {isLoading && (
                <div className="flex items-start space-x-3 max-w-[85%]">
                  <div className="p-2 bg-gradient-to-tr from-cyan-500 to-indigo-600 rounded-xl text-white animate-bounce shrink-0">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div className="rounded-2xl p-4 bg-slate-900 border border-slate-800 rounded-tl-none shadow-md flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" />
                    <span className="font-mono text-[10px] text-slate-500 pl-1">Arblok AI menganalisis...</span>
                  </div>
                </div>
              )}

              {/* Error indicator */}
              {errorMsg && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl flex items-start gap-2.5 text-xs">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Error:</span> {errorMsg}
                    <button
                      onClick={() => handleSendMessage(messages[messages.length - 1].content)}
                      className="underline font-bold block mt-1 hover:text-white"
                    >
                      Coba kirim ulang
                    </button>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Chatbot Input Area */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(input);
              }}
              className="bg-slate-950 p-4 border-t border-slate-800 flex items-center gap-3 shrink-0"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                placeholder="Tanyakan mengenai digitalisasi, workflow monorepo, atau ide bisnis Anda..."
                className="flex-1 bg-slate-900 border border-slate-800 hover:border-slate-700/80 focus:border-cyan-500 focus:outline-none rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-200 placeholder-slate-500 transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-4 py-3 rounded-xl transition-all shadow-md shadow-cyan-500/10 inline-flex items-center justify-center shrink-0 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                aria-label="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>

        </div>
      </div>
    </section>
  );
}
