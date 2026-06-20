import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import {
  ArrowUpRight, Bitcoin, TrendingUp, Wallet, Shield, Zap, Mail, Twitter,
  Send, Check, ChevronRight,
} from "lucide-react";

import hero from "@/assets/hero.jpg";
import card1 from "@/assets/card1.jpg";
import card2 from "@/assets/card2.jpg";
import card3 from "@/assets/card3.jpg";
import card4 from "@/assets/card4.jpg";

export const Route = createFileRoute("/crypto")({
  head: () => ({
    meta: [
      { title: "Crypto Hub — The Meridian" },
      { name: "description", content: "Live prices, on-chain analysis, influencer wallet tracking and long-form crypto journalism from The Meridian." },
      { property: "og:title", content: "Crypto Hub — The Meridian" },
      { property: "og:description", content: "Live prices, on-chain analysis, influencer wallet tracking and long-form crypto journalism." },
    ],
  }),
  component: CryptoPage,
});

const PRICES = [
  { sym: "BTC", name: "Bitcoin",  price: "$71,408.20", chg: "+1.18%", up: true,  cap: "$1.41T" },
  { sym: "ETH", name: "Ethereum", price: "$3,842.10",  chg: "+0.62%", up: true,  cap: "$461B" },
  { sym: "SOL", name: "Solana",   price: "$204.10",    chg: "+3.41%", up: true,  cap: "$94B" },
  { sym: "BNB", name: "BNB",      price: "$612.30",    chg: "-0.34%", up: false, cap: "$89B" },
  { sym: "XRP", name: "XRP",      price: "$0.5821",    chg: "-0.08%", up: false, cap: "$32B" },
  { sym: "ADA", name: "Cardano",  price: "$0.4421",    chg: "+1.92%", up: true,  cap: "$15B" },
  { sym: "DOGE",name: "Dogecoin", price: "$0.1611",    chg: "+5.21%", up: true,  cap: "$23B" },
  { sym: "LINK",name: "Chainlink",price: "$18.40",     chg: "-1.10%", up: false, cap: "$11B" },
];

const FEATURES = [
  { img: card1, cat: "On-Chain",   title: "The 14 wallets that moved $1.2B before the ETF approval", time: "7 min" },
  { img: card2, cat: "Memecoins",  title: "A $400 frog trade became a $9M exit in nineteen days",   time: "12 min" },
  { img: card3, cat: "Research",   title: "Spotting influencer wallets before they post: a field guide", time: "18 min" },
  { img: card4, cat: "Bitcoin",    title: "The next nine corporate treasuries to stack BTC in 2026",  time: "10 min" },
];

const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100, "Name must be under 100 characters"),
  email: z.string().trim().email("Please enter a valid email").max(255),
  topic: z.enum(["tip", "interview", "research", "general"], { message: "Pick a topic" }),
  message: z.string().trim().min(10, "Tell us a bit more (10+ characters)").max(2000, "Message must be under 2000 characters"),
});
type ContactValues = z.infer<typeof contactSchema>;
type ContactErrors = Partial<Record<keyof ContactValues, string>>;

function CryptoPage() {
  const [values, setValues] = useState<ContactValues>({ name: "", email: "", topic: "tip", message: "" });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const update = <K extends keyof ContactValues>(k: K, v: ContactValues[K]) => {
    setValues(p => ({ ...p, [k]: v }));
    if (errors[k]) setErrors(p => ({ ...p, [k]: undefined }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: ContactErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof ContactValues;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setSubmitted(true);
    setValues({ name: "", email: "", topic: "tip", message: "" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground text-[14px] leading-relaxed">
      {/* Mini header */}
      <header className="sticky top-0 z-40 border-b border-rule bg-paper/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-3.5">
          <Link to="/" className="font-serif text-xl font-black">
            The <span className="italic text-primary">Meridian</span>
            <span className="ml-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">/ Crypto</span>
          </Link>
          <nav className="hidden items-center gap-5 text-[11px] uppercase tracking-[0.18em] text-foreground/80 md:flex">
            <a href="#prices" className="hover:text-primary">Prices</a>
            <a href="#stories" className="hover:text-primary">Stories</a>
            <a href="#contact" className="hover:text-primary">Contact</a>
            <Link to="/" className="hover:text-primary">← Back</Link>
          </nav>
          <a href="#contact" className="inline-flex items-center gap-1 bg-foreground px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-paper transition hover:bg-primary">
            Submit a tip <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="border-b border-rule">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-6 py-14 md:grid-cols-12 md:py-20">
          <div className="md:col-span-7">
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em]">
              <span className="bg-primary px-2.5 py-1 text-primary-foreground">Crypto Hub</span>
              <span className="text-muted-foreground">Live · 24/7</span>
            </div>
            <h1 className="mt-5 font-serif text-[2rem] font-black leading-[1.05] tracking-tight md:text-[3.25rem]">
              The <span className="italic text-primary">on-chain</span> desk.
            </h1>
            <p className="mt-5 max-w-2xl font-serif text-base italic text-muted-foreground md:text-lg">
              Live prices, wallet-level reporting and long-form journalism on the people quietly
              moving the digital asset markets.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <a href="#prices" className="btn-ghost"><TrendingUp className="h-3.5 w-3.5" /> Live prices</a>
              <a href="#stories" className="btn-ghost"><Bitcoin className="h-3.5 w-3.5" /> Top stories</a>
              <a href="#contact" className="btn-ghost"><Send className="h-3.5 w-3.5" /> Submit a tip</a>
              <Link to="/" className="btn-ghost"><ArrowUpRight className="h-3.5 w-3.5" /> Read the MrBeast feature</Link>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-rule pt-6">
              {[
                { k: "$2.6T", v: "Total market cap" },
                { k: "658", v: "Wallets we track" },
                { k: "142", v: "Stories published" },
              ].map(s => (
                <div key={s.k}>
                  <div className="font-serif text-2xl font-bold text-primary md:text-3xl">{s.k}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
          <figure className="md:col-span-5">
            <div className="relative overflow-hidden">
              <img src={hero} alt="Crypto editorial" width={1600} height={1067} className="aspect-[4/5] w-full object-cover" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/15 to-transparent" />
            </div>
          </figure>
        </div>
      </section>

      {/* PRICES */}
      <section id="prices" className="border-b border-rule">
        <div className="mx-auto max-w-[1400px] px-6 py-14">
          <div className="mb-6 flex items-end justify-between border-b border-rule pb-3">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-primary">Live Market</div>
              <h2 className="mt-1 font-serif text-2xl font-bold md:text-3xl">Prices, updated each minute</h2>
            </div>
            <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">UTC 14:02</span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-[0.88rem]">
              <thead>
                <tr className="border-b border-rule text-left text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  <th className="py-2.5 pr-4">#</th>
                  <th className="py-2.5 pr-4">Asset</th>
                  <th className="py-2.5 pr-4">Price</th>
                  <th className="py-2.5 pr-4">24h</th>
                  <th className="py-2.5 pr-4">Market Cap</th>
                  <th className="py-2.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {PRICES.map((p, i) => (
                  <tr key={p.sym} className="border-b border-rule/50 hover:bg-secondary/40">
                    <td className="py-3 pr-4 font-mono text-[11px] text-muted-foreground">{String(i+1).padStart(2,"0")}</td>
                    <td className="py-3 pr-4">
                      <div className="font-serif text-base font-bold">{p.name}</div>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{p.sym}</div>
                    </td>
                    <td className="py-3 pr-4 font-mono">{p.price}</td>
                    <td className={`py-3 pr-4 font-mono ${p.up ? "text-primary" : "text-[color:var(--color-navy)]"}`}>{p.chg}</td>
                    <td className="py-3 pr-4 font-mono text-muted-foreground">{p.cap}</td>
                    <td className="py-3 text-right">
                      <button className="btn-ghost"><Wallet className="h-3.5 w-3.5" /> Track</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* STORIES */}
      <section id="stories" className="mx-auto max-w-[1400px] px-6 py-14">
        <div className="mb-6 flex items-end justify-between border-b border-rule pb-3">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-primary">Featured</div>
            <h2 className="mt-1 font-serif text-2xl font-bold md:text-3xl">Long reads on crypto</h2>
          </div>
          <Link to="/" className="hidden text-[10px] uppercase tracking-[0.22em] text-foreground/70 hover:text-primary md:inline">
            ← Back to home <ChevronRight className="-mt-0.5 inline h-3 w-3" />
          </Link>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(a => (
            <a key={a.title} href="#" className="group block">
              <div className="relative overflow-hidden">
                <img src={a.img} alt="" width={800} height={600} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
              </div>
              <div className="mt-3 text-[10px] uppercase tracking-[0.25em] text-primary">{a.cat}</div>
              <h3 className="mt-1.5 font-serif text-base font-bold leading-snug story-link story-link-hover md:text-lg">{a.title}</h3>
              <div className="mt-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{a.time}</div>
            </a>
          ))}
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-rule bg-secondary/40">
        <div className="mx-auto grid max-w-[1400px] gap-6 px-6 py-10 md:grid-cols-3">
          {[
            { I: Shield, t: "Wallet-anonymous tips", d: "PGP, Signal and proton-routed email. We protect sources." },
            { I: Zap,    t: "On-chain verified",     d: "Every claim is checked against the public ledger before we publish." },
            { I: Mail,   t: "Direct to the desk",    d: "Your message reaches a human editor, not a queue." },
          ].map(({ I, t, d }) => (
            <div key={t} className="flex gap-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                <I className="h-4 w-4" />
              </div>
              <div>
                <div className="font-serif text-base font-bold">{t}</div>
                <div className="mt-1 text-[0.85rem] text-muted-foreground">{d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="mx-auto max-w-[1400px] px-6 py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="text-[10px] uppercase tracking-[0.3em] text-primary">Contact the desk</div>
            <h2 className="mt-2 font-serif text-3xl font-bold leading-tight md:text-4xl">
              Got a wallet to share, or a story to break?
            </h2>
            <p className="mt-4 max-w-md text-[0.92rem] text-muted-foreground">
              The crypto desk reads every message. Tips about influencer wallets, undisclosed token
              positions, exchange leaks and corporate treasury moves are especially welcome.
            </p>
            <ul className="mt-6 space-y-3 text-[0.88rem]">
              <li className="flex items-center gap-3"><Mail className="h-4 w-4 text-primary" /> crypto@meridian.example</li>
              <li className="flex items-center gap-3"><Twitter className="h-4 w-4 text-primary" /> @meridian_crypto</li>
              <li className="flex items-center gap-3"><Shield className="h-4 w-4 text-primary" /> PGP key on request</li>
            </ul>
          </div>

          <div className="md:col-span-7">
            {submitted ? (
              <div className="border border-primary bg-secondary/60 p-8 text-center">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-serif text-xl font-bold">Message received</h3>
                <p className="mt-2 text-[0.9rem] text-muted-foreground">
                  Thank you. An editor will read your note within 24 hours. We will only reply from
                  an @meridian address.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn-ghost mt-5">Send another</button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="border border-rule bg-card p-6 md:p-8">
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Your name" error={errors.name}>
                    <input
                      value={values.name}
                      onChange={e => update("name", e.target.value)}
                      maxLength={100}
                      placeholder="Jane Donaldson"
                      className="input"
                    />
                  </Field>
                  <Field label="Email" error={errors.email}>
                    <input
                      type="email"
                      value={values.email}
                      onChange={e => update("email", e.target.value)}
                      maxLength={255}
                      placeholder="you@domain.com"
                      className="input"
                    />
                  </Field>
                </div>

                <div className="mt-4">
                  <Field label="Topic" error={errors.topic}>
                    <select
                      value={values.topic}
                      onChange={e => update("topic", e.target.value as ContactValues["topic"])}
                      className="input"
                    >
                      <option value="tip">Confidential tip</option>
                      <option value="interview">Interview request</option>
                      <option value="research">Research collaboration</option>
                      <option value="general">General inquiry</option>
                    </select>
                  </Field>
                </div>

                <div className="mt-4">
                  <Field label="Message" error={errors.message} hint={`${values.message.length} / 2000`}>
                    <textarea
                      value={values.message}
                      onChange={e => update("message", e.target.value)}
                      maxLength={2000}
                      rows={6}
                      placeholder="Share wallet addresses, links, or context. We will never publish your identity without explicit consent."
                      className="input resize-y"
                    />
                  </Field>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <p className="max-w-sm text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    By submitting, you agree to our editorial confidentiality policy.
                  </p>
                  <div className="flex gap-2">
                    <button type="reset" onClick={() => { setValues({ name: "", email: "", topic: "tip", message: "" }); setErrors({}); }} className="btn-ghost">Reset</button>
                    <button type="submit" className="inline-flex items-center gap-1.5 bg-primary px-5 py-2 text-[11px] uppercase tracking-[0.2em] text-primary-foreground transition hover:bg-foreground">
                      Send message <Send className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-rule">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 px-6 py-6 text-[11px] text-muted-foreground md:flex-row">
          <div>© MMXXVI The Meridian Publishing Co. · Crypto Desk</div>
          <Link to="/" className="hover:text-primary">← Back to The Meridian</Link>
        </div>
      </footer>
    </div>
  );
}

function Field({ label, error, hint, children }: { label: string; error?: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[0.22em] text-foreground/80">{label}</span>
        {hint && <span className="text-[10px] text-muted-foreground">{hint}</span>}
      </div>
      {children}
      {error && <div className="mt-1 text-[11px] text-[color:var(--color-destructive)]">{error}</div>}
    </label>
  );
}