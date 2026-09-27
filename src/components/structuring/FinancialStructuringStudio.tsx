"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { T } from "@/components/language/LanguageProvider";
import {
  structureRuralFinance,
  type BeneficiaryCategory,
  type CashFlowCycle,
  type FinancialStructureResult,
  type LocationType,
} from "@/lib/structuring";

const CATEGORY_OPTIONS: { id: BeneficiaryCategory; label: string; desc: string; agency: string }[] = [
  { id: "SC", label: "Scheduled Caste (SC)", desc: "NSFDC Concessional Finance (4.0% interest)", agency: "NSFDC" },
  { id: "OBC", label: "Other Backward Class (OBC)", desc: "NBCFDC Term Loan (4.5% interest)", agency: "NBCFDC" },
  { id: "ARTISAN", label: "Traditional Artisan / Vishwakarma", desc: "PM Vishwakarma 5% Subsidized Credit + ₹15k Tool Grant", agency: "MoSJE / MSME" },
  { id: "SAFAI_KARAMCHARI", label: "Safai Karamchari / Dependent", desc: "NSKFDC Livelihood Scheme (3.5% interest)", agency: "NSKFDC" },
  { id: "DIVYANGJAN", label: "Divyangjan (Person with Disability)", desc: "NDFDC Swavalamban Scheme (4.0% interest)", agency: "NDFDC" },
  { id: "WOMEN", label: "Rural Women Micro-Enterprise", desc: "35% Rural Subsidy / Stand-Up India Concession", agency: "PMEGP / SIDBI" },
  { id: "ST", label: "Scheduled Tribe (ST)", desc: "NSTFDC Adivasi Micro-Credit (4.0% interest)", agency: "NSTFDC" },
  { id: "GENERAL", label: "General Rural Micro-Enterprise", desc: "PMEGP / MUDRA Kishore Credit Support", agency: "KVIC / MUDRA" },
];

export function FinancialStructuringStudio() {
  const searchParams = useSearchParams();

  const initialCost = Number(searchParams.get("cost")) || 200000;
  const initialPromoter = Number(searchParams.get("promoter")) || 25000;

  const [projectCost, setProjectCost] = useState<number>(initialCost);
  const [promoterCapital, setPromoterCapital] = useState<number>(initialPromoter);
  const [category, setCategory] = useState<BeneficiaryCategory>("SC");
  const [locationType, setLocationType] = useState<LocationType>("RURAL");
  const [cashFlowCycle, setCashFlowCycle] = useState<CashFlowCycle>("MONTHLY");
  const [tenureMonths, setTenureMonths] = useState<number>(36);

  const [, startTransition] = useTransition();

  const result: FinancialStructureResult = structureRuralFinance({
    totalProjectCost: projectCost,
    promoterCapitalAvailable: promoterCapital,
    socialCategory: category,
    locationType,
    cashFlowCycle,
    desiredTenureMonths: tenureMonths,
  });

  return (
    <div className="space-y-10 pb-16">
      {/* SIH Banner */}
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
              <T>Personalized Financial Structuring Assistant</T>
            </h2>
            <p className="mt-1 text-sm text-[#1E3A2B]/80 max-w-3xl">
              <T>
                Intelligently blends your promoter equity with MoSJE capital subsidies, concessional debt, and rural cash-flow-aligned repayment (harvest/haat cycle) to maximize bank sanction readiness.
              </T>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/advisory"
              className="rounded-lg border border-[#1E3A2B]/20 bg-white px-4 py-2.5 text-xs font-bold text-[#1E3A2B] shadow-2xs hover:bg-[#FAF6EE] transition-colors"
            >
              <T>← Business Advisory</T>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Structuring Layout */}
      <div className="grid gap-8 lg:grid-cols-[1.1fr_1.9fr]">
        {/* Left Inputs */}
        <div className="space-y-6">
          {/* Social Category Picker */}
          <div className="rounded-2xl border border-[#1E3A2B]/15 bg-white p-6 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black uppercase tracking-wider text-[#1E3A2B]">
                <T>1. Beneficiary Category (MoSJE)</T>
              </h3>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#B85228]">Subsidies & Concessions</span>
            </div>
            <p className="mt-1 text-xs text-[#1E3A2B]/70">
              <T>Unlocks targeted corporations: NSFDC, NBCFDC, NSKFDC, NDFDC, PM Vishwakarma.</T>
            </p>

            <div className="mt-4 grid gap-2">
              {CATEGORY_OPTIONS.map((opt) => {
                const isSelected = opt.id === category;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => startTransition(() => setCategory(opt.id))}
                    className={`flex flex-col rounded-xl border p-3 text-left transition-all cursor-pointer ${
                      isSelected
                        ? "border-[#1E3A2B] bg-[#1E3A2B]/5 ring-1 ring-[#1E3A2B]"
                        : "border-[#1E3A2B]/10 hover:border-[#1E3A2B]/25 hover:bg-[#FAF6EE]/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-[#191917]">{opt.label}</span>
                      <span className="rounded bg-[#1E3A2B]/10 px-1.5 py-0.5 text-[9px] font-bold text-[#1E3A2B]">
                        {opt.agency}
                      </span>
                    </div>
                    <span className="mt-0.5 text-[11px] text-[#1E3A2B]/75">{opt.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Capital & Financial Need Sliders */}
          <div className="rounded-2xl border border-[#1E3A2B]/15 bg-white p-6 shadow-xs space-y-5">
            <h3 className="text-sm font-black uppercase tracking-wider text-[#1E3A2B]">
              <T>2. Capital Requirements & Tenure</T>
            </h3>

            {/* Total Project Cost */}
            <div>
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-[#191917]">
                  <T>Total Project Cost (Capex + Initial Stock)</T>
                </label>
                <span className="text-sm font-black text-[#1E3A2B]">₹{projectCost.toLocaleString("en-IN")}</span>
              </div>
              <input
                type="range"
                min={25000}
                max={1000000}
                step={10000}
                value={projectCost}
                onChange={(e) => setProjectCost(Number(e.target.value))}
                className="mt-2 w-full accent-[#1E3A2B]"
              />
              <div className="flex justify-between text-[10px] text-[#1E3A2B]/60 font-semibold">
                <span>₹25k (Micro-kit)</span>
                <span>₹2.5L (Small Unit)</span>
                <span>₹10L (MUDRA limit)</span>
              </div>
            </div>

            {/* Available Promoter Capital */}
            <div>
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-[#191917]">
                  <T>Available Own Contribution (Margin Money)</T>
                </label>
                <span className="text-sm font-black text-[#B85228]">₹{promoterCapital.toLocaleString("en-IN")}</span>
              </div>
              <input
                type="range"
                min={2000}
                max={Math.min(300000, projectCost)}
                step={2000}
                value={promoterCapital}
                onChange={(e) => setPromoterCapital(Number(e.target.value))}
                className="mt-2 w-full accent-[#B85228]"
              />
              <p className="mt-1 text-[10px] text-[#1E3A2B]/70">
                Minimum required under MoSJE schemes: only 5% (₹{Math.round(projectCost * 0.05).toLocaleString("en-IN")})
              </p>
            </div>

            {/* Location Type */}
            <div>
              <label className="text-[11px] font-bold text-[#191917]">
                <T>Enterprise Geography</T>
              </label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setLocationType("RURAL")}
                  className={`rounded-xl border py-2.5 text-center text-xs font-bold transition-all cursor-pointer ${
                    locationType === "RURAL"
                      ? "border-[#1E3A2B] bg-[#1E3A2B] text-white shadow-2xs"
                      : "border-[#1E3A2B]/15 bg-[#FAF6EE]/50 text-[#1E3A2B] hover:bg-[#FAF6EE]"
                  }`}
                >
                  <T>Rural (35% Max Subsidy)</T>
                </button>
                <button
                  type="button"
                  onClick={() => setLocationType("URBAN")}
                  className={`rounded-xl border py-2.5 text-center text-xs font-bold transition-all cursor-pointer ${
                    locationType === "URBAN"
                      ? "border-[#1E3A2B] bg-[#1E3A2B] text-white shadow-2xs"
                      : "border-[#1E3A2B]/15 bg-[#FAF6EE]/50 text-[#1E3A2B] hover:bg-[#FAF6EE]"
                  }`}
                >
                  <T>Semi-Urban / Town</T>
                </button>
              </div>
            </div>

            {/* Rural Cash-Flow Repayment Cycle */}
            <div>
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-[#191917]">
                  <T>Rural Cash-Flow Cycle Mode</T>
                </label>
                <span className="text-[10px] font-bold text-[#B85228]">Low Default Stress</span>
              </div>
              <div className="mt-2 grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setCashFlowCycle("MONTHLY")}
                  className={`rounded-xl border p-2 text-center text-[11px] font-bold transition-all cursor-pointer ${
                    cashFlowCycle === "MONTHLY"
                      ? "border-[#1E3A2B] bg-[#1E3A2B] text-white"
                      : "border-[#1E3A2B]/15 bg-[#FAF6EE]/50 text-[#1E3A2B]"
                  }`}
                >
                  <T>Monthly NACH</T>
                </button>
                <button
                  type="button"
                  onClick={() => setCashFlowCycle("HARVEST_BIANNUAL")}
                  className={`rounded-xl border p-2 text-center text-[11px] font-bold transition-all cursor-pointer ${
                    cashFlowCycle === "HARVEST_BIANNUAL"
                      ? "border-[#1E3A2B] bg-[#1E3A2B] text-white"
                      : "border-[#1E3A2B]/15 bg-[#FAF6EE]/50 text-[#1E3A2B]"
                  }`}
                >
                  <T>🌾 Harvest (Biannual)</T>
                </button>
                <button
                  type="button"
                  onClick={() => setCashFlowCycle("WEEKLY_HAAT")}
                  className={`rounded-xl border p-2 text-center text-[11px] font-bold transition-all cursor-pointer ${
                    cashFlowCycle === "WEEKLY_HAAT"
                      ? "border-[#1E3A2B] bg-[#1E3A2B] text-white"
                      : "border-[#1E3A2B]/15 bg-[#FAF6EE]/50 text-[#1E3A2B]"
                  }`}
                >
                  <T>🎪 Weekly Haat</T>
                </button>
              </div>
            </div>

            {/* Tenure */}
            <div>
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-[#191917]">
                  <T>Repayment Tenure</T>
                </label>
                <span className="text-xs font-black text-[#1E3A2B]">{tenureMonths} Months ({Math.round(tenureMonths / 12)} Yrs)</span>
              </div>
              <div className="mt-2 flex gap-2">
                {[24, 36, 48, 60].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setTenureMonths(m)}
                    className={`flex-1 rounded-lg border py-1.5 text-xs font-bold transition-colors cursor-pointer ${
                      tenureMonths === m
                        ? "border-[#1E3A2B] bg-[#1E3A2B] text-white"
                        : "border-[#1E3A2B]/15 bg-[#FAF6EE]/50 text-[#1E3A2B]"
                    }`}
                  >
                    {m}M
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Output: Structured Financial Stack & Amortization */}
        <div className="space-y-6">
          {/* The Capital Stack Card */}
          <div className="rounded-2xl border border-[#1E3A2B]/15 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1E3A2B]/10 pb-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#B85228]">
                  Automated Capital Stack
                </span>
                <h3 className="text-xl font-black text-[#191917]">
                  Optimized Funding Structure for ₹{result.totalProjectCost.toLocaleString("en-IN")}
                </h3>
              </div>
              <div className="rounded-lg bg-emerald-50 px-3 py-1.5 border border-emerald-200 text-right">
                <span className="text-[10px] font-bold uppercase text-emerald-800">Concessional Rate</span>
                <p className="text-base font-black text-emerald-700">{result.debtStructure.effectiveInterestRate}% p.a.</p>
              </div>
            </div>

            {/* Visual Stacked Bar */}
            <div className="mt-5">
              <div className="flex h-6 w-full overflow-hidden rounded-xl border border-black/10">
                <div
                  style={{ width: `${result.promoterContribution.percentage}%` }}
                  className="bg-amber-600 flex items-center justify-center text-[10px] font-black text-white"
                  title="Promoter Contribution"
                >
                  {result.promoterContribution.percentage}%
                </div>
                <div
                  style={{ width: `${result.governmentSubsidy.percentage}%` }}
                  className="bg-emerald-600 flex items-center justify-center text-[10px] font-black text-white"
                  title="Govt Subsidy"
                >
                  {result.governmentSubsidy.percentage}%
                </div>
                <div
                  style={{ width: `${result.debtStructure.termLoanPct}%` }}
                  className="bg-[#1E3A2B] flex items-center justify-center text-[10px] font-black text-white"
                  title="Term Loan"
                >
                  {result.debtStructure.termLoanPct}%
                </div>
                <div
                  style={{ width: `${result.debtStructure.workingCapitalPct}%` }}
                  className="bg-sky-700 flex items-center justify-center text-[10px] font-black text-white"
                  title="Working Capital"
                >
                  {result.debtStructure.workingCapitalPct}%
                </div>
              </div>

              {/* Legend & Amounts */}
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-3">
                  <div className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-full bg-amber-600" />
                    <span className="font-bold text-amber-950">Promoter Equity</span>
                  </div>
                  <p className="mt-1 text-base font-black text-amber-900">
                    ₹{result.promoterContribution.amount.toLocaleString("en-IN")}
                  </p>
                  <span className="text-[10px] text-amber-800">
                    ({result.promoterContribution.percentage}% of project)
                  </span>
                  {result.promoterContribution.surplusRetainedAsBuffer > 0 && (
                    <p className="mt-1 text-[9px] font-bold text-emerald-700">
                      +₹{result.promoterContribution.surplusRetainedAsBuffer.toLocaleString("en-IN")} liquid buffer saved
                    </p>
                  )}
                </div>

                <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-3">
                  <div className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-full bg-emerald-600" />
                    <span className="font-bold text-emerald-950">Capital Subsidy</span>
                  </div>
                  <p className="mt-1 text-base font-black text-emerald-700">
                    ₹{result.governmentSubsidy.amount.toLocaleString("en-IN")}
                  </p>
                  <span className="text-[10px] text-emerald-800">
                    ({result.governmentSubsidy.percentage}% Back-ended grant)
                  </span>
                </div>

                <div className="rounded-xl border border-[#1E3A2B]/20 bg-[#1E3A2B]/5 p-3">
                  <div className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-full bg-[#1E3A2B]" />
                    <span className="font-bold text-[#1E3A2B]">Term Loan</span>
                  </div>
                  <p className="mt-1 text-base font-black text-[#1E3A2B]">
                    ₹{result.debtStructure.termLoanAmount.toLocaleString("en-IN")}
                  </p>
                  <span className="text-[10px] text-[#1E3A2B]/80">Capex / Machinery debt</span>
                </div>

                <div className="rounded-xl border border-sky-200 bg-sky-50/50 p-3">
                  <div className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-full bg-sky-700" />
                    <span className="font-bold text-sky-950">Working Capital</span>
                  </div>
                  <p className="mt-1 text-base font-black text-sky-900">
                    ₹{result.debtStructure.workingCapitalAmount.toLocaleString("en-IN")}
                  </p>
                  <span className="text-[10px] text-sky-800">Cash Credit / Inventory line</span>
                </div>
              </div>
            </div>

            {/* Repayment & Grace Period Details */}
            <div className="mt-6 rounded-xl border border-[#1E3A2B]/10 bg-[#FAF6EE] p-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E3A2B]/60">
                    {cashFlowCycle === "HARVEST_BIANNUAL"
                      ? "🌾 Harvest Post-Crop Installment (Every 6 Months)"
                      : cashFlowCycle === "WEEKLY_HAAT"
                      ? "🎪 Weekly Haat Market Installment"
                      : "Monthly Equivalent Debt Service"}
                  </span>
                  <p className="mt-0.5 text-2xl font-black text-[#191917]">
                    ₹{result.repaymentSchedule.perCycleInstallment.toLocaleString("en-IN")}
                    <span className="text-xs font-semibold text-[#1E3A2B]/75">
                      {" "}
                      / {cashFlowCycle === "HARVEST_BIANNUAL" ? "Harvest season" : cashFlowCycle === "WEEKLY_HAAT" ? "Week" : "Month"}
                    </span>
                  </p>
                  <p className="mt-1 text-xs text-[#1E3A2B]/75">{result.repaymentSchedule.cycleDescription}</p>
                </div>

                <div className="flex gap-4 border-l border-[#1E3A2B]/15 pl-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#1E3A2B]/60">Moratorium</span>
                    <p className="text-sm font-black text-[#B85228]">{result.debtStructure.moratoriumMonths} Months</p>
                    <span className="text-[9px] text-[#1E3A2B]/60">Setup grace</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#1E3A2B]/60">Total Interest</span>
                    <p className="text-sm font-black text-[#191917]">₹{result.repaymentSchedule.totalInterestPayable.toLocaleString("en-IN")}</p>
                    <span className="text-[9px] text-[#1E3A2B]/60">Over {result.debtStructure.tenureMonths}M</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Banking Viability & DSCR Gauge */}
          <div className="rounded-2xl border border-[#1E3A2B]/15 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#1E3A2B]/10 pb-3">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-[#1E3A2B]">
                  <T>Bank Viability & Debt Service Coverage Ratio (DSCR)</T>
                </span>
                <p className="text-[11px] text-[#1E3A2B]/70">Standard lending requirement: DSCR &gt; 1.35x</p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-black uppercase ${
                  result.viabilityMetrics.viabilityBadge === "EXCELLENT"
                    ? "bg-emerald-100 text-emerald-800"
                    : result.viabilityMetrics.viabilityBadge === "STRONG"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {result.viabilityMetrics.viabilityBadge}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-[#FAF6EE] p-3 text-center">
                <span className="text-[10px] font-bold uppercase text-[#1E3A2B]/60">Projected DSCR</span>
                <p className="mt-1 text-xl font-black text-[#1E3A2B]">{result.viabilityMetrics.dscr}x</p>
                <span className="text-[10px] text-emerald-700 font-bold">Healthy Bank Cushion</span>
              </div>

              <div className="rounded-xl bg-[#FAF6EE] p-3 text-center">
                <span className="text-[10px] font-bold uppercase text-[#1E3A2B]/60">Est. Net Profit / Mo</span>
                <p className="mt-1 text-xl font-black text-emerald-700">
                  ₹{result.viabilityMetrics.projectedMonthlyNetIncome.toLocaleString("en-IN")}
                </p>
                <span className="text-[10px] text-[#1E3A2B]/70">After opex</span>
              </div>

              <div className="rounded-xl bg-[#FAF6EE] p-3 text-center">
                <span className="text-[10px] font-bold uppercase text-[#1E3A2B]/60">Sanction Confidence</span>
                <p className="mt-1 text-xl font-black text-[#B85228]">
                  {result.viabilityMetrics.bankSanctionConfidencePct}%
                </p>
                <span className="text-[10px] text-[#1E3A2B]/70">Pre-qualified</span>
              </div>
            </div>
          </div>

          {/* Primary Matching MoSJE Scheme Card */}
          <div className="rounded-2xl border-2 border-[#1E3A2B] bg-[#1E3A2B] text-white p-6 shadow-md">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/20 pb-4">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#e6c99a]">
                  Best Matched MoSJE Scheme
                </span>
                <h4 className="text-xl font-black text-white">{result.primaryScheme.schemeName}</h4>
                <p className="text-xs text-white/75 mt-0.5">{result.primaryScheme.agencyOrCorporation}</p>
              </div>
              <div className="rounded-lg bg-white/10 px-3 py-1.5 text-right">
                <span className="text-[10px] text-white/60">Collateral-Free Limit:</span>
                <p className="text-sm font-black text-[#e6c99a]">
                  ₹{(result.primaryScheme.collateralFreeLimit / 100000).toFixed(0)} Lakhs
                </p>
              </div>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-white/85">
              {result.primaryScheme.eligibilityDescription}
            </p>

            <div className="mt-4 rounded-xl bg-black/25 p-3 font-serif text-xs leading-relaxed text-white/90">
              "{result.summaryDprNote}"
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-4">
              <Link
                href="/schemes"
                className="text-xs font-bold text-white/75 hover:text-white underline"
              >
                <T>Browse all alternative schemes →</T>
              </Link>

              <div className="flex items-center gap-3">
                <Link
                  href="/branches"
                  className="rounded-xl border border-white/30 bg-white/10 px-4 py-2.5 text-xs font-bold text-white hover:bg-white/20 transition-colors"
                >
                  <T>Find Authorized Bank Branches</T>
                </Link>
                <Link
                  href="/eligibility"
                  className="rounded-xl bg-[#e6c99a] px-5 py-2.5 text-xs font-black text-[#1E3A2B] shadow-md hover:bg-white transition-all transform hover:scale-[1.02]"
                >
                  <T>Start Application with This Structure →</T>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
