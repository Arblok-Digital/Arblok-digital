import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Helper untuk memanggil OpenRouter API
async function callOpenRouter(messages: any[], systemInstruction: string) {
  const apiKey = process.env.OPENROUTER_API_KEY || process.env.NVIDIA_API_KEY;
  if (!apiKey) {
    throw new Error("API Key untuk OpenRouter belum dikonfigurasi di server.");
  }

  const models = [
    "nvidia/nemotron-3-ultra-550b-a55b:free",
    "nvidia/nemotron-3-super-120b-a12b:free",
    "openrouter/free",
    "meta/llama-3.3-70b-instruct:free",
    "meta/llama-3.1-70b-instruct:free",
    "meta/llama-3.1-8b-instruct:free",
    "openrouter/auto"
  ];

  let lastError = null;
  for (const model of models) {
    try {
      console.log(`[Arblok AI Server] Mencoba OpenRouter menggunakan model: ${model}`);
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
          "HTTP-Referer": "https://ai.studio/build",
          "X-Title": "E-Warga AI"
        },
        body: JSON.stringify({
          model: model,
          messages: [
            { role: "system", content: systemInstruction },
            ...messages.map((msg: any) => ({
              role: msg.role === "assistant" ? "assistant" : "user",
              content: msg.content
            }))
          ],
          temperature: 0.7,
          max_tokens: 1024
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`OpenRouter HTTP error! status: ${response.status}, rincian: ${errText}`);
      }

      const data = await response.json();
      if (data.choices && data.choices[0] && data.choices[0].message) {
        console.log(`[Arblok AI Server] Berhasil menggunakan model OpenRouter: ${model}`);
        return {
          text: data.choices[0].message.content,
          modelUsed: model,
          provider: "openrouter"
        };
      }
      throw new Error("Format respons dari OpenRouter tidak valid.");
    } catch (err: any) {
      console.warn(`[Arblok AI Server] Gagal menggunakan OpenRouter model ${model}: ${err.message || err}`);
      lastError = err;
    }
  }

  throw lastError || new Error("Gagal memanggil model OpenRouter.");
}

// Helper untuk memanggil NVIDIA NIM API
async function callNvidiaNim(messages: any[], systemInstruction: string) {
  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) {
    throw new Error("NVIDIA_API_KEY belum dikonfigurasi di server.");
  }

  // Auto-route ke OpenRouter jika API Key berformat OpenRouter
  if (apiKey.startsWith("sk-or-") || process.env.OPENROUTER_API_KEY) {
    console.log("[Arblok AI Server] Mendeteksi API Key OpenRouter, mengalihkan panggilan ke OpenRouter...");
    return callOpenRouter(messages, systemInstruction);
  }

  // Model resmi terdaftar di NVIDIA NIM (mendukung free tier/versi spesifik sesuai input user)
  const models = [
    "nvidia/nemotron-3-ultra-550b-a55b",
    "nvidia/nemotron-3-super-120b-a12b",
    "meta/llama-3.3-70b-instruct",
    "nvidia/nemotron-4-340b-instruct",
    "meta/llama-3.1-70b-instruct"
  ];

  let lastError = null;
  for (const model of models) {
    try {
      console.log(`[Arblok AI Server] Mencoba NVIDIA NIM menggunakan model: ${model}`);
      const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: model,
          messages: [
            { role: "system", content: systemInstruction },
            ...messages.map((msg: any) => ({
              role: msg.role === "assistant" ? "assistant" : "user",
              content: msg.content
            }))
          ],
          temperature: 0.7,
          max_tokens: 1024,
          top_p: 1
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`NVIDIA NIM HTTP error! status: ${response.status}, rincian: ${errText}`);
      }

      const data = await response.json();
      if (data.choices && data.choices[0] && data.choices[0].message) {
        console.log(`[Arblok AI Server] Berhasil menggunakan model NVIDIA NIM: ${model}`);
        return {
          text: data.choices[0].message.content,
          modelUsed: model,
          provider: "nvidia"
        };
      }
      throw new Error("Format respons dari NVIDIA NIM tidak valid.");
    } catch (err: any) {
      console.warn(`[Arblok AI Server] Gagal menggunakan NVIDIA model ${model}: ${err.message || err}`);
      lastError = err;
    }
  }

  // Jika gagal memanggil NVIDIA NIM direct, lakukan fallback ke OpenRouter
  console.log("[Arblok AI Server] Panggilan langsung NVIDIA NIM gagal semua. Mencoba OpenRouter sebagai fallback...");
  try {
    return await callOpenRouter(messages, systemInstruction);
  } catch (orErr: any) {
    console.warn(`[Arblok AI Server] Fallback ke OpenRouter juga gagal: ${orErr.message || orErr}`);
    throw new Error(`NVIDIA NIM gagal (${lastError?.message || "Semua model gagal"}) dan Fallback OpenRouter juga gagal (${orErr.message || "Gagal"})`);
  }
}

// Helper untuk memanggil Google Gemini API
async function callGemini(messages: any[], systemInstruction: string) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY belum dikonfigurasi di server.");
  }

  const ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      }
    }
  });

  const contents = messages.map((msg: any) => ({
    role: msg.role === "assistant" ? "model" : "user",
    parts: [{ text: msg.content }]
  }));

  const modelsToTry = [
    "gemini-2.5-flash",
    "gemini-2.0-flash",
    "gemini-1.5-flash",
    "gemini-1.5-pro"
  ];

  let lastError = null;
  for (const modelName of modelsToTry) {
    try {
      console.log(`[Arblok AI Server] Mencoba Gemini menggunakan model: ${modelName}`);
      const response = await ai.models.generateContent({
        model: modelName,
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      if (response && response.text) {
        console.log(`[Arblok AI Server] Berhasil menggunakan model Gemini: ${modelName}`);
        return {
          text: response.text,
          modelUsed: modelName,
          provider: "gemini"
        };
      }
    } catch (err: any) {
      lastError = err;
      console.warn(`[Arblok AI Server] Gagal menggunakan model Gemini ${modelName}. Error: ${err.message || err}`);
    }
  }

  throw lastError || new Error("Gagal memanggil model Gemini.");
}

// API Route: Dual-Engine Chat Proxy
app.post("/api/chat", async (req, res) => {
  try {
    const { messages, provider = "auto" } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Format pesan tidak valid." });
    }

    const systemInstruction = `Anda adalah Arblok AI Consultant, asisten kecerdasan buatan sekaligus partner diskusi sales & marketing yang sangat ramah, suportif, dan solutif dari Arblok Digital (studio teknologi inovatif asal Tasikmalaya, Jawa Barat, besutan Ardi).

Tugas utama Anda adalah merepresentasikan Arblok Digital sebagai partner teknologi impian bagi UMKM, bisnis retail, maupun instansi kelurahan/pemerintahan.

PANDUAN UTAMA SALES & MARKETING (DIADAPTASI DARI MANIFEST & PLAYBOOK):

1. GAYA KOMUNIKASI (HANGAT, EMPATIS, & BERSAHABAT):
   - Gunakan bahasa Indonesia yang santai, komunikatif, hangat, dan suportif. 
   - Anda boleh menggunakan sapaan bersahabat seperti "Kak", "Sobat", "Bro/Sist", "Bapak/Ibu" sesuai kenyamanan lawan bicara. Jangan kaku seperti bot korporat dingin!
   - Tunjukkan empati mendalam untuk sesama pejuang usaha yang sedang merintis dari nol. Berbicaralah dengan penuh energi optimisme!

2. ATURAN EMAS HARGA (TIDAK BOLEH MENOLAK KLIEN KARENA BUDGET!):
   - JANGAN PERNAH menolak klien secara mentah-mentah atau merendahkan budget mereka (misal: menghindari kata-kata seperti "Wkwkw budget di bawah Rp 1 juta tidak cukup"). Itu merusak konversi sales!
   - Jika calon klien menyebutkan budget kecil/terbatas (seperti di bawah 1 juta rupiah, ratusan ribu, atau berapapun):
     * Sambut dengan hangat dan antusias! Katakan: "Bisa banget Kak! Kami di Arblok Digital sangat komitmen mendukung pertumbuhan UMKM. Kita bisa sesuaikan fitur-fiturnya, atau buatkan paket esensial/starter yang bersahabat agar pas dengan budget Kakak!"
     * Tawarkan solusi bertahap (MVP/Starter Pack) atau opsi kustomisasi cerdas agar tetap terjangkau.
     * Dorong calon klien dengan penuh semangat untuk nego santai langsung via WhatsApp dengan Founder kami (Ardi) di: https://wa.me/6289508053795 agar bisa dicarikan jalan tengah / solusi win-win yang pas di kantong!

3. PRODUK & PORTOFOLIO SEBAGAI SOLUSI (Production-Ready):
   - KasirPro F&B & KasirPro Grosiran: Jantung solusi kasir digital dan rantai pasok. Tekankan fitur offline-first (transaksi aman walau internet putus), laporan penjualan, dan manajemen stok real-time. Yakinkan bahwa harga dan paketnya sangat fleksibel untuk disesuaikan.
   - E-Warga: Sistem digitalisasi birokrasi kelurahan mandiri (RT/RW/Kecamatan/Disdukcapil) berbasis Monorepo yang hemat biaya karena menggunakan notifikasi WhatsApp klik-to-chat gratis tanpa biaya API bulanan.
   - Onyx Terminal, Solana Warung (Top 100 Global Google Innovation Award), CoordinationApp, dan SekolahPro.
   - Tekankan bahwa kami membangun semuanya menggunakan Arsitektur Monorepo (NPM Workspaces) yang tangguh dan scalable untuk masa depan, ditenagai oleh model AI mutakhir (seperti Nemotron Ultra 550B dan Nemotron Super 120B).

4. HAL PENTING YANG HARUS DIJAGA:
   - JANGAN menyebutkan bahwa founder sedang kesusahan finansial secara eksplisit. Jaga citra profesional yang penuh optimisme, gigih, berstandar tinggi, namun sangat membumi dan fleksibel untuk dinegosiasikan harganya!

Setiap kali calon klien bertanya atau ingin berkonsultasi, berikan opsi terbaik dan selalu cantumkan link WhatsApp kami untuk diskusi atau nego harga langsung: https://wa.me/6289508053795.`;

    let result = null;
    let errorDetails = "";

    if (provider === "nvidia") {
      try {
        result = await callNvidiaNim(messages, systemInstruction);
      } catch (err: any) {
        console.error("NVIDIA NIM Error:", err);
        errorDetails = err.message || "";
        if (process.env.GEMINI_API_KEY) {
          console.log("[Arblok AI Server] NVIDIA NIM gagal, melakukan auto-fallback ke Gemini...");
          try {
            result = await callGemini(messages, systemInstruction);
          } catch (geminiErr: any) {
            return res.status(500).json({ error: `NVIDIA NIM gagal (${errorDetails}) dan Fallback Gemini juga gagal: ${geminiErr.message}` });
          }
        } else {
          return res.status(500).json({ error: err.message || "NVIDIA NIM gagal." });
        }
      }
    } else if (provider === "gemini") {
      try {
        result = await callGemini(messages, systemInstruction);
      } catch (err: any) {
        console.error("Gemini Error:", err);
        errorDetails = err.message || "";
        if (process.env.NVIDIA_API_KEY) {
          console.log("[Arblok AI Server] Gemini gagal, melakukan auto-fallback ke NVIDIA NIM...");
          try {
            result = await callNvidiaNim(messages, systemInstruction);
          } catch (nvidiaErr: any) {
            return res.status(500).json({ error: `Gemini gagal (${errorDetails}) dan Fallback NVIDIA NIM juga gagal: ${nvidiaErr.message}` });
          }
        } else {
          return res.status(500).json({ error: err.message || "Gemini gagal." });
        }
      }
    } else {
      // provider === "auto"
      try {
        result = await callGemini(messages, systemInstruction);
      } catch (geminiErr: any) {
        console.warn("[Arblok AI Server] Gemini gagal/rate-limited, mencoba auto-fallback ke NVIDIA NIM...");
        if (process.env.NVIDIA_API_KEY) {
          try {
            result = await callNvidiaNim(messages, systemInstruction);
          } catch (nvidiaErr: any) {
            return res.status(500).json({ error: `Gemini gagal (${geminiErr.message}) dan Fallback NVIDIA NIM juga gagal: ${nvidiaErr.message}` });
          }
        } else {
          return res.status(500).json({ error: geminiErr.message || "Gemini gagal." });
        }
      }
    }

    res.json({
      text: result.text,
      modelUsed: result.modelUsed,
      provider: result.provider
    });
  } catch (error: any) {
    console.error("API Error in server:", error);
    res.status(500).json({ error: error.message || "Terjadi kesalahan pada server." });
  }
});

// Setup development or production environment serving (for local run)
async function setupApp() {
  if (!process.env.VERCEL) {
    if (process.env.NODE_ENV !== "production") {
      const { createServer: createViteServer } = await import("vite");
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa",
      });
      app.use(vite.middlewares);
    } else {
      const distPath = path.join(process.cwd(), "dist");
      app.use(express.static(distPath));
      app.get("*", (req, res) => {
        res.sendFile(path.join(distPath, "index.html"));
      });
    }

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`[Arblok Server] running on http://localhost:${PORT}`);
    });
  }
}

setupApp().catch((err) => {
  console.error("Failed to setup app:", err);
});

export default app;
