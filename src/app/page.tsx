import { T } from "@/components/language/LanguageProvider";
import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";

const sihPillars = [
  {
    step: "01",
    title: "Hyper-Local Market Advisory",
    copy: "Analyze village-level market demand, mandi price benchmarks, competitor saturation, and seasonal cash-flow risks before investing capital.",
    tag: "Market Intelligence",
    href: "/advisory",
  },
  {
    step: "02",
    title: "Personalized Financial Structuring",
    copy: "Automatically structure your project cost into promoter margin (from 5%), back-ended MoSJE subsidies (up to 35%), and concessional term/working capital debt.",
    tag: "Capital Stack",
    href: "/structuring",
  },
  {
    step: "03",
    title: "Cash-Flow Aligned Repayment",
    copy: "Choose repayment cycles synchronized with rural cash inflows — Kharif/Rabi harvest cycles or weekly village haats, with up to 6 months setup moratorium.",
    tag: "Rural Cash Flow",
    href: "/structuring",
  },
  {
    step: "04",
    title: "Verified Schemes & Bank Network",
    copy: "Locate participating bank branches among 21,000+ geo-tagged lenders and generate a bank-ready Detailed Project Report (DPR).",
    tag: "21k+ Branches",
    href: "/schemes",
  },
];

const mosjeCorporations = [
  {
    code: "NSFDC",
    name: "National Scheduled Castes Finance & Dev Corp",
    rate: "4.0% Concessional Rate",
    subsidy: "Up to 35% Rural Subsidy",
  },
  {
    code: "NBCFDC",
    name: "National Backward Classes Finance & Dev Corp",
    rate: "4.5% Term Loan Rate",
    subsidy: "Up to 30% Rural Subsidy",
  },
  {
    code: "PM Vishwakarma",
    name: "Ministry of MSME & MoSJE Artisan Support",
    rate: "5.0% Subsidized Credit",
    subsidy: "₹15k Modern Toolkit Grant",
  },
  {
    code: "NSKFDC",
    name: "National Safai Karamcharis Finance & Dev Corp",
    rate: "3.5% Livelihood Rate",
    subsidy: "Full Rehabilitation Grant",
  },
  {
    code: "NDFDC",
    name: "National Divyangjan Finance & Dev Corp",
    rate: "4.0% Swavalamban Rate",
    subsidy: "Up to 35% Margin Subsidy",
  },
  {
    code: "PMEGP / MUDRA",
    name: "KVIC & National Credit Mission",
    rate: "Collateral-Free to ₹10L",
    subsidy: "25%–35% Back-Ended Subsidy",
  },
];

export default function HomePage() {
  return (
    <main className="overflow-hidden bg-[#f1f0eb]">
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden bg-black text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/kaarva-hero.webp')" }}
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/40" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/35" />

        <header className="relative z-20 flex items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
          <BrandMark inverse />
          <div className="hidden items-center gap-8 text-xs font-bold uppercase tracking-[0.12em] md:flex">
            <Link className="text-white/70 hover:text-white" href="/advisory">Business Advisory</Link>
            <Link className="text-white/70 hover:text-white" href="/structuring">Financial Structuring</Link>
            <Link className="text-white/70 hover:text-white" href="/schemes">Schemes</Link>
            <a className="text-white/70 hover:text-white" href="#framework">PS 26091 Architecture</a>
          </div>
          <div className="flex items-center gap-2">
            <Link className="whitespace-nowrap rounded-md px-3 py-2 text-sm font-bold text-white hover:bg-white/10" href="/login">
              <T>Sign in</T>
            </Link>
            <Link className="whitespace-nowrap rounded-md bg-[#e6c99a] px-4 py-2 text-sm font-black text-black hover:bg-white transition-colors" href="/register">
              <span><T>Get started</T></span>
            </Link>
          </div>
        </header>

        <div className="page-shell relative z-10 flex min-h-[calc(100vh-73px)] items-center py-16 sm:py-20">
          <div className="max-w-4xl">
            {/* SIH Banner */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#e6c99a]/40 bg-black/60 px-3.5 py-1.5 backdrop-blur-md">
              <span className="inline-block size-2 rounded-full bg-[#e6c99a] animate-pulse" />
              <span className="text-[11px] font-black uppercase tracking-wider text-[#e6c99a]">
                Smart India Hackathon 2026 · Problem Statement SIH-26091
              </span>
              <span className="hidden text-[10px] text-white/60 sm:inline">| MoSJE Software Track</span>
            </div>

            <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.08] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              AI-driven local advisory &<br />
              <span className="editorial-serif text-[#e6c99a]">financial structuring</span><br />
              for rural micro-enterprises.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-white/85 sm:text-lg sm:leading-8">
              Move beyond anecdotal guesses. Evaluate village-level market demand, APMC Mandi price benchmarks, and automatically structure your capital stack with MoSJE subsidies, promoter margin optimization, and harvest-cycle repayment plans.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                className="group inline-flex items-center gap-3 rounded-xl bg-[#e6c99a] px-6 py-4 font-black text-black hover:bg-white transition-all transform hover:scale-[1.02]"
                href="/advisory"
              >
                <span>Explore Local Advisory</span>
                <span className="text-xl transition-transform group-hover:translate-x-1">→</span>
              </Link>

              <Link
                className="inline-flex items-center gap-3 rounded-xl border border-white/30 bg-white/10 px-6 py-4 font-bold text-white hover:bg-white/20 transition-all backdrop-blur-sm"
                href="/structuring"
              >
                <span>Structure Loan & Subsidies</span>
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-6 text-xs text-white/70">
              <span className="flex items-center gap-1.5">
                <span className="text-[#e6c99a]">✓</span> 11+ Indian Vernacular Languages
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-[#e6c99a]">✓</span> NSFDC, NBCFDC & PM Vishwakarma
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-[#e6c99a]">✓</span> 21,000+ Geo-Tagged Bank Branches
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pillars of SIH-26091 */}
      <section className="paper-grid page-shell py-20 sm:py-28" id="framework">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <span className="eyebrow">The 4-Step Solution · SIH-26091</span>
            <h2 className="mt-4 text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl">
              From village market demand<br />
              <span className="editorial-serif">to a sanctioned loan.</span>
            </h2>
            <p className="mt-4 text-sm text-[#1E3A2B]/75 leading-relaxed">
              Designed specifically for the Ministry of Social Justice and Empowerment to overcome information asymmetry for rural artisans, self-help groups, and marginalized entrepreneurs.
            </p>
            <div className="mt-6">
              <Link
                href="/advisory"
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#B85228] hover:underline"
              >
                Launch Advisory Studio <span>→</span>
              </Link>
            </div>
          </div>

          <div className="border-t border-[#1E3A2B]/20">
            {sihPillars.map((item) => (
              <article
                className="group grid gap-3 border-b border-[#1E3A2B]/15 py-6 sm:grid-cols-[48px_160px_1fr] sm:items-baseline"
                key={item.step}
              >
                <span className="font-mono text-xs font-bold text-[#B85228]">{item.step}</span>
                <div>
                  <h3 className="text-lg font-black tracking-tight text-[#191917] group-hover:text-[#B85228] transition-colors">
                    <Link href={item.href}>{item.title}</Link>
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E3A2B]/50">
                    {item.tag}
                  </span>
                </div>
                <p className="text-xs sm:text-sm leading-6 text-[#1E3A2B]/80">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* MoSJE Corporation Financial Integration Banner */}
      <section className="bg-[#FAF6EE] border-y border-[#1E3A2B]/15 py-16">
        <div className="page-shell">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#1E3A2B]/15 pb-6">
            <div>
              <span className="eyebrow">MoSJE Scheme Integration</span>
              <h3 className="mt-2 text-2xl font-black text-[#191917] sm:text-3xl">
                Targeted Financial Corporates & Schemes
              </h3>
            </div>
            <Link
              href="/schemes"
              className="text-xs font-black uppercase tracking-wider text-[#B85228] hover:underline"
            >
              View Full Scheme Catalogue (12+ Schemes) →
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mosjeCorporations.map((corp) => (
              <div
                key={corp.code}
                className="rounded-2xl border border-[#1E3A2B]/15 bg-white p-5 shadow-2xs hover:border-[#1E3A2B]/40 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded bg-[#1E3A2B] px-2 py-0.5 text-[10px] font-black text-[#F7F3E9]">
                    {corp.code}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700">{corp.rate}</span>
                </div>
                <h4 className="mt-3 text-sm font-bold text-[#191917]">{corp.name}</h4>
                <div className="mt-2 border-t border-[#1E3A2B]/10 pt-2 text-xs font-semibold text-[#B85228]">
                  {corp.subsidy}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Accessibility Section */}
      <section className="bg-[#e8e5db] text-black py-20" id="trust">
        <div className="page-shell grid gap-12 lg:grid-cols-2">
          <div className="border-b border-black/20 pb-10 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-14">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#B85228]">
              Rural Accessibility & Field Support
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl">
              Voice-First, Multilingual &<br />
              <span className="editorial-serif">Gram Udyog Mitr assisted.</span>
            </h2>
            <p className="mt-6 text-base leading-7 text-black/80">
              Rural micro-entrepreneurs face literacy and digital barriers. Kaarva offers Groq Whisper-powered voice auto-fill in 11 languages, coupled with an audited field facilitator workspace so village ASHA / Gram Udyog Mitrs can onboard beneficiaries with full consent and offline tracking.
            </p>
          </div>

          <div className="flex flex-col justify-between gap-8 lg:pl-14">
            <div className="space-y-4">
              <div className="rounded-xl border border-black/15 bg-white/70 p-4">
                <span className="text-xs font-black uppercase text-[#1E3A2B]">🎙️ Voice-To-Form in Local Dialect</span>
                <p className="mt-1 text-xs text-black/75">
                  Speak about your dairy, pottery, or welding setup in Hindi, Marathi, Bengali, Tamil, etc., and let the system map structured requirements.
                </p>
              </div>
              <div className="rounded-xl border border-black/15 bg-white/70 p-4">
                <span className="text-xs font-black uppercase text-[#1E3A2B]">📄 Bank-Ready DPR & Pre-Sanction PDF</span>
                <p className="mt-1 text-xs text-black/75">
                  Generate official detailed project reports with capital structuring breakdown, unit economics, and DSCR metrics for immediate branch review.
                </p>
              </div>
            </div>

            <div>
              <Link className="button-primary" href="/register">
                Start Rural Business Evaluation
              </Link>
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.15em] text-black/50">
                100% Free for Rural Entrepreneurs · SIH 2026 Solution
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="flex flex-col gap-6 bg-black px-5 py-8 text-white sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
        <BrandMark inverse />
        <div className="text-right">
          <p className="text-xs uppercase tracking-[0.15em] text-white/50">
            Smart India Hackathon 2026 · Problem Statement SIH-26091
          </p>
          <p className="text-[10px] text-white/40 mt-1">
            Ministry of Social Justice and Empowerment (MoSJE)
          </p>
        </div>
      </footer>
    </main>
  );
}
