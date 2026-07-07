// Client-side port of calc_engine.py so the Design Tool works standalone,
// without requiring the Flask backend described in the original project.

export const INDIA_CLIMATE_ZONES = {
  'Hot-Dry': { 
    examples: 'Rajasthan, Gujarat, Maharashtra interior', 
    cooling_months: 8, 
    heating_months: 2, 
    ground_temp_C: 28, 
    suitability_score: 3, 
    cooling_hours_per_day: 10, 
    heating_hours_per_day: 3 
  },
  'Warm-Humid': { 
    examples: 'Kerala, Goa, Chennai, Coastal Karnataka', 
    cooling_months: 10, 
    heating_months: 0, 
    ground_temp_C: 26, 
    suitability_score: 3, 
    cooling_hours_per_day: 8, 
    heating_hours_per_day: 0 
  },
  Composite: { 
    examples: 'Delhi, Punjab, Haryana, UP', 
    cooling_months: 6, 
    heating_months: 3, 
    ground_temp_C: 24, 
    suitability_score: 3, 
    cooling_hours_per_day: 9, 
    heating_hours_per_day: 6 
  },
  Temperate: { 
    examples: 'Himachal Pradesh, Uttarakhand', 
    cooling_months: 3, 
    heating_months: 6, 
    ground_temp_C: 18, 
    suitability_score: 2, 
    cooling_hours_per_day: 6, 
    heating_hours_per_day: 8 
  },
  Cold: { 
    examples: 'Jammu & Kashmir, Ladakh, High altitude', 
    cooling_months: 1, 
    heating_months: 8, 
    ground_temp_C: 12, 
    suitability_score: 2, 
    cooling_hours_per_day: 4, 
    heating_hours_per_day: 10 
  },
};

export const INDIA_COOLING_INTENSITY = {
  Office: { 'Tier-1': 0.18, 'Tier-2': 0.14, 'Tier-3': 0.10 },
  Educational: { 'Tier-1': 0.13, 'Tier-2': 0.10, 'Tier-3': 0.07 },
  Residential: { 'Tier-1': 0.12, 'Tier-2': 0.08, 'Tier-3': 0.05 },
  Hospital: { 'Tier-1': 0.22, 'Tier-2': 0.18, 'Tier-3': 0.15 },
  Hotel: { 'Tier-1': 0.18, 'Tier-2': 0.14, 'Tier-3': 0.10 },
  'IT/Tech Park': { 'Tier-1': 0.20, 'Tier-2': 0.16, 'Tier-3': 0.12 },
};

export const INDIA_ELECTRICITY_RATES = {
  Maharashtra: { commercial: 11.50, residential: 8.50 },
  Delhi: { commercial: 8.50, residential: 7.00 },
  'Tamil Nadu': { commercial: 9.00, residential: 6.00 },
  Karnataka: { commercial: 10.00, residential: 7.50 },
  Gujarat: { commercial: 8.00, residential: 6.50 },
  Rajasthan: { commercial: 9.50, residential: 7.00 },
  'Uttar Pradesh': { commercial: 9.00, residential: 7.00 },
  'West Bengal': { commercial: 9.50, residential: 7.50 },
  Telangana: { commercial: 10.00, residential: 7.00 },
  Kerala: { commercial: 8.50, residential: 6.50 },
  Punjab: { commercial: 8.00, residential: 6.50 },
  Haryana: { commercial: 9.00, residential: 7.50 },
  'National Average': { commercial: 9.50, residential: 7.50 },
};

export const INDIA_SOIL_TYPES = {
  'Alluvial Plains': 2.2,
  'Black Soil': 1.8,
  'Red Soil': 1.6,
  Laterite: 1.4,
  Sandy: 2.5,
  'Rocky/Hard': 3.0,
};

const CAPITAL_COST_PER_KW = {
  'Hot-Dry': 18000,
  'Warm-Humid': 22000,
  Composite: 20000,
  Temperate: 21000,
  Cold: 25000,
};

const BOREHOLE_COST_PER_METER = 900;

export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

function estimatePeakCooling(inputs) {
  const btype = inputs.buildingType || 'Office';
  const tier = inputs.buildingTier || 'Tier-2';
  const area = inputs.buildingArea_m2 || 0;
  const table = INDIA_COOLING_INTENSITY[btype];
  const intensity = table ? (table[tier] ?? 0.15) : 0.15;
  return area * intensity;
}

function simpleThermalModel(inputs) {
  const load_kW = inputs.peakCooling_kW || estimatePeakCooling(inputs);
  const oversize = inputs.oversize_factor || 1.2;
  const capacity_kW = load_kW * oversize;
  const c_l_ratio = capacity_kW / Math.max(load_kW, 1e-6);
  return {
    load_kW: round(load_kW, 3),
    capacity_kW: round(capacity_kW, 3),
    c_l_ratio: round(c_l_ratio, 3),
  };
}

function groundLoopSizing(inputs, peakLoadKW) {
  const soil_k = inputs.soilConductivity_WpmK || 2.0;
  const wattsPerMeter = soil_k * 8;
  const requiredLoopLengthM = (peakLoadKW * 1000) / wattsPerMeter;
  const boreholeCount = Math.max(1, Math.round(requiredLoopLengthM / 100));
  const landAreaM2 = boreholeCount * 25;
  const boreholeCost = boreholeCount * 100 * BOREHOLE_COST_PER_METER;
  return {
    loop_length_m: round(requiredLoopLengthM, 0),
    borehole_count: boreholeCount,
    land_area_m2: round(landAreaM2, 0),
    watts_per_meter: round(wattsPerMeter, 1),
    borehole_cost_INR: round(boreholeCost, 0),
  };
}

function energyEstimate(inputs, modelOut) {
  const climate = inputs.climate || 'Composite';
  const climateData = INDIA_CLIMATE_ZONES[climate] || INDIA_CLIMATE_ZONES.Composite;
  const coolingHours = climateData.cooling_hours_per_day * 30 * climateData.cooling_months;
  const heatingHours = climateData.heating_hours_per_day * 30 * climateData.heating_months;
  const totalHours = coolingHours + heatingHours;
  const diversityFactor = 0.7;
  const effectiveHours = totalHours * diversityFactor;
  const cop = inputs.gsHeatPumpCOP || 4.0;
  const annual_kWh = (modelOut.load_kW * effectiveHours) / Math.max(cop, 0.1);
  const baselineCop = inputs.baseline_COP || 3.0;
  const baseline_kWh = (modelOut.load_kW * effectiveHours) / Math.max(baselineCop, 0.1);
  const savings_kWh = baseline_kWh - annual_kWh;
  return {
    annual_kWh: round(annual_kWh, 2),
    baseline_kWh: round(baseline_kWh, 2),
    savings_kWh: round(savings_kWh, 2),
    operating_hours: round(totalHours, 0),
    effective_hours: round(effectiveHours, 0),
    diversity_factor: diversityFactor,
  };
}

function economicAnalysis(inputs, energyOut, modelOut, groundLoop) {
  const state = inputs.state || 'National Average';
  const btype = inputs.buildingType || 'Office';
  const climate = inputs.climate || 'Composite';
  const rateCategory = ['Office', 'Hospital', 'Hotel', 'IT/Tech Park'].includes(btype) ? 'commercial' : 'residential';
  const rates = INDIA_ELECTRICITY_RATES[state] || INDIA_ELECTRICITY_RATES['National Average'];
  const electricityRate = rates[rateCategory];
  const geotabsCostINR = energyOut.annual_kWh * electricityRate;
  const baselineCostINR = energyOut.baseline_kWh * electricityRate;
  const annualSavingsINR = energyOut.savings_kWh * electricityRate;
  const costPerKw = CAPITAL_COST_PER_KW[climate] || 20000;
  const heatPumpCost = modelOut.capacity_kW * costPerKw * 0.3;
  const groundLoopCost = groundLoop.borehole_cost_INR;
  const buildingArea = inputs.buildingArea_m2 || 1000;
  const tabsCost = buildingArea * 1800;
  const controlsCost = modelOut.capacity_kW * 2000;
  const capitalCostINR = heatPumpCost + groundLoopCost + tabsCost + controlsCost;
  const paybackYears = annualSavingsINR > 0 ? capitalCostINR / annualSavingsINR : 999;
  return {
    electricity_rate: electricityRate,
    geotabs_cost_INR: round(geotabsCostINR, 2),
    baseline_cost_INR: round(baselineCostINR, 2),
    annual_savings_INR: round(annualSavingsINR, 2),
    capital_cost_INR: round(capitalCostINR, 2),
    capital_cost_breakdown: {
      heat_pump: round(heatPumpCost, 2),
      ground_loop: round(groundLoopCost, 2),
      tabs_integration: round(tabsCost, 2),
      controls: round(controlsCost, 2),
    },
    payback_years: round(paybackYears, 1),
  };
}

function co2Estimate(energyKwh, emissionFactor = 0.82) {
  return round((energyKwh * emissionFactor) / 1000.0, 3);
}

function rankingScores(inputs, modelOut, energyOut, economics) {
  const scores = {};
  const area = inputs.buildingArea_m2 || 0;
  scores.load = Math.min(3, Math.max(0, Math.floor(area / 500)));
  const cl = modelOut.c_l_ratio;
  scores.capacity = cl >= 1.1 ? 3 : cl >= 0.9 ? 2 : 1;
  const sk = energyOut.savings_kWh;
  if (sk <= 0) scores.energy = 0;
  else if (sk < 20000) scores.energy = 1;
  else if (sk < 50000) scores.energy = 2;
  else scores.energy = 3;
  const climate = inputs.climate || 'Temperate';
  const climateData = INDIA_CLIMATE_ZONES[climate] || INDIA_CLIMATE_ZONES.Composite;
  scores.climate = climateData.suitability_score;
  const payback = economics.payback_years;
  if (payback < 7) scores.economic = 3;
  else if (payback < 12) scores.economic = 2;
  else if (payback < 18) scores.economic = 1;
  else scores.economic = 0;
  return scores;
}

function round(value, digits) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

export function runFeasibility(rawInputs) {
  const merged = { ...rawInputs };
  if (
    merged.peakCooling_kW === '' ||
    merged.peakCooling_kW === null ||
    merged.peakCooling_kW === undefined ||
    merged.peakCooling_kW === 0
  ) {
    merged.peakCooling_kW = round(estimatePeakCooling(merged), 2);
    merged.peakCooling_source = 'Estimated from Indian building standards';
  } else {
    merged.peakCooling_kW = Number(merged.peakCooling_kW);
    merged.peakCooling_source = 'User defined';
  }
  if (!merged.buildingArea_m2 || merged.buildingArea_m2 <= 0) {
    throw new ValidationError('Invalid building area (buildingArea_m2)');
  }
  if (merged.peakCooling_kW && merged.peakCooling_kW <= 0) {
    throw new ValidationError('peakCooling_kW must be > 0');
  }
  if (!merged.soilConductivity_WpmK && merged.soilType) {
    merged.soilConductivity_WpmK = INDIA_SOIL_TYPES[merged.soilType] || 2.0;
  }
  const modelOut = simpleThermalModel(merged);
  const groundLoop = groundLoopSizing(merged, modelOut.capacity_kW);
  const energyOut = energyEstimate(merged, modelOut);
  const economics = economicAnalysis(merged, energyOut, modelOut, groundLoop);
  const co2Geotabs = co2Estimate(energyOut.annual_kWh);
  const co2Baseline = co2Estimate(energyOut.baseline_kWh);
  const co2Savings = co2Estimate(energyOut.savings_kWh);
  const scores = rankingScores(merged, modelOut, energyOut, economics);
  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  let feasibility;
  if (totalScore >= 12) feasibility = 'Highly Feasible';
  else if (totalScore >= 8) feasibility = 'Conditionally Feasible';
  else feasibility = 'Not Recommended';
  const climate = merged.climate || 'Composite';
  const climateData = INDIA_CLIMATE_ZONES[climate] || INDIA_CLIMATE_ZONES.Composite;
  return {
    inputs: merged,
    model: modelOut,
    ground_loop: groundLoop,
    energy: energyOut,
    economics,
    co2: { geotabs_tonnes: co2Geotabs, baseline_tonnes: co2Baseline, savings_tonnes: co2Savings },
    co2_savings_tonnes: co2Savings,
    climate_data: climateData,
    scores,
    total_score: totalScore,
    feasibility_recommendation: feasibility,
  };
}
