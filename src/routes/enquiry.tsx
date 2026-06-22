import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { z } from "zod";
import { Send, Check, Shield, Activity, Lock, Zap } from "lucide-react";

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

function CryptoEnquiryPage() {
  const [values, setValues] = useState<EnquiryValues>({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
    // Rich dark theme with multi-color gradients (Indigo, Purple, Pink)
    <div className="dark min-h-screen bg-[#09090b] text-zinc-300 font-sans selection:bg-purple-500/30 overflow-x-hidden relative">
      
      {/* Background Animated Elements (Multi-color) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600 opacity-20 blur-[120px] animate-pulse duration-[8000ms]"></div>
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-fuchsia-600 opacity-15 blur-[100px] animate-pulse duration-[10000ms] delay-1000"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-rose-600 opacity-10 blur-[120px] animate-pulse duration-[12000ms] delay-500"></div>
      </div>

      {/* Sticky Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#09090b]/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-2xl tracking-tighter text-white font-sans">
            <Zap className="w-6 h-6 text-fuchsia-500" fill="currentColor" />
            NEXUS<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-fuchsia-500">AI</span>
          </div>
        </div>
      </header>

      {/* SECTION 1: Hero & Center Form */}
      <section className="relative z-10 flex flex-col items-center justify-center pt-32 pb-20 px-6 text-center min-h-[90vh]">
        <div className="max-w-3xl mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.1] font-sans">
            Automate Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-fuchsia-500 to-rose-400">
              Crypto Wealth
            </span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Gain exclusive access to the institutional-grade algorithmic trading system that powered a $12M portfolio. Emotionless, precise, and running 24/7.
          </p>
        </div>

        {/* The Form - Centered directly under the hero text */}
        <div className="w-full max-w-xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200 fill-mode-both">
          <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
            {/* Form glowing accent top line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-rose-500 opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {submitted ? (
              <div className="py-12 text-center animate-in zoom-in duration-500">
                <div className="mx-auto w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6 border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                  <Check className="w-10 h-10 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Access Requested</h3>
                <p className="text-zinc-400">Our advisory team is reviewing your profile and will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="space-y-5 text-left">
                <div className="grid md:grid-cols-2 gap-5">
                  <Field label="Full Name" error={errors.name}>
                    <input
                      value={values.name}
                      onChange={e => update("name", e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-zinc-600 focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-all outline-none"
                      placeholder="e.g. John Doe"
                    />
                  </Field>
                  <Field label="Email Address" error={errors.email}>
                    <input
                      type="email"
                      value={values.email}
                      onChange={e => update("email", e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-zinc-600 focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-all outline-none"
                      placeholder="john@example.com"
                    />
                  </Field>
                </div>

                <Field label="Phone Number" error={errors.phone}>
                  <input
                    type="tel"
                    value={values.phone}
                    onChange={e => update("phone", e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-zinc-600 focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-all outline-none"
                    placeholder="+41 79 123 45 67"
                  />
                </Field>

                <Field label="Investment Goals (Optional)" error={errors.message}>
                  <textarea
                    value={values.message}
                    onChange={e => update("message", e.target.value)}
                    rows={3}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-zinc-600 focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-all outline-none resize-y"
                    placeholder="Briefly describe your targets..."
                  />
                </Field>

                <div className="pt-2">
                  <button 
                    type="submit" 
                    className="w-full relative group overflow-hidden rounded-xl px-8 py-4 bg-white/5 border border-fuchsia-500/30 hover:border-fuchsia-500 transition-all duration-300"
                  >
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <span className="relative flex items-center justify-center gap-2 font-bold text-sm tracking-wider text-white transition-colors duration-300">
                      Submit Application <Send className="w-4 h-4 ml-1" />
                    </span>
                  </button>
                  <div className="mt-4 flex items-center justify-center gap-2 text-[11px] uppercase tracking-wider text-zinc-500">
                    <Shield className="w-3.5 h-3.5 text-emerald-500" />
                    End-to-end encrypted submission
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* SECTIONS 2, 3, 4: Features Below the Form */}
      <section className="relative z-10 py-24 px-6 border-t border-white/5 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-both view-timeline">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-sans">The Nexus Advantage</h2>
            <p className="text-zinc-400 max-w-xl mx-auto">Bridging the gap between retail investors and institutional execution.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Activity,
                color: "text-indigo-400",
                bg: "bg-indigo-500/10",
                border: "hover:border-indigo-500/50 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]",
                title: "Algorithmic Precision",
                desc: "Micro-second execution based on real-time on-chain data and volume profile analysis, completely eliminating human emotional error."
              },
              {
                icon: Shield,
                color: "text-fuchsia-400",
                bg: "bg-fuchsia-500/10",
                border: "hover:border-fuchsia-500/50 hover:shadow-[0_0_30px_rgba(217,70,239,0.15)]",
                title: "Non-Custodial Security",
                desc: "Your funds never leave your exchange. We connect via restricted API keys that only allow trading, ensuring zero withdrawal risk."
              },
              {
                icon: Lock,
                color: "text-rose-400",
                bg: "bg-rose-500/10",
                border: "hover:border-rose-500/50 hover:shadow-[0_0_30px_rgba(244,63,94,0.15)]",
                title: "Strictly Limited Access",
                desc: "To protect our edge in the market and ensure maximum slippage control, we strictly cap the number of active automated users."
              }
            ].map((feature, i) => (
              <div 
                key={i} 
                className={`group p-8 rounded-3xl bg-white/[0.02] border border-white/5 transition-all duration-500 ${feature.border}`}
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
      <footer className="relative z-10 py-10 text-center text-xs text-zinc-600 border-t border-white/5 bg-black/40">
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
      <span className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-2">{label}</span>
      {children}
      {error && <span className="block mt-1.5 text-xs text-rose-400 font-medium">{error}</span>}
    </label>
  );
}
