import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Search, Bookmark, Headphones, Sun, Moon, Twitter, Facebook,
  Linkedin, Link2, ChevronRight, Mail, Rss, Menu, ArrowUpRight, Clock,
  TrendingUp, Quote, PlayCircle, Plus, Minus, ThumbsUp, MessageCircle,
  Printer, Download, Flag, Copy, Bell, Eye, Zap, Wallet,
} from "lucide-react";

import hero from "@/assets/hero.jpg";
import author from "@/assets/author.jpg";
import inline1 from "@/assets/inline1.jpg";
import inline2 from "@/assets/inline2.jpg";
import card1 from "@/assets/card1.jpg";
import card2 from "@/assets/card2.jpg";
import card3 from "@/assets/card3.jpg";
import card4 from "@/assets/card4.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "How a Swiss Influencer Turned $5K Into $12M In Crypto — The Meridian" },
      { name: "description", content: "An inside look at how a former Alpine skier rebuilt his life and rewrote the crypto influencer playbook." },
      { property: "og:title", content: "How a Swiss Influencer Turned $5K Into $12M In Crypto — The Meridian" },
      { property: "og:description", content: "Inside the wallet that rewrote the crypto influencer playbook." },
    ],
  }),
  component: Index,
});

const NAV = [
  "World","Politics","Business","Finance","Crypto","Technology","Markets",
  "Opinion","Research","Interviews","Podcasts","Editorial","Magazine",
  "Startups","AI","Culture","About","Archive","Contact",
];

const TOPICS = [
  "Bitcoin","Ethereum","Solana","Trading Bots","Influencers","DeFi",
  "Wallets","On-Chain","ETFs","Regulation","Web3","NFTs","Mining","Stablecoins",
];

const TRENDING = [
  "How AI is revolutionizing crypto trading strategies",
  "Inside the private groups where millionaires are made",
  "Why institutional money is flooding into Web3",
  "A wallet-by-wallet look at Europe's new crypto whales",
  "The on-chain footprint of the top 10 traders, decoded",
];

const RELATED = [
  { img: card1, cat: "On-Chain", title: "The 14 wallets that moved $1.2B in 48 hours", desc: "An on-chain reconstruction of who knew what, and when.", author: "Kenji Mori", time: "7 min", date: "Jun 14, 2026" },
  { img: card2, cat: "Trading", title: "How a $400 trade became a $9M exit", desc: "The complete trade journal of an anonymous sniper.", author: "Hannah Voss", time: "12 min", date: "Jun 11, 2026" },
  { img: card3, cat: "Research", title: "Spotting influencer wallets before they post", desc: "Six on-chain heuristics that consistently surface accumulation.", author: "Dr. Owen Hartley", time: "18 min", date: "Jun 09, 2026" },
  { img: card4, cat: "Bitcoin", title: "The quiet return of corporate treasuries to BTC", desc: "Strategy is no longer the only public company stacking coins.", author: "Priya Ramanathan", time: "10 min", date: "Jun 07, 2026" },
];

function EnquiryLink({ children, className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a href="/enquiry" target="_blank" rel="noopener noreferrer" className={className} {...props}>
      {children}
    </a>
  );
}

function Index() {
  const [progress, setProgress] = useState(0);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="min-h-screen bg-background text-foreground antialiased text-[14px] leading-relaxed">
      {/* Top utility strip */}
      <div className="border-b border-rule/60 bg-background/60 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          <div className="hidden items-center gap-4 md:flex">
            <span>Saturday, 20 June 2026</span>
            <span className="text-rule">·</span>
            <span>London Edition</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline">BTC $71,408 <span className="text-[color:var(--color-primary)]">+1.18%</span></span>
            <span className="hidden sm:inline">ETH $3,842 <span className="text-[color:var(--color-primary)]">+0.62%</span></span>
            <span>SOL $204.10 <span className="text-[color:var(--color-primary)]">+3.41%</span></span>
          </div>
        </div>
      </div>

      {/* Sticky header */}
      <header className="sticky top-0 z-40 border-b border-rule/80 bg-paper/90 backdrop-blur-md">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-6 py-3.5">
            <EnquiryLink className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-foreground/80 hover:text-primary">
              <Menu className="h-4 w-4" /> <span className="hidden sm:inline">Sections</span>
            </EnquiryLink>
            <EnquiryLink className="block text-center">
              <div className="font-serif text-xl font-black tracking-tight md:text-2xl">
                The <span className="italic text-primary">Meridian</span>
              </div>
              <div className="mt-0.5 text-[9px] uppercase tracking-[0.4em] text-muted-foreground">
                Est. MMXXVI · No. 1,284
              </div>
            </EnquiryLink>
            <div className="flex items-center gap-1.5 md:gap-2">
              <EnquiryLink aria-label="Search" className="rounded-full p-2 hover:bg-muted"><Search className="h-4 w-4" /></EnquiryLink>
              <EnquiryLink aria-label="Notifications" className="hidden rounded-full p-2 hover:bg-muted md:inline-flex"><Bell className="h-4 w-4" /></EnquiryLink>
              <button onClick={() => setDark(d => !d)} aria-label="Theme" className="rounded-full p-2 hover:bg-muted">
                {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
              <EnquiryLink className="hidden text-[11px] uppercase tracking-[0.18em] text-foreground/80 hover:text-primary md:inline">Login</EnquiryLink>
              <EnquiryLink className="inline-flex items-center gap-1 border border-foreground/80 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] transition hover:bg-foreground hover:text-paper">
                Crypto Hub
              </EnquiryLink>
              <EnquiryLink className="inline-flex items-center gap-1 bg-foreground px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-paper transition hover:bg-primary md:px-4">
                Join Now <ArrowUpRight className="h-3 w-3" />
              </EnquiryLink>
            </div>
          </div>

          <nav className="hide-scrollbar -mx-6 overflow-x-auto border-t border-rule/60 px-6">
            <ul className="flex min-w-max items-center gap-5 py-2.5 text-[11px] uppercase tracking-[0.18em] text-foreground/75">
              {NAV.map((n) => (
                <li key={n} className="shrink-0">
                  <EnquiryLink className={`story-link story-link-hover ${n === "Crypto" ? "text-primary" : ""}`}>
                    {n}
                  </EnquiryLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="h-[2px] w-full bg-rule/40">
          <div className="h-full bg-primary transition-[width] duration-150" style={{ width: `${progress}%` }} />
        </div>
      </header>

      {/* HERO */}
      <section className="border-b border-rule/60">
        <div className="mx-auto max-w-[1400px] px-6 pt-10 pb-14 md:pt-16 md:pb-20">
          <div className="grid gap-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-7">
              <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.25em]">
                <EnquiryLink className="bg-primary px-2.5 py-1 text-primary-foreground">Crypto · Feature</EnquiryLink>
                <span className="text-muted-foreground">The Long Read</span>
                <span className="border border-accent px-2 py-1 text-[color:var(--color-accent)]">Premium</span>
              </div>

              <h1 className="mt-5 font-serif text-[2rem] font-black leading-[1.05] tracking-tight md:text-[3.25rem] md:leading-[1.02]">
                From the Alps to the Blockchain: How <span className="italic text-primary">Fabian Müller</span> Turned a Ski Accident into a $12M Portfolio
              </h1>

              <p className="mt-5 max-w-2xl font-serif text-base italic text-muted-foreground md:text-lg">
                For nineteen months, the former Swiss Alpine skier quietly built a fortune from his hospital bed. Now, he's finally revealing the automated system that made it possible.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4 border-y border-rule/60 py-4">
                <img src={author} alt="Eleanor Whitcombe" width={44} height={44} className="h-11 w-11 rounded-full object-cover ring-1 ring-rule" loading="lazy" />
                <div className="min-w-0">
                  <div className="text-xs font-medium">By <span className="text-primary">Eleanor Whitcombe</span></div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Crypto & Markets Correspondent</div>
                </div>
                <EnquiryLink className="ml-1 border px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] transition border-rule hover:border-primary hover:text-primary">
                  Follow
                </EnquiryLink>
                <div className="ml-auto flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  <span>20 June 2026</span>
                  <span className="text-rule">·</span>
                  <span className="inline-flex items-center gap-1.5"><Clock className="h-3 w-3" /> 18 min read</span>
                  <span className="text-rule">·</span>
                  <span className="inline-flex items-center gap-1.5"><Eye className="h-3 w-3" /> 412k</span>
                </div>
              </div>

              {/* Action bar */}
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <EnquiryLink className="btn-ghost"><ThumbsUp className="h-3.5 w-3.5" /> Like · 12.3k</EnquiryLink>
                <EnquiryLink className="btn-ghost"><Bookmark className="h-3.5 w-3.5" /> Save</EnquiryLink>
                <EnquiryLink className="btn-ghost"><MessageCircle className="h-3.5 w-3.5" /> 1,284</EnquiryLink>
                <EnquiryLink className="btn-ghost"><Headphones className="h-3.5 w-3.5" /> Listen</EnquiryLink>
                <EnquiryLink className="btn-ghost"><Copy className="h-3.5 w-3.5" /> Copy link</EnquiryLink>
                <EnquiryLink className="btn-ghost"><Printer className="h-3.5 w-3.5" /> Print</EnquiryLink>
                <EnquiryLink className="btn-ghost"><Download className="h-3.5 w-3.5" /> Read offline</EnquiryLink>
                <EnquiryLink className="btn-ghost"><Flag className="h-3.5 w-3.5" /> Report</EnquiryLink>
                <span className="ml-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Share</span>
                {[Twitter, Facebook, Linkedin, Link2, Mail].map((Icon, i) => (
                  <EnquiryLink key={i} aria-label="share" className="rounded-full p-1.5 text-muted-foreground transition hover:bg-muted hover:text-primary">
                    <Icon className="h-3.5 w-3.5" />
                  </EnquiryLink>
                ))}
              </div>
            </div>

            <figure className="md:col-span-5">
              <EnquiryLink className="group relative overflow-hidden block">
                <img src={hero} alt="A glowing Bitcoin beside a vintage trading screen" width={1600} height={1067} className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/15 to-transparent" />
              </EnquiryLink>
              <figcaption className="mt-3 border-l-2 border-primary pl-3 text-[11px] italic text-muted-foreground">
                Müller's automated trading system generated unprecedented returns while he was recovering. Photograph illustration: Marius Klein for The Meridian.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* BODY + SIDEBAR */}
      <section className="mx-auto max-w-[1400px] px-6 py-14 md:py-20">
        <div className="grid gap-14 md:grid-cols-12 md:gap-16">
          <article className="md:col-span-8">
            <div className="mx-auto max-w-[680px]">
              <p className="drop-cap font-serif text-[1.05rem] leading-[1.7] text-foreground/90 md:text-[1.15rem]">
                The accident happened on a crisp Tuesday morning in St. Moritz. Fabian Müller, a rising star in Swiss Alpine skiing, took a catastrophic fall that shattered both his legs and his Olympic dreams. Bedridden for months, the 24-year-old athlete faced an uncertain future. But what started as a tragedy soon evolved into one of the most remarkable financial comeback stories of the decade.
              </p>

              <p className="mt-5 text-[0.95rem] leading-[1.85] text-foreground/85">
                Today, Müller is known to millions not for his prowess on the slopes, but for his uncanny ability to read the digital asset markets. With a portfolio that grew from a modest $5,000 savings account to over $12 million in just under two years, he has rewritten the playbook on wealth generation. The secret? An automated, AI-driven trading strategy that he perfected while recovering in the hospital.
              </p>

              <h2 className="mt-12 font-serif text-2xl font-bold leading-tight md:text-[1.8rem]">
                I.  The trade nobody saw
              </h2>
              <div className="mt-3 mb-6 h-px w-12 bg-primary" />

              <p className="text-[0.95rem] leading-[1.85] text-foreground/85">
                What makes Müller's position remarkable is not the size — there are larger wallets — but the discipline. Across nineteen months, including the brutal market drawdowns, his automated systems executed trades with mathematical precision, stripping away the emotional panic that ruins most retail investors. "It's the most calculated, emotionless trading I've ever seen," says Ayla Chen, lead analyst at Arkham.
              </p>

              <blockquote className="my-10 border-l-2 border-primary pl-5 md:my-14 md:-ml-10 md:pl-9">
                <Quote className="h-5 w-5 text-primary/60" />
                <p className="mt-3 font-serif text-[1.4rem] italic leading-[1.35] text-foreground md:text-[1.7rem]">
                  &ldquo;I treated the crypto markets like a downhill course. You don't react to the bumps, you anticipate them and let the physics do the work.&rdquo;
                </p>
                <footer className="mt-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  — Fabian Müller
                </footer>
              </blockquote>

              <figure className="my-10 -mx-4 md:-mx-16">
                <EnquiryLink className="block">
                  <img src={inline2} alt="Crypto trading screen" width={1200} height={800} loading="lazy" className="w-full transition hover:opacity-90" />
                </EnquiryLink>
                <figcaption className="mt-3 px-4 text-[11px] italic text-muted-foreground md:px-16">
                  A glimpse into the dashboard of the automated system that changed Müller's life.
                </figcaption>
              </figure>

              <h2 className="mt-12 font-serif text-2xl font-bold leading-tight md:text-[1.8rem]">
                II.  Anatomy of a 240,000% return
              </h2>
              <div className="mt-3 mb-6 h-px w-12 bg-primary" />

              <div className="my-8 grid grid-cols-2 gap-5 border-y border-rule py-8 md:grid-cols-4">
                {[
                  { k: "$5,000", v: "Initial investment (Mar 2024)" },
                  { k: "142 BTC", v: "Total accumulated by May 2026" },
                  { k: "$12.4M", v: "Mark-to-market, 20 Jun 2026" },
                  { k: "+240,000%", v: "Realised + unrealised return" },
                ].map((s) => (
                  <div key={s.k}>
                    <div className="font-serif text-2xl font-bold text-primary md:text-3xl">{s.k}</div>
                    <div className="mt-2 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{s.v}</div>
                  </div>
                ))}
              </div>

              <aside className="my-10 border border-rule bg-secondary/60 p-5 md:p-7">
                <div className="text-[10px] uppercase tracking-[0.3em] text-primary">Exclusive Access</div>
                <h3 className="mt-2 font-serif text-lg font-bold md:text-xl">How you can access the exact same system</h3>
                <p className="mt-2 text-[0.92rem] leading-[1.75] text-foreground/85">
                  For the first time, Fabian is allowing a select group of individuals to use the exact same automated trading system he developed. Spots are strictly limited to ensure market stability.
                </p>
                <EnquiryLink className="mt-4 inline-flex items-center gap-2 bg-primary px-4 py-2.5 text-[10px] uppercase tracking-[0.2em] text-primary-foreground transition hover:bg-foreground">
                  Apply for Access <ArrowUpRight className="h-3.5 w-3.5" />
                </EnquiryLink>
              </aside>

              <p className="text-[0.95rem] leading-[1.85] text-foreground/85">
                Skeptics point out that such returns are impossible to guarantee. But that misses the point. The strategy was not about gambling on memecoins. It was about leveraging AI to detect micro-fluctuations in institutional buying patterns. "The smartest creators understood the lesson of 2022 better than most VCs. Don't promote it. Let the algorithms do the heavy lifting," Müller explained in a recent interview.
              </p>

              <figure className="my-10">
                <figcaption className="mb-3 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  Figure 1 · The Müller Portfolio Balance vs. BTC price, Mar 2024 – Jun 2026
                </figcaption>
                <div className="border border-rule bg-card p-5">
                  <div className="flex h-44 items-end gap-1.5">
                    {[1,2,5,12,18,25,32,45,58,72,85,92,96,98,100].map((v, i) => (
                      <div key={i} className="group relative flex-1">
                        <div className="w-full bg-primary/80 transition-all duration-300 group-hover:bg-primary" style={{ height: `${v}%` }} />
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex justify-between text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                    <span>Mar '24</span><span>Sep '24</span><span>Mar '25</span><span>Jun '26</span>
                  </div>
                </div>
              </figure>

              <h2 className="mt-12 font-serif text-2xl font-bold leading-tight md:text-[1.8rem]">
                III.  What it means for the next cycle
              </h2>
              <div className="mt-3 mb-6 h-px w-12 bg-primary" />

              <p className="text-[0.95rem] leading-[1.85] text-foreground/85">
                If the previous bull market was defined by celebrities being paid to shill, the next one is defined by silent algorithmic accumulation. The retail trader now has the opportunity to level the playing field, provided they have access to the right tools. The information asymmetry has not vanished, but it is being democratised by pioneers like Müller.
              </p>

              <div className="my-10 border border-rule p-5 md:p-7 bg-foreground text-background text-center">
                <h3 className="font-serif text-2xl font-bold mb-4">Ready to rewrite your own destiny?</h3>
                <p className="text-[0.95rem] mb-6 opacity-90">Join the exclusive waiting list to gain access to the algorithmic trading system that powered Fabian's incredible success.</p>
                <EnquiryLink className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 text-[12px] font-bold uppercase tracking-[0.2em] transition hover:scale-105 duration-200">
                  Register Your Interest Now <ArrowUpRight className="h-4 w-4" />
                </EnquiryLink>
              </div>

              {/* End mark */}
              <div className="my-10 flex items-center justify-center gap-4">
                <div className="h-px w-10 bg-rule" />
                <div className="font-serif text-primary">❧</div>
                <div className="h-px w-10 bg-rule" />
              </div>

              {/* Bottom action bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-y border-rule py-4">
                <div className="flex flex-wrap items-center gap-2">
                  <EnquiryLink className="btn-ghost"><ThumbsUp className="h-3.5 w-3.5" /> Helpful</EnquiryLink>
                  <EnquiryLink className="btn-ghost"><Zap className="h-3.5 w-3.5" /> Start Trading</EnquiryLink>
                  <EnquiryLink className="btn-ghost"><Bell className="h-3.5 w-3.5" /> Follow updates</EnquiryLink>
                  <EnquiryLink className="btn-ghost"><Wallet className="h-3.5 w-3.5" /> Open Platform</EnquiryLink>
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Updated 2 hours ago</div>
              </div>

              {/* Author bio */}
              <section className="mt-10 flex gap-4 border-t border-rule pt-7">
                <img src={author} alt="Eleanor Whitcombe" width={72} height={72} loading="lazy" className="h-18 w-18 shrink-0 rounded-full object-cover ring-1 ring-rule" />
                <div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Written by</div>
                  <div className="mt-1 font-serif text-lg font-bold">Eleanor Whitcombe</div>
                  <p className="mt-1.5 text-[0.85rem] leading-relaxed text-muted-foreground">
                    Crypto & Markets Correspondent at The Meridian. Previously digital assets editor at the Financial Times.
                  </p>
                  <div className="mt-3 flex gap-2">
                    <EnquiryLink className="btn-ghost"><ArrowUpRight className="h-3.5 w-3.5" /> View all articles</EnquiryLink>
                  </div>
                </div>
              </section>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="md:col-span-4">
            <div className="sticky top-32 space-y-10">
              <SidebarBlock title="Editor's Picks">
                <ol className="space-y-4">
                  {[
                    "The 14 wallets that moved $1.2B before the ETF approval",
                    "Solana's new whales: a wallet-level census",
                    "Why Coinbase quietly delisted three memecoins last week",
                  ].map((t, i) => (
                    <li key={t} className="group flex gap-3 border-b border-rule/60 pb-4 last:border-0">
                      <span className="font-serif text-xl font-bold text-primary/80">0{i+1}</span>
                      <EnquiryLink className="font-serif text-[0.95rem] leading-snug story-link story-link-hover">{t}</EnquiryLink>
                    </li>
                  ))}
                </ol>
              </SidebarBlock>

              <SidebarBlock title="Most Read Today" icon={<TrendingUp className="h-3 w-3" />}>
                <ol className="space-y-3">
                  {TRENDING.map((t, i) => (
                    <li key={t} className="flex gap-3 text-[0.85rem] leading-snug">
                      <span className="font-mono text-[10px] text-muted-foreground">{String(i+1).padStart(2,"0")}</span>
                      <EnquiryLink className="story-link story-link-hover">{t}</EnquiryLink>
                    </li>
                  ))}
                </ol>
              </SidebarBlock>

              <SidebarBlock title="Live Crypto Prices">
                <ul className="divide-y divide-rule/60 text-[0.85rem]">
                  {[
                    ["Bitcoin","$71,408","+1.18%", true],
                    ["Ethereum","$3,842","+0.62%", true],
                    ["Solana","$204.10","+3.41%", true],
                    ["BNB","$612.30","-0.34%", false],
                    ["XRP","$0.5821","-0.08%", false],
                  ].map(([n,p,c,up]) => (
                    <li key={n as string} className="flex items-center justify-between py-2">
                      <span className="text-foreground/85">{n as string}</span>
                      <span className="flex items-center gap-3 font-mono text-[11px]">
                        <span>{p as string}</span>
                        <span className={up ? "text-primary" : "text-[color:var(--color-navy)]"}>{c as string}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <EnquiryLink className="mt-3 inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.22em] text-primary hover:underline">
                  Start Trading Now <ChevronRight className="h-3 w-3" />
                </EnquiryLink>
              </SidebarBlock>

              <div className="border border-rule bg-foreground p-5 text-background">
                <div className="text-[10px] uppercase tracking-[0.3em] text-accent">Exclusive Opportunity</div>
                <h3 className="mt-2 font-serif text-xl leading-tight">Join the Elite Inner Circle.</h3>
                <p className="mt-2 text-[0.85rem] leading-relaxed text-background/70">
                  Gain priority access to the very same trading algorithms that created a $12M fortune.
                </p>
                <div className="mt-4">
                  <EnquiryLink className="block text-center w-full bg-accent px-3 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-accent-foreground transition hover:bg-background hover:text-foreground">
                    Claim Your Spot
                  </EnquiryLink>
                </div>
              </div>

              <SidebarBlock title="Featured Podcast">
                <EnquiryLink className="group flex gap-3">
                  <div className="relative h-18 w-18 shrink-0 overflow-hidden bg-gradient-to-br from-primary to-[color:var(--color-navy)]" style={{ width: 72, height: 72 }}>
                    <PlayCircle className="absolute inset-0 m-auto h-7 w-7 text-paper transition group-hover:scale-110" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.22em] text-primary">Episode 142</div>
                    <div className="mt-1 font-serif text-[0.95rem] leading-snug story-link story-link-hover">
                      Interview with Fabian Müller: The Missing Years
                    </div>
                    <div className="mt-1 text-[11px] text-muted-foreground">42 min · this week</div>
                  </div>
                </EnquiryLink>
              </SidebarBlock>
            </div>
          </aside>
        </div>
      </section>

      {/* CONTINUE READING */}
      <section className="mx-auto max-w-[1400px] px-6 py-16 border-t border-rule">
        <div className="mb-8 flex items-end justify-between border-b border-rule pb-4">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-primary">Continue Reading</div>
            <h2 className="mt-2 font-serif text-2xl font-bold md:text-3xl">More Success Stories</h2>
          </div>
          <EnquiryLink className="hidden text-[10px] uppercase tracking-[0.22em] text-foreground/70 hover:text-primary md:inline">All features <ChevronRight className="-mt-0.5 inline h-3 w-3" /></EnquiryLink>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {RELATED.map((a) => (
            <EnquiryLink key={a.title} className="group block">
              <div className="relative overflow-hidden">
                <img src={a.img} alt="" width={800} height={600} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
              </div>
              <div className="mt-3 text-[10px] uppercase tracking-[0.25em] text-primary">{a.cat}</div>
              <h3 className="mt-1.5 font-serif text-base font-bold leading-snug story-link story-link-hover md:text-lg">{a.title}</h3>
              <p className="mt-1.5 text-[0.82rem] leading-relaxed text-muted-foreground">{a.desc}</p>
              <div className="mt-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                <span>{a.author}</span><span className="text-rule">·</span><span>{a.time}</span><span className="text-rule">·</span><span>{a.date}</span>
              </div>
            </EnquiryLink>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-rule bg-background">
        <div className="mx-auto max-w-[1400px] px-6 pt-12 pb-8">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-4">
              <div className="font-serif text-2xl font-black">The <span className="italic text-primary">Meridian</span></div>
              <p className="mt-3 max-w-sm text-[0.85rem] leading-relaxed text-muted-foreground">
                Premium digital journalism for readers who want the long view. Independent since MMXXVI.
              </p>
              <div className="mt-5 flex gap-2.5">
                {[Twitter, Facebook, Linkedin, Rss].map((Icon, i) => (
                  <EnquiryLink key={i} className="rounded-full border border-rule p-2 text-muted-foreground transition hover:border-primary hover:text-primary">
                    <Icon className="h-3.5 w-3.5" />
                  </EnquiryLink>
                ))}
              </div>
            </div>
            {[
              { title: "Newsroom", items: ["About","Editorial Team","Newsroom","Contact","Careers","Press"] },
              { title: "Sections", items: ["World","Business","Finance","Markets","Crypto","Technology","Culture"] },
              { title: "Legal", items: ["Privacy Policy","Terms of Service","Cookie Policy","Risk Disclaimer"] },
            ].map(col => (
              <div key={col.title} className="md:col-span-2">
                <div className="text-[10px] uppercase tracking-[0.25em] text-primary">{col.title}</div>
                <ul className="mt-3 space-y-1.5 text-[0.85rem]">
                  {col.items.map(i => (
                    <li key={i}>
                      <EnquiryLink className="text-foreground/75 story-link story-link-hover hover:text-primary">{i}</EnquiryLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="md:col-span-2">
              <div className="text-[10px] uppercase tracking-[0.25em] text-primary">Start Today</div>
              <p className="mt-3 text-[0.85rem] text-muted-foreground">Ready to change your life?</p>
              <div className="mt-3">
                <EnquiryLink className="block text-center w-full bg-primary px-3 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-primary-foreground transition hover:bg-foreground">
                  Get Started
                </EnquiryLink>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-rule pt-5 text-[11px] text-muted-foreground md:flex-row">
            <div>© MMXXVI The Meridian Publishing Co. · All rights reserved.</div>
            <div className="flex gap-4">
              <EnquiryLink className="hover:text-primary">Privacy</EnquiryLink>
              <EnquiryLink className="hover:text-primary">Terms</EnquiryLink>
            </div>
          </div>
          
          <div className="mt-6 text-[10px] text-muted-foreground text-center border-t border-rule pt-4 opacity-70">
            DISCLAIMER: This is an advertorial and not actual news. The story presented is a dramatization for marketing purposes. Cryptocurrency trading involves high risk and may not be suitable for all investors.
          </div>
        </div>
      </footer>
    </div>
  );
}

function SidebarBlock({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between border-b border-rule pb-2.5">
        <h3 className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.3em] text-primary">
          {icon}{title}
        </h3>
        <EnquiryLink className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground hover:text-primary">
          View All
        </EnquiryLink>
      </div>
      {children}
    </div>
  );
}