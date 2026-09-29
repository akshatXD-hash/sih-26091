/**
 * Hyper-Local Business Advisory and Market Intelligence Engine for Rural Micro-Entrepreneurs.
 * Ministry of Social Justice and Empowerment (MoSJE).
 */

export interface RuralTradeProfile {
  id: string;
  name: string;
  sector: "AGRI_ALLIED" | "ARTISANAL" | "FOOD_PROCESSING" | "RURAL_SERVICES" | "HANDICRAFTS";
  description: string;
  defaultCapexMin: number;
  defaultCapexMax: number;
  defaultMonthlyOpexMin: number;
  defaultMonthlyOpexMax: number;
  equipmentList: string[];
  rawMaterials: string[];
  sourcingClusters: string[];
  demandDrivers: string[];
  saturationThresholdPer10kPop: number; // units per 10k rural population
  typicalGrossMarginPct: number;
  typicalBreakEvenMonths: number;
  seasonality: {
    peakMonths: string[];
    leanMonths: string[];
    threatAdvisory: string;
    mitigationStrategy: string;
  };
  mandiBenchmark: {
    inputItem: string;
    avgMandiPricePerUnit: number;
    unitName: string;
    typicalRetailPricePerUnit: number;
    valueAdditionPct: number;
  };
  mosjeTargetScheme: string;
}

export const RURAL_TRADES: Record<string, RuralTradeProfile> = {
  dairy_processing: {
    id: "dairy_processing",
    name: "Dairy & Value-Added Milk Products (Ghee, Paneer, Curd)",
    sector: "AGRI_ALLIED",
    description: "Value addition to raw cow/buffalo milk by converting surplus into paneer, churned butter, and indigenous desi ghee with 2.5x value realization.",
    defaultCapexMin: 80000,
    defaultCapexMax: 250000,
    defaultMonthlyOpexMin: 35000,
    defaultMonthlyOpexMax: 90000,
    equipmentList: ["Bulk Milk Chiller / Cream Separator", "Stainless Steel Boiling Vats", "Manual Paneer Press", "Deep Freezer (200L)"],
    rawMaterials: ["Raw Cow/Buffalo Milk", "Citric Acid / Coagulant", "Food-Grade Packaging Pouches"],
    sourcingClusters: ["Village Milk Producers / Co-operatives", "Tehsil Cattle Mandi"],
    demandDrivers: ["Local tea shops & dhabas", "Village weekly haats", "Semi-urban sweet shops within 15km"],
    saturationThresholdPer10kPop: 4,
    typicalGrossMarginPct: 32,
    typicalBreakEvenMonths: 5,
    seasonality: {
      peakMonths: ["October", "November", "December", "January"], // Flush winter season + festival demand
      leanMonths: ["May", "June"], // Peak summer milk dip
      threatAdvisory: "High perishability during power cuts; spoilage risk without cold chain backup.",
      mitigationStrategy: "Maintain solar battery inverter backup for chiller and prioritize long shelf-life ghee during peak heat."
    },
    mandiBenchmark: {
      inputItem: "Raw Buffalo Milk",
      avgMandiPricePerUnit: 44, // ₹44/liter
      unitName: "liter",
      typicalRetailPricePerUnit: 110, // converted equivalent (paneer/ghee)
      valueAdditionPct: 150
    },
    mosjeTargetScheme: "NSFDC Term Loan / NBCFDC Dairy Scheme / PMEGP Agri-Allied"
  },

  turmeric_spice_grinding: {
    id: "turmeric_spice_grinding",
    name: "Turmeric, Chilli & Spices Processing & Packaging",
    sector: "FOOD_PROCESSING",
    description: "Micro-pulverizing locally harvested dry turmeric, coriander, and chillies into hygienic, branded unadulterated spice packets.",
    defaultCapexMin: 60000,
    defaultCapexMax: 180000,
    defaultMonthlyOpexMin: 25000,
    defaultMonthlyOpexMax: 65000,
    equipmentList: ["2 HP Stainless Steel Pulverizer", "Vibratory Sieve", "Impulse Nitrogen Heat Sealer", "Weighing Scale"],
    rawMaterials: ["Whole Dry Turmeric Fingers", "Dry Red Chilli", "Coriander Seeds", "Multi-layer Poly Pouches"],
    sourcingClusters: ["Local APMC Mandi", "Direct Farmer Clusters during harvest"],
    demandDrivers: ["Rural households seeking pure masalas", "Village kirana stores", "Community kitchens / Anganwadis"],
    saturationThresholdPer10kPop: 3,
    typicalGrossMarginPct: 38,
    typicalBreakEvenMonths: 4,
    seasonality: {
      peakMonths: ["March", "April", "May", "November"], // Post-harvest raw material abundance
      leanMonths: ["July", "August"], // Heavy rains (moisture contamination)
      threatAdvisory: "Monsoon humidity can cause fungus and lump formation in ground spices.",
      mitigationStrategy: "Use airtight silica gel desiccant storage barrels and schedule grinding batches based on weekly demand."
    },
    mandiBenchmark: {
      inputItem: "Whole Dry Turmeric Fingers (Salem/Waigaon)",
      avgMandiPricePerUnit: 115, // ₹115/kg at Mandi
      unitName: "kg",
      typicalRetailPricePerUnit: 240, // ₹240/kg packaged
      valueAdditionPct: 108
    },
    mosjeTargetScheme: "PMEGP (35% Rural Subsidy) / PM Vishwakarma / NBCFDC"
  },

  handloom_khadi_textiles: {
    id: "handloom_khadi_textiles",
    name: "Handloom Weaving, Khadi & Traditional Apparel",
    sector: "ARTISANAL",
    description: "Traditional pit-loom/frame-loom weaving of cotton towels (gamcha), stoles, sarees, and home furnishings.",
    defaultCapexMin: 45000,
    defaultCapexMax: 140000,
    defaultMonthlyOpexMin: 18000,
    defaultMonthlyOpexMax: 45000,
    equipmentList: ["Frame / Pit Loom with Jacquard", "Pirn Winder & Shuttle", "Bobbin Rack", "Warping Wheel"],
    rawMaterials: ["Cotton Yarn (Hank Yarn)", "Natural & Eco Dyes", "Zari Threads"],
    sourcingClusters: ["District Weaver Service Centres", "NHDC Yarn Depots", "Local Handloom Co-ops"],
    demandDrivers: ["Wedding seasons", "Local rural melas & haats", "Urban exhibitions & Khadi Gramodyog outlets"],
    saturationThresholdPer10kPop: 5,
    typicalGrossMarginPct: 42,
    typicalBreakEvenMonths: 6,
    seasonality: {
      peakMonths: ["September", "October", "November", "December"],
      leanMonths: ["June", "July"],
      threatAdvisory: "Raw yarn price volatility and competition from cheap powerloom replicas.",
      mitigationStrategy: "Register under PM Vishwakarma for Handloom Artisan ID, obtain subsidized yarn from NHDC, and focus on certified GI-tagged motifs."
    },
    mandiBenchmark: {
      inputItem: "Cotton Hank Yarn (40s count)",
      avgMandiPricePerUnit: 290, // ₹290/bundle
      unitName: "bundle (4.5kg)",
      typicalRetailPricePerUnit: 850, // finished woven textile yield
      valueAdditionPct: 193
    },
    mosjeTargetScheme: "PM Vishwakarma Handloom / NSFDC Artisan / NBCFDC Shilp Sampada"
  },

  solar_pump_rural_fabrication: {
    id: "solar_pump_rural_fabrication",
    name: "Solar Pump Repair, Ag-Tech Maintenance & Small Fabrication",
    sector: "RURAL_SERVICES",
    description: "Local technical repair station for solar irrigation inverters, submersible pump motors, sprayers, and farm gate iron fabrication.",
    defaultCapexMin: 90000,
    defaultCapexMax: 260000,
    defaultMonthlyOpexMin: 20000,
    defaultMonthlyOpexMax: 50000,
    equipmentList: ["IGBT Inverter Welding Machine", "Digital Multimeter & Insulation Tester", "Bench Grinder & Drill Press", "Pipe Threading & Cutter Tools"],
    rawMaterials: ["Welding Electrodes", "Copper Winding Wire", "Capacitors & Solar Inverter Relays", "Mild Steel Angle Iron"],
    sourcingClusters: ["District Industrial Hardware Market", "Authorized PM-KUSUM Distributors"],
    demandDrivers: ["Rapidly growing PM-KUSUM solar pumps", "Tractor & farm implement repairs", "Tubewell installations"],
    saturationThresholdPer10kPop: 2,
    typicalGrossMarginPct: 55,
    typicalBreakEvenMonths: 4,
    seasonality: {
      peakMonths: ["November", "December", "January", "February", "March"], // Peak irrigation seasons
      leanMonths: ["August", "September"],
      threatAdvisory: "Technological obsolescence in smart digital controllers.",
      mitigationStrategy: "Combine welding/fabrication off-season work with certified PMKVY solar technician credentialing."
    },
    mandiBenchmark: {
      inputItem: "Copper Motor Re-winding Material & Labor",
      avgMandiPricePerUnit: 1400, // ₹1,400 raw components
      unitName: "motor repair",
      typicalRetailPricePerUnit: 3500, // ₹3,500 service charge
      valueAdditionPct: 150
    },
    mosjeTargetScheme: "NSFDC Micro-Credit / NBCFDC Technology / Stand-Up India"
  },

  terracotta_pottery: {
    id: "terracotta_pottery",
    name: "Terracotta Pottery, Clay Coolers & Eco-Cookware",
    sector: "ARTISANAL",
    description: "Modernized eco-friendly terracotta production including clay water dispensers, curd pots, tawa, and ornamental garden planters.",
    defaultCapexMin: 35000,
    defaultCapexMax: 110000,
    defaultMonthlyOpexMin: 12000,
    defaultMonthlyOpexMax: 30000,
    equipmentList: ["Electric Variable-Speed Potter's Wheel (PM Vishwakarma supported)", "Energy-Efficient Biomass/Gas Kiln", "Clay Pug Mill"],
    rawMaterials: ["Sieved Riverbed Clay", "Red Terracotta Slurry", "Natural Glaze & Mica Powders"],
    sourcingClusters: ["Local River Basin / Panchayat Land", "Pug-mill clusters"],
    demandDrivers: ["Summer eco-cooling water pots", "Diwali festive diyas", "Urban cafes buying clay kulhads & curd vessels"],
    saturationThresholdPer10kPop: 3,
    typicalGrossMarginPct: 48,
    typicalBreakEvenMonths: 3,
    seasonality: {
      peakMonths: ["March", "April", "May", "October", "November"],
      leanMonths: ["July", "August"],
      threatAdvisory: "Heavy monsoon rains prevent sun-drying of unbaked green clay ware.",
      mitigationStrategy: "Construct an enclosed polythene drying shed and build inventories prior to onset of monsoon."
    },
    mandiBenchmark: {
      inputItem: "Refined Clay Pug",
      avgMandiPricePerUnit: 12, // ₹12/kg
      unitName: "kg",
      typicalRetailPricePerUnit: 60, // equivalent finished terracotta product
      valueAdditionPct: 400
    },
    mosjeTargetScheme: "PM Vishwakarma (Potter / Kumhar Trade) / NSKFDC / NSFDC"
  },

  poultry_backyard_layer: {
    id: "poultry_backyard_layer",
    name: "Backyard Poultry Farming & Organic Desi Egg Production",
    sector: "AGRI_ALLIED",
    description: "Rearing indigenous resilient breeds (Kadaknath, Vanaraja, Gramapriya) for organic free-range desi eggs and meat.",
    defaultCapexMin: 70000,
    defaultCapexMax: 220000,
    defaultMonthlyOpexMin: 22000,
    defaultMonthlyOpexMax: 55000,
    equipmentList: ["Night Shelter Poultry Shed with Wire Mesh", "Automatic Bell Drinkers & Feeders", "Egg Incubation Hatchery Box (optional)", "Solar Lantern for light cycle"],
    rawMaterials: ["Day-Old Chicks (DOC) from KVK / State Hatchery", "Maize & Grain Feed", "Vaccines (Ranikhet, IBD)"],
    sourcingClusters: ["Krishi Vigyan Kendra (KVK)", "Government District Hatchery"],
    demandDrivers: ["High premium on authentic Desi eggs in local dhabas & towns", "Protein demand in rural haats"],
    saturationThresholdPer10kPop: 4,
    typicalGrossMarginPct: 35,
    typicalBreakEvenMonths: 6,
    seasonality: {
      peakMonths: ["November", "December", "January", "February"],
      leanMonths: ["May", "June"],
      threatAdvisory: "Disease outbreak risk and sudden extreme heat mortality.",
      mitigationStrategy: "Adhere to strict KVK vaccination schedules and insulate shed roofs with thatched grass/paddy straw."
    },
    mandiBenchmark: {
      inputItem: "Poultry Feed & Chick Cost per Bird",
      avgMandiPricePerUnit: 160, // ₹160 input cost per bird
      unitName: "bird",
      typicalRetailPricePerUnit: 340, // meat + 80 egg yield
      valueAdditionPct: 112
    },
    mosjeTargetScheme: "NSFDC Term Loan / NBCFDC Agri-Allied / PMEGP"
  },

  carpentry_rural_furniture: {
    id: "carpentry_rural_furniture",
    name: "Carpentry, Doors & Rural Modular Furniture",
    sector: "ARTISANAL",
    description: "Manufacturing durable wooden cot frames (charpai), solid door panels, agricultural plough handles, and study benches.",
    defaultCapexMin: 50000,
    defaultCapexMax: 180000,
    defaultMonthlyOpexMin: 20000,
    defaultMonthlyOpexMax: 55000,
    equipmentList: ["Electric Circular Saw & Jigsaw", "Power Planer & Router", "Clamp Assembly", "Drill & Chisel Set"],
    rawMaterials: ["Locally Harvested Timber (Neem, Sheesham, Eucalyptus)", "Plywood & Laminates", "Wood Adhesive & Hardware"],
    sourcingClusters: ["Tehsil Timber Depot", "Private Farm Forestry Growers"],
    demandDrivers: ["New rural house constructions under PM Awas Yojana", "Schools & local panchayat offices", "Wedding gift furniture"],
    saturationThresholdPer10kPop: 3,
    typicalGrossMarginPct: 38,
    typicalBreakEvenMonths: 4,
    seasonality: {
      peakMonths: ["January", "February", "April", "May"],
      leanMonths: ["July", "August"],
      threatAdvisory: "Price surges in seasoned hardwood timber.",
      mitigationStrategy: "Form group procurement with fellow village artisans under PM Vishwakarma guild to negotiate bulk rates."
    },
    mandiBenchmark: {
      inputItem: "Rough Timber Plank (Eucalyptus/Neem)",
      avgMandiPricePerUnit: 380, // ₹380 per cubic foot
      unitName: "cft",
      typicalRetailPricePerUnit: 850, // finished door/furniture component
      valueAdditionPct: 123
    },
    mosjeTargetScheme: "PM Vishwakarma (Carpenter / Suthar) / NSFDC / NBCFDC"
  },

  apiculture_honey_processing: {
    id: "apiculture_honey_processing",
    name: "Beekeeping, Pure Raw Honey & Wax Production",
    sector: "AGRI_ALLIED",
    description: "Scientific beekeeping (Apis cerana / Apis mellifera boxes) integrated with mustard, sunflower, and litchi orchard flowering.",
    defaultCapexMin: 45000,
    defaultCapexMax: 150000,
    defaultMonthlyOpexMin: 10000,
    defaultMonthlyOpexMax: 25000,
    equipmentList: ["10-20 Standard Langstroth Beehive Boxes with Colonies", "Stainless Steel Centrifugal Honey Extractor", "Protective Bee Veil & Smoker"],
    rawMaterials: ["Bee Colonies", "Foundation Comb Sheets", "Glass/PET Jars with Tamper Seals"],
    sourcingClusters: ["Khadi & Village Industries Commission (KVIC) Bee Nurseries", "District Horticulture Department"],
    demandDrivers: ["Growing consumer preference for unfiltered forest/raw flora honey", "Local Ayurvedic practitioners", "FMCG aggregation"],
    saturationThresholdPer10kPop: 2,
    typicalGrossMarginPct: 50,
    typicalBreakEvenMonths: 5,
    seasonality: {
      peakMonths: ["November", "December", "January", "March"], // Flora blossom seasons
      leanMonths: ["July", "August"], // Heavy rains (sugar feeding needed)
      threatAdvisory: "Pesticide drift from nearby monoculture farms killing pollinator colonies.",
      mitigationStrategy: "Partner with certified organic farmers or place hives in forest fringe belts."
    },
    mandiBenchmark: {
      inputItem: "Raw Flora Comb Extraction Cost",
      avgMandiPricePerUnit: 140, // ₹140 per kg cost
      unitName: "kg",
      typicalRetailPricePerUnit: 420, // ₹420 per kg packaged raw honey
      valueAdditionPct: 200
    },
    mosjeTargetScheme: "KVIC Honey Mission / PMEGP / NSFDC / NBCFDC"
  },

  bamboo_cane_craft: {
    id: "bamboo_cane_craft",
    name: "Bamboo Craft, Utility Baskets & Eco-Packaging",
    sector: "HANDICRAFTS",
    description: "Crafting lightweight bamboo grain storage baskets (dola/kula), poultry coop covers, fruit crating, and trendy lifestyle bamboo hampers.",
    defaultCapexMin: 25000,
    defaultCapexMax: 80000,
    defaultMonthlyOpexMin: 10000,
    defaultMonthlyOpexMax: 25000,
    equipmentList: ["Bamboo Splitting & Slicing Tool", "Cross-Cutting Machine", "Treatment Tank for Borax-Boric Preservation", "Weaving Frames"],
    rawMaterials: ["Green Bamboo Culms", "Borax & Boric Acid (eco-preservative)", "Cane Bindings"],
    sourcingClusters: ["Forest Village Depots", "Local Bamboo Agro-Forests"],
    demandDrivers: ["Agricultural harvest packaging", "Ban on single-use plastic crates", "Tourist souvenir stalls"],
    saturationThresholdPer10kPop: 4,
    typicalGrossMarginPct: 45,
    typicalBreakEvenMonths: 3,
    seasonality: {
      peakMonths: ["October", "November", "December", "April"],
      leanMonths: ["June", "July"],
      threatAdvisory: "Borer beetle infestation if bamboo is not seasoned correctly.",
      mitigationStrategy: "Perform mandatory eco-friendly borax salt dipping bath before weaving to guarantee 10-year durability."
    },
    mandiBenchmark: {
      inputItem: "Single Bamboo Pole (20 ft)",
      avgMandiPricePerUnit: 85, // ₹85 per pole
      unitName: "pole",
      typicalRetailPricePerUnit: 350, // yield of 3 baskets @ ₹120 each
      valueAdditionPct: 311
    },
    mosjeTargetScheme: "PM Vishwakarma (Basket Maker) / National Bamboo Mission / NSFDC"
  }
};

export interface AdvisoryInput {
  state: string;
  district: string;
  block?: string;
  villageOrMandi?: string;
  tradeId: string;
  estimatedPopulation?: number;
  availableInvestment?: number;
}

export interface UnitEconomics {
  capexEstimated: number;
  monthlyOpexEstimated: number;
  monthlyRevenueEstimated: number;
  monthlyNetProfit: number;
  grossMarginPct: number;
  breakEvenMonths: number;
  projectedAnnualIncome: number;
}

export interface BusinessAdvisoryResult {
  trade: RuralTradeProfile;
  locationSummary: string;
  marketDemandScore: number; // 0 - 100
  saturationRating: "HIGH_OPPORTUNITY" | "MODERATE_STABLE" | "SATURATED_CAUTION";
  saturationSummary: string;
  unitEconomics: UnitEconomics;
  priceBenchmarking: {
    inputItem: string;
    mandiPrice: number;
    retailPrice: number;
    valueAdditionPct: number;
    unit: string;
  };
  sourcingAndSupply: {
    recommendedMandis: string[];
    rawMaterialAvailability: string;
    procurementTip: string;
  };
  seasonalRisk: {
    peakSeason: string[];
    leanSeason: string[];
    threat: string;
    mitigation: string;
  };
  mosjeRecommendedFinancing: {
    primaryScheme: string;
    targetSubsidyPct: number;
    recommendedDebtStructure: string;
  };
  dprSummary: string;
}

/**
 * Deterministic Hyper-Local Business Advisory Calculator.
 * Evaluates trade viability based on local demographic capacity and trade benchmarks.
 */
export function generateBusinessAdvisory(input: AdvisoryInput): BusinessAdvisoryResult {
  const trade = RURAL_TRADES[input.tradeId] || RURAL_TRADES.dairy_processing;
  const pop = input.estimatedPopulation && input.estimatedPopulation > 0 ? input.estimatedPopulation : 25000;
  const locationSummary = [
    input.villageOrMandi,
    input.block ? `Block: ${input.block}` : null,
    input.district,
    input.state
  ].filter(Boolean).join(", ");

  // Capacity calculation: how many such units this population can support
  const maxSupportableUnits = Math.max(1, Math.round((pop / 10000) * trade.saturationThresholdPer10kPop));

  // Determine market demand score based on trade sector and population dynamics
  let baseDemand = 75;
  if (trade.sector === "AGRI_ALLIED") baseDemand = 84;
  if (trade.sector === "FOOD_PROCESSING") baseDemand = 88;
  if (trade.sector === "RURAL_SERVICES") baseDemand = 80;
  if (trade.sector === "ARTISANAL") baseDemand = 74;

  const marketDemandScore = Math.min(96, Math.max(55, baseDemand));

  let saturationRating: "HIGH_OPPORTUNITY" | "MODERATE_STABLE" | "SATURATED_CAUTION" = "HIGH_OPPORTUNITY";
  let saturationSummary = "";

  if (maxSupportableUnits >= 6) {
    saturationRating = "HIGH_OPPORTUNITY";
    saturationSummary = `High unmet demand in this cluster. The estimated population (${pop.toLocaleString("en-IN")}) can readily absorb up to ${maxSupportableUnits} micro-units without local price wars.`;
  } else if (maxSupportableUnits >= 2) {
    saturationRating = "MODERATE_STABLE";
    saturationSummary = `Healthy stable market. This taluka/block cluster supports ~${maxSupportableUnits} specialized enterprise units. Differentiate via hygienic packaging and reliable delivery.`;
  } else {
    saturationRating = "SATURATED_CAUTION";
    saturationSummary = `Niche demand. Village population is smaller; recommend partnering with weekly haats in neighboring blocks to expand buyer footprint.`;
  }

  // Unit Economics calculation
  const targetCapex = input.availableInvestment && input.availableInvestment > trade.defaultCapexMin
    ? Math.min(input.availableInvestment * 1.5, trade.defaultCapexMax)
    : Math.round((trade.defaultCapexMin + trade.defaultCapexMax) / 2);

  const monthlyOpex = Math.round((trade.defaultMonthlyOpexMin + trade.defaultMonthlyOpexMax) / 2);
  const marginMultiplier = 1 + (trade.typicalGrossMarginPct / 100);
  const monthlyRevenue = Math.round(monthlyOpex * marginMultiplier);
  const monthlyNetProfit = monthlyRevenue - monthlyOpex;
  const breakEvenMonths = Math.max(2, Math.ceil(targetCapex / Math.max(1, monthlyNetProfit)));

  const unitEconomics: UnitEconomics = {
    capexEstimated: targetCapex,
    monthlyOpexEstimated: monthlyOpex,
    monthlyRevenueEstimated: monthlyRevenue,
    monthlyNetProfit,
    grossMarginPct: trade.typicalGrossMarginPct,
    breakEvenMonths,
    projectedAnnualIncome: monthlyNetProfit * 12
  };

  // Determine MoSJE subsidy estimate
  let targetSubsidyPct = 35; // Default rural PMEGP / special category
  if (trade.sector === "ARTISANAL") targetSubsidyPct = 30;

  const dprSummary = `Detailed Project Report (DPR) generated for ${trade.name} at ${locationSummary}. Total capital outlay estimated at ₹${targetCapex.toLocaleString("en-IN")} with monthly working capital of ₹${monthlyOpex.toLocaleString("en-IN")}. Projected net monthly operating surplus is ₹${monthlyNetProfit.toLocaleString("en-IN")} yielding a safe break-even within ${breakEvenMonths} months. Strong alignment with ${trade.mosjeTargetScheme}.`;

  return {
    trade,
    locationSummary,
    marketDemandScore,
    saturationRating,
    saturationSummary,
    unitEconomics,
    priceBenchmarking: {
      inputItem: trade.mandiBenchmark.inputItem,
      mandiPrice: trade.mandiBenchmark.avgMandiPricePerUnit,
      retailPrice: trade.mandiBenchmark.typicalRetailPricePerUnit,
      valueAdditionPct: trade.mandiBenchmark.valueAdditionPct,
      unit: trade.mandiBenchmark.unitName
    },
    sourcingAndSupply: {
      recommendedMandis: trade.sourcingClusters,
      rawMaterialAvailability: "Strong local availability during harvest & regular market cycles.",
      procurementTip: `Procure ${trade.rawMaterials[0]} directly from primary producers or nearest APMC Mandi on wholesale auction days to protect operating margins.`
    },
    seasonalRisk: {
      peakSeason: trade.seasonality.peakMonths,
      leanSeason: trade.seasonality.leanMonths,
      threat: trade.seasonality.threatAdvisory,
      mitigation: trade.seasonality.mitigationStrategy
    },
    mosjeRecommendedFinancing: {
      primaryScheme: trade.mosjeTargetScheme,
      targetSubsidyPct,
      recommendedDebtStructure: "5%–10% Promoter Margin + 25%–35% Capital Subsidy + 55%–65% Concessional Bank Debt (Term Loan + Cash Credit line)"
    },
    dprSummary
  };
}
