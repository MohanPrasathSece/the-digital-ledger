import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { z } from "zod";
import { Send, Check, Shield, Activity, Lock, Zap, ArrowUpRight, ArrowDownRight, BarChart3, Terminal, Cpu } from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trackMetaEvent } from "@/lib/metaPixel";

export const Route = createFileRoute("/enquiry")({
  component: CryptoEnquiryPage,
});

const enquirySchema = z.object({
  name: z.string().trim().min(1, "Nom requis").max(100),
  email: z.string().trim().email("Email valide requis").max(255),
  phone: z.string().trim().min(5, "Numéro valide requis").max(20),
  countryCode: z.string().trim().default("CH"),
  message: z.string().trim().max(2000).optional(),
});
type EnquiryValues = z.infer<typeof enquirySchema>;
type EnquiryErrors = Partial<Record<keyof EnquiryValues, string>>;



// --- Fake Trading Data Generator ---
type Trade = { id: number; time: string; pair: string; type: "BUY" | "SELL"; price: string; amount: string };
const PAIRS = ["BTC/USDT", "ETH/USDT", "SOL/USDT", "LINK/USDT", "AVAX/USDT"];

function generateFakeTrade(id: number): Trade {
  const isBuy = Math.random() > 0.4;
  const pair = PAIRS[Math.floor(Math.random() * PAIRS.length)];
  const priceBase = pair === "BTC/USDT" ? 71000 : pair === "ETH/USDT" ? 3800 : pair === "SOL/USDT" ? 200 : 50;
  const price = (priceBase + (Math.random() * priceBase * 0.01) * (Math.random() > 0.5 ? 1 : -1)).toFixed(2);
  const amount = (Math.random() * 5 + 0.1).toFixed(4);
  const now = new Date();
  const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.${Math.floor(Math.random() * 999).toString().padStart(3, '0')}`;
  return { id, time, pair, type: isBuy ? "BUY" : "SELL", price: `$${price}`, amount };
}

export const COUNTRY_PHONE_PATTERNS: Record<string, { code: string; pattern: RegExp; example: string }> = {
  IE: { code: "353", pattern: /^8\d{8}$/, example: "87 123 4567" },
  CH: { code: "41", pattern: /^(0)?[1-9]\d{8}$/, example: "079 123 45 67" },
  FR: { code: "33", pattern: /^(0)?[1-9]\d{8}$/, example: "06 12 34 56 78" },
  BE: { code: "32", pattern: /^(0)?[1-9]\d{7,8}$/, example: "0470 12 34 56" },
  CA: { code: "1", pattern: /^[2-9]\d{9}$/, example: "416 123 4567" },
  US: { code: "1", pattern: /^[2-9]\d{9}$/, example: "212 123 4567" },
  GB: { code: "44", pattern: /^(0)?[7-9]\d{9}$/, example: "07700 900000" },
  DE: { code: "49", pattern: /^(0)?[1-9]\d{10,11}$/, example: "0151 12345678" },
  ES: { code: "34", pattern: /^[679]\d{8}$/, example: "612 345 678" },
  IT: { code: "39", pattern: /^[3]\d{8,9}$/, example: "312 345 6789" },
  NL: { code: "31", pattern: /^(0)?[6]\d{8}$/, example: "06 12345678" },
  SE: { code: "46", pattern: /^(0)?[7]\d{8}$/, example: "070 123 45 67" },
  AU: { code: "61", pattern: /^(0)?[4]\d{8}$/, example: "0412 345 678" },
  IN: { code: "91", pattern: /^[6-9]\d{9}$/, example: "98765 43210" },
  AE: { code: "971", pattern: /^(0)?[5]\d{8}$/, example: "050 123 4567" },
  SG: { code: "65", pattern: /^[89]\d{7}$/, example: "8123 4567" },
  ZA: { code: "27", pattern: /^(0)?[6-8]\d{8}$/, example: "082 123 4567" },
  BR: { code: "55", pattern: /^[1-9]{2}9\d{8}$/, example: "11 91234-5678" },
  MX: { code: "52", pattern: /^[1-9]\d{9}$/, example: "55 1234 5678" },
  JP: { code: "81", pattern: /^(0)?[7-9]0\d{8}$/, example: "090 1234 5678" },
  CY: { code: "357", pattern: /^[9]\d{7}$/, example: "99 123456" }
};

function CryptoEnquiryPage() {
  const [values, setValues] = useState<EnquiryValues>({ name: "", email: "", phone: "", countryCode: "CH", message: "" });
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  // Trading window state
  const [trades, setTrades] = useState<Trade[]>([]);
  const tradeIdRef = useRef(6);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Trading animation effect
  useEffect(() => {
    // Initialize with some trades
    const initialTrades = Array.from({ length: 6 }, (_, i) => generateFakeTrade(i));
    setTrades(initialTrades);

    const interval = setInterval(() => {
      setTrades(prev => {
        const newTrades = [generateFakeTrade(tradeIdRef.current), ...prev];
        tradeIdRef.current += 1;
        return newTrades.slice(0, 6); // Keep last 6
      });
    }, 800); // New trade every 800ms

    return () => clearInterval(interval);
  }, []);

  const update = <K extends keyof EnquiryValues>(k: K, v: EnquiryValues[K]) => {
    setValues(p => ({ ...p, [k]: v }));
    if (errors[k]) setErrors(p => ({ ...p, [k]: undefined }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = enquirySchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: EnquiryErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof EnquiryValues;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setSubmitError(null);
    setIsSubmitting(true);

    const cleanNum = (values.phone || "").replace(/\s+/g, "");
    const patternInfo = COUNTRY_PHONE_PATTERNS[values.countryCode || "CH"] || COUNTRY_PHONE_PATTERNS.CH;
    
    if (!cleanNum) {
      setErrors(p => ({ ...p, phone: "Veuillez entrer un numéro de téléphone" }));
      setIsSubmitting(false);
      return;
    } else if (!patternInfo.pattern.test(cleanNum)) {
      setErrors(p => ({ ...p, phone: `Veuillez entrer un numéro valide (ex: ${patternInfo.example})` }));
      setIsSubmitting(false);
      return;
    }

    try {
      const CRM_API_URL = import.meta.env.VITE_CRM_API_URL;
      const CRM_AUTH_TOKEN = import.meta.env.VITE_CRM_AUTH_TOKEN;

      if (!CRM_API_URL || !CRM_AUTH_TOKEN) {
        throw new Error("Erreur de configuration : Identifiants CRM manquants");
      }

      const [first_name, ...lastNameParts] = (values.name || "Unknown").trim().split(" ");
      const last_name = lastNameParts.length > 0 ? lastNameParts.join(" ") : "";

      let phoneFormatted = cleanNum.replace(/[^0-9+]/g, '');
      const selectedCode = values.countryCode?.toUpperCase() || 'CH';
      const dialCode = patternInfo.code;
      
      if (phoneFormatted.startsWith('+')) phoneFormatted = phoneFormatted.slice(1);
      if (phoneFormatted.startsWith('00')) phoneFormatted = phoneFormatted.slice(2);
      else if (phoneFormatted.startsWith('0')) phoneFormatted = phoneFormatted.slice(1);
      
      if (phoneFormatted.startsWith(dialCode) && phoneFormatted.length > dialCode.length + 5) {
        phoneFormatted = '00' + phoneFormatted;
      } else {
        phoneFormatted = '00' + dialCode + phoneFormatted;
      }

      const payload = {
        country_name: selectedCode.toLowerCase(),
        description: "Le Temps Moderne",
        phone: phoneFormatted,
        email: values.email,
        first_name: first_name,
        last_name: last_name,
        custom_fields: {
          Source_ID: "website",
          How_Much_Invested: "0",
          Outline_Your_Case: values.message || ""
        }
      };

      console.log("=== CRM SUBMISSION START ===");
      console.log("CRM URL:", CRM_API_URL);
      console.log("CRM Auth Token (Raw):", CRM_AUTH_TOKEN);
      console.log("Payload:", JSON.stringify(payload, null, 2));

      const response = await fetch(CRM_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": CRM_AUTH_TOKEN
        },
        body: JSON.stringify(payload)
      });

      console.log("CRM Response Status:", response.status);

      if (response.ok) {
        const responseText = await response.text().catch(() => "No text content");
        console.log("CRM Response Body (Success):", responseText);
        trackMetaEvent("Lead", {
          content_name: "Enquiry Form",
          email: values.email,
          phone: phoneFormatted,
        });
        trackMetaEvent("Contact");
        try {
          const url = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_DASHBOARD_URL) || "https://lead-dashboard-orcin.vercel.app/api/increment";
          await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ website: "Le Temps Moderne", type: "contact", name: values.name, email: values.email})
          }).catch(() => {});
        } catch (e: any) {
          // Ignore dashboard increment errors
        }
      }

      if (!response.ok) {
        const errorText = await response.text().catch(() => "Unknown error");
        console.error("CRM Response Body (Error 500/Failed):", errorText);
        throw new Error(`CRM responded with status ${response.status}: ${errorText}`);
      }

      setSubmitted(true);
      setValues({ name: "", email: "", phone: "", countryCode: "CH", message: "" });
    } catch (err: any) {
      console.error("CRM Submission Caught Error:", err);
      const rawMsg = (err?.message || err?.toString() || "");
      if (rawMsg.toLowerCase().includes("already exist") || rawMsg.toLowerCase().includes("already exists") || rawMsg.toLowerCase().includes("contacted")) {
        toast.success("Vous nous avez déjà contactés. Veuillez patienter.");
        setSubmitted(true);
        return;
      }
      setSubmitError(err.message || "Un problème est survenu. Veuillez réessayer.");
    } finally {
      console.log("=== CRM SUBMISSION END ===");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="dark min-h-screen bg-[#09090b] text-zinc-300 font-sans selection:bg-fuchsia-500/30 overflow-x-hidden relative">

      {/* Background Animated Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        {/* Glowing Orbs - Simplified for performance */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/10"></div>
        <div className="absolute top-[30%] right-[-10%] w-[40%] h-[40%] rounded-full bg-fuchsia-900/10"></div>
      </div>

      {/* Sticky Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#09090b]/90 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-2xl tracking-tighter text-white font-sans">
            <Zap className="w-6 h-6 text-fuchsia-500" fill="currentColor" />
            NEXUS<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-fuchsia-500">AI</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              SYSTÈME EN LIGNE
            </div>
          </div>
        </div>
      </header>

      {/* SECTION 1: Hero */}
      <section className="relative z-10 flex flex-col items-center justify-center pt-32 pb-16 px-6 text-center">
        <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1] font-sans">
            Surpassez Le Marché <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-fuchsia-500 to-rose-400">
              Avec Une Précision Mécanique
            </span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Arrêtez de vous fier aux émotions. Commencez à trader avec les mêmes algorithmes institutionnels utilisés par des portefeuilles de plusieurs millions de dollars.
          </p>
        </div>
      </section>

      {/* SECTION 2: Trading Window Animation (New) */}
      <section className="relative z-10 py-10 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#0f111a] border border-white/10 rounded-xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300 fill-mode-both">
            {/* Terminal Header */}
            <div className="bg-black/50 border-b border-white/5 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-zinc-400" />
                <span className="text-xs font-mono text-zinc-400 tracking-widest uppercase">Nexus Execution Engine v4.2.1</span>
              </div>
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
              </div>
            </div>
            {/* Terminal Body */}
            <div className="p-4 md:p-6 overflow-x-auto font-mono text-xs md:text-sm">
              <table className="w-full text-left min-w-[600px]">
                <thead className="text-zinc-500 border-b border-white/5">
                  <tr>
                    <th className="pb-3 font-normal">HORODATAGE</th>
                    <th className="pb-3 font-normal">PAIRE</th>
                    <th className="pb-3 font-normal">SENS</th>
                    <th className="pb-3 font-normal">PRIX</th>
                    <th className="pb-3 font-normal">MONTANT</th>
                    <th className="pb-3 font-normal text-right">STATUT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.02]">
                  {trades.map((trade) => (
                    <tr key={trade.id} className="animate-in fade-in slide-in-from-top-2 duration-300">
                      <td className="py-3 text-zinc-400">{trade.time}</td>
                      <td className="py-3 font-bold text-white">{trade.pair}</td>
                      <td className={`py-3 font-bold flex items-center gap-1 ${trade.type === 'BUY' ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {trade.type === 'BUY' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                        {trade.type}
                      </td>
                      <td className="py-3 text-white">{trade.price}</td>
                      <td className="py-3 text-zinc-300">{trade.amount}</td>
                      <td className="py-3 text-right">
                        <span className="inline-block px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded text-[10px] tracking-widest">EXÉCUTÉ</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Performance Metrics (New) */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { label: "Taux de Réussite", value: "84.2%", icon: BarChart3, color: "text-indigo-400" },
              { label: "Latence d'Exécution", value: "0.2ms", icon: Zap, color: "text-amber-400" },
              { label: "Volume Exécuté (24h)", value: "12.4M $", icon: Activity, color: "text-emerald-400" },
              { label: "Algorithmes Actifs", value: "14", icon: Cpu, color: "text-fuchsia-400" },
            ].map((stat, i) => (
              <div key={i} className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:bg-white/[0.05] transition-colors">
                <stat.icon className={`w-6 h-6 mb-3 ${stat.color}`} />
                <div className="text-3xl font-extrabold text-white mb-1 font-mono tracking-tight">{stat.value}</div>
                <div className="text-xs uppercase tracking-widest text-zinc-500 font-bold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: Contact/Enquiry Form (High Contrast) */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-2xl mx-auto">
          {/* HIGH CONTRAST FORM CONTAINER */}
          {/* Using a bright slate/indigo mix with strong borders and solid background to pop from the dark theme */}
          <div className="bg-[#1e1b4b] border-2 border-indigo-500/50 rounded-3xl p-8 md:p-12 shadow-[0_0_80px_rgba(99,102,241,0.25)] relative overflow-hidden group">
            {/* Intense glowing top accent */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-rose-400"></div>

            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-white mb-3">Demander un Accès Privé</h2>
              <p className="text-indigo-200 text-sm">Laissez vos coordonnées pour garantir votre place dans la prochaine cohorte d'intégration. Les places sont strictement limitées.</p>
            </div>

            {submitted && (
              <div className="py-12 text-center animate-in zoom-in duration-500">
                <div className="mx-auto w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(16,185,129,0.5)]">
                  <Check className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Candidature Reçue</h3>
                <p className="text-indigo-200">Notre équipe de conseillers examine votre profil et vous contactera sous peu.</p>
              </div>
            )}
            
            <div className={submitted ? "hidden" : "block"}>
              <form onSubmit={onSubmit} noValidate className="space-y-6 text-left">
                {submitError && (
                  <div className="bg-rose-500/10 border border-rose-500/50 rounded-xl p-4 text-rose-400 text-sm font-bold text-center">
                    {submitError}
                  </div>
                )}
                <div className="grid md:grid-cols-2 gap-6">
                  <Field label="Nom Complet" error={errors.name}>
                    <input
                      value={values.name}
                      onChange={e => update("name", e.target.value)}
                      className="w-full bg-[#111827] border border-indigo-400/30 rounded-xl px-4 py-4 text-white placeholder:text-indigo-300/50 focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-400/50 transition-all outline-none"
                      placeholder="ex. Jean Dupont"
                    />
                  </Field>
                  <Field label="Adresse Email" error={errors.email}>
                    <input
                      type="email"
                      value={values.email}
                      onChange={e => update("email", e.target.value)}
                      className="w-full bg-[#111827] border border-indigo-400/30 rounded-xl px-4 py-4 text-white placeholder:text-indigo-300/50 focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-400/50 transition-all outline-none"
                      placeholder="jean@exemple.com"
                    />
                  </Field>
                </div>

                <Field label="Numéro de Téléphone" error={errors.phone}>
                  <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
                    <Select value={values.countryCode} onValueChange={val => update("countryCode", val)}>
                      <SelectTrigger className="w-[110px] bg-[#111827] border border-indigo-400/30 rounded-xl px-4 py-[1.4rem] text-white focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-400/50 outline-none">
                        <SelectValue placeholder="Pays" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#111827] text-white border border-indigo-400/30 max-h-[300px]" position="popper" side="bottom">
                        {Object.entries(COUNTRY_PHONE_PATTERNS).map(([code, info]) => (
                          <SelectItem key={code} value={code} className="focus:bg-indigo-900 focus:text-white cursor-pointer">
                            {code} +{info.code}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <input
                      type="tel"
                      value={values.phone}
                      onChange={e => update("phone", e.target.value)}
                      className="w-full bg-[#111827] border border-indigo-400/30 rounded-xl px-4 py-4 text-white placeholder:text-indigo-300/50 focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-400/50 transition-all outline-none"
                      style={{ flex: 1 }}
                      placeholder="79 123 45 67"
                    />
                  </div>
                </Field>

                <Field label="Objectifs d'Investissement (Optionnel)" error={errors.message}>
                  <textarea
                    value={values.message}
                    onChange={e => update("message", e.target.value)}
                    rows={3}
                    className="w-full bg-[#111827] border border-indigo-400/30 rounded-xl px-4 py-4 text-white placeholder:text-indigo-300/50 focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-400/50 transition-all outline-none resize-y"
                    placeholder="Décrivez brièvement vos objectifs..."
                  />
                </Field>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full relative group overflow-hidden rounded-xl px-8 py-5 bg-gradient-to-r from-fuchsia-600 to-indigo-600 border-none shadow-[0_0_30px_rgba(217,70,239,0.3)] transition-all duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-[0_0_50px_rgba(217,70,239,0.6)] transform hover:-translate-y-1'}`}
                  >
                    <div className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <span className="relative flex items-center justify-center gap-2 font-bold text-[15px] tracking-widest text-white uppercase">
                      {isSubmitting ? (
                        <>Traitement <Activity className="w-5 h-5 ml-1 animate-pulse" /></>
                      ) : (
                        <>Soumettre la Candidature Sécurisée <Send className="w-5 h-5 ml-1" /></>
                      )}
                    </span>
                  </button>
                  <div className="mt-5 flex items-center justify-center gap-2 text-[11px] uppercase tracking-wider text-indigo-300/70">
                    <Shield className="w-4 h-4 text-emerald-400" />
                    Soumission chiffrée de bout en bout
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Features Below the Form */}
      <section className="relative z-10 py-24 px-6 border-t border-white/5 bg-black/40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-both">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-sans">L'Avantage Nexus</h2>
            <p className="text-zinc-400 max-w-xl mx-auto">Combler le fossé entre les investisseurs particuliers et l'exécution institutionnelle.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Activity,
                color: "text-indigo-400",
                bg: "bg-indigo-500/10",
                border: "border-indigo-500/20 hover:border-indigo-500/50 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]",
                title: "Précision Algorithmique",
                desc: "Exécution à la microseconde basée sur des données on-chain en temps réel et l'analyse du profil de volume, éliminant complètement l'erreur émotionnelle humaine."
              },
              {
                icon: Shield,
                color: "text-fuchsia-400",
                bg: "bg-fuchsia-500/10",
                border: "border-fuchsia-500/20 hover:border-fuchsia-500/50 hover:shadow-[0_0_30px_rgba(217,70,239,0.15)]",
                title: "Sécurité Non Dépositaire",
                desc: "Vos fonds ne quittent jamais votre plateforme. Nous nous connectons via des clés API restreintes qui ne permettent que le trading, assurant un risque de retrait nul."
              },
              {
                icon: Lock,
                color: "text-rose-400",
                bg: "bg-rose-500/10",
                border: "border-rose-500/20 hover:border-rose-500/50 hover:shadow-[0_0_30px_rgba(244,63,94,0.15)]",
                title: "Accès Strictement Limité",
                desc: "Pour protéger notre avantage sur le marché et assurer un contrôle maximal du slippage, nous plafonnons strictement le nombre d'utilisateurs automatisés actifs."
              }
            ].map((feature, i) => (
              <div
                key={i}
                className={`group p-8 rounded-3xl bg-black/60 border transition-all duration-500 ${feature.border}`}
              >
                <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  <feature.icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-sans tracking-tight">{feature.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: Animated Workflow / Ecosystem */}
      <section className="relative z-10 py-24 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-both">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-sans">Intelligence Écosystémique</h2>
            <p className="text-zinc-400 max-w-xl mx-auto">Boucles d'apprentissage continu opérant sur les marchés mondiaux.</p>
          </div>

          <div className="relative flex justify-center items-center h-[400px] scale-75 md:scale-100">
            {/* Center Node */}
            <div className="absolute z-20 w-24 h-24 bg-gradient-to-tr from-fuchsia-600 to-indigo-600 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(217,70,239,0.5)] animate-pulse">
              <Zap className="w-10 h-10 text-white" />
            </div>

            {/* Orbit 1 */}
            <div className="absolute z-10 w-[200px] h-[200px] border border-white/10 rounded-full animate-[spin_10s_linear_infinite]">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.8)]">
                <Activity className="w-3 h-3 text-white" />
              </div>
            </div>

            {/* Orbit 2 */}
            <div className="absolute z-10 w-[300px] h-[300px] border border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse]">
              <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(244,63,94,0.8)]">
                <Terminal className="w-3 h-3 text-white" />
              </div>
            </div>

            {/* Orbit 3 */}
            <div className="absolute z-10 w-[450px] h-[450px] border border-white/5 rounded-full animate-[spin_20s_linear_infinite]">
              <div className="absolute bottom-4 left-1/4 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.8)]">
                <Cpu className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-10 text-center text-xs text-zinc-600 border-t border-white/10 bg-black">
        <p className="font-semibold text-zinc-500">© 2026 NexusAI Trading Technologies. Tous droits réservés.</p>
        <p className="mt-3 max-w-2xl mx-auto opacity-70">
          Le trading de cryptomonnaies implique des risques importants et peut entraîner la perte de votre capital investi.
          Vous ne devriez pas investir plus que ce que vous pouvez vous permettre de perdre et devriez vous assurer de bien comprendre les risques impliqués.
        </p>
      </footer>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block text-left">
      <span className="block text-[11px] font-bold uppercase tracking-wider text-indigo-300 mb-2">{label}</span>
      {children}
      {error && <span className="block mt-1.5 text-xs text-rose-400 font-bold">{error}</span>}
    </label>
  );
}


function incrementLeadCount() {
  fetch("/api/leads-count", { method: "POST" }).catch((err) =>
    console.warn("[leads-count] Failed to increment:", err)
  );
}
