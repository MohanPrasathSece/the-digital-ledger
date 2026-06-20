import { createFileRoute, Link } from "@tanstack/react-router";
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
      { title: "How MrBeast Turned $2M Into $47M In Bitcoin — The Meridian" },
      { name: "description", content: "An inside look at how a single celebrity wallet rewrote the crypto influencer playbook — and what it means for the next bull cycle." },
      { property: "og:title", content: "How MrBeast Turned $2M Into $47M In Bitcoin — The Meridian" },
      { property: "og:description", content: "Inside the celebrity wallet that rewrote the crypto influencer playbook." },
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
  "Bitcoin","Ethereum","Solana","MrBeast","Influencers","Memecoins","DeFi",
  "Wallets","On-Chain","ETFs","Regulation","Web3","NFTs","Mining","Stablecoins",
];

const TRENDING = [
  "Logan Paul quietly buys 4,200 ETH ahead of the Pectra upgrade",
  "Inside the Telegram group where memecoins are born",
  "Why BlackRock's IBIT just crossed $80bn in AUM",
  "A wallet-by-wallet look at Solana's new whales",
  "The on-chain footprint of 12 crypto influencers, decoded",
];

const RELATED = [
  { img: card1, cat: "On-Chain", title: "The 14 wallets that moved $1.2B in the 48 hours before the ETF approval", desc: "An on-chain reconstruction of who knew what, and when — and why three of them now sit in Dubai.", author: "Kenji Mori", time: "7 min", date: "Jun 14, 2026" },
  { img: card2, cat: "Memecoins", title: "How a $400 trade in a frog memecoin became a $9M exit in nineteen days", desc: "The complete trade journal of an anonymous Solana sniper who refuses to dox — but lets us read the wallet.", author: "Hannah Voss", time: "12 min", date: "Jun 11, 2026" },
  { img: card3, cat: "Research", title: "Reading the chain: a field guide to spotting influencer wallets before they post", desc: "Six on-chain heuristics that consistently surface accumulation by accounts with more than two million followers.", author: "Dr. Owen Hartley", time: "18 min", date: "Jun 09, 2026" },
  { img: card4, cat: "Bitcoin", title: "The quiet return of corporate treasuries to BTC: who is buying in 2026", desc: "Strategy is no longer the only public company stacking coins. We mapped the next nine balance sheets.", author: "Priya Ramanathan", time: "10 min", date: "Jun 07, 2026" },
];

function Index() {
  const [progress, setProgress] = useState(0);
  const [dark, setDark] = useState(false);
  const [saved, setSaved] = useState(false);
  const [liked, setLiked] = useState(false);
  const [followed, setFollowed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [openFootnote, setOpenFootnote] = useState<number | null>(null);

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

  const copyLink = async () => {
    try { await navigator.clipboard.writeText(window.location.href); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { /* ignore */ }
  };

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
            <button className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-foreground/80 hover:text-primary">
              <Menu className="h-4 w-4" /> <span className="hidden sm:inline">Sections</span>
            </button>
            <Link to="/" className="block text-center">
              <div className="font-serif text-xl font-black tracking-tight md:text-2xl">
                The <span className="italic text-primary">Meridian</span>
              </div>
              <div className="mt-0.5 text-[9px] uppercase tracking-[0.4em] text-muted-foreground">
                Est. MMXXVI · No. 1,284
              </div>
            </Link>
            <div className="flex items-center gap-1.5 md:gap-2">
              <button aria-label="Search" className="rounded-full p-2 hover:bg-muted"><Search className="h-4 w-4" /></button>
              <button aria-label="Notifications" className="hidden rounded-full p-2 hover:bg-muted md:inline-flex"><Bell className="h-4 w-4" /></button>
              <button onClick={() => setDark(d => !d)} aria-label="Theme" className="rounded-full p-2 hover:bg-muted">
                {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
              <a className="hidden text-[11px] uppercase tracking-[0.18em] text-foreground/80 hover:text-primary md:inline" href="#">Login</a>
              <Link to="/crypto" className="inline-flex items-center gap-1 border border-foreground/80 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] transition hover:bg-foreground hover:text-paper">
                Crypto Hub
              </Link>
              <a className="inline-flex items-center gap-1 bg-foreground px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-paper transition hover:bg-primary md:px-4" href="#">
                Subscribe <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </div>

          <nav className="hide-scrollbar -mx-6 overflow-x-auto border-t border-rule/60 px-6">
            <ul className="flex min-w-max items-center gap-5 py-2.5 text-[11px] uppercase tracking-[0.18em] text-foreground/75">
              {NAV.map((n) => (
                <li key={n} className="shrink-0">
                  {n === "Crypto" ? (
                    <Link to="/crypto" className="story-link story-link-hover text-primary">{n}</Link>
                  ) : (
                    <a href="#" className="story-link story-link-hover">{n}</a>
                  )}
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
                <Link to="/crypto" className="bg-primary px-2.5 py-1 text-primary-foreground">Crypto · Feature</Link>
                <span className="text-muted-foreground">The Long Read</span>
                <span className="border border-accent px-2 py-1 text-[color:var(--color-accent)]">Premium</span>
              </div>

              <h1 className="mt-5 font-serif text-[2rem] font-black leading-[1.05] tracking-tight md:text-[3.25rem] md:leading-[1.02]">
                How <span className="italic text-primary">MrBeast</span> Quietly Turned $2 Million Into $47 Million — In One Bitcoin Bet
              </h1>

              <p className="mt-5 max-w-2xl font-serif text-base italic text-muted-foreground md:text-lg">
                For nineteen months, the world's most-watched creator did not say the word
                &ldquo;crypto&rdquo; on camera. On-chain, he never stopped buying.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4 border-y border-rule/60 py-4">
                <img src={author} alt="Eleanor Whitcombe" width={44} height={44} className="h-11 w-11 rounded-full object-cover ring-1 ring-rule" loading="lazy" />
                <div className="min-w-0">
                  <div className="text-xs font-medium">By <span className="text-primary">Eleanor Whitcombe</span></div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Crypto & Markets Correspondent</div>
                </div>
                <button onClick={() => setFollowed(f => !f)} className={`ml-1 border px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] transition ${followed ? "border-primary bg-primary text-primary-foreground" : "border-rule hover:border-primary hover:text-primary"}`}>
                  {followed ? "Following" : "Follow"}
                </button>
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
                <button onClick={() => setLiked(l => !l)} className={`btn-ghost ${liked ? "border-primary bg-primary text-primary-foreground" : ""}`}>
                  <ThumbsUp className="h-3.5 w-3.5" /> {liked ? "Liked · 12.4k" : "Like · 12.3k"}
                </button>
                <button onClick={() => setSaved(s => !s)} className={`btn-ghost ${saved ? "border-primary bg-primary text-primary-foreground" : ""}`}>
                  <Bookmark className="h-3.5 w-3.5" /> {saved ? "Saved" : "Save"}
                </button>
                <a href="#comments" className="btn-ghost"><MessageCircle className="h-3.5 w-3.5" /> 1,284</a>
                <button className="btn-ghost"><Headphones className="h-3.5 w-3.5" /> Listen</button>
                <button onClick={copyLink} className="btn-ghost">
                  <Copy className="h-3.5 w-3.5" /> {copied ? "Copied" : "Copy link"}
                </button>
                <button onClick={() => window.print()} className="btn-ghost"><Printer className="h-3.5 w-3.5" /> Print</button>
                <button className="btn-ghost"><Download className="h-3.5 w-3.5" /> Read offline</button>
                <button className="btn-ghost"><Flag className="h-3.5 w-3.5" /> Report</button>
                <span className="ml-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Share</span>
                {[Twitter, Facebook, Linkedin, Link2, Mail].map((Icon, i) => (
                  <button key={i} aria-label="share" className="rounded-full p-1.5 text-muted-foreground transition hover:bg-muted hover:text-primary">
                    <Icon className="h-3.5 w-3.5" />
                  </button>
                ))}
              </div>
            </div>

            <figure className="md:col-span-5">
              <div className="group relative overflow-hidden">
                <img src={hero} alt="A glowing Bitcoin beside a vintage trading screen" width={1600} height={1067} className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/15 to-transparent" />
              </div>
              <figcaption className="mt-3 border-l-2 border-primary pl-3 text-[11px] italic text-muted-foreground">
                The wallet first surfaced in March 2024 with a single 14.2 BTC transfer from a Kraken hot wallet. Photograph illustration: Marius Klein for The Meridian.
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
                The wallet first appeared on a Tuesday. On 5 March 2024, just after midnight UTC,
                an unremarkable Bitcoin address received 14.2 BTC — about $972,000 at the time —
                from a Kraken hot wallet. Over the next nineteen months, that address quietly
                accumulated another 11 deposits, never once selling. By the time anyone on
                Crypto Twitter noticed, the balance was worth more than $47 million.
              </p>

              <p className="mt-5 text-[0.95rem] leading-[1.85] text-foreground/85">
                The address, multiple on-chain analysts now agree, belongs to Jimmy Donaldson —
                better known to 320 million subscribers as MrBeast. He has never confirmed it.
                He has never had to. The trade speaks for itself: an initial cost basis of just
                under $2 million, and a paper return of roughly 2,250%, executed without a single
                tweet, podcast appearance or affiliate code.
              </p>

              <h2 className="mt-12 font-serif text-2xl font-bold leading-tight md:text-[1.8rem]">
                I.  The trade nobody saw
              </h2>
              <div className="mt-3 mb-6 h-px w-12 bg-primary" />

              <p className="text-[0.95rem] leading-[1.85] text-foreground/85">
                What makes the position remarkable is not the size — there are larger wallets —
                but the discipline. Across nineteen months, including the brutal August 2024
                drawdown that took Bitcoin from $71,000 to $49,000 in eleven days, the wallet
                added on the way down and never trimmed on the way up. &ldquo;It's the most
                un-influencer trade I've ever seen,&rdquo; says Ayla Chen, lead analyst at Arkham.
                &ldquo;No pump. No dump. Just stack.&rdquo;
              </p>

              <blockquote className="my-10 border-l-2 border-primary pl-5 md:my-14 md:-ml-10 md:pl-9">
                <Quote className="h-5 w-5 text-primary/60" />
                <p className="mt-3 font-serif text-[1.4rem] italic leading-[1.35] text-foreground md:text-[1.7rem]">
                  &ldquo;He didn't trade crypto like a creator. He traded it like a treasury.&rdquo;
                </p>
                <footer className="mt-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  — Ayla Chen, Arkham Intelligence
                </footer>
              </blockquote>

              <p className="text-[0.95rem] leading-[1.85] text-foreground/85">
                That distinction matters. For most of the last cycle, celebrity crypto endorsements
                ended in lawsuits and SEC consent orders. The pattern was reliable: a creator was
                paid in tokens, told their audience to buy, and quietly exited into the liquidity
                their followers provided. Donaldson, by contrast, appears to have done the opposite —
                bought silently, told no one, and never sold.
              </p>

              <figure className="my-10 -mx-4 md:-mx-16">
                <img src={inline2} alt="Crypto trading screen" width={1200} height={800} loading="lazy" className="w-full" />
                <figcaption className="mt-3 px-4 text-[11px] italic text-muted-foreground md:px-16">
                  A Bloomberg terminal in Mayfair tracks the wallet labelled &ldquo;BEAST-01&rdquo; by three independent on-chain providers.
                </figcaption>
              </figure>

              <h2 className="mt-12 font-serif text-2xl font-bold leading-tight md:text-[1.8rem]">
                II.  Anatomy of a 2,250% return
              </h2>
              <div className="mt-3 mb-6 h-px w-12 bg-primary" />

              <div className="my-8 grid grid-cols-2 gap-5 border-y border-rule py-8 md:grid-cols-4">
                {[
                  { k: "$1.97M", v: "Initial cost basis (Mar 2024)" },
                  { k: "658 BTC", v: "Total accumulated by May 2026" },
                  { k: "$47.0M", v: "Mark-to-market, 20 Jun 2026" },
                  { k: "+2,287%", v: "Realised + unrealised return" },
                ].map((s) => (
                  <div key={s.k}>
                    <div className="font-serif text-2xl font-bold text-primary md:text-3xl">{s.k}</div>
                    <div className="mt-2 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{s.v}</div>
                  </div>
                ))}
              </div>

              <aside className="my-10 border border-rule bg-secondary/60 p-5 md:p-7">
                <div className="text-[10px] uppercase tracking-[0.3em] text-primary">In Context</div>
                <h3 className="mt-2 font-serif text-lg font-bold md:text-xl">What is on-chain analysis?</h3>
                <p className="mt-2 text-[0.92rem] leading-[1.75] text-foreground/85">
                  Every Bitcoin transaction is public. Firms like Arkham, Nansen and Chainalysis
                  cluster addresses by behaviour — deposit timing, exchange relationships, gas
                  signatures — to map who likely controls which wallet. It is forensic accounting
                  performed in the open.
                </p>
              </aside>

              <p className="text-[0.95rem] leading-[1.85] text-foreground/85">
                Skeptics point out that 658 BTC is a rounding error to a creator whose YouTube
                operations alone gross more than $700 million a year. But that misses the point.
                The trade was not about the money. It was about a new template
                <button onClick={() => setOpenFootnote(o => o === 1 ? null : 1)} className="ml-0.5 inline-flex h-4 w-4 -translate-y-1 items-center justify-center rounded-full border border-primary text-[9px] font-bold text-primary hover:bg-primary hover:text-primary-foreground">1</button>
                for how the biggest creators on the internet now interact with public markets:
                quietly, on-chain, and entirely outside the influencer-economy playbook.
              </p>

              {openFootnote === 1 && (
                <div className="mt-3 animate-fade-in border-l-2 border-primary bg-secondary/60 p-3 text-[0.85rem] leading-relaxed text-muted-foreground">
                  <strong className="text-foreground">[1]</strong> At least four other creators with audiences above 20 million subscribers are now operating wallets with similar accumulation profiles. We profile them in Part II of this series, publishing 27 June.
                </div>
              )}

              <figure className="my-10">
                <figcaption className="mb-3 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  Figure 1 · BEAST-01 wallet balance vs. BTC price, Mar 2024 – Jun 2026
                </figcaption>
                <div className="border border-rule bg-card p-5">
                  <div className="flex h-44 items-end gap-1.5">
                    {[12,18,22,28,34,30,42,48,55,52,61,68,74,82,90].map((v, i) => (
                      <div key={i} className="group relative flex-1">
                        <div className="w-full bg-primary/80 transition-all duration-300 group-hover:bg-primary" style={{ height: `${v}%` }} />
                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] text-muted-foreground opacity-0 transition group-hover:opacity-100">{v} BTC×10</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex justify-between text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                    <span>Mar '24</span><span>Sep '24</span><span>Mar '25</span><span>Jun '26</span>
                  </div>
                </div>
                <div className="mt-2 text-[10px] italic text-muted-foreground">Source: Arkham Intelligence, Glassnode. The Meridian.</div>
              </figure>

              <h2 className="mt-12 font-serif text-2xl font-bold leading-tight md:text-[1.8rem]">
                III.  A nineteen-month timeline
              </h2>
              <div className="mt-3 mb-6 h-px w-12 bg-primary" />

              <ol className="my-6 space-y-5 border-l border-rule pl-5">
                {[
                  { y: "Mar 2024", t: "First deposit: 14.2 BTC at ~$68,400. Funded from a Kraken withdrawal address." },
                  { y: "Aug 2024", t: "Adds 142 BTC during the 31% drawdown to $49,000. No outflows." },
                  { y: "Jan 2025", t: "BTC reclaims $100k. Wallet still silent. Balance: 388 BTC." },
                  { y: "Nov 2025", t: "Final accumulation tranche of 89 BTC. Total: 658 BTC." },
                  { y: "Jun 2026", t: "Wallet identified publicly by three independent analysts. Mark-to-market: $47.0M." },
                ].map((e) => (
                  <li key={e.y} className="relative">
                    <div className="absolute -left-[26px] top-1.5 h-2 w-2 rounded-full bg-primary ring-4 ring-background" />
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">{e.y}</div>
                    <div className="mt-1 text-[0.92rem] leading-relaxed text-foreground/85">{e.t}</div>
                  </li>
                ))}
              </ol>

              <figure className="my-10 -mx-4 md:-mx-16">
                <img src={inline1} alt="Central bank building at dusk" width={1200} height={800} loading="lazy" className="w-full" />
                <figcaption className="mt-3 px-4 text-[11px] italic text-muted-foreground md:px-16">
                  Regulators have noticed. The SEC's Office of Crypto Assets has reportedly opened an inquiry — into the practice, not the wallet.
                </figcaption>
              </figure>

              <h2 className="mt-12 font-serif text-2xl font-bold leading-tight md:text-[1.8rem]">
                IV.  What it means for the next cycle
              </h2>
              <div className="mt-3 mb-6 h-px w-12 bg-primary" />

              <p className="text-[0.95rem] leading-[1.85] text-foreground/85">
                If the previous bull market was defined by celebrities being paid to shill, the
                next one may be defined by celebrities accumulating in silence. That is, on balance,
                a healthier dynamic — but it is also a less legible one. The retail trader has no
                way of knowing which creator's wallet is whose. The information asymmetry has not
                vanished. It has migrated on-chain.
              </p>

              <div className="my-10 border border-rule p-5 md:p-7">
                <div className="text-[10px] uppercase tracking-[0.3em] text-primary">Expert Commentary</div>
                <p className="mt-3 font-serif text-base italic leading-relaxed text-foreground/90 md:text-lg">
                  &ldquo;The smartest creators understood the lesson of 2022 better than most VCs.
                  Don't promote it. Hold it. Let the asset class come to you.&rdquo;
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-[color:var(--color-navy)]" />
                  <div>
                    <div className="text-xs font-medium">Nic Carter</div>
                    <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Partner, Castle Island Ventures</div>
                  </div>
                </div>
              </div>

              <details className="group my-8 border-t border-b border-rule py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <span className="font-serif text-base md:text-lg">Explained: why on-chain holdings can't be hidden</span>
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-rule transition group-open:bg-primary group-open:text-primary-foreground">
                    <Plus className="h-3.5 w-3.5 group-open:hidden" /><Minus className="hidden h-3.5 w-3.5 group-open:block" />
                  </span>
                </summary>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-muted-foreground">
                  Unlike a brokerage account, a Bitcoin wallet is a public ledger entry. Pattern
                  analysis — timing, exchange relationships, gas signatures — can identify likely
                  owners with surprising confidence. Privacy is possible, but expensive. Most
                  creators don't bother.
                </p>
              </details>

              <p className="text-[0.95rem] leading-[1.85] text-foreground/85">
                Donaldson, for what it is worth, has still not said the word &ldquo;crypto&rdquo; on
                camera. He hasn't needed to. The wallet has spoken louder than any video he could
                possibly post — and a generation of creators is now studying it, frame by on-chain
                frame.
              </p>

              {/* End mark */}
              <div className="my-10 flex items-center justify-center gap-4">
                <div className="h-px w-10 bg-rule" />
                <div className="font-serif text-primary">❧</div>
                <div className="h-px w-10 bg-rule" />
              </div>

              {/* Bottom action bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-y border-rule py-4">
                <div className="flex flex-wrap items-center gap-2">
                  <button onClick={() => setLiked(l => !l)} className={`btn-ghost ${liked ? "border-primary bg-primary text-primary-foreground" : ""}`}>
                    <ThumbsUp className="h-3.5 w-3.5" /> Helpful
                  </button>
                  <button className="btn-ghost"><Zap className="h-3.5 w-3.5" /> Tip the author</button>
                  <button onClick={() => setFollowed(f => !f)} className={`btn-ghost ${followed ? "border-primary bg-primary text-primary-foreground" : ""}`}>
                    <Bell className="h-3.5 w-3.5" /> {followed ? "Subscribed" : "Follow author"}
                  </button>
                  <Link to="/crypto" className="btn-ghost"><Wallet className="h-3.5 w-3.5" /> Open Crypto Hub</Link>
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Updated 2 hours ago</div>
              </div>

              {/* Sources */}
              <section className="border-t border-rule pt-7">
                <h3 className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Sources & Further Reading</h3>
                <ol className="mt-3 space-y-1.5 text-[0.85rem] leading-relaxed text-foreground/80">
                  <li>1. Arkham Intelligence, wallet cluster BEAST-01, June 2026.</li>
                  <li>2. Glassnode, <em>Long-Term Holder Net Position Change</em>, weekly series.</li>
                  <li>3. Kraken withdrawal logs (public mempool), Mar 2024 – Nov 2025.</li>
                  <li>4. Forbes, <em>Top-Earning YouTubers 2025</em>, Jan 2026.</li>
                </ol>
              </section>

              {/* Author bio */}
              <section className="mt-10 flex gap-4 border-t border-rule pt-7">
                <img src={author} alt="Eleanor Whitcombe" width={72} height={72} loading="lazy" className="h-18 w-18 shrink-0 rounded-full object-cover ring-1 ring-rule" />
                <div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Written by</div>
                  <div className="mt-1 font-serif text-lg font-bold">Eleanor Whitcombe</div>
                  <p className="mt-1.5 text-[0.85rem] leading-relaxed text-muted-foreground">
                    Crypto & Markets Correspondent at The Meridian. Previously digital assets
                    editor at the Financial Times. Author of <em>The On-Chain Century</em>.
                  </p>
                  <div className="mt-3 flex gap-2">
                    <a href="#" className="btn-ghost"><ArrowUpRight className="h-3.5 w-3.5" /> More from author</a>
                    <button onClick={() => setFollowed(f => !f)} className={`btn-ghost ${followed ? "border-primary bg-primary text-primary-foreground" : ""}`}>
                      {followed ? "Following" : "Follow"}
                    </button>
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
                      <a href="#" className="font-serif text-[0.95rem] leading-snug story-link story-link-hover">{t}</a>
                    </li>
                  ))}
                </ol>
              </SidebarBlock>

              <SidebarBlock title="Most Read Today" icon={<TrendingUp className="h-3 w-3" />}>
                <ol className="space-y-3">
                  {TRENDING.map((t, i) => (
                    <li key={t} className="flex gap-3 text-[0.85rem] leading-snug">
                      <span className="font-mono text-[10px] text-muted-foreground">{String(i+1).padStart(2,"0")}</span>
                      <a href="#" className="story-link story-link-hover">{t}</a>
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
                <Link to="/crypto" className="mt-3 inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.22em] text-primary hover:underline">
                  Open Crypto Hub <ChevronRight className="h-3 w-3" />
                </Link>
              </SidebarBlock>

              <div className="border border-rule bg-foreground p-5 text-background">
                <div className="text-[10px] uppercase tracking-[0.3em] text-accent">The Brief</div>
                <h3 className="mt-2 font-serif text-xl leading-tight">A morning newsletter, written by editors.</h3>
                <p className="mt-2 text-[0.85rem] leading-relaxed text-background/70">
                  Five stories, one chart, three minutes. Delivered before the markets open.
                </p>
                <form className="mt-4 flex gap-2">
                  <input type="email" placeholder="you@domain.com" className="min-w-0 flex-1 border border-background/30 bg-transparent px-3 py-1.5 text-[0.85rem] text-background placeholder:text-background/50 focus:border-accent focus:outline-none" />
                  <button className="bg-accent px-3 text-[10px] uppercase tracking-[0.18em] text-accent-foreground transition hover:bg-background hover:text-foreground">Join</button>
                </form>
              </div>

              <SidebarBlock title="Featured Podcast">
                <a href="#" className="group flex gap-3">
                  <div className="relative h-18 w-18 shrink-0 overflow-hidden bg-gradient-to-br from-primary to-[color:var(--color-navy)]" style={{ width: 72, height: 72 }}>
                    <PlayCircle className="absolute inset-0 m-auto h-7 w-7 text-paper transition group-hover:scale-110" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.22em] text-primary">Episode 142</div>
                    <div className="mt-1 font-serif text-[0.95rem] leading-snug story-link story-link-hover">
                      Inside the celebrity wallets, with Ayla Chen
                    </div>
                    <div className="mt-1 text-[11px] text-muted-foreground">42 min · this week</div>
                  </div>
                </a>
              </SidebarBlock>

              <SidebarBlock title="Popular Topics">
                <div className="flex flex-wrap gap-1.5">
                  {TOPICS.slice(0, 10).map(t => (
                    <a key={t} href="#" className="border border-rule px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] transition hover:border-primary hover:text-primary">
                      {t}
                    </a>
                  ))}
                </div>
              </SidebarBlock>
            </div>
          </aside>
        </div>
      </section>

      {/* TOPIC CHIPS */}
      <section className="border-y border-rule/60 bg-secondary/40">
        <div className="mx-auto max-w-[1400px] px-6 py-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-primary">Explore</div>
              <h2 className="mt-2 font-serif text-2xl font-bold md:text-3xl">Topics in this story</h2>
            </div>
            <Link to="/crypto" className="text-[10px] uppercase tracking-[0.22em] text-foreground/70 hover:text-primary">Crypto Hub <ChevronRight className="-mt-0.5 inline h-3 w-3" /></Link>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {TOPICS.map(t => (
              <a key={t} href="#" className="border border-rule bg-background px-3 py-2 text-[11px] uppercase tracking-[0.14em] transition hover:-translate-y-0.5 hover:border-primary hover:text-primary hover:shadow-sm">
                {t}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CONTINUE READING */}
      <section className="mx-auto max-w-[1400px] px-6 py-16">
        <div className="mb-8 flex items-end justify-between border-b border-rule pb-4">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-primary">Continue Reading</div>
            <h2 className="mt-2 font-serif text-2xl font-bold md:text-3xl">More in Crypto</h2>
          </div>
          <Link to="/crypto" className="hidden text-[10px] uppercase tracking-[0.22em] text-foreground/70 hover:text-primary md:inline">All features <ChevronRight className="-mt-0.5 inline h-3 w-3" /></Link>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {RELATED.map((a) => (
            <a key={a.title} href="#" className="group block">
              <div className="relative overflow-hidden">
                <img src={a.img} alt="" width={800} height={600} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
              </div>
              <div className="mt-3 text-[10px] uppercase tracking-[0.25em] text-primary">{a.cat}</div>
              <h3 className="mt-1.5 font-serif text-base font-bold leading-snug story-link story-link-hover md:text-lg">{a.title}</h3>
              <p className="mt-1.5 text-[0.82rem] leading-relaxed text-muted-foreground">{a.desc}</p>
              <div className="mt-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                <span>{a.author}</span><span className="text-rule">·</span><span>{a.time}</span><span className="text-rule">·</span><span>{a.date}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* FEATURED COLLECTION */}
      <section className="border-t border-rule bg-foreground text-background">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-6 py-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="text-[10px] uppercase tracking-[0.3em] text-accent">Featured Collection</div>
            <h2 className="mt-3 font-serif text-3xl font-bold leading-tight md:text-4xl">The Influencer Wallet Series</h2>
            <p className="mt-3 text-[0.9rem] text-background/70">
              Eight stories tracing how the biggest creators on the internet are quietly
              accumulating crypto — and what it means for the rest of us.
            </p>
            <Link to="/crypto" className="mt-5 inline-flex items-center gap-2 border border-background/40 px-4 py-2.5 text-[10px] uppercase tracking-[0.22em] transition hover:bg-accent hover:text-accent-foreground hover:border-accent">
              Enter the Crypto Hub <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <ol className="md:col-span-8 md:columns-2 md:gap-12">
            {[
              "How Logan Paul learned to stop tweeting and accumulate",
              "The Kardashian wallet that never sold",
              "Inside KSI's silent ETH thesis",
              "PewDiePie's three-year DCA, decoded",
              "Casey Neistat's surprise Solana bag",
              "The creators who bought the August 2024 bottom",
            ].map((t, i) => (
              <li key={t} className="mb-5 break-inside-avoid border-t border-background/15 pt-3">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">No. {String(i+1).padStart(2,"0")}</div>
                <a href="#" className="mt-1 block font-serif text-base leading-snug story-link-hover md:text-lg">{t}</a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-rule bg-background">
        <div className="mx-auto max-w-[1400px] px-6 pt-12 pb-8">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-4">
              <div className="font-serif text-2xl font-black">The <span className="italic text-primary">Meridian</span></div>
              <p className="mt-3 max-w-sm text-[0.85rem] leading-relaxed text-muted-foreground">
                Premium digital journalism for readers who want the long view. Independent since
                MMXXVI, with bureaus in London, New York, Frankfurt, Tokyo and Singapore.
              </p>
              <div className="mt-5 flex gap-2.5">
                {[Twitter, Facebook, Linkedin, Rss].map((Icon, i) => (
                  <a key={i} href="#" className="rounded-full border border-rule p-2 text-muted-foreground transition hover:border-primary hover:text-primary">
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </div>
            {[
              { title: "Newsroom", items: ["About","Editorial Team","Newsroom","Contact","Careers","Press"] },
              { title: "Sections", items: ["World","Business","Finance","Markets","Crypto","Technology","Culture"] },
              { title: "More", items: ["Newsletter","Podcasts","Archives","RSS","Advertise","Privacy","Terms","Cookie Policy"] },
            ].map(col => (
              <div key={col.title} className="md:col-span-2">
                <div className="text-[10px] uppercase tracking-[0.25em] text-primary">{col.title}</div>
                <ul className="mt-3 space-y-1.5 text-[0.85rem]">
                  {col.items.map(i => (
                    <li key={i}>
                      {i === "Crypto" || i === "Contact"
                        ? <Link to="/crypto" className="text-foreground/75 story-link story-link-hover hover:text-primary">{i}</Link>
                        : <a href="#" className="text-foreground/75 story-link story-link-hover hover:text-primary">{i}</a>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="md:col-span-2">
              <div className="text-[10px] uppercase tracking-[0.25em] text-primary">The Brief</div>
              <p className="mt-3 text-[0.85rem] text-muted-foreground">Editor-curated, weekday mornings.</p>
              <form className="mt-3">
                <input type="email" placeholder="Email" className="w-full border border-rule bg-transparent px-3 py-1.5 text-[0.85rem] focus:border-primary focus:outline-none" />
                <button className="mt-2 w-full bg-primary px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-primary-foreground transition hover:bg-foreground">Subscribe</button>
              </form>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-rule pt-5 text-[11px] text-muted-foreground md:flex-row">
            <div>© MMXXVI The Meridian Publishing Co. · All rights reserved.</div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary">Privacy</a>
              <a href="#" className="hover:text-primary">Terms</a>
              <a href="#" className="hover:text-primary">Cookie Policy</a>
              <a href="#" className="hover:text-primary">Accessibility</a>
            </div>
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
        <a href="#" className="text-[9px] uppercase tracking-[0.22em] text-muted-foreground hover:text-primary">More</a>
      </div>
      {children}
    </div>
  );
}