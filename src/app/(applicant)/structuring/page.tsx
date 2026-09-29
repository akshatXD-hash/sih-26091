import { Suspense } from "react";
import { T } from "@/components/language/LanguageProvider";
import { FinancialStructuringStudio } from "@/components/structuring/FinancialStructuringStudio";
import { requireApplicant } from "@/lib/auth/guards";

export const metadata = {
  title: "Personalized Financial Structuring | Kaarva",
  description: "Automated capital stack structuring, promoter equity optimization, and MoSJE subsidy mapping for rural micro-entrepreneurs.",
};

export default async function FinancialStructuringPage() {
  await requireApplicant();

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6">
        <span className="eyebrow">MoSJE Rural Financial Structuring</span>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#191917] sm:text-4xl">
          <T>Personalized Financial Structuring</T>
        </h1>
        <p className="mt-1.5 text-sm text-[#1E3A2B]/75 max-w-3xl">
          <T>
            Compute your promoter contribution, tap MoSJE capital subsidies, and align debt repayment with rural cash flow cycles.
          </T>
        </p>
      </div>

      <Suspense fallback={<div className="p-12 text-center text-sm text-[#1E3A2B]/70">Loading Financial Structuring Assistant...</div>}>
        <FinancialStructuringStudio />
      </Suspense>
    </div>
  );
}
