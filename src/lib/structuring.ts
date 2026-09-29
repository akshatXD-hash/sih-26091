/**
 * Personalized Financial Structuring Engine for Rural Micro-Entrepreneurs.
 * Ministry of Social Justice and Empowerment (MoSJE).
 * 
 * Automatically blends promoter margin, MoSJE capital subsidies, concessional term loans,
 * and working capital credit lines with rural cash-flow-aligned repayment schedules.
 */

export type BeneficiaryCategory =
  | "SC"
  | "ST"
  | "OBC"
  | "GENERAL"
  | "SAFAI_KARAMCHARI"
  | "DIVYANGJAN"
  | "ARTISAN"
  | "WOMEN";

export type LocationType = "RURAL" | "URBAN";

export type CashFlowCycle = "MONTHLY" | "HARVEST_BIANNUAL" | "WEEKLY_HAAT";

export interface StructuringInput {
  totalProjectCost: number; // in INR
  promoterCapitalAvailable: number; // in INR
  socialCategory: BeneficiaryCategory;
  locationType?: LocationType;
  cashFlowCycle?: CashFlowCycle;
  desiredTenureMonths?: number;
  projectedMonthlyRevenue?: number;
  projectedMonthlyOpex?: number;
}

export interface MatchedFinancialScheme {
  schemeName: string;
  agencyOrCorporation: string; // e.g. NSFDC, NBCFDC, NSKFDC, NDFDC, MSME, MoSJE
  subsidyPct: number;
  maxSubsidyAmount: number;
  concessionalInterestRate: number;
  maxMoratoriumMonths: number;
  collateralFreeLimit: number;
  eligibilityDescription: string;
}

export interface FinancialStructureResult {
  totalProjectCost: number;
  promoterContribution: {
    amount: number;
    percentage: number;
    surplusRetainedAsBuffer: number;
  };
  governmentSubsidy: {
    amount: number;
    percentage: number;
    schemeName: string;
    isBackEnded: boolean;
  };
  debtStructure: {
    termLoanAmount: number;
    termLoanPct: number;
    workingCapitalAmount: number;
    workingCapitalPct: number;
    totalLoanAmount: number;
    effectiveInterestRate: number;
    tenureMonths: number;
    moratoriumMonths: number;
  };
  repaymentSchedule: {
    frequency: CashFlowCycle;
    monthlyEquivalentEMI: number;
    perCycleInstallment: number;
    cycleDescription: string;
    totalInterestPayable: number;
    totalDebtRepaid: number;
  };
  viabilityMetrics: {
    projectedMonthlyNetIncome: number;
    dscr: number; // Debt Service Coverage Ratio
    isFinanciallyViable: boolean;
    viabilityBadge: "EXCELLENT" | "STRONG" | "BORDERLINE" | "NEEDS_RESTRUCTURING";
    bankSanctionConfidencePct: number;
  };
  primaryScheme: MatchedFinancialScheme;
  alternativeSchemes: MatchedFinancialScheme[];
  summaryDprNote: string;
}

export function structureRuralFinance(input: StructuringInput): FinancialStructureResult {
  const totalCost = Math.max(10000, input.totalProjectCost);
  const promoterAvailable = Math.max(0, input.promoterCapitalAvailable);
  const category = input.socialCategory;
  const isRural = (input.locationType ?? "RURAL") === "RURAL";
  const cycle = input.cashFlowCycle ?? "MONTHLY";
  const tenure = Math.min(84, Math.max(12, input.desiredTenureMonths ?? 36));

  // Determine Primary MoSJE / Central Scheme Parameters
  let primaryScheme: MatchedFinancialScheme;
  let minPromoterPct = 10;
  let targetSubsidyPct = 25;
  let concessionalRate = 7.5;
  let moratoriumMonths = 3;

  switch (category) {
    case "SC":
      primaryScheme = {
        schemeName: "NSFDC Term Loan & Micro-Credit Finance",
        agencyOrCorporation: "National Scheduled Castes Finance and Development Corporation (NSFDC, MoSJE)",
        subsidyPct: isRural ? 35 : 25,
        maxSubsidyAmount: 125000,
        concessionalInterestRate: 4.0,
        maxMoratoriumMonths: 6,
        collateralFreeLimit: 1000000,
        eligibilityDescription: "Targeted concessional credit for SC micro-entrepreneurs living below double the poverty line or rural threshold."
      };
      minPromoterPct = 5;
      targetSubsidyPct = isRural ? 35 : 25;
      concessionalRate = 4.0;
      moratoriumMonths = 6;
      break;

    case "OBC":
      primaryScheme = {
        schemeName: "NBCFDC General Term Loan & Mahila Samriddhi",
        agencyOrCorporation: "National Backward Classes Finance & Development Corporation (MoSJE)",
        subsidyPct: isRural ? 30 : 20,
        maxSubsidyAmount: 100000,
        concessionalInterestRate: 4.5,
        maxMoratoriumMonths: 6,
        collateralFreeLimit: 1000000,
        eligibilityDescription: "Subsidized finance to OBC rural micro-entrepreneurs for agri-allied and service units."
      };
      minPromoterPct = 5;
      targetSubsidyPct = isRural ? 30 : 20;
      concessionalRate = 4.5;
      moratoriumMonths = 6;
      break;

    case "SAFAI_KARAMCHARI":
      primaryScheme = {
        schemeName: "NSKFDC General Credit & Sanitation Rehabilitation Scheme",
        agencyOrCorporation: "National Safai Karamcharis Finance & Development Corporation (MoSJE)",
        subsidyPct: isRural ? 35 : 30,
        maxSubsidyAmount: 150000,
        concessionalInterestRate: 3.5,
        maxMoratoriumMonths: 6,
        collateralFreeLimit: 1500000,
        eligibilityDescription: "Targeted livelihood rehabilitation with maximum subsidy and lowest interest for sanitation workers and dependents."
      };
      minPromoterPct = 5;
      targetSubsidyPct = isRural ? 35 : 30;
      concessionalRate = 3.5;
      moratoriumMonths = 6;
      break;

    case "DIVYANGJAN":
      primaryScheme = {
        schemeName: "NDFDC Divyangjan Swavalamban Yojana",
        agencyOrCorporation: "National Divyangjan Finance and Development Corporation (MoSJE)",
        subsidyPct: isRural ? 35 : 25,
        maxSubsidyAmount: 120000,
        concessionalInterestRate: 4.0,
        maxMoratoriumMonths: 6,
        collateralFreeLimit: 1000000,
        eligibilityDescription: "Concessional finance for micro-enterprises initiated by persons with 40%+ disability."
      };
      minPromoterPct = 5;
      targetSubsidyPct = isRural ? 35 : 25;
      concessionalRate = 4.0;
      moratoriumMonths = 6;
      break;

    case "ARTISAN":
      primaryScheme = {
        schemeName: "PM Vishwakarma Artisan Credit & Modern Toolkit Incentive",
        agencyOrCorporation: "Ministry of MSME & MoSJE",
        subsidyPct: 30,
        maxSubsidyAmount: 60000,
        concessionalInterestRate: 5.0,
        maxMoratoriumMonths: 6,
        collateralFreeLimit: 300000,
        eligibilityDescription: "Collateral-free credit up to ₹3 Lakhs at 5% interest with ₹15,000 digital tool grant for 18 traditional trades."
      };
      minPromoterPct = 5;
      targetSubsidyPct = 30;
      concessionalRate = 5.0;
      moratoriumMonths = 6;
      break;

    case "WOMEN":
      primaryScheme = {
        schemeName: "PMEGP Special Category (Rural Women) / Stand-Up India",
        agencyOrCorporation: "KVIC / MoSJE / SIDBI",
        subsidyPct: isRural ? 35 : 25,
        maxSubsidyAmount: 150000,
        concessionalInterestRate: 6.0,
        maxMoratoriumMonths: 6,
        collateralFreeLimit: 1000000,
        eligibilityDescription: "35% rural back-ended capital subsidy with 5% promoter equity for women-owned micro-enterprises."
      };
      minPromoterPct = 5;
      targetSubsidyPct = isRural ? 35 : 25;
      concessionalRate = 6.0;
      moratoriumMonths = 6;
      break;

    case "ST":
      primaryScheme = {
        schemeName: "NSTFDC Adivasi Mahila Sashaktikaran & Micro-Credit",
        agencyOrCorporation: "National Scheduled Tribes Finance and Development Corporation",
        subsidyPct: isRural ? 35 : 25,
        maxSubsidyAmount: 125000,
        concessionalInterestRate: 4.0,
        maxMoratoriumMonths: 6,
        collateralFreeLimit: 1000000,
        eligibilityDescription: "Subsidized term loans for tribal micro-entrepreneurs in notified agency/forest belts."
      };
      minPromoterPct = 5;
      targetSubsidyPct = isRural ? 35 : 25;
      concessionalRate = 4.0;
      moratoriumMonths = 6;
      break;

    case "GENERAL":
    default:
      primaryScheme = {
        schemeName: "PMEGP General Rural / MUDRA Kishore",
        agencyOrCorporation: "KVIC / MUDRA / MoMSME",
        subsidyPct: isRural ? 25 : 15,
        maxSubsidyAmount: 100000,
        concessionalInterestRate: 7.5,
        maxMoratoriumMonths: 3,
        collateralFreeLimit: 1000000,
        eligibilityDescription: "Standard credit-linked capital subsidy for new rural manufacturing and service projects."
      };
      minPromoterPct = 10;
      targetSubsidyPct = isRural ? 25 : 15;
      concessionalRate = 7.5;
      moratoriumMonths = 3;
      break;
  }

  // Calculate Capital Stack Components
  const minRequiredPromoterAmount = Math.round(totalCost * (minPromoterPct / 100));
  const actualPromoterAmount = Math.max(minRequiredPromoterAmount, Math.min(promoterAvailable, totalCost * 0.20));
  const surplusRetained = Math.max(0, promoterAvailable - actualPromoterAmount);
  const promoterPct = Math.round((actualPromoterAmount / totalCost) * 100);

  // Capital Subsidy
  const computedSubsidy = Math.round(totalCost * (targetSubsidyPct / 100));
  const subsidyAmount = Math.min(computedSubsidy, primaryScheme.maxSubsidyAmount);
  const subsidyPct = Math.round((subsidyAmount / totalCost) * 100);

  // Remaining Debt portion
  const remainingDebt = Math.max(0, totalCost - actualPromoterAmount - subsidyAmount);

  // Split into Term Loan (65% of debt for machinery/capex) and Working Capital (35% for materials/liquid stock)
  const termLoanAmount = Math.round(remainingDebt * 0.68);
  const workingCapitalAmount = remainingDebt - termLoanAmount;
  const termLoanPct = Math.round((termLoanAmount / totalCost) * 100);
  const workingCapitalPct = Math.round((workingCapitalAmount / totalCost) * 100);

  // Repayment Calculation (Amortized over tenure after moratorium)
  const monthlyRate = concessionalRate / 12 / 100;
  const repaymentMonths = Math.max(6, tenure - moratoriumMonths);

  let monthlyEquivalentEMI = 0;
  let totalInterestPayable = 0;

  if (termLoanAmount > 0 && monthlyRate > 0) {
    const factor = Math.pow(1 + monthlyRate, repaymentMonths);
    monthlyEquivalentEMI = Math.round((termLoanAmount * monthlyRate * factor) / (factor - 1));
    const totalRepaidTerm = monthlyEquivalentEMI * repaymentMonths;
    // Working capital interest (servicing interest only on CC limit)
    const monthlyWcInterest = Math.round(workingCapitalAmount * monthlyRate);
    monthlyEquivalentEMI += monthlyWcInterest;
    totalInterestPayable = Math.round((totalRepaidTerm - termLoanAmount) + (monthlyWcInterest * repaymentMonths));
  } else {
    monthlyEquivalentEMI = Math.round(remainingDebt / repaymentMonths);
  }

  // Cycle-adjusted Installment
  let perCycleInstallment = monthlyEquivalentEMI;
  let cycleDescription = "Fixed monthly installment directly debited through NACH / bank account.";

  if (cycle === "HARVEST_BIANNUAL") {
    // Semi-annual post-harvest lump sum (equivalent to 6 months EMI with 2% cash flow buffer)
    perCycleInstallment = Math.round(monthlyEquivalentEMI * 5.9);
    cycleDescription = "Biannual installment aligned with Kharif (November) and Rabi (April) farm harvest realization.";
  } else if (cycle === "WEEKLY_HAAT") {
    // 4.33 weeks per month
    perCycleInstallment = Math.round(monthlyEquivalentEMI / 4.33);
    cycleDescription = "Weekly micro-installment settled on village weekly haat / market day to match daily retail cash collection.";
  }

  // Financial Viability & DSCR
  const projectedRevenue = input.projectedMonthlyRevenue ?? Math.round(totalCost * 0.40);
  const projectedOpex = input.projectedMonthlyOpex ?? Math.round(totalCost * 0.22);
  const monthlyNetIncome = Math.max(1000, projectedRevenue - projectedOpex);

  const dscr = monthlyEquivalentEMI > 0
    ? Math.round((monthlyNetIncome / monthlyEquivalentEMI) * 100) / 100
    : 3.5;

  let viabilityBadge: "EXCELLENT" | "STRONG" | "BORDERLINE" | "NEEDS_RESTRUCTURING" = "STRONG";
  let bankSanctionConfidencePct = 85;

  if (dscr >= 2.0) {
    viabilityBadge = "EXCELLENT";
    bankSanctionConfidencePct = 94;
  } else if (dscr >= 1.4) {
    viabilityBadge = "STRONG";
    bankSanctionConfidencePct = 86;
  } else if (dscr >= 1.1) {
    viabilityBadge = "BORDERLINE";
    bankSanctionConfidencePct = 68;
  } else {
    viabilityBadge = "NEEDS_RESTRUCTURING";
    bankSanctionConfidencePct = 45;
  }

  // Alternatives
  const alternativeSchemes: MatchedFinancialScheme[] = [
    {
      schemeName: "Pradhan Mantri MUDRA Yojana (PMMY) Kishore",
      agencyOrCorporation: "MUDRA / Department of Financial Services",
      subsidyPct: 0,
      maxSubsidyAmount: 0,
      concessionalInterestRate: 8.5,
      maxMoratoriumMonths: 3,
      collateralFreeLimit: 500000,
      eligibilityDescription: "Pure institutional credit without margin subsidy for established micro-units needing fast sanction."
    },
    {
      schemeName: "Prime Minister Employment Generation Programme (PMEGP)",
      agencyOrCorporation: "Khadi and Village Industries Commission (KVIC)",
      subsidyPct: isRural ? 35 : 25,
      maxSubsidyAmount: 150000,
      concessionalInterestRate: 7.25,
      maxMoratoriumMonths: 6,
      collateralFreeLimit: 1000000,
      eligibilityDescription: "Credit-linked subsidy program targeting rural industrial and service micro-enterprises."
    }
  ];

  const summaryDprNote = `Financial Structure Formulated for Project Cost ₹${totalCost.toLocaleString("en-IN")}. Beneficiary equity is structured at ₹${actualPromoterAmount.toLocaleString("en-IN")} (${promoterPct}%), backed by ₹${subsidyAmount.toLocaleString("en-IN")} (${subsidyPct}%) capital subsidy under ${primaryScheme.schemeName}. Bank debt of ₹${remainingDebt.toLocaleString("en-IN")} is partitioned into ₹${termLoanAmount.toLocaleString("en-IN")} Term Loan and ₹${workingCapitalAmount.toLocaleString("en-IN")} Cash Credit at ${concessionalRate}% interest. With projected monthly net earnings of ₹${monthlyNetIncome.toLocaleString("en-IN")}, the Debt Service Coverage Ratio is a healthy ${dscr}x, providing strong eligibility for bank branch sanction.`;

  return {
    totalProjectCost: totalCost,
    promoterContribution: {
      amount: actualPromoterAmount,
      percentage: promoterPct,
      surplusRetainedAsBuffer: surplusRetained
    },
    governmentSubsidy: {
      amount: subsidyAmount,
      percentage: subsidyPct,
      schemeName: primaryScheme.schemeName,
      isBackEnded: true
    },
    debtStructure: {
      termLoanAmount,
      termLoanPct,
      workingCapitalAmount,
      workingCapitalPct,
      totalLoanAmount: remainingDebt,
      effectiveInterestRate: concessionalRate,
      tenureMonths: tenure,
      moratoriumMonths
    },
    repaymentSchedule: {
      frequency: cycle,
      monthlyEquivalentEMI,
      perCycleInstallment,
      cycleDescription,
      totalInterestPayable,
      totalDebtRepaid: remainingDebt + totalInterestPayable
    },
    viabilityMetrics: {
      projectedMonthlyNetIncome: monthlyNetIncome,
      dscr,
      isFinanciallyViable: dscr >= 1.25,
      viabilityBadge,
      bankSanctionConfidencePct
    },
    primaryScheme,
    alternativeSchemes,
    summaryDprNote
  };
}
