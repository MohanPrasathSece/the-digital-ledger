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
import logo from "@/assets/logo.png";
import podcast from "@/assets/podcast.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Comment un influenceur suisse a transformé 5K$ en 12M$ en Crypto - Le Temps Moderne" },
      { name: "description", content: "Un regard de l'intérieur sur la façon dont un ancien skieur alpin a reconstruit sa vie et réécrit le manuel de l'influenceur crypto." },
      { property: "og:title", content: "Comment un influenceur suisse a transformé 5K$ en 12M$ en Crypto - Le Temps Moderne" },
      { property: "og:description", content: "À l'intérieur du portefeuille qui a réécrit le manuel de l'influenceur crypto." },
    ],
  }),
  component: Index,
});

const NAV = [
  "Monde", "Politique", "Affaires", "Finance", "Crypto", "Technologie", "Marchés",
  "Opinion", "Recherche", "Interviews", "Podcasts", "Éditorial", "Magazine",
  "Startups", "IA", "Culture", "À propos", "Archives", "Contact",
];

const TOPICS = [
  "Bitcoin", "Ethereum", "Solana", "Trading Bots", "Influencers", "DeFi",
  "Wallets", "On-Chain", "ETFs", "Regulation", "Web3", "NFTs", "Mining", "Stablecoins",
];

const TRENDING = [
  "Comment l'IA révolutionne les stratégies de trading crypto",
  "À l'intérieur des groupes privés où se créent les millionnaires",
  "Pourquoi l'argent institutionnel afflue dans le Web3",
  "Un examen détaillé des nouvelles baleines crypto en Europe",
  "L'empreinte on-chain des 10 meilleurs traders, décodée",
];

const RELATED = [
  { img: card1, cat: "On-Chain", title: "Les 14 portefeuilles qui ont déplacé 1.2M$ en 48 heures", desc: "Une reconstruction on-chain de qui savait quoi, et quand.", author: "Kenji Mori", time: "7 min", date: "14 Juin 2026" },
  { img: card2, cat: "Trading", title: "Comment un trade de 400$ est devenu une sortie de 9M$", desc: "Le journal de trading complet d'un sniper anonyme.", author: "Hannah Voss", time: "12 min", date: "11 Juin 2026" },
  { img: card3, cat: "Recherche", title: "Repérer les portefeuilles d'influenceurs avant qu'ils ne publient", desc: "Six heuristiques on-chain qui révèlent systématiquement l'accumulation.", author: "Dr. Owen Hartley", time: "18 min", date: "09 Juin 2026" },
  { img: card4, cat: "Bitcoin", title: "Le retour discret des trésoreries d'entreprises vers BTC", desc: "Strategy n'est plus la seule entreprise publique à accumuler des jetons.", author: "Priya Ramanathan", time: "10 min", date: "07 Juin 2026" },
];

function EnquiryLink({ children, className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a href="/enquiry" target="_blank" rel="noopener noreferrer" className={className} {...props}>
      {children}
    </a>
  );
}

function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const h = document.documentElement;
          const max = h.scrollHeight - h.clientHeight;
          setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0);
          ticking = false;
        });
        ticking = true;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="h-[2px] w-full bg-rule/40">
      <div className="h-full bg-primary transition-[width] duration-75" style={{ width: `${progress}%` }} />
    </div>
  );
}

function Index() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="min-h-screen bg-background text-foreground antialiased text-[14px] leading-relaxed">
      {/* Top utility strip */}
      <div className="border-b border-rule/60 bg-background/60 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          <div className="hidden items-center gap-4 md:flex">
            <span>Samedi, 20 Juin 2026</span>
            <span className="text-rule">·</span>
            <span>Édition Européenne</span>
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
                Le Temps <span className="italic text-primary">Moderne</span>
              </div>
              <div className="mt-0.5 text-[9px] uppercase tracking-[0.4em] text-muted-foreground">
                Fondé en MMXXVI · N° 1,284
              </div>
            </EnquiryLink>
            <div className="flex items-center gap-1.5 md:gap-2">
              <EnquiryLink aria-label="Search" className="rounded-full p-2 hover:bg-muted"><Search className="h-4 w-4" /></EnquiryLink>
              <EnquiryLink aria-label="Notifications" className="hidden rounded-full p-2 hover:bg-muted md:inline-flex"><Bell className="h-4 w-4" /></EnquiryLink>
              <button onClick={() => setDark(d => !d)} aria-label="Theme" className="rounded-full p-2 hover:bg-muted">
                {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
              <EnquiryLink className="hidden text-[11px] uppercase tracking-[0.18em] text-foreground/80 hover:text-primary md:inline">Connexion</EnquiryLink>
              <EnquiryLink className="hidden sm:inline-flex items-center gap-1 border border-foreground/80 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] transition hover:bg-foreground hover:text-paper">
                Hub Crypto
              </EnquiryLink>
              <EnquiryLink className="inline-flex items-center gap-1 bg-foreground px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-paper transition hover:bg-primary md:px-4">
                Rejoindre <ArrowUpRight className="h-3 w-3" />
              </EnquiryLink>
            </div>
          </div>

          <nav className="hide-scrollbar -mx-6 overflow-x-auto border-t border-rule/60 px-6">
            <ul className="flex min-w-max items-center justify-center gap-6 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-foreground/75">
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
        <ProgressBar />
      </header>

      {/* ARTICLE HEADER & HERO */}
      <section className="bg-background">
        <div className="mx-auto max-w-[1200px] px-6 pt-12 pb-8 md:pt-16 md:pb-10">
          <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.25em] mb-6">
            <EnquiryLink className="bg-primary px-2.5 py-1 text-primary-foreground font-bold">Crypto · Dossier</EnquiryLink>
            <span className="text-muted-foreground font-medium">Long Format</span>
            <span className="border border-accent px-2 py-1 text-[color:var(--color-accent)] font-medium">Premium</span>
          </div>

          <h1 className="max-w-4xl font-serif text-[2.5rem] font-black leading-[1.1] tracking-tight md:text-[4.5rem]">
            Des Alpes à la Blockchain: Comment <span className="italic text-primary">Fabian Müller</span> a transformé un accident de ski en 12M$
          </h1>

          <p className="mt-6 max-w-3xl font-serif text-lg italic text-muted-foreground md:text-2xl leading-relaxed">
            Pendant dix-neuf mois, l'ancien skieur alpin a discrètement bâti une fortune depuis son lit d'hôpital. Aujourd'hui, il révèle le système automatisé qui a rendu cela possible.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-6 border-y border-rule/60 py-5">
            <div className="flex items-center gap-3">
              <img src={author} alt="Eleanor Whitcombe" width={48} height={48} className="h-12 w-12 rounded-full object-cover ring-1 ring-rule" loading="lazy" />
              <div className="text-left">
                <div className="text-sm font-semibold">Par <span className="text-primary hover:underline cursor-pointer">Eleanor Whitcombe</span></div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground mt-0.5">Correspondante Crypto & Marchés</div>
              </div>
            </div>
            
            <div className="hidden h-8 w-px bg-rule/60 md:block" />
            
            <div className="flex flex-wrap items-center gap-3 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              <span>20 Juin 2026</span>
              <span className="text-rule">·</span>
              <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> 18 min de lecture</span>
            </div>
            
            <div className="ml-auto flex items-center gap-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground mr-2 hidden sm:inline">Partager</span>
              {[Twitter, Facebook, Linkedin, Mail].map((Icon, i) => (
                <EnquiryLink key={i} aria-label="share" className="rounded-full border border-rule p-2 text-muted-foreground transition hover:border-primary hover:bg-muted hover:text-primary">
                  <Icon className="h-3.5 w-3.5" />
                </EnquiryLink>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-[1200px] px-6 mb-12">
          <figure className="group relative overflow-hidden rounded-sm">
            <EnquiryLink className="block">
              <img src={hero} alt="A glowing Bitcoin beside a vintage trading screen" width={1600} height={800} className="w-full object-cover max-h-[600px] transition-transform duration-[1200ms] ease-out group-hover:scale-[1.02]" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </EnquiryLink>
            <figcaption className="mt-3 border-l-2 border-primary pl-3 text-[11px] italic text-muted-foreground">
              Le système de trading automatisé de Müller a généré des rendements sans précédent pendant sa convalescence. Illustration photographique: Marius Klein pour Le Temps Moderne.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* BODY + SIDEBAR */}
      <section className="mx-auto max-w-[1200px] px-6 py-8 md:py-12">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <article className="md:col-span-8">
            <div className="max-w-[680px]">
              <p className="drop-cap font-serif text-[1.1rem] leading-[1.8] text-foreground/90 md:text-[1.2rem]">
                L'accident s'est produit par un frais matin de mardi à St. Moritz. Fabian Müller, étoile montante du ski alpin suisse, a fait une chute catastrophique qui lui a brisé les deux jambes et ses rêves olympiques. Cloué au lit pendant des mois, l'athlète de 24 ans faisait face à un avenir incertain. Mais ce qui a commencé comme une tragédie s'est rapidement transformé en l'une des histoires de retour financier les plus remarquables de la décennie.
              </p>

              <p className="mt-6 text-[1rem] leading-[1.85] text-foreground/85">
                Aujourd'hui, Müller est connu de millions de personnes non pas pour ses prouesses sur les pistes, mais pour son incroyable capacité à lire les marchés des actifs numériques. Avec un portefeuille qui est passé d'un modeste compte d'épargne de 5 000 $ à plus de 12 millions de dollars en un peu moins de deux ans, il a réécrit les règles de la création de richesse. Le secret ? Une stratégie de trading automatisée et pilotée par l'IA qu'il a perfectionnée alors qu'il se remettait à l'hôpital.
              </p>

              <h2 className="mt-12 font-serif text-2xl font-bold leading-tight md:text-[1.8rem]">
                I. Le trade que personne n'a vu
              </h2>
              <div className="mt-3 mb-6 h-px w-12 bg-primary" />

              <p className="mt-6 text-[1rem] leading-[1.85] text-foreground/85">
                Ce qui rend la position de Müller remarquable n'est pas sa taille - il existe des portefeuilles plus importants - mais la discipline. Au cours de dix-neuf mois, y compris lors des pires baisses du marché, ses systèmes automatisés ont exécuté des transactions avec une précision mathématique, éliminant la panique émotionnelle qui ruine la plupart des investisseurs particuliers. "C'est le trading le plus calculé et le moins émotionnel que j'aie jamais vu", déclare Ayla Chen, analyste principale chez Arkham.
              </p>

              <blockquote className="my-10 border-l-2 border-primary pl-5 md:my-14 md:-ml-10 md:pl-9">
                <Quote className="h-5 w-5 text-primary/60" />
                <p className="mt-3 font-serif text-[1.4rem] italic leading-[1.35] text-foreground md:text-[1.7rem]">
                  &ldquo;J'ai traité les marchés crypto comme une piste de descente. Vous ne réagissez pas aux bosses, vous les anticipez et laissez la physique faire le travail.&rdquo;
                </p>
                <footer className="mt-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  - Fabian Müller
                </footer>
              </blockquote>

              <figure className="my-12">
                <EnquiryLink className="block">
                  <img src={inline2} alt="Crypto trading screen" width={1200} height={800} loading="lazy" className="w-full rounded-sm transition hover:opacity-90" />
                </EnquiryLink>
                <figcaption className="mt-4 px-2 text-[11.5px] italic text-muted-foreground border-l-2 border-primary pl-3">
                  Un aperçu du tableau de bord du système automatisé qui a changé la vie de Müller.
                </figcaption>
              </figure>

              <h2 className="mt-14 font-serif text-2xl font-bold leading-tight md:text-[1.8rem]">
                II. L'anatomie d'un retour de 240 000 %
              </h2>
              <div className="mt-3 mb-6 h-px w-12 bg-primary" />

              <div className="my-8 grid grid-cols-2 gap-5 border-y border-rule py-8 md:grid-cols-4">
                {[
                  { k: "5 000 $", v: "Investissement initial (Mars 2024)" },
                  { k: "142 BTC", v: "Total accumulé en Mai 2026" },
                  { k: "12.4M $", v: "Valeur de marché, 20 Juin 2026" },
                  { k: "+240 000%", v: "Rendement réalisé + non réalisé" },
                ].map((s) => (
                  <div key={s.k}>
                    <div className="font-serif text-2xl font-bold text-primary md:text-3xl">{s.k}</div>
                    <div className="mt-2 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{s.v}</div>
                  </div>
                ))}
              </div>

              <aside className="my-10 border border-rule bg-secondary/60 p-5 md:p-7">
                <div className="text-[10px] uppercase tracking-[0.3em] text-primary">Accès Exclusif</div>
                <h3 className="mt-2 font-serif text-lg font-bold md:text-xl">Comment vous pouvez accéder à ce même système</h3>
                <p className="mt-2 text-[0.92rem] leading-[1.75] text-foreground/85">
                  Pour la première fois, Fabian permet à un groupe restreint de personnes d'utiliser exactement le même système de trading qu'il a développé. Les places sont strictement limitées pour assurer la stabilité du marché.
                </p>
                <EnquiryLink className="mt-4 inline-flex items-center gap-2 bg-primary px-4 py-2.5 text-[10px] uppercase tracking-[0.2em] text-primary-foreground transition hover:bg-foreground">
                  Demander un Accès <ArrowUpRight className="h-3.5 w-3.5" />
                </EnquiryLink>
              </aside>

              <p className="mt-6 text-[1rem] leading-[1.85] text-foreground/85">
                Les sceptiques soulignent que de tels rendements sont impossibles à garantir. Mais cela passe à côté de l'essentiel. La stratégie ne consistait pas à parier sur des memecoins. Il s'agissait d'utiliser l'IA pour détecter les micro-fluctuations dans les modèles d'achat institutionnels. "Les créateurs les plus intelligents ont mieux compris la leçon de 2022 que la plupart des capital-risqueurs. Ne faites pas de promotion. Laissez les algorithmes faire le gros du travail", a expliqué Müller lors d'une récente interview.
              </p>

              <figure className="my-10">
                <figcaption className="mb-3 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  Figure 1 · Le Solde du Portefeuille Müller contre le prix du BTC, Mars 2024 - Juin 2026
                </figcaption>
                <div className="border border-rule bg-card p-5">
                  <div className="flex h-44 items-end gap-1.5">
                    {[1, 2, 5, 12, 18, 25, 32, 45, 58, 72, 85, 92, 96, 98, 100].map((v, i) => (
                      <div key={i} className="group relative flex-1">
                        <div className="w-full bg-primary/80 transition-all duration-300 group-hover:bg-primary" style={{ height: `${v}%` }} />
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex justify-between text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                    <span>Mar '24</span><span>Sep '24</span><span>Mar '25</span><span>Juin '26</span>
                  </div>
                </div>
              </figure>

              <h2 className="mt-14 font-serif text-2xl font-bold leading-tight md:text-[1.8rem]">
                III. Une Nouvelle Vie Révélée en Direct
              </h2>
              <div className="mt-3 mb-6 h-px w-12 bg-primary" />

              <p className="mt-6 text-[1rem] leading-[1.85] text-foreground/85">
                Le véritable tournant de l'histoire de Müller n'a pas été le moment où son portefeuille a franchi la barre des huit chiffres, mais lorsqu'il a finalement décidé de partager son parcours. Lors d'une récente apparition dans le podcast <span className="italic">"Uncharted Wealth"</span>, il s'est assis avec l'animateur vedette Marcus Thorne pour détailler exactement comment l'automatisation de la cryptomonnaie a non seulement sauvé ses finances, mais aussi sa santé mentale après son accident débilitant.
              </p>

              <figure className="my-12">
                <img src={podcast} alt="Fabian Müller during a podcast interview" width={1200} height={800} loading="lazy" className="w-full rounded-sm transition hover:opacity-90" />
                <figcaption className="mt-4 px-2 text-[11.5px] italic text-muted-foreground border-l-2 border-primary pl-3">
                  Müller lors de son apparition décisive dans le podcast "Uncharted Wealth", expliquant comment l'approche algorithmique l'a libéré de l'anxiété du marché.
                </figcaption>
              </figure>

              <p className="mt-6 text-[1rem] leading-[1.85] text-foreground/85">
                "Quand vous êtes coincé dans un lit d'hôpital pendant six mois, votre esprit peut devenir très sombre", a admis Müller, la voix chargée d'émotion, alors qu'il parlait dans le microphone. "Le système de trading que j'ai construit n'était pas seulement une question d'argent. C'était un moyen de reprendre le contrôle de ma vie alors que mon corps m'avait fait défaut. L'IA n'a pas de mauvaises journées. Elle ne ressent pas la douleur de la rééducation physique. Elle se contente d'exécuter." Cette interview a profondément résonné auprès d'une nouvelle génération d'investisseurs fatigués du stress constant lié à la surveillance des graphiques 24h/24 et 7j/7.
              </p>

              <h2 className="mt-14 font-serif text-2xl font-bold leading-tight md:text-[1.8rem]">
                IV. Ce que cela signifie pour le prochain cycle
              </h2>
              <div className="mt-3 mb-6 h-px w-12 bg-primary" />

              <p className="mt-6 text-[1rem] leading-[1.85] text-foreground/85">
                Si le précédent marché haussier était défini par des célébrités payées pour faire de la promotion, le prochain est défini par une accumulation algorithmique silencieuse. Le trader particulier a désormais l'opportunité de rééquilibrer les règles du jeu, à condition d'avoir accès aux bons outils. L'asymétrie de l'information n'a pas disparu, mais elle est en train d'être démocratisée par des pionniers comme Müller.
              </p>

              <div className="my-10 border border-rule p-5 md:p-7 bg-foreground text-background text-center">
                <h3 className="font-serif text-2xl font-bold mb-4">Prêt à réécrire votre propre destin ?</h3>
                <p className="text-[0.95rem] mb-6 opacity-90">Rejoignez la liste d'attente exclusive pour accéder au système de trading algorithmique qui a propulsé l'incroyable succès de Fabian.</p>
                <EnquiryLink className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 text-[12px] font-bold uppercase tracking-[0.2em] transition hover:scale-105 duration-200">
                  Enregistrez votre intérêt maintenant <ArrowUpRight className="h-4 w-4" />
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
                  <EnquiryLink className="btn-ghost"><ThumbsUp className="h-3.5 w-3.5" /> Utile</EnquiryLink>
                  <EnquiryLink className="btn-ghost"><Zap className="h-3.5 w-3.5" /> Commencer le Trading</EnquiryLink>
                  <EnquiryLink className="btn-ghost"><Bell className="h-3.5 w-3.5" /> Suivre les mises à jour</EnquiryLink>
                  <EnquiryLink className="btn-ghost"><Wallet className="h-3.5 w-3.5" /> Plateforme Ouverte</EnquiryLink>
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Mis à jour il y a 2 heures</div>
              </div>

              {/* Author bio */}
              <section className="mt-10 flex gap-4 border-t border-rule pt-7">
                <img src={author} alt="Eleanor Whitcombe" width={72} height={72} loading="lazy" className="h-18 w-18 shrink-0 rounded-full object-cover ring-1 ring-rule" />
                <div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Rédigé par</div>
                  <div className="mt-1 font-serif text-lg font-bold">Eleanor Whitcombe</div>
                  <p className="mt-1.5 text-[0.85rem] leading-relaxed text-muted-foreground">
                    Correspondante Crypto & Marchés pour Le Temps Moderne. Anciennement éditrice des actifs numériques au Financial Times.
                  </p>
                  <div className="mt-3 flex gap-2">
                    <EnquiryLink className="btn-ghost"><ArrowUpRight className="h-3.5 w-3.5" /> Voir tous les articles</EnquiryLink>
                  </div>
                </div>
              </section>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="md:col-span-4 border-t border-rule/30 pt-10 md:border-t-0 md:border-l md:pl-8 md:pt-0">
            <div className="sticky top-28 space-y-12">
              <SidebarBlock title="Choix de la Rédaction">
                <ol className="space-y-4">
                  {[
                    "Les 14 portefeuilles qui ont déplacé 1.2M$ avant l'approbation de l'ETF",
                    "Les nouvelles baleines de Solana : un recensement par portefeuille",
                    "Pourquoi Coinbase a discrètement retiré trois memecoins la semaine dernière",
                  ].map((t, i) => (
                    <li key={t} className="group flex gap-3 border-b border-rule/60 pb-4 last:border-0">
                      <span className="font-serif text-xl font-bold text-primary/80">0{i + 1}</span>
                      <EnquiryLink className="font-serif text-[0.95rem] leading-snug story-link story-link-hover">{t}</EnquiryLink>
                    </li>
                  ))}
                </ol>
              </SidebarBlock>

              <SidebarBlock title="Les Plus Lus Aujourd'hui" icon={<TrendingUp className="h-3 w-3" />}>
                <ol className="space-y-3">
                  {TRENDING.map((t, i) => (
                    <li key={t} className="flex gap-3 text-[0.85rem] leading-snug">
                      <span className="font-mono text-[10px] text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                      <EnquiryLink className="story-link story-link-hover">{t}</EnquiryLink>
                    </li>
                  ))}
                </ol>
              </SidebarBlock>

              <SidebarBlock title="Prix Crypto en Direct">
                <ul className="divide-y divide-rule/60 text-[0.85rem]">
                  {[
                    ["Bitcoin", "$71,408", "+1.18%", true],
                    ["Ethereum", "$3,842", "+0.62%", true],
                    ["Solana", "$204.10", "+3.41%", true],
                    ["BNB", "$612.30", "-0.34%", false],
                    ["XRP", "$0.5821", "-0.08%", false],
                  ].map(([n, p, c, up]) => (
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
                  Commencez à Trader <ChevronRight className="h-3 w-3" />
                </EnquiryLink>
              </SidebarBlock>

              <div className="border border-rule bg-foreground p-5 text-background">
                <div className="text-[10px] uppercase tracking-[0.3em] text-accent">Opportunité Exclusive</div>
                <h3 className="mt-2 font-serif text-xl leading-tight">Rejoignez le Cercle Privé.</h3>
                <p className="mt-2 text-[0.85rem] leading-relaxed text-background/70">
                  Obtenez un accès prioritaire aux algorithmes de trading qui ont créé une fortune de 12M$.
                </p>
                <div className="mt-4">
                  <EnquiryLink className="block text-center w-full bg-accent px-3 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-accent-foreground transition hover:bg-background hover:text-foreground">
                    Réservez Votre Place
                  </EnquiryLink>
                </div>
              </div>

              <SidebarBlock title="Podcast en Vedette">
                <EnquiryLink className="group flex gap-3">
                  <div className="relative h-18 w-18 shrink-0 overflow-hidden bg-gradient-to-br from-primary to-[color:var(--color-navy)]" style={{ width: 72, height: 72 }}>
                    <PlayCircle className="absolute inset-0 m-auto h-7 w-7 text-paper transition group-hover:scale-110" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.22em] text-primary">Épisode 142</div>
                    <div className="mt-1 font-serif text-[0.95rem] leading-snug story-link story-link-hover">
                      Entretien avec Fabian Müller : Les années manquantes
                    </div>
                    <div className="mt-1 text-[11px] text-muted-foreground">42 min · cette semaine</div>
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
            <div className="text-[10px] uppercase tracking-[0.3em] text-primary">Continuer la Lecture</div>
            <h2 className="mt-2 font-serif text-2xl font-bold md:text-3xl">Plus de Succès Stories</h2>
          </div>
          <EnquiryLink className="hidden text-[10px] uppercase tracking-[0.22em] text-foreground/70 hover:text-primary md:inline">Voir tout <ChevronRight className="-mt-0.5 inline h-3 w-3" /></EnquiryLink>
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
              <div className="font-serif text-2xl font-black mb-4">
                Le Temps <span className="italic text-primary">Moderne</span>
              </div>
              <p className="mt-3 max-w-sm text-[0.85rem] leading-relaxed text-muted-foreground">
                Journalisme numérique de qualité pour les lecteurs qui voient loin. Indépendant depuis MMXXVI.
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
              { title: "Rédaction", items: ["À propos", "Équipe Éditoriale", "Salle de Presse", "Contact", "Carrières", "Presse"] },
              { title: "Sections", items: ["Monde", "Affaires", "Finance", "Marchés", "Crypto", "Technologie", "Culture"] },
              { title: "Légal", items: ["Confidentialité", "Conditions", "Cookies", "Avis de Risque"] },
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
              <div className="text-[10px] uppercase tracking-[0.25em] text-primary">Commencez Aujourd'hui</div>
              <p className="mt-3 text-[0.85rem] text-muted-foreground">Prêt à changer de vie ?</p>
              <div className="mt-3">
                <EnquiryLink className="block text-center w-full bg-primary px-3 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-primary-foreground transition hover:bg-foreground">
                  Démarrer
                </EnquiryLink>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-rule pt-5 text-[11px] text-muted-foreground md:flex-row">
            <div>© MMXXVI Le Temps Moderne Publishing Co. · Tous droits réservés.</div>
            <div className="flex gap-4">
              <EnquiryLink className="hover:text-primary">Confidentialité</EnquiryLink>
              <EnquiryLink className="hover:text-primary">Conditions</EnquiryLink>
            </div>
          </div>

          <div className="mt-6 text-[10px] text-muted-foreground text-center border-t border-rule pt-4 opacity-70">
            AVERTISSEMENT : Ceci est un publireportage et non une véritable actualité. L'histoire présentée est une dramatisation à des fins de marketing. Le trading de cryptomonnaies implique des risques élevés et peut ne pas convenir à tous les investisseurs.
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
          Voir Tout
        </EnquiryLink>
      </div>
      {children}
    </div>
  );
}