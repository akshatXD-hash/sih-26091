import { describe, expect, it } from "vitest";
import { generateBusinessAdvisory, RURAL_TRADES } from "@/lib/advisory";

describe("generateBusinessAdvisory", () => {
  it("generates advisory for dairy processing in a rural block", () => {
    const result = generateBusinessAdvisory({
      state: "Uttar Pradesh",
      district: "Varanasi",
      block: "Arajiline",
      villageOrMandi: "Raja Talab Mandi",
      tradeId: "dairy_processing",
      estimatedPopulation: 30000,
      availableInvestment: 120000,
    });

    expect(result.trade.name).toContain("Dairy");
    expect(result.locationSummary).toContain("Varanasi");
    expect(result.locationSummary).toContain("Raja Talab Mandi");
    expect(result.marketDemandScore).toBeGreaterThanOrEqual(70);
    expect(result.saturationRating).toBe("HIGH_OPPORTUNITY");
    expect(result.unitEconomics.capexEstimated).toBeGreaterThan(0);
    expect(result.unitEconomics.monthlyRevenueEstimated).toBeGreaterThan(
      result.unitEconomics.monthlyOpexEstimated,
    );
    expect(result.unitEconomics.monthlyNetProfit).toBeGreaterThan(0);
    expect(result.unitEconomics.breakEvenMonths).toBeLessThanOrEqual(12);
    expect(result.priceBenchmarking.mandiPrice).toBe(44);
    expect(result.seasonalRisk.peakSeason).toContain("November");
    expect(result.dprSummary).toContain("Detailed Project Report");
  });

  it("handles small village population with cautious saturation rating", () => {
    const result = generateBusinessAdvisory({
      state: "Bihar",
      district: "Nalanda",
      tradeId: "apiculture_honey_processing",
      estimatedPopulation: 3000,
    });

    expect(result.saturationRating).toBe("SATURATED_CAUTION");
    expect(result.saturationSummary).toContain("Niche demand");
  });

  it("contains valid rural trade profiles with mandi benchmarking", () => {
    const trades = Object.values(RURAL_TRADES);
    expect(trades.length).toBeGreaterThanOrEqual(8);

    for (const trade of trades) {
      expect(trade.name).toBeDefined();
      expect(trade.equipmentList.length).toBeGreaterThan(0);
      expect(trade.rawMaterials.length).toBeGreaterThan(0);
      expect(trade.mandiBenchmark.avgMandiPricePerUnit).toBeGreaterThan(0);
      expect(trade.mandiBenchmark.typicalRetailPricePerUnit).toBeGreaterThan(
        trade.mandiBenchmark.avgMandiPricePerUnit,
      );
      expect(trade.seasonality.threatAdvisory).toBeDefined();
    }
  });
});
