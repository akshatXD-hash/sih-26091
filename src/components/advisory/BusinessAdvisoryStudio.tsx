"use client";

import { useState } from "react";
import Link from "next/link";
import { T } from "@/components/language/LanguageProvider";
import {
  generateBusinessAdvisory,
  RURAL_TRADES,
  type BusinessAdvisoryResult,
  type RuralTradeProfile,
} from "@/lib/advisory";

const SAMPLE_LOCATIONS = [
  { state: "Uttar Pradesh", district: "Varanasi", block: "Arajiline", mandi: "Raja Talab APMC Mandi" },
  { state: "Maharashtra", district: "Pune", block: "Baramati", mandi: "Baramati Krishi Utpanna Mandi" },
  { state: "Bihar", district: "Nalanda", block: "Bihar Sharif", mandi: "Noorsarai Vegetable Hub" },
  { state: "Rajasthan", district: "Jaipur", block: "Sanganer", mandi: "Sanganer Artisan Mandi" },
  { state: "Karnataka", district: "Belagavi", block: "Chikkodi", mandi: "Chikkodi Agro Haat" },
  { state: "Madhya Pradesh", district: "Ujjain", block: "Tarana", mandi: "Tarana Grain Mandi" },
];

export function BusinessAdvisoryStudio() {
  const [selectedTradeId, setSelectedTradeId] = useState<string>("dairy_processing");
  const [state, setState] = useState<string>("Uttar Pradesh");
  const [district, setDistrict] = useState<string>("Varanasi");
  const [block, setBlock] = useState<string>("Arajiline");
  const [villageOrMandi, setVillageOrMandi] = useState<string>("Raja Talab APMC Mandi");
  const [population, setPopulation] = useState<number>(30000);
  const [availableInvestment, setAvailableInvestment] = useState<number>(120000);

  const [advisoryResult, setAdvisoryResult] = useState<BusinessAdvisoryResult | null>(() =>
    generateBusinessAdvisory({
      state: "Uttar Pradesh",
      district: "Varanasi",
      block: "Arajiline",
      villageOrMandi: "Raja Talab APMC Mandi",
      tradeId: "dairy_processing",
      estimatedPopulation: 30000,
      availableInvestment: 120000,
    }),
  );

  const selectedTrade: RuralTradeProfile = RURAL_TRADES[selectedTradeId] || RURAL_TRADES.dairy_processing;

  function handleSelectPresetLocation(loc: typeof SAMPLE_LOCATIONS[0]) {
    setState(loc.state);
    setDistrict(loc.district);
    setBlock(loc.block);
    setVillageOrMandi(loc.mandi);
  }

  function handleAnalyze() {
    const result = generateBusinessAdvisory({
      state,
      district,
      block,
      villageOrMandi,
      tradeId: selectedTradeId,
      estimatedPopulation: population,
      availableInvestment,
    });
    setAdvisoryResult(result);
  }

  return (
    <div className="space-y-10 pb-16">
      {/* Introduction Banner */}
      <div className="rounded-2xl border border-[#1E3A2B]/15 bg-gradient-to-r from-[#FAF6EE] to-[#F2ECE0] p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-[#1E3A2B] px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-[#F7F3E9]">
                SIH-26091
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#B85228]">
                Ministry of Social Justice & Empowerment
              </span>
            </div>
            <h2 className="mt-2 text-2xl font-black text-[#191917] sm:text-3xl">
              <T>Hyper-Local Business Advisory & Market Intelligence</T>
            </h2>
            <p className="mt-1 text-sm text-[#1E3A2B]/80 max-w-3xl">
              <T>
                Democratizing institutional consulting for rural micro-entrepreneurs. Discover real market demand, APMC Mandi pricing benchmarks, saturation risk, and bank-ready unit economics before you invest.
              </T>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/structuring"
              className="rounded-lg bg-[#B85228] px-4 py-2.5 text-xs font-black text-white shadow-sm hover:bg-[#963f1c] transition-colors"
            >
              <T>Go to Financial Structuring →</T>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Grid: Inputs on Left, Results on Right */}
      <div className="grid gap-8 lg:grid-cols-[1.1fr_1.9fr]">
        {/* Left Column: Form Controls */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-[#1E3A2B]/15 bg-white p-6 shadow-xs">
            <h3 className="text-sm font-black uppercase tracking-wider text-[#1E3A2B]">
              <T>1. Choose Your Rural Enterprise Trade</T>
            </h3>
            <p className="mt-1 text-xs text-[#1E3A2B]/70">
              <T>Curated for MoSJE corporations (NSFDC, NBCFDC, NSKFDC, PM Vishwakarma).</T>
            </p>

            <div className="mt-4 grid gap-2.5">
              {Object.values(RURAL_TRADES).map((trade) => {
                const isSelected = trade.id === selectedTradeId;
                return (
                  <button
                    key={trade.id}
                    type="button"
                    onClick={() => {
                      setSelectedTradeId(trade.id);
                      setAvailableInvestment(Math.round((trade.defaultCapexMin + trade.defaultCapexMax) / 2));
                    }}
                    className={`flex flex-col rounded-xl border p-3.5 text-left transition-all cursor-pointer ${
                      isSelected
                        ? "border-[#1E3A2B] bg-[#1E3A2B]/5 ring-1 ring-[#1E3A2B]"
                        : "border-[#1E3A2B]/10 hover:border-[#1E3A2B]/30 hover:bg-[#FAF6EE]/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-[#191917]">{trade.name}</span>
                      <span className="rounded bg-[#1E3A2B]/10 px-1.5 py-0.5 text-[9px] font-bold text-[#1E3A2B]">
                        {trade.sector.replaceAll("_", " ")}
                      </span>
                    </div>
                    <p className="mt-1 line-clamp-2 text-[11px] text-[#1E3A2B]/75 leading-relaxed">
                      {trade.description}
                    </p>
                    <div className="mt-2 flex items-center justify-between text-[10px] font-semibold text-[#B85228]">
                      <span>Est. Capex: ₹{(trade.defaultCapexMin / 1000).toFixed(0)}k – ₹{(trade.defaultCapexMax / 1000).toFixed(0)}k</span>
                      <span>Margin: ~{trade.typicalGrossMarginPct}%</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Location & Population Inputs */}
          <div className="rounded-2xl border border-[#1E3A2B]/15 bg-white p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-black uppercase tracking-wider text-[#1E3A2B]">
              <T>2. Location & Cluster Intelligence</T>
            </h3>

            {/* Quick preset chips */}
            <div>
              <label className="text-[11px] font-bold text-[#1E3A2B]/70">
                <T>Quick Sample Rural Clusters:</T>
              </label>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {SAMPLE_LOCATIONS.map((loc) => (
                  <button
                    key={loc.district}
                    type="button"
                    onClick={() => handleSelectPresetLocation(loc)}
                    className={`rounded-md px-2 py-1 text-[10px] font-bold transition-colors cursor-pointer ${
                      district === loc.district
                        ? "bg-[#1E3A2B] text-white"
                        : "bg-[#1E3A2B]/5 text-[#1E3A2B] hover:bg-[#1E3A2B]/10"
                    }`}
                  >
                    {loc.district} ({loc.state})
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-[#191917]">
                  <T>State</T>
                </label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-[#1E3A2B]/20 bg-[#FAF6EE]/50 px-3 py-2 text-xs font-semibold text-[#191917] focus:border-[#1E3A2B] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-[#191917]">
                  <T>District</T>
                </label>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-[#1E3A2B]/20 bg-[#FAF6EE]/50 px-3 py-2 text-xs font-semibold text-[#191917] focus:border-[#1E3A2B] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-[#191917]">
                  <T>Block / Taluka</T>
                </label>
                <input
                  type="text"
                  value={block}
                  onChange={(e) => setBlock(e.target.value)}
                  placeholder="e.g. Arajiline"
                  className="mt-1 w-full rounded-lg border border-[#1E3A2B]/20 bg-[#FAF6EE]/50 px-3 py-2 text-xs font-semibold text-[#191917] focus:border-[#1E3A2B] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-[#191917]">
                  <T>Village / Mandi Hub</T>
                </label>
                <input
                  type="text"
                  value={villageOrMandi}
                  onChange={(e) => setVillageOrMandi(e.target.value)}
                  placeholder="e.g. Local Haat / APMC"
                  className="mt-1 w-full rounded-lg border border-[#1E3A2B]/20 bg-[#FAF6EE]/50 px-3 py-2 text-xs font-semibold text-[#191917] focus:border-[#1E3A2B] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-[#191917]">
                  <T>Cluster Population Served</T>
                </label>
                <span className="text-xs font-black text-[#1E3A2B]">{population.toLocaleString("en-IN")} residents</span>
              </div>
              <input
                type="range"
                min={3000}
                max={100000}
                step={2000}
                value={population}
                onChange={(e) => setPopulation(Number(e.target.value))}
                className="mt-2 w-full accent-[#1E3A2B]"
              />
              <div className="flex justify-between text-[10px] text-[#1E3A2B]/60 font-semibold">
                <span>3k (Small Village)</span>
                <span>25k (Panchayat Cluster)</span>
                <span>100k+ (Tehsil Hub)</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-[#191917]">
                  <T>Estimated Available Capital / Planned Scale</T>
                </label>
                <span className="text-xs font-black text-[#B85228]">₹{availableInvestment.toLocaleString("en-IN")}</span>
              </div>
              <input
                type="range"
                min={selectedTrade.defaultCapexMin}
                max={selectedTrade.defaultCapexMax * 1.5}
                step={5000}
                value={availableInvestment}
                onChange={(e) => setAvailableInvestment(Number(e.target.value))}
                className="mt-2 w-full accent-[#B85228]"
              />
            </div>

            <button
              type="button"
              onClick={handleAnalyze}
              className="w-full rounded-xl bg-[#1E3A2B] py-3 text-center text-xs font-black text-[#F7F3E9] shadow-sm hover:bg-[#15281e] transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span><T>Generate Hyper-Local Advisory Report</T></span>
            </button>
          </div>
        </div>

        {/* Right Column: Advisory Results */}
        {advisoryResult && (
          <div className="space-y-6">
            {/* Top Scorecard: Demand & Saturation */}
            <div className="rounded-2xl border border-[#1E3A2B]/15 bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1E3A2B]/10 pb-4">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#B85228]">
                    {advisoryResult.trade.sector.replaceAll("_", " ")}
                  </span>
                  <h3 className="text-xl font-black text-[#191917]">{advisoryResult.trade.name}</h3>
                  <p className="text-xs text-[#1E3A2B]/75 mt-0.5">
                    📍 {advisoryResult.locationSummary}
                  </p>
                </div>
                <div className="text-right">
                  <div className="inline-flex items-center gap-2 rounded-xl bg-[#1E3A2B]/5 px-3 py-1.5 border border-[#1E3A2B]/15">
                    <span className="text-xs font-bold text-[#1E3A2B]/70">Local Demand Score:</span>
                    <span className="text-lg font-black text-[#1E3A2B]">{advisoryResult.marketDemandScore}/100</span>
                  </div>
                </div>
              </div>

              {/* Saturation Gauge Card */}
              <div className="mt-4 rounded-xl border border-[#1E3A2B]/10 bg-[#FAF6EE] p-4">
                <div className="flex items-center gap-2">
                  <span
                    className={`size-2.5 rounded-full ${
                      advisoryResult.saturationRating === "HIGH_OPPORTUNITY"
                        ? "bg-emerald-600"
                        : advisoryResult.saturationRating === "MODERATE_STABLE"
                        ? "bg-amber-500"
                        : "bg-red-500"
                    }`}
                  />
                  <span className="text-xs font-black uppercase tracking-wider text-[#191917]">
                    Market Saturation Status: {advisoryResult.saturationRating.replaceAll("_", " ")}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-[#1E3A2B]/85">
                  {advisoryResult.saturationSummary}
                </p>
              </div>

              {/* Unit Economics Highlight Cards */}
              <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-xl border border-[#1E3A2B]/10 bg-white p-3.5 shadow-2xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E3A2B]/60">Estimated Setup Capex</span>
                  <p className="mt-1 text-base font-black text-[#191917]">
                    ₹{advisoryResult.unitEconomics.capexEstimated.toLocaleString("en-IN")}
                  </p>
                  <span className="text-[9px] text-[#1E3A2B]/60">Machinery & Installation</span>
                </div>

                <div className="rounded-xl border border-[#1E3A2B]/10 bg-white p-3.5 shadow-2xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E3A2B]/60">Monthly Working Capital</span>
                  <p className="mt-1 text-base font-black text-[#191917]">
                    ₹{advisoryResult.unitEconomics.monthlyOpexEstimated.toLocaleString("en-IN")}
                  </p>
                  <span className="text-[9px] text-[#1E3A2B]/60">Raw Material & Power</span>
                </div>

                <div className="rounded-xl border border-[#1E3A2B]/10 bg-white p-3.5 shadow-2xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E3A2B]/60">Est. Monthly Net Profit</span>
                  <p className="mt-1 text-base font-black text-emerald-700">
                    ₹{advisoryResult.unitEconomics.monthlyNetProfit.toLocaleString("en-IN")}
                  </p>
                  <span className="text-[9px] text-emerald-800 font-bold">~{advisoryResult.unitEconomics.grossMarginPct}% Operating Margin</span>
                </div>

                <div className="rounded-xl border border-[#1E3A2B]/10 bg-white p-3.5 shadow-2xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E3A2B]/60">Break-Even Horizon</span>
                  <p className="mt-1 text-base font-black text-[#B85228]">
                    {advisoryResult.unitEconomics.breakEvenMonths} Months
                  </p>
                  <span className="text-[9px] text-[#B85228] font-bold">Safe Bank Payback</span>
                </div>
              </div>
            </div>

            {/* APMC Mandi & Input Price Benchmarking */}
            <div className="rounded-2xl border border-[#1E3A2B]/15 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#1E3A2B]/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-[#1E3A2B]">
                    <T>APMC Mandi & Input Price Benchmarking</T>
                  </span>
                </div>
                <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-black text-emerald-700 border border-emerald-200">
                  +{advisoryResult.priceBenchmarking.valueAdditionPct}% Value Addition
                </span>
              </div>

              <div className="mt-4 grid sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-[#1E3A2B]/10 bg-[#FAF6EE]/50 p-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E3A2B]/60">Raw Material Inflow Cost (Mandi Auction)</span>
                  <p className="mt-1 text-sm font-black text-[#191917]">{advisoryResult.priceBenchmarking.inputItem}</p>
                  <p className="mt-2 text-xl font-black text-[#1E3A2B]">
                    ₹{advisoryResult.priceBenchmarking.mandiPrice} <span className="text-xs font-normal">/ {advisoryResult.priceBenchmarking.unit}</span>
                  </p>
                  <p className="mt-1 text-[11px] text-[#1E3A2B]/70">Nearest Mandi wholesale baseline</p>
                </div>

                <div className="rounded-xl border border-[#1E3A2B]/10 bg-emerald-50/50 p-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900/60">Value-Added Retail Realization</span>
                  <p className="mt-1 text-sm font-black text-emerald-950">Packaged / Finished Product Yield</p>
                  <p className="mt-2 text-xl font-black text-emerald-700">
                    ₹{advisoryResult.priceBenchmarking.retailPrice} <span className="text-xs font-normal">/ {advisoryResult.priceBenchmarking.unit} eq.</span>
                  </p>
                  <p className="mt-1 text-[11px] text-emerald-800">Direct village & weekly haat consumer sales</p>
                </div>
              </div>

              <div className="mt-4 rounded-lg bg-[#FAF6EE] p-3 text-xs text-[#1E3A2B]/80 flex items-start gap-2">
                <span className="font-bold text-[#B85228] shrink-0">💡 Sourcing Tip:</span>
                <span>{advisoryResult.sourcingAndSupply.procurementTip}</span>
              </div>
            </div>

            {/* Sourcing, Supply & Seasonal Risk */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-[#1E3A2B]/15 bg-white p-5 shadow-xs">
                <h4 className="text-xs font-black uppercase tracking-wider text-[#1E3A2B]">
                  <T>Raw Material Sourcing Clusters</T>
                </h4>
                <ul className="mt-3 space-y-2 text-xs text-[#191917]">
                  {advisoryResult.sourcingAndSupply.recommendedMandis.map((cluster, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-[#1E3A2B]" />
                      <span>{cluster}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 border-t border-[#1E3A2B]/10 pt-3">
                  <span className="text-[10px] font-bold uppercase text-[#1E3A2B]/60">Machinery & Tool Setup:</span>
                  <p className="mt-1 text-xs text-[#1E3A2B]/85">
                    {advisoryResult.trade.equipmentList.join(", ")}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-[#1E3A2B]/15 bg-white p-5 shadow-xs">
                <h4 className="text-xs font-black uppercase tracking-wider text-[#B85228]">
                  <T>Seasonality & Threat Advisory</T>
                </h4>
                <div className="mt-3 space-y-2 text-xs">
                  <div className="flex justify-between items-center bg-[#FAF6EE] px-2.5 py-1.5 rounded-md">
                    <span className="font-bold text-[#1E3A2B]">Peak Demand Months:</span>
                    <span className="font-semibold text-emerald-700">{advisoryResult.seasonalRisk.peakSeason.join(", ")}</span>
                  </div>
                  <div className="flex justify-between items-center bg-[#FAF6EE] px-2.5 py-1.5 rounded-md">
                    <span className="font-bold text-[#1E3A2B]">Lean Period:</span>
                    <span className="font-semibold text-amber-700">{advisoryResult.seasonalRisk.leanSeason.join(", ")}</span>
                  </div>
                </div>
                <div className="mt-3 text-xs leading-relaxed text-[#191917]">
                  <span className="font-bold text-red-700">Threat Alert: </span>
                  {advisoryResult.seasonalRisk.threat}
                </div>
                <div className="mt-2 text-xs leading-relaxed text-[#1E3A2B]/80">
                  <span className="font-bold text-emerald-800">Strategy: </span>
                  {advisoryResult.seasonalRisk.mitigation}
                </div>
              </div>
            </div>

            {/* Bank DPR Summary & Direct Structuring Action */}
            <div className="rounded-2xl border-2 border-[#1E3A2B] bg-[#1E3A2B] text-[#F7F3E9] p-6 shadow-md">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/20 pb-4">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#e6c99a]">
                    Official Bank-Ready Brief
                  </span>
                  <h4 className="text-lg font-black text-white">Detailed Project Report (DPR) Summary</h4>
                </div>
                <div className="rounded bg-white/10 px-2.5 py-1 text-xs font-mono font-bold text-[#e6c99a]">
                  DPR Ref: SIH26091-{advisoryResult.trade.id.slice(0, 4).toUpperCase()}
                </div>
              </div>

              <p className="mt-4 text-xs sm:text-sm leading-relaxed text-white/90 font-serif">
                "{advisoryResult.dprSummary}"
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-4">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-white/60">Recommended Scheme Framework:</span>
                  <p className="text-xs font-bold text-[#e6c99a]">{advisoryResult.mosjeRecommendedFinancing.primaryScheme}</p>
                </div>
                <Link
                  href={`/structuring?trade=${encodeURIComponent(advisoryResult.trade.id)}&cost=${advisoryResult.unitEconomics.capexEstimated + advisoryResult.unitEconomics.monthlyOpexEstimated}&promoter=${availableInvestment}`}
                  className="rounded-xl bg-[#e6c99a] px-5 py-3 text-xs font-black text-[#1E3A2B] shadow-md hover:bg-white transition-all transform hover:scale-[1.02]"
                >
                  <T>Structure Capital & Subsidies for This Project →</T>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
