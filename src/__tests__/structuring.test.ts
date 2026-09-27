import { describe, expect, it } from "vitest";
import { structureRuralFinance } from "@/lib/structuring";

describe("structureRuralFinance", () => {
  it("structures finance for an SC micro-entrepreneur under NSFDC", () => {
    const result = structureRuralFinance({
      totalProjectCost: 200000,
      promoterCapitalAvailable: 25000,
      socialCategory: "SC",
      locationType: "RURAL",
      cashFlowCycle: "MONTHLY",
      desiredTenureMonths: 36,
    });

    expect(result.primaryScheme.agencyOrCorporation).toContain("NSFDC");
    expect(result.governmentSubsidy.amount).toBeGreaterThan(0);
    expect(result.promoterContribution.amount).toBeLessThanOrEqual(25000);
    expect(result.debtStructure.effectiveInterestRate).toBe(4.0);
    expect(result.debtStructure.termLoanAmount).toBeGreaterThan(0);
    expect(result.debtStructure.workingCapitalAmount).toBeGreaterThan(0);
    expect(result.repaymentSchedule.monthlyEquivalentEMI).toBeGreaterThan(0);
    expect(result.viabilityMetrics.dscr).toBeGreaterThan(1.0);
    expect(result.summaryDprNote).toContain("NSFDC");
  });

  it("applies PM Vishwakarma terms for artisans", () => {
    const result = structureRuralFinance({
      totalProjectCost: 150000,
      promoterCapitalAvailable: 15000,
      socialCategory: "ARTISAN",
      locationType: "RURAL",
      cashFlowCycle: "WEEKLY_HAAT",
      desiredTenureMonths: 36,
    });

    expect(result.primaryScheme.schemeName).toContain("Vishwakarma");
    expect(result.debtStructure.effectiveInterestRate).toBe(5.0);
    expect(result.repaymentSchedule.frequency).toBe("WEEKLY_HAAT");
    expect(result.repaymentSchedule.perCycleInstallment).toBeLessThan(
      result.repaymentSchedule.monthlyEquivalentEMI,
    );
  });

  it("handles harvest cyclical cash-flow repayment", () => {
    const result = structureRuralFinance({
      totalProjectCost: 300000,
      promoterCapitalAvailable: 30000,
      socialCategory: "OBC",
      locationType: "RURAL",
      cashFlowCycle: "HARVEST_BIANNUAL",
      desiredTenureMonths: 48,
    });

    expect(result.repaymentSchedule.frequency).toBe("HARVEST_BIANNUAL");
    expect(result.repaymentSchedule.perCycleInstallment).toBeGreaterThan(
      result.repaymentSchedule.monthlyEquivalentEMI,
    );
    expect(result.repaymentSchedule.cycleDescription).toContain("harvest");
  });
});
