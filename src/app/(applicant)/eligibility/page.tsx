
import { T } from "@/components/language/LanguageProvider";
import Link from "next/link";
import { EligibilityWizard } from "@/components/ai/EligibilityWizard";
import { requireApplicant } from "@/lib/auth/guards";

export default async function EligibilityPage() {
  await requireApplicant();
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-4 flex flex-wrap gap-2">
        <Link href="/advisory" className="inline-flex items-center gap-1.5 rounded-lg border border-[#1E3A2B]/15 bg-white px-3 py-1.5 text-xs font-bold text-[#1E3A2B] hover:bg-[#FAF6EE] shadow-2xs">
          <span>📊 Hyper-Local Business Advisory</span>
        </Link>
        <Link href="/structuring" className="inline-flex items-center gap-1.5 rounded-lg border border-[#1E3A2B]/15 bg-white px-3 py-1.5 text-xs font-bold text-[#1E3A2B] hover:bg-[#FAF6EE] shadow-2xs">
          <span>💰 Financial Structuring Assistant</span>
        </Link>
      </div>
      <span className="eyebrow">Your details · SIH-26091 (MoSJE)</span>
      <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#191917] leading-tight"> <T>Tell us what you need funding for</T> </h1>
      <p className="mt-2.5 text-sm sm:text-base text-[#1E3A2B]/75 leading-relaxed">Your answers help us evaluate scheme eligibility and structure your financing. You can review everything before applying.</p>
      <div className="mt-8"><EligibilityWizard /></div>
    </div>
  );
}
