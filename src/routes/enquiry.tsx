import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { z } from "zod";
import { Send, Check, Shield, Activity, Lock, Cpu, ChevronDown } from "lucide-react";

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
    
    console.log("Submitting lead to CRM:", values);
    
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 800));
    setSubmitted(true);
    setValues({ name: "", email: "", phone: "", message: "" });
  };

  return (
    // Forcing a dark, modern crypto theme regardless of global settings
    <div className="dark min-h-screen bg-[#0a0f1a] text-slate-200 font-sans selection:bg-[#00f2fe] selection:text-[#0a0f1a] overflow-x-hidden relative">
      
      {/* Background Animated Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#00f2fe] opacity-10 blur-[120px] animate-pulse duration-[8000ms]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#4facfe] opacity-10 blur-[120px] animate-pulse duration-[10000ms] delay-1000"></div>
        <div className="absolute top-[40%] left-[60%] w-[20%] h-[20%] rounded-full bg-[#38f9d7] opacity-5 blur-[80px] animate-pulse duration-[6000ms] delay-500"></div>
      </div>

      {/* Sticky Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0f1a]/80 backdrop-blur-md border-b border-white/5 py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-xl tracking-wider text-white">
            <Cpu className="w-6 h-6 text-[#00f2fe]" />
            NEXUS<span className="text-[#00f2fe]">AI</span>
          </div>
          <a href="#form-section" className="text-xs font-bold tracking-[0.2em] uppercase px-5 py-2.5 rounded border border-[#00f2fe]/30 text-[#00f2fe] hover:bg-[#00f2fe] hover:text-[#0a0f1a] transition-all duration-300">
            Apply Now
          </a>
        </div>
      </header>

      {/* SECTION 1: Hero */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pt-20 text-center">
        <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-widest text-[#00f2fe]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f2fe] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00f2fe]"></span>
            </span>
            System Live & Operational
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
            Automate Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2fe] to-[#4facfe]">
              Crypto Wealth
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
            Gain exclusive access to the institutional-grade algorithmic trading system that powered Fabian Müller's $12M portfolio. Emotionless, precise, and running 24/7.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#form-section" className="w-full sm:w-auto px-8 py-4 rounded bg-gradient-to-r from-[#00f2fe] to-[#4facfe] text-[#0a0f1a] font-bold uppercase tracking-widest hover:scale-105 hover:shadow-[0_0_30px_rgba(0,242,254,0.3)] transition-all duration-300">
              Get Started Now
            </a>
            <a href="#features-section" className="w-full sm:w-auto px-8 py-4 rounded border border-white/10 hover:bg-white/5 font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2">
              Learn More <ChevronDown className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 2: Features */}
      <section id="features-section" className="relative z-10 py-24 px-6 bg-gradient-to-b from-transparent to-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300 fill-mode-both">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Choose NexusAI?</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Our proprietary technology bridges the gap between retail investors and institutional execution.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Activity,
                title: "Algorithmic Precision",
                desc: "Micro-second execution based on real-time on-chain data and volume profile analysis, entirely eliminating emotional trading."
              },
              {
                icon: Shield,
                title: "Non-Custodial Security",
                desc: "Your funds never leave your exchange. We connect via restricted API keys that only allow trading, never withdrawals."
              },
              {
                icon: Lock,
                title: "Strictly Limited Access",
                desc: "To protect our edge in the market, we strictly cap the number of active users. Access is granted by application only."
              }
            ].map((feature, i) => (
              <div 
                key={i} 
                className="group p-8 rounded-xl bg-white/[0.03] border border-white/5 hover:border-[#00f2fe]/30 hover:bg-white/[0.05] transition-all duration-500 animate-in fade-in slide-in-from-bottom-8 fill-mode-both"
                style={{ animationDelay: `${500 + (i * 200)}ms` }}
              >
                <div className="w-12 h-12 rounded-lg bg-[#00f2fe]/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#00f2fe]/20 transition-all duration-300">
                  <feature.icon className="w-6 h-6 text-[#00f2fe]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: Contact/Enquiry Form */}
      <section id="form-section" className="relative z-10 py-24 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            {/* Form glowing accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00f2fe] to-transparent"></div>
            
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-white mb-3">Request Private Access</h2>
              <p className="text-slate-400 text-sm">Leave your details to secure your place in the next onboarding cohort.</p>
            </div>

            {submitted ? (
              <div className="py-12 text-center animate-in zoom-in duration-500">
                <div className="mx-auto w-20 h-20 rounded-full bg-[#00f2fe]/20 flex items-center justify-center mb-6 border border-[#00f2fe]/50 shadow-[0_0_30px_rgba(0,242,254,0.2)]">
                  <Check className="w-10 h-10 text-[#00f2fe]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Application Received</h3>
                <p className="text-slate-400">Our advisory team is reviewing your profile and will contact you via phone within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Field label="Full Name" error={errors.name}>
                    <input
                      value={values.name}
                      onChange={e => update("name", e.target.value)}
                      className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-slate-600 focus:border-[#00f2fe] focus:ring-1 focus:ring-[#00f2fe] transition-all outline-none"
                      placeholder="e.g. John Doe"
                    />
                  </Field>
                  <Field label="Email Address" error={errors.email}>
                    <input
                      type="email"
                      value={values.email}
                      onChange={e => update("email", e.target.value)}
                      className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-slate-600 focus:border-[#00f2fe] focus:ring-1 focus:ring-[#00f2fe] transition-all outline-none"
                      placeholder="john@example.com"
                    />
                  </Field>
                </div>

                <Field label="Phone Number (for onboarding call)" error={errors.phone}>
                  <input
                    type="tel"
                    value={values.phone}
                    onChange={e => update("phone", e.target.value)}
                    className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-slate-600 focus:border-[#00f2fe] focus:ring-1 focus:ring-[#00f2fe] transition-all outline-none"
                    placeholder="+41 79 123 45 67"
                  />
                </Field>

                <Field label="Investment Goals / Initial Capital (Optional)" error={errors.message}>
                  <textarea
                    value={values.message}
                    onChange={e => update("message", e.target.value)}
                    rows={4}
                    className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-slate-600 focus:border-[#00f2fe] focus:ring-1 focus:ring-[#00f2fe] transition-all outline-none resize-y"
                    placeholder="Briefly describe your targets..."
                  />
                </Field>

                <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Shield className="w-4 h-4 text-[#00f2fe]" />
                    End-to-end encrypted submission
                  </div>
                  <button 
                    type="submit" 
                    className="w-full md:w-auto relative group overflow-hidden rounded px-8 py-3.5 bg-white/5 border border-[#00f2fe]/50 hover:border-[#00f2fe] transition-all duration-300"
                  >
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#00f2fe] to-[#4facfe] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-widest text-white group-hover:text-[#0a0f1a] transition-colors duration-300">
                      Submit Application <Send className="w-4 h-4" />
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 text-center text-xs text-slate-600 border-t border-white/5">
        <p>© 2026 NexusAI Trading Technologies. All rights reserved.</p>
        <p className="mt-2 max-w-2xl mx-auto">Cryptocurrency investments are subject to high market risk. Please make your investments cautiously.</p>
      </footer>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block text-left">
      <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">{label}</span>
      {children}
      {error && <span className="block mt-1.5 text-xs text-red-400">{error}</span>}
    </label>
  );
}
