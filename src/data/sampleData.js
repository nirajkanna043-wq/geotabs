// Sample / placeholder content used across the site. Replace with real
// content or fetch from a CMS/API later — components already read from here.

export const caseStudies = [
  {
    id: 'cs-01',
    title: 'IT Park Retrofit, Pune',
    type: 'IT/Tech Park · Tier-1',
    summary: 'A 45,000 m² campus paired shallow boreholes with TABS slab piping, cutting annual cooling energy by 38% against the existing chiller baseline.',
    details: 'This project demonstrates the scalability of hybrid GeoTABS systems in major Indian corporate parks. The design integrates 212 vertical boreholes spaced at 5m intervals with newly retrofitted radiant slab layouts inside three multi-story wings. Thermal comfort metrics indicate stable temperatures during peak summer months with low temperature fluctuations. Annual performance tracking showed a payback period of 6.4 years, validated by continuous sub-metering of circulating heat pump loops.',
    stats: [
      { label: 'Energy saved', value: '38%' },
      { label: 'Payback', value: '6.4 yrs' },
      { label: 'Boreholes', value: '212' },
    ]
  },
  {
    id: 'cs-02',
    title: 'District Hospital, Coimbatore',
    type: 'Hospital · Tier-2',
    summary: 'Warm-humid climate deployment sized for continuous cooling load, delivering stable slab temperatures for patient wards year-round.',
    details: 'Hospitals require continuous 24/7 cooling and high indoor air quality. In Coimbatore, the GeoTABS hybrid installation was designed specifically for patient ward ventilation and temperature stabilization. By utilizing 96 deep boreholes alongside a high-efficiency water-to-water heat pump, the facility achieves cooling without the high noise and dry draft associated with traditional forced-air HVAC. The system has run uninterrupted, cutting electricity bills by 31% and lowering local grid reliance.',
    stats: [
      { label: 'Energy saved', value: '31%' },
      { label: 'Payback', value: '8.1 yrs' },
      { label: 'Boreholes', value: '96' },
    ]
  },
  {
    id: 'cs-03',
    title: 'University Library, Chandigarh',
    type: 'Educational · Composite Climate',
    summary: 'Composite-climate installation balancing winter heating and summer cooling through the same ground loop field beneath the campus lawn.',
    details: 'In northern India’s composite climate, temperatures swing between intense summer heat and cold winter nights. The Chandigarh University library installation uses a ground loop heat exchanger to extract heat during winter and reject heat in summer. Located entirely under the central courtyard lawn, the loop field consists of 58 boreholes. Slabs are activated overnight using low-cost off-peak power tariffs, allowing the building to maintain pleasant thermal conditions throughout the study hours with minimal active daytime cooling.',
    stats: [
      { label: 'Energy saved', value: '34%' },
      { label: 'Payback', value: '7.2 yrs' },
      { label: 'Boreholes', value: '58' },
    ]
  },
  {
    id: 'cs-04',
    title: 'Residential Tower, Jaipur',
    type: 'Residential · Hot-Dry Climate',
    summary: 'Hot-dry soil conditions allowed shallower boreholes; the ground loop offsets peak summer demand across 180 apartments.',
    details: 'Built in a hot-dry zone, this residential tower complex leverages dry ground temperature profiles to reject cooling load from residential air conditioning loops. Spanning 180 luxury apartments, the system is backed by a centralized loop circuit with 140 boreholes. The installation integrates greywater cooling loops to recharge the ground loop during night hours. Residents report high thermal comfort and energy bill reductions of 29% compared to neighbouring developments.',
    stats: [
      { label: 'Energy saved', value: '29%' },
      { label: 'Payback', value: '9.0 yrs' },
      { label: 'Boreholes', value: '140' },
    ]
  }
];

export const researchAreas = [
  {
    id: 'res-01',
    title: 'Ground Loop Heat Transfer Modelling',
    description: 'Refining borehole spacing and depth models against soil conductivity data collected across five Indian soil classes.',
    details: 'Our research aims to optimize borehole loop performance for the specific geological formations found in the Indian subcontinent. By measuring real-world thermal response tests (TRT) in alluvial plains, rocky regions, and red soil zones, we develop localized coefficients for standard simulation tools. This reduces design over-sizing margins and lowers capital drilling costs by up to 15%.',
    tag: 'Thermal Modelling'
  },
  {
    id: 'res-02',
    title: 'TABS Slab Response Under Diurnal Load',
    description: 'Instrumented slab trials measuring how thermally activated building systems respond to daily temperature swings in composite climates.',
    details: 'Thermally Activated Building Structures (TABS) possess significant thermal inertia, meaning they take hours to cool down or heat up. We monitor test slabs equipped with internal temperature sensors to map concrete response lag times. This research helps us write predictive control algorithms that pre-cool the building structure during off-peak night hours, matching the cooling discharge with daytime occupancy peak loads.',
    tag: 'Building Physics'
  },
  {
    id: 'res-03',
    title: 'Regional Economic Feasibility',
    description: 'State-wise electricity tariff and capital cost modelling to identify where GeoTABS reaches payback fastest across India.',
    details: 'Electricity costs and drilling access vary significantly by state. Our techno-economic analysis model incorporates commercial and residential electricity tariffs from thirteen Indian states, mapping them against drilling complexity and local material costs. This allows developers to immediately evaluate the financial viability and simple payback periods in their specific municipalities.',
    tag: 'Techno-Economics'
  },
  {
    id: 'res-04',
    title: 'Low-Disturbance Drilling Methods',
    description: 'Evaluating compact rig drilling techniques suited to dense urban sites with limited lay-down area.',
    details: 'Drilling vertical boreholes is traditionally a space-intensive process. In high-density Indian cities, land is scarce. We investigate specialized compact drilling rigs and horizontal directional drilling (HDD) methods that can install geothermal loops in narrow side alleys, under parking structures, or before structural foundations are poured, opening the market for urban retrofits.',
    tag: 'Construction'
  }
];

export const teamMembers = [
  { 
    name: 'Dr. Aravind Menon', 
    role: 'Principal Investigator', 
    focus: 'Geothermal systems & building physics',
    bio: 'Dr. Menon has over 18 years of experience in geothermal research and low-energy HVAC systems. He leads the overall design strategy and collaborates with municipal corporations on building codes.'
  },
  { 
    name: 'Dr. Priya Raghunathan', 
    role: 'Co-Investigator', 
    focus: 'Thermal modelling & simulation',
    bio: 'Dr. Raghunathan specializes in dynamic building simulations using EnergyPlus and TRNSYS. Her work focuses on transient heat flow models inside activated concrete slabs.'
  },
  { 
    name: 'Karthik Subramaniam', 
    role: 'Research Engineer', 
    focus: 'Ground loop design & field trials',
    bio: 'Karthik manages the physical installation sites and conducts Thermal Response Tests (TRT). He is an expert in borehole drilling logistics and sensor calibrations.'
  },
  { 
    name: 'Fatima Sheikh', 
    role: 'Research Engineer', 
    focus: 'Techno-economic analysis',
    bio: 'Fatima handles the tariff mapping models and capital cost database. Her research evaluates financial viability, carbon tax offsets, and payback optimizations for corporate stakeholders.'
  },
  { 
    name: 'Rohan Deshpande', 
    role: 'Doctoral Researcher', 
    focus: 'TABS slab instrumentation',
    bio: 'Rohan is researching embedded pipe hydraulics and heat transfer interfaces. His doctoral thesis explores optimal spacing of active PEX pipes in high-strength concrete.'
  },
  { 
    name: 'Ananya Iyer', 
    role: 'Doctoral Researcher', 
    focus: 'Regional climate suitability',
    bio: 'Ananya works on climate clustering algorithms. Her research evaluates the limits of passive geothermal cooling in extremely humid zones where sensible-only cooling requires supplementary dehumidification.'
  }
];

export const newsItems = [
  {
    id: 'news-01',
    date: '2026-06-18',
    title: 'GeoTABS Design Tool v2.0 released with state-wise tariff data',
    excerpt: 'The feasibility calculator now covers thirteen Indian states with updated 2024–25 electricity rates and realistic capital cost estimates.',
    content: 'We are proud to announce the release of the GeoTABS Design Tool v2.0. This major update implements a localized client-side calculation engine mapping 13 Indian states with distinct commercial and residential electricity tariffs. The tool also updates drilling and geothermal pump capital cost baselines, providing project developers with realistic simple payback metrics and loop length specifications within seconds.'
  },
  {
    id: 'news-02',
    date: '2026-05-02',
    title: 'Field trial completed at Coimbatore district hospital',
    excerpt: 'Twelve months of monitored performance data confirm a 31% reduction in annual cooling energy against the conventional chiller baseline.',
    content: 'Our field monitoring team has successfully completed the one-year trial milestone at the Coimbatore district hospital facility. Continuous data collection from the active radiant slab sensors validates our energy models, demonstrating a 31% overall cooling energy reduction. The facility maintained stable, comfortable indoor conditions with zero reports of condensation, even during the heavy monsoon season.'
  },
  {
    id: 'news-03',
    date: '2026-03-14',
    title: 'Core Research Grant renewed for phase two',
    excerpt: '"Shallow geothermal integrated thermally activated building cooling system design" enters its second funding phase with an expanded field programme.',
    content: 'The Department of Science & Technology has renewed our Core Research Grant for an additional three years. Phase two of the project will focus on expanding urban retrofit test locations and studying the application of geothermal systems in high-humidity coastal zones.'
  },
  {
    id: 'news-04',
    date: '2026-01-22',
    title: 'Workshop: Borehole sizing for Indian soil conditions',
    excerpt: 'A two-day training workshop for practising engineers on ground loop sizing across alluvial, black soil, and laterite conditions.',
    content: 'Our engineering workshop in Pune drew over 80 consulting engineers and building developers. The sessions covered practical demonstrations of Thermal Response Tests, step-by-step guidelines for borehole sizing, and hands-on calculations with the GeoTABS assessment tool.'
  }
];

export const publications = [
  {
    id: 'pub-01',
    year: '2026',
    authors: 'Menon, A., Raghunathan, P., Subramaniam, K.',
    title: 'Techno-economic feasibility of hybrid geothermal TABS across Indian climate zones',
    venue: 'Journal of Building Performance Simulation',
  },
  {
    id: 'pub-02',
    year: '2025',
    authors: 'Raghunathan, P., Deshpande, R.',
    title: 'Diurnal thermal response of slab-embedded piping under composite climate loading',
    venue: 'Energy and Buildings',
  },
  {
    id: 'pub-03',
    year: '2025',
    authors: 'Sheikh, F., Iyer, A., Menon, A.',
    title: 'Regional electricity tariff sensitivity in ground-source heat pump payback modelling',
    venue: 'Applied Energy',
  },
  {
    id: 'pub-04',
    year: '2024',
    authors: 'Subramaniam, K., Menon, A.',
    title: 'Borehole heat exchanger sizing for shallow alluvial and lateritic soils',
    venue: 'Geothermics',
  }
];

export const trainingPrograms = [
  {
    id: 'train-01',
    title: 'GeoTABS Fundamentals',
    length: '2 days',
    audience: 'Building services engineers',
    description: 'Ground loop basics, TABS integration principles, and an introduction to the feasibility tool.',
    curriculum: ['Day 1: Basics of geothermal heat transfer, ground loop configurations, active concrete slab mechanisms.', 'Day 2: Design calculations, introducing the Feasibility Calculator, simple sizing case studies.']
  },
  {
    id: 'train-02',
    title: 'Advanced Ground Loop Design',
    length: '3 days',
    audience: 'HVAC & geothermal designers',
    description: 'Borehole sizing methods, soil thermal conductivity testing, and drilling coordination.',
    curriculum: ['Day 1: Soil thermal characteristics, conducting a Thermal Response Test (TRT).', 'Day 2: Borehole spacing grids, pressure drop and loop hydraulics calculations.', 'Day 3: Simulation software training, drilling layouts, and excavation safety.']
  },
  {
    id: 'train-03',
    title: 'Feasibility & Economics Workshop',
    length: '1 day',
    audience: 'Project developers & consultants',
    description: 'Hands-on session using the GeoTABS Design Tool to model payback across project scenarios.',
    curriculum: ['Morning: Capital cost estimation, mapping state electricity tariffs, computing ROI.', 'Afternoon: Case study evaluations, interactive project modelling using the Design Tool, sensitivity analysis reports.']
  }
];
