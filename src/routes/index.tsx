import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Search, Bookmark, Share2, Headphones, Sun, Moon, Twitter, Facebook,
  Linkedin, Link2, ChevronRight, Mail, Rss, Menu, ArrowUpRight, Clock,
  TrendingUp, Quote, PlayCircle, Plus, Minus,
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
      { title: "The Quiet Reordering of Global Capital — The Meridian" },
      { name: "description", content: "An investigative feature on how sovereign wealth, AI infrastructure and a new monetary order are rewriting the rules of global finance." },
      { property: "og:title", content: "The Quiet Reordering of Global Capital — The Meridian" },
      { property: "og:description", content: "An investigative feature on how sovereign wealth, AI infrastructure and a new monetary order are rewriting the rules of global finance." },
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
  "Bitcoin","Ethereum","AI","Startups","Markets","Finance","Policy",
  "Blockchain","Economy","Innovation","Technology","Europe","United States",
  "Asia","Web3",
];

const TRENDING = [
  "The ECB's silent pivot and what comes next for the euro",
  "Inside Nvidia's quiet acquisition spree across European labs",
  "Why family offices are reallocating to private credit",
  "A field guide to the post-dollar settlement era",
  "The lithium triangle: South America's new petro-states",
];

const RELATED = [
  { img: card1, cat: "Markets", title: "Tokyo's whisper rally: how Japanese equities became a hedge against the West", desc: "Foreign inflows have quietly returned to the Tokyo Stock Exchange at a pace not seen since the early 1990s.", author: "Kenji Mori", time: "8 min", date: "Jun 14, 2026" },
  { img: card2, cat: "Energy", title: "The last barrel: inside the orderly retreat of European oil majors", desc: "A 14-month investigation into how Shell, BP and TotalEnergies are quietly redrawing their portfolios.", author: "Hannah Voss", time: "16 min", date: "Jun 11, 2026" },
  { img: card3, cat: "Research", title: "Reading rooms of empire: what archives reveal about modern central banking", desc: "From the Bank of England's vaults to Frankfurt's reading rooms, the paper trail of monetary power.", author: "Dr. Owen Hartley", time: "22 min", date: "Jun 09, 2026" },
  { img: card4, cat: "Technology", title: "Silicon sovereignty: the chip cartel forming behind closed doors", desc: "How a handful of foundries, three governments and one venture firm are dividing the AI supply chain.", author: "Priya Ramanathan", time: "11 min", date: "Jun 07, 2026" },
];

function Index() {
  const [progress, setProgress] = useState(0);
  const [dark, setDark] = useState(false);
  const [saved, setSaved] = useState(false);
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

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      {/* Top utility strip */}
      <div className="border-b border-rule/60 bg-background/60 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          <div className="hidden items-center gap-4 md:flex">
            <span>Saturday, 20 June 2026</span>
            <span className="text-rule">·</span>
            <span>London Edition</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">FTSE 8,412 <span className="text-[color:var(--color-primary)]">+0.42%</span></span>
            <span className="hidden sm:inline">EUR/USD 1.0921</span>
            <span>BTC $71,408 <span className="text-[color:var(--color-primary)]">+1.18%</span></span>
          </div>
        </div>
      </div>

      {/* Sticky header */}
      <header className="sticky top-0 z-40 border-b border-rule/80 bg-paper/90 backdrop-blur-md">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-6 py-4">
            <button className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-foreground/80 hover:text-primary">
              <Menu className="h-4 w-4" /> Sections
            </button>
            <a href="#" className="block text-center">
              <div className="font-serif text-2xl font-black tracking-tight md:text-3xl">
                The <span className="italic text-primary">Meridian</span>
              </div>
              <div className="mt-0.5 text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                Est. MMXXVI · No. 1,284
              </div>
            </a>
            <div className="flex items-center gap-2 md:gap-3">
              <button aria-label="Search" className="rounded-full p-2 hover:bg-muted"><Search className="h-4 w-4" /></button>
              <button onClick={() => setDark(d => !d)} aria-label="Theme" className="rounded-full p-2 hover:bg-muted">
                {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
              <a className="hidden text-xs uppercase tracking-[0.18em] text-foreground/80 hover:text-primary md:inline" href="#">Login</a>
              <a className="inline-flex items-center gap-1 bg-foreground px-3.5 py-2 text-[11px] uppercase tracking-[0.2em] text-paper transition hover:bg-primary md:px-5" href="#">
                Subscribe <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <nav className="hide-scrollbar -mx-6 overflow-x-auto border-t border-rule/60 px-6">
            <ul className="flex min-w-max items-center gap-6 py-3 text-[12px] uppercase tracking-[0.18em] text-foreground/75">
              {NAV.map((n, i) => (
                <li key={n} className="shrink-0">
                  <a href="#" className={`story-link story-link-hover ${i === 2 ? "text-primary" : ""}`}>
                    {n}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        {/* Reading progress */}
        <div className="h-[2px] w-full bg-rule/40">
          <div className="h-full bg-primary transition-[width] duration-150" style={{ width: `${progress}%` }} />
        </div>
      </header>

      {/* HERO */}
      <section className="border-b border-rule/60">
        <div className="mx-auto max-w-[1400px] px-6 pt-12 pb-16 md:pt-20 md:pb-24">
          <div className="grid gap-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-7">
              <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.25em]">
                <span className="bg-primary px-2.5 py-1 text-primary-foreground">Finance · Feature</span>
                <span className="text-muted-foreground">The Long Read</span>
              </div>

              <h1 className="mt-6 font-serif text-[2.5rem] font-black leading-[1.05] tracking-tight md:text-[4.25rem] md:leading-[1.02]">
                The Quiet <span className="italic text-primary">Reordering</span> of Global Capital
              </h1>

              <p className="mt-6 max-w-2xl font-serif text-xl italic text-muted-foreground md:text-2xl">
                Sovereign wealth funds, AI infrastructure and a new monetary order are rewriting
                the rules of finance — and almost no one is watching.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-5 border-y border-rule/60 py-5">
                <img src={author} alt="Eleanor Whitcombe" width={48} height={48} className="h-12 w-12 rounded-full object-cover ring-1 ring-rule" loading="lazy" />
                <div className="min-w-0">
                  <div className="text-sm font-medium">By <span className="text-primary">Eleanor Whitcombe</span></div>
                  <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Chief Economics Correspondent</div>
                </div>
                <div className="ml-auto flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  <span>20 June 2026</span>
                  <span className="text-rule">·</span>
                  <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> 24 min read</span>
                  <span className="text-rule">·</span>
                  <button className="inline-flex items-center gap-1.5 hover:text-primary"><Headphones className="h-3.5 w-3.5" /> Listen</button>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-2">
                <button onClick={() => setSaved(s => !s)} className={`inline-flex items-center gap-2 border border-rule px-3 py-1.5 text-xs uppercase tracking-[0.18em] transition hover:border-primary hover:text-primary ${saved ? "bg-primary text-primary-foreground border-primary hover:text-primary-foreground" : ""}`}>
                  <Bookmark className="h-3.5 w-3.5" /> {saved ? "Saved" : "Save"}
                </button>
                <span className="ml-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">Share</span>
                {[Twitter, Facebook, Linkedin, Link2, Mail].map((Icon, i) => (
                  <button key={i} aria-label="share" className="rounded-full p-2 text-muted-foreground transition hover:bg-muted hover:text-primary">
                    <Icon className="h-4 w-4" />
                  </button>
                ))}
              </div>
            </div>

            <figure className="md:col-span-5">
              <div className="group relative overflow-hidden">
                <img src={hero} alt="Globe and leather-bound books on a walnut desk" width={1600} height={1067} className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/15 to-transparent" />
              </div>
              <figcaption className="mt-3 border-l-2 border-primary pl-3 text-xs italic text-muted-foreground">
                A private study in Mayfair, where one of the world's largest family offices quietly directs $87bn in assets. Photograph: Marius Klein for The Meridian.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* BODY + SIDEBAR */}
      <section className="mx-auto max-w-[1400px] px-6 py-16 md:py-24">
        <div className="grid gap-14 md:grid-cols-12 md:gap-16">
          {/* Article column */}
          <article className="md:col-span-8">
            <div className="mx-auto max-w-[680px]">
              <p className="drop-cap font-serif text-[1.25rem] leading-[1.7] text-foreground/90 md:text-[1.35rem]">
                On a grey morning in Frankfurt last March, twelve people gathered in a panelled room
                three floors above the trading hall of the European Central Bank. There was no agenda
                circulated in advance, no minutes taken. By the time they left at dusk, the architecture
                of the next monetary era had been sketched on the back of a single sheet of paper.
              </p>

              <p className="mt-6 text-[1.05rem] leading-[1.85] text-foreground/85">
                For more than a decade, the rules of global capital looked settled. Dollars flowed east,
                manufactured goods flowed west, and the spread between the two financed everything from
                Silicon Valley start-ups to suburban mortgages in Madrid. That equilibrium is now
                visibly cracking — and the people most responsible for managing the world's money are
                preparing, quietly, for what comes next.
              </p>

              <h2 className="mt-14 font-serif text-3xl font-bold leading-tight md:text-[2.25rem]">
                I.  A new geometry of money
              </h2>
              <div className="mt-3 mb-7 h-px w-16 bg-primary" />

              <p className="text-[1.05rem] leading-[1.85] text-foreground/85">
                The clearest signal is also the least dramatic: a slow, steady accumulation of gold by
                central banks that have no obvious political reason to act in unison. Poland, Turkey,
                Singapore and India have all expanded their reserves at a rate unseen since the closing
                years of Bretton Woods. None of them call it de-dollarisation. All of them treat it
                that way.
              </p>

              {/* Pull quote */}
              <blockquote className="my-12 border-l-2 border-primary pl-6 md:my-16 md:-ml-12 md:pl-10">
                <Quote className="h-6 w-6 text-primary/60" />
                <p className="mt-3 font-serif text-[1.65rem] italic leading-[1.35] text-foreground md:text-[2rem]">
                  &ldquo;We are not abandoning the dollar. We are simply preparing for a world in which
                  the dollar is no longer the only sentence in the conversation.&rdquo;
                </p>
                <footer className="mt-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  — A G20 deputy governor, speaking on condition of anonymity
                </footer>
              </blockquote>

              <p className="text-[1.05rem] leading-[1.85] text-foreground/85">
                Inside the ECB, the working assumption is now that by 2031 no single currency will
                settle more than 45% of cross-border trade. That would be the lowest share for any
                reserve currency since the late nineteenth century. The implications, for everything
                from sovereign debt to consumer prices, are still only dimly understood.
              </p>

              {/* Inline image */}
              <figure className="my-12 -mx-4 md:-mx-16">
                <img src={inline1} alt="The ECB headquarters at dusk" width={1200} height={800} loading="lazy" className="w-full" />
                <figcaption className="mt-3 px-4 text-xs italic text-muted-foreground md:px-16">
                  The European Central Bank, Frankfurt. Inside, a working group is rewriting the assumptions of a generation. Photograph: Lukas Imhof.
                </figcaption>
              </figure>

              <h2 className="mt-14 font-serif text-3xl font-bold leading-tight md:text-[2.25rem]">
                II.  The infrastructure no one voted for
              </h2>
              <div className="mt-3 mb-7 h-px w-16 bg-primary" />

              <p className="text-[1.05rem] leading-[1.85] text-foreground/85">
                The second tremor is technological. The cost of training a frontier AI model has fallen
                by 71% in eighteen months; the cost of deploying one has risen by almost the same factor.
                That divergence has produced a new kind of monopoly — not over the algorithms, but over
                the substations, water rights and undersea cables that make them run.
              </p>

              {/* Stats highlight */}
              <div className="my-12 grid grid-cols-2 gap-6 border-y border-rule py-10 md:grid-cols-4">
                {[
                  { k: "$2.4T", v: "AI infra capex pledged 2024–2030" },
                  { k: "71%", v: "Fall in model training cost, 18 mo." },
                  { k: "9 of 12", v: "Hyperscale sites in 3 U.S. states" },
                  { k: "+38%", v: "Central bank gold demand YoY" },
                ].map((s) => (
                  <div key={s.k}>
                    <div className="font-serif text-3xl font-bold text-primary md:text-4xl">{s.k}</div>
                    <div className="mt-2 text-xs uppercase tracking-[0.16em] text-muted-foreground">{s.v}</div>
                  </div>
                ))}
              </div>

              {/* Highlight box */}
              <aside className="my-12 border border-rule bg-secondary/60 p-6 md:p-8">
                <div className="text-[10px] uppercase tracking-[0.3em] text-primary">In Context</div>
                <h3 className="mt-2 font-serif text-xl font-bold md:text-2xl">What is a "hyperscale" data centre?</h3>
                <p className="mt-3 text-[0.98rem] leading-[1.75] text-foreground/85">
                  A facility drawing more than 100 megawatts of continuous power — roughly the
                  consumption of a city of 80,000 people. Twelve such sites came online in 2025;
                  another fifty are under construction. None of them appear on a public ballot.
                </p>
              </aside>

              <p className="text-[1.05rem] leading-[1.85] text-foreground/85">
                Capital is following the wattage. Brookfield, KKR and a quiet consortium of Gulf
                sovereigns have between them committed more than half a trillion dollars to power
                generation in the past 24 months. Most of it is structured as 25-year offtake
                agreements — a duration that quietly assumes the AI build-out will outlast every
                government currently in office.
              </p>

              {/* Custom chart */}
              <figure className="my-12">
                <figcaption className="mb-4 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  Figure 1 · Reserve currency share of global trade settlement, 1990–2030 (est.)
                </figcaption>
                <div className="border border-rule bg-card p-6">
                  <div className="flex h-56 items-end gap-1.5">
                    {[78,77,76,73,70,68,66,63,60,57,54,51,49,46,44].map((v, i) => (
                      <div key={i} className="group relative flex-1">
                        <div className="w-full bg-primary/80 transition-all duration-300 group-hover:bg-primary" style={{ height: `${v}%` }} />
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] text-muted-foreground opacity-0 transition group-hover:opacity-100">{v}%</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex justify-between text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    <span>1990</span><span>2005</span><span>2020</span><span>2030</span>
                  </div>
                </div>
                <div className="mt-2 text-[11px] italic text-muted-foreground">Source: ECB working group estimates, IMF COFER. The Meridian.</div>
              </figure>

              <h2 className="mt-14 font-serif text-3xl font-bold leading-tight md:text-[2.25rem]">
                III.  Timeline of a quiet decade
              </h2>
              <div className="mt-3 mb-7 h-px w-16 bg-primary" />

              <ol className="my-8 space-y-6 border-l border-rule pl-6">
                {[
                  { y: "2019", t: "Repo crisis foreshadows liquidity fragility in U.S. money markets." },
                  { y: "2022", t: "G7 freezes Russian reserves; reserve managers reconsider safe assets." },
                  { y: "2024", t: "BRICS+ commits to settlement rails outside SWIFT." },
                  { y: "2026", t: "ECB working group on monetary fragmentation issues its first private memo." },
                  { y: "2030", t: "Projected: no single currency settles more than 45% of trade." },
                ].map((e) => (
                  <li key={e.y} className="relative">
                    <div className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background" />
                    <div className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{e.y}</div>
                    <div className="mt-1 text-[1rem] leading-relaxed text-foreground/85">{e.t}</div>
                  </li>
                ))}
              </ol>

              <figure className="my-12 -mx-4 md:-mx-16">
                <img src={inline2} alt="Trading floor data" width={1200} height={800} loading="lazy" className="w-full" />
                <figcaption className="mt-3 px-4 text-xs italic text-muted-foreground md:px-16">
                  The new monetary order will be legible first in price screens, not in speeches.
                </figcaption>
              </figure>

              <h2 className="mt-14 font-serif text-3xl font-bold leading-tight md:text-[2.25rem]">
                IV.  What comes after the dollar century
              </h2>
              <div className="mt-3 mb-7 h-px w-16 bg-primary" />

              <p className="text-[1.05rem] leading-[1.85] text-foreground/85">
                None of this means the dollar is finished. It means, instead, that the world is
                slowly assembling the scaffolding of an alternative — one piece of infrastructure,
                one bilateral agreement, one gold purchase at a time
                <button onClick={() => setOpenFootnote(o => o === 1 ? null : 1)} className="ml-0.5 inline-flex h-4 w-4 -translate-y-1 items-center justify-center rounded-full border border-primary text-[10px] font-bold text-primary hover:bg-primary hover:text-primary-foreground">1</button>.
                When historians write about this decade, they will not be able to point to a single
                summit, a single law, a single moment. The reordering is happening in the spaces
                between the headlines.
              </p>

              {openFootnote === 1 && (
                <div className="mt-3 animate-fade-in border-l-2 border-primary bg-secondary/60 p-4 text-sm leading-relaxed text-muted-foreground">
                  <strong className="text-foreground">[1]</strong> Central bank gold purchases reached 1,037 tonnes in 2024, the third consecutive year above the 1,000-tonne threshold — a level last sustained in the late 1960s. World Gold Council, Q1 2026.
                </div>
              )}

              {/* Expert commentary */}
              <div className="my-12 border border-rule p-6 md:p-8">
                <div className="text-[10px] uppercase tracking-[0.3em] text-primary">Expert Commentary</div>
                <p className="mt-3 font-serif text-lg italic leading-relaxed text-foreground/90">
                  &ldquo;The mistake is to look for a single replacement. There won't be one. The future
                  is plural, regional, and a great deal more expensive to operate in.&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-[color:var(--color-navy)]" />
                  <div>
                    <div className="text-sm font-medium">Prof. Adaeze Okafor</div>
                    <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">London School of Economics</div>
                  </div>
                </div>
              </div>

              {/* Expandable explainer */}
              <details className="group my-10 border-t border-b border-rule py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <span className="font-serif text-xl">Explained: what a reserve currency actually does</span>
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-rule transition group-open:bg-primary group-open:text-primary-foreground">
                    <Plus className="h-4 w-4 group-open:hidden" /><Minus className="hidden h-4 w-4 group-open:block" />
                  </span>
                </summary>
                <p className="mt-4 text-[0.98rem] leading-relaxed text-muted-foreground">
                  A reserve currency anchors international trade and serves as the default unit of
                  account for commodities, sovereign debt and emergency liquidity. Its issuer enjoys
                  cheaper borrowing and outsized geopolitical leverage — what Valéry Giscard d'Estaing
                  famously called an "exorbitant privilege".
                </p>
              </details>

              <p className="text-[1.05rem] leading-[1.85] text-foreground/85">
                In Mayfair, in Singapore, in the panelled rooms above Frankfurt's trading hall, the
                people who manage that privilege are no longer arguing about whether the order will
                change. They are arguing about how to be on the right side of it when it does.
              </p>

              {/* End mark */}
              <div className="my-12 flex items-center justify-center gap-4">
                <div className="h-px w-12 bg-rule" />
                <div className="font-serif text-primary">❧</div>
                <div className="h-px w-12 bg-rule" />
              </div>

              {/* Sources */}
              <section className="border-t border-rule pt-8">
                <h3 className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">Sources & Further Reading</h3>
                <ol className="mt-4 space-y-2 text-sm leading-relaxed text-foreground/80">
                  <li>1. World Gold Council, <em>Central Bank Gold Reserves Survey</em>, Q1 2026.</li>
                  <li>2. IMF, <em>Currency Composition of Official Foreign Exchange Reserves (COFER)</em>, 2026.</li>
                  <li>3. ECB Working Group on Monetary Fragmentation, internal memo (sighted by The Meridian).</li>
                  <li>4. BIS Triennial Survey of Foreign Exchange Markets, 2025.</li>
                </ol>
              </section>

              {/* Author bio */}
              <section className="mt-12 flex gap-5 border-t border-rule pt-8">
                <img src={author} alt="Eleanor Whitcombe" width={80} height={80} loading="lazy" className="h-20 w-20 shrink-0 rounded-full object-cover ring-1 ring-rule" />
                <div>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Written by</div>
                  <div className="mt-1 font-serif text-xl font-bold">Eleanor Whitcombe</div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Chief Economics Correspondent at The Meridian. Previously bureau chief in Frankfurt
                    and Tokyo. Author of <em>The Slow Crash</em> (Faber, 2024).
                  </p>
                  <a href="#" className="mt-3 inline-flex items-center gap-1 text-xs uppercase tracking-[0.2em] text-primary hover:underline">
                    More from this author <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </section>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="md:col-span-4">
            <div className="sticky top-32 space-y-12">
              <SidebarBlock title="Editor's Picks">
                <ol className="space-y-5">
                  {[
                    "The slow unwinding of Silicon Valley's venture model",
                    "Inside the Saudi sovereign fund's pivot to private credit",
                    "Why Europe's industrial heart has gone quiet",
                  ].map((t, i) => (
                    <li key={t} className="group flex gap-4 border-b border-rule/60 pb-5 last:border-0">
                      <span className="font-serif text-2xl font-bold text-primary/80">0{i+1}</span>
                      <a href="#" className="font-serif text-[1.05rem] leading-snug story-link story-link-hover">{t}</a>
                    </li>
                  ))}
                </ol>
              </SidebarBlock>

              <SidebarBlock title="Most Read Today" icon={<TrendingUp className="h-3.5 w-3.5" />}>
                <ol className="space-y-4">
                  {TRENDING.map((t, i) => (
                    <li key={t} className="flex gap-3 text-sm leading-snug">
                      <span className="font-mono text-xs text-muted-foreground">{String(i+1).padStart(2,"0")}</span>
                      <a href="#" className="story-link story-link-hover">{t}</a>
                    </li>
                  ))}
                </ol>
              </SidebarBlock>

              <SidebarBlock title="Live Markets">
                <ul className="divide-y divide-rule/60 text-sm">
                  {[
                    ["Bitcoin","$71,408","+1.18%", true],
                    ["Ethereum","$3,842","+0.62%", true],
                    ["S&P 500","5,612","-0.34%", false],
                    ["Gold (oz)","$2,471","+0.41%", true],
                    ["EUR / USD","1.0921","-0.08%", false],
                  ].map(([n,p,c,up]) => (
                    <li key={n as string} className="flex items-center justify-between py-2.5">
                      <span className="text-foreground/85">{n as string}</span>
                      <span className="flex items-center gap-3 font-mono text-xs">
                        <span>{p as string}</span>
                        <span className={up ? "text-primary" : "text-[color:var(--color-navy)]"}>{c as string}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </SidebarBlock>

              <div className="border border-rule bg-foreground p-6 text-background">
                <div className="text-[10px] uppercase tracking-[0.3em] text-accent">The Brief</div>
                <h3 className="mt-2 font-serif text-2xl leading-tight">A morning newsletter, written by editors.</h3>
                <p className="mt-3 text-sm leading-relaxed text-background/70">
                  Five stories, one chart, three minutes. Delivered before the markets open.
                </p>
                <form className="mt-5 flex gap-2">
                  <input type="email" placeholder="you@domain.com" className="min-w-0 flex-1 border border-background/30 bg-transparent px-3 py-2 text-sm text-background placeholder:text-background/50 focus:border-accent focus:outline-none" />
                  <button className="bg-accent px-4 text-xs uppercase tracking-[0.18em] text-accent-foreground transition hover:bg-background hover:text-foreground">Join</button>
                </form>
              </div>

              <SidebarBlock title="Featured Podcast">
                <a href="#" className="group flex gap-4">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden bg-gradient-to-br from-primary to-[color:var(--color-navy)]">
                    <PlayCircle className="absolute inset-0 m-auto h-8 w-8 text-paper transition group-hover:scale-110" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.22em] text-primary">Episode 142</div>
                    <div className="mt-1 font-serif text-[1.05rem] leading-snug story-link story-link-hover">
                      The end of cheap money, with Mohamed El-Erian
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">42 min · this week</div>
                  </div>
                </a>
              </SidebarBlock>

              <SidebarBlock title="Popular Topics">
                <div className="flex flex-wrap gap-2">
                  {TOPICS.slice(0, 10).map(t => (
                    <a key={t} href="#" className="border border-rule px-3 py-1.5 text-xs uppercase tracking-[0.14em] transition hover:border-primary hover:text-primary">
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
        <div className="mx-auto max-w-[1400px] px-6 py-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-primary">Explore</div>
              <h2 className="mt-2 font-serif text-3xl font-bold md:text-4xl">Topics in this story</h2>
            </div>
            <a href="#" className="text-xs uppercase tracking-[0.22em] text-foreground/70 hover:text-primary">All topics <ChevronRight className="-mt-0.5 inline h-3.5 w-3.5" /></a>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {TOPICS.map(t => (
              <a key={t} href="#" className="border border-rule bg-background px-4 py-2.5 text-sm uppercase tracking-[0.14em] transition hover:-translate-y-0.5 hover:border-primary hover:text-primary hover:shadow-sm">
                {t}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CONTINUE READING */}
      <section className="mx-auto max-w-[1400px] px-6 py-20">
        <div className="mb-10 flex items-end justify-between border-b border-rule pb-5">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-primary">Continue Reading</div>
            <h2 className="mt-2 font-serif text-3xl font-bold md:text-4xl">Recommended for you</h2>
          </div>
          <a href="#" className="hidden text-xs uppercase tracking-[0.22em] text-foreground/70 hover:text-primary md:inline">All features <ChevronRight className="-mt-0.5 inline h-3.5 w-3.5" /></a>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {RELATED.map((a) => (
            <a key={a.title} href="#" className="group block">
              <div className="relative overflow-hidden">
                <img src={a.img} alt="" width={800} height={600} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
              </div>
              <div className="mt-4 text-[10px] uppercase tracking-[0.25em] text-primary">{a.cat}</div>
              <h3 className="mt-2 font-serif text-xl font-bold leading-snug story-link story-link-hover">{a.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.desc}</p>
              <div className="mt-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                <span>{a.author}</span><span className="text-rule">·</span><span>{a.time}</span><span className="text-rule">·</span><span>{a.date}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* FEATURED COLLECTION */}
      <section className="border-t border-rule bg-foreground text-background">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-6 py-20 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="text-[10px] uppercase tracking-[0.3em] text-accent">Featured Collection</div>
            <h2 className="mt-3 font-serif text-4xl font-bold leading-tight md:text-5xl">The New Monetary Order</h2>
            <p className="mt-4 text-background/70">
              Eight stories tracing the slow rearrangement of global capital — from Frankfurt's reading rooms to Singapore's vaults.
            </p>
            <a href="#" className="mt-6 inline-flex items-center gap-2 border border-background/40 px-5 py-3 text-xs uppercase tracking-[0.22em] transition hover:bg-accent hover:text-accent-foreground hover:border-accent">
              Open collection <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <ol className="md:col-span-8 md:columns-2 md:gap-12">
            {[
              "The cartographers of the next reserve system",
              "Why Switzerland is quietly building a gold bridge",
              "The hidden costs of the AI grid",
              "Inside the BRICS settlement experiment",
              "Tokyo's whisper rally and the carry trade's last act",
              "The family offices preparing for currency winter",
            ].map((t, i) => (
              <li key={t} className="mb-6 break-inside-avoid border-t border-background/15 pt-4">
                <div className="font-mono text-xs uppercase tracking-[0.2em] text-accent">No. {String(i+1).padStart(2,"0")}</div>
                <a href="#" className="mt-1 block font-serif text-xl leading-snug story-link-hover">{t}</a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-rule bg-background">
        <div className="mx-auto max-w-[1400px] px-6 pt-16 pb-10">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <div className="font-serif text-3xl font-black">The <span className="italic text-primary">Meridian</span></div>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
                Premium digital journalism for readers who want the long view. Independent since
                MMXXVI, headquartered in London with bureaus in New York, Frankfurt, Tokyo and Singapore.
              </p>
              <div className="mt-6 flex gap-3">
                {[Twitter, Facebook, Linkedin, Rss].map((Icon, i) => (
                  <a key={i} href="#" className="rounded-full border border-rule p-2.5 text-muted-foreground transition hover:border-primary hover:text-primary">
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
            {[
              { title: "Newsroom", items: ["About","Editorial Team","Newsroom","Contact","Careers","Press"] },
              { title: "Sections", items: ["World","Business","Finance","Markets","Technology","Culture","Magazine"] },
              { title: "More", items: ["Newsletter","Podcasts","Archives","RSS","Advertise","Privacy","Terms","Cookie Policy"] },
            ].map(col => (
              <div key={col.title} className="md:col-span-2">
                <div className="text-[11px] uppercase tracking-[0.25em] text-primary">{col.title}</div>
                <ul className="mt-4 space-y-2 text-sm">
                  {col.items.map(i => (
                    <li key={i}><a href="#" className="text-foreground/75 story-link story-link-hover hover:text-primary">{i}</a></li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="md:col-span-2">
              <div className="text-[11px] uppercase tracking-[0.25em] text-primary">The Brief</div>
              <p className="mt-4 text-sm text-muted-foreground">Editor-curated, weekday mornings.</p>
              <form className="mt-4">
                <input type="email" placeholder="Email" className="w-full border border-rule bg-transparent px-3 py-2 text-sm focus:border-primary focus:outline-none" />
                <button className="mt-2 w-full bg-primary px-3 py-2 text-xs uppercase tracking-[0.22em] text-primary-foreground transition hover:bg-foreground">Subscribe</button>
              </form>
            </div>
          </div>

          <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-rule pt-6 text-xs text-muted-foreground md:flex-row">
            <div>© MMXXVI The Meridian Publishing Co. · All rights reserved.</div>
            <div className="flex gap-5">
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
      <div className="mb-4 flex items-center justify-between border-b border-rule pb-3">
        <h3 className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-primary">
          {icon}{title}
        </h3>
        <a href="#" className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground hover:text-primary">More</a>
      </div>
      {children}
    </div>
  );
}