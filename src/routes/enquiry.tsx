import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { z } from "zod";
import { Send, Check, Shield, Activity, Lock, Zap, ArrowUpRight, ArrowDownRight, BarChart3, Terminal, Cpu } from "lucide-react";

export const Route = createFileRoute("/enquiry")({
  component: CryptoEnquiryPage,
});

const enquirySchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Valid email required").max(255),
  phone: z.string().trim().min(5, "Valid phone required").max(20),
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
  const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.${Math.floor(Math.random()*999).toString().padStart(3, '0')}`;
  return { id, time, pair, type: isBuy ? "BUY" : "SELL", price: `$${price}`, amount };
}

function CryptoEnquiryPage() {
  const [values, setValues] = useState<EnquiryValues>({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [submitted, setSubmitted] = useState(false);
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
    const initialTrades = Array.from({length: 6}, (_, i) => generateFakeTrade(i));
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
    
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 800));
    setSubmitted(true);
    setValues({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="dark min-h-screen bg-[#09090b] text-zinc-300 font-sans selection:bg-fuchsia-500/30 overflow-x-hidden relative">
      
      {/* Background Animated Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        {/* Glowing Orbs */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600 opacity-20 blur-[120px] animate-pulse duration-[8000ms]"></div>
        <div className="absolute top-[30%] right-[-10%] w-[40%] h-[40%] rounded-full bg-fuchsia-600 opacity-15 blur-[100px] animate-pulse duration-[10000ms] delay-1000"></div>
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
              SYSTEM ONLINE
            </div>
          </div>
        </div>
      </header>

      {/* SECTION 1: Hero */}
      <section className="relative z-10 flex flex-col items-center justify-center pt-32 pb-16 px-6 text-center">
        <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1] font-sans">
            Outperform The Market <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-fuchsia-500 to-rose-400">
              With Machine Precision
            </span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Stop relying on emotion. Start trading with the exact institutional-grade algorithms used by multi-million dollar portfolios.
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
                    <th className="pb-3 font-normal">TIMESTAMP</th>
                    <th className="pb-3 font-normal">PAIR</th>
                    <th className="pb-3 font-normal">SIDE</th>
                    <th className="pb-3 font-normal">PRICE</th>
                    <th className="pb-3 font-normal">AMOUNT</th>
                    <th className="pb-3 font-normal text-right">STATUS</th>
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
                        <span className="inline-block px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded text-[10px] tracking-widest">FILLED</span>
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
              { label: "Win Rate", value: "84.2%", icon: BarChart3, color: "text-indigo-400" },
              { label: "Execution Latency", value: "0.2ms", icon: Zap, color: "text-amber-400" },
              { label: "24h Volume Executed", value: "$12.4M", icon: Activity, color: "text-emerald-400" },
              { label: "Active Algorithms", value: "14", icon: Cpu, color: "text-fuchsia-400" },
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
              <h2 className="text-3xl font-bold text-white mb-3">Request Private Access</h2>
              <p className="text-indigo-200 text-sm">Leave your details to secure your place in the next onboarding cohort. Spaces are strictly limited.</p>
            </div>

            {submitted ? (
              <div className="py-12 text-center animate-in zoom-in duration-500">
                <div className="mx-auto w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(16,185,129,0.5)]">
                  <Check className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Application Received</h3>
                <p className="text-indigo-200">Our advisory team is reviewing your profile and will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="space-y-6 text-left">
                <div className="grid md:grid-cols-2 gap-6">
                  <Field label="Full Name" error={errors.name}>
                    <input
                      value={values.name}
                      onChange={e => update("name", e.target.value)}
                      className="w-full bg-[#111827] border border-indigo-400/30 rounded-xl px-4 py-4 text-white placeholder:text-indigo-300/50 focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-400/50 transition-all outline-none"
                      placeholder="e.g. John Doe"
                    />
                  </Field>
                  <Field label="Email Address" error={errors.email}>
                    <input
                      type="email"
                      value={values.email}
                      onChange={e => update("email", e.target.value)}
                      className="w-full bg-[#111827] border border-indigo-400/30 rounded-xl px-4 py-4 text-white placeholder:text-indigo-300/50 focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-400/50 transition-all outline-none"
                      placeholder="john@example.com"
                    />
                  </Field>
                </div>

                <Field label="Phone Number" error={errors.phone}>
                  <input
                    type="tel"
                    value={values.phone}
                    onChange={e => update("phone", e.target.value)}
                    className="w-full bg-[#111827] border border-indigo-400/30 rounded-xl px-4 py-4 text-white placeholder:text-indigo-300/50 focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-400/50 transition-all outline-none"
                    placeholder="+41 79 123 45 67"
                  />
                </Field>

                <Field label="Investment Goals (Optional)" error={errors.message}>
                  <textarea
                    value={values.message}
                    onChange={e => update("message", e.target.value)}
                    rows={3}
                    className="w-full bg-[#111827] border border-indigo-400/30 rounded-xl px-4 py-4 text-white placeholder:text-indigo-300/50 focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-400/50 transition-all outline-none resize-y"
                    placeholder="Briefly describe your targets..."
                  />
                </Field>

                <div className="pt-4">
                  <button 
                    type="submit" 
                    className="w-full relative group overflow-hidden rounded-xl px-8 py-5 bg-gradient-to-r from-fuchsia-600 to-indigo-600 border-none shadow-[0_0_30px_rgba(217,70,239,0.3)] hover:shadow-[0_0_50px_rgba(217,70,239,0.6)] transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <span className="relative flex items-center justify-center gap-2 font-bold text-[15px] tracking-widest text-white uppercase">
                      Submit Secure Application <Send className="w-5 h-5 ml-1" />
                    </span>
                  </button>
                  <div className="mt-5 flex items-center justify-center gap-2 text-[11px] uppercase tracking-wider text-indigo-300/70">
                    <Shield className="w-4 h-4 text-emerald-400" />
                    End-to-end encrypted submission
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 5: Features Below the Form */}
      <section className="relative z-10 py-24 px-6 border-t border-white/5 bg-black/40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-both">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-sans">The Nexus Advantage</h2>
            <p className="text-zinc-400 max-w-xl mx-auto">Bridging the gap between retail investors and institutional execution.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Activity,
                color: "text-indigo-400",
                bg: "bg-indigo-500/10",
                border: "border-indigo-500/20 hover:border-indigo-500/50 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]",
                title: "Algorithmic Precision",
                desc: "Micro-second execution based on real-time on-chain data and volume profile analysis, completely eliminating human emotional error."
              },
              {
                icon: Shield,
                color: "text-fuchsia-400",
                bg: "bg-fuchsia-500/10",
                border: "border-fuchsia-500/20 hover:border-fuchsia-500/50 hover:shadow-[0_0_30px_rgba(217,70,239,0.15)]",
                title: "Non-Custodial Security",
                desc: "Your funds never leave your exchange. We connect via restricted API keys that only allow trading, ensuring zero withdrawal risk."
              },
              {
                icon: Lock,
                color: "text-rose-400",
                bg: "bg-rose-500/10",
                border: "border-rose-500/20 hover:border-rose-500/50 hover:shadow-[0_0_30px_rgba(244,63,94,0.15)]",
                title: "Strictly Limited Access",
                desc: "To protect our edge in the market and ensure maximum slippage control, we strictly cap the number of active automated users."
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

      {/* Footer */}
      <footer className="relative z-10 py-10 text-center text-xs text-zinc-600 border-t border-white/10 bg-black">
        <p className="font-semibold text-zinc-500">© 2026 NexusAI Trading Technologies. All rights reserved.</p>
        <p className="mt-3 max-w-2xl mx-auto opacity-70">
          Trading cryptocurrencies involves significant risk and can result in the loss of your invested capital. 
          You should not invest more than you can afford to lose and should ensure that you fully understand the risks involved.
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
