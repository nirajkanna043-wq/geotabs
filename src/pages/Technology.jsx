import PageHero from '../components/PageHero.jsx'
import GroundDivider from '../components/GroundDivider.jsx'

const STAGES = [
  {
    title: 'Ground Loop',
    desc: 'Vertical boreholes, typically 100m deep, circulate fluid through the earth where temperatures stay near-constant year-round.',
  },
  {
    title: 'Heat Pump',
    desc: 'A ground-source heat pump lifts or rejects heat between the loop and the building at a fraction of conventional chiller energy.',
  },
  {
    title: 'TABS Slab',
    desc: 'Piping embedded in the concrete slab turns the building structure itself into a large, low-intensity radiant surface.',
  },
  {
    title: 'Controls',
    desc: 'Slow-responding slab thermal mass is managed with predictive control logic tuned to occupancy and weather forecasts.',
  },
]

export default function Technology() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title="Hybrid geothermal, thermally activated"
        description="GeoTABS combines two mature technologies — shallow ground-source heat exchange and thermally activated building systems — into a single low-energy cooling and heating strategy."
      />
      <GroundDivider />
      
      <section className="section">
        <div className="container">
          <span className="eyebrow">The System</span>
          <h2>Four components, one loop</h2>
          <div className="card-grid" style={{ marginTop: 24 }}>
            {STAGES.map((s, i) => (
              <div key={s.title} className="card">
                <span className="eyebrow">{String(i + 1).padStart(2, '0')}</span>
                <h3 style={{ marginTop: 8 }}>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tight" style={{ background: 'var(--paper-dim)' }}>
        <div className="container">
          <span className="eyebrow">Why It Works In India</span>
          <h2>Matched to regional soil and climate</h2>
          <p style={{ maxWidth: '70ch' }}>
            Ground temperature stays close to the annual average air temperature
            once you're a few metres down — around 12–28°C depending on region.
            That stability is what makes the ground a usable heat source in winter
            and heat sink in summer, well before any mechanical cooling is added.
          </p>
          <table className="data-table" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Climate Zone</th>
                <th>Ground Temp (°C)</th>
                <th>Typical Soil</th>
                <th>Suitability</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Hot-Dry</td><td>28</td><td>Sandy, Rocky</td><td>High</td></tr>
              <tr><td>Warm-Humid</td><td>26</td><td>Laterite, Red Soil</td><td>High</td></tr>
              <tr><td>Composite</td><td>24</td><td>Alluvial Plains</td><td>High</td></tr>
              <tr><td>Temperate</td><td>18</td><td>Black Soil</td><td>Moderate</td></tr>
              <tr><td>Cold</td><td>12</td><td>Rocky/Hard</td><td>Moderate</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}
