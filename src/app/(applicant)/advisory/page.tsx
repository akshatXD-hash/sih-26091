import { T } from "@/components/language/LanguageProvider";
import { BusinessAdvisoryStudio } from "@/components/advisory/BusinessAdvisoryStudio";
import { requireApplicant } from "@/lib/auth/guards";

export const metadata = {
  title: "Hyper-Local Business Advisory | Kaarva",
  description: "AI-driven market demand analysis, mandi price benchmarking, and unit economics for rural micro-entrepreneurs.",
};

export default async function BusinessAdvisoryPage() {
  await requireApplicant();

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6">
        <span className="eyebrow">MoSJE Rural Market Intelligence</span>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#191917] sm:text-4xl">
          <T>Hyper-Local Rural Business Advisory</T>
        </h1>
        <p className="mt-1.5 text-sm text-[#1E3A2B]/75 max-w-3xl">
          <T>
            Evaluate rural business opportunities with real APMC Mandi pricing, demographic capacity models, and seasonal risk warnings.
          </T>
        </p>
      </div>

      <BusinessAdvisoryStudio />
    </div>
  );
}
