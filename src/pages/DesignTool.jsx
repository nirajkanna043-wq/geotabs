import React, { useState } from 'react'
import jsPDF from 'jspdf'
import PageHero from '../components/PageHero.jsx'
import { runFeasibility, ValidationError } from '../utils/CalcEngine.js'

export default function DesignTool() {
  const [projectName, setProjectName] = useState('New GeoTABS Project')
  const [inputs, setInputs] = useState({
    buildingArea_m2: 1000,
    buildingType: 'Office',
    buildingTier: 'Tier-2',
    state: 'National Average',
    climate: 'Composite',
    soilType: 'Alluvial Plains',
    peakCooling_kW: '',
    peakHeating_kW: '',
    method: 'standard',
  })
  
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setInputs((prev) => ({
      ...prev,
      [name]: isNaN(value) ? value : value === '' ? '' : Number(value),
    }))
  }

  const handleRun = () => {
    setLoading(true)
    setResult(null)
    setError(null)
    try {
      const data = runFeasibility(inputs)
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const downloadReport = () => {
    if (!result) return
    const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = projectName.replace(/\s+/g, '_') + '_report.json'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const downloadPDF = () => {
    if (!result || !result.economics) return
    const doc = new jsPDF()
    let y = 15

    // Header
    doc.setFontSize(16)
    doc.text('GeoTABS Feasibility Report', 14, y)
    y += 8

    doc.setFontSize(9)
    doc.text('Pan-India Geothermal TABS Assessment Tool', 14, y)
    y += 10

    // Project Info
    doc.setFontSize(11)
    doc.text('Project Information', 14, y)
    y += 6

    doc.setFontSize(9)
    doc.text(`Project Name: ${projectName}`, 14, y); y += 5
    doc.text(`Building Type: ${inputs.buildingType} (${inputs.buildingTier})`, 14, y); y += 5
    doc.text(`Location: ${inputs.state}`, 14, y); y += 5
    doc.text(`Climate Zone: ${inputs.climate}`, 14, y); y += 5
    doc.text(`Soil Type: ${inputs.soilType}`, 14, y); y += 8

    // Feasibility Banner
    doc.setFontSize(12)
    doc.setFillColor(
      result.feasibility_recommendation === 'Highly Feasible' ? 209 : 
      result.feasibility_recommendation === 'Conditionally Feasible' ? 254 : 254,
      result.feasibility_recommendation === 'Highly Feasible' ? 250 : 
      result.feasibility_recommendation === 'Conditionally Feasible' ? 243 : 226,
      result.feasibility_recommendation === 'Highly Feasible' ? 229 : 
      result.feasibility_recommendation === 'Conditionally Feasible' ? 199 : 226
    )
    doc.rect(14, y, 182, 12, 'F')
    doc.text(`Recommendation: ${result.feasibility_recommendation}`, 18, y + 8)
    y += 15

    doc.setFontSize(9)
    doc.text(`Total Score: ${result.total_score} / 15`, 14, y); y += 8

    // Performance Summary
    doc.setFontSize(11)
    doc.text('Performance Summary', 14, y)
    y += 6
    doc.setFontSize(9)
    doc.text(`Peak Cooling Load: ${result.inputs.peakCooling_kW} kW (${result.inputs.peakCooling_source})`, 14, y); y += 5
    doc.text(`Annual Energy Use: ${result.energy.annual_kWh.toLocaleString()} kWh`, 14, y); y += 5
    doc.text(`Energy Savings: ${result.energy.savings_kWh.toLocaleString()} kWh/year`, 14, y); y += 5
    doc.text(`CO2 Reduction: ${result.co2_savings_tonnes} tonnes/year`, 14, y); y += 8

    // Economic Analysis
    doc.setFontSize(11)
    doc.text('Economic Feasibility', 14, y)
    y += 6
    doc.setFontSize(9)
    doc.text(`Electricity Rate: Rs ${result.economics.electricity_rate}/kWh (${inputs.state})`, 14, y); y += 5
    doc.text(`Annual Cost Savings: Rs ${result.economics.annual_savings_INR.toLocaleString('en-IN')}`, 14, y); y += 5
    doc.text(`Estimated Capital Cost: Rs ${(result.economics.capital_cost_INR / 100000).toFixed(1)} Lakhs`, 14, y); y += 5
    doc.text(`Simple Payback Period: ${result.economics.payback_years} years`, 14, y); y += 8

    // Ground Loop Design
    doc.setFontSize(11)
    doc.text('Ground Loop Specifications', 14, y)
    y += 6
    doc.setFontSize(9)
    doc.text(`Required Loop Length: ${result.ground_loop.loop_length_m} m`, 14, y); y += 5
    doc.text(`Number of Boreholes: ${result.ground_loop.borehole_count} (100m deep each)`, 14, y); y += 5
    doc.text(`Land Area Required: ${result.ground_loop.land_area_m2} sq.m (approx)`, 14, y); y += 8

    // Feasibility Score Breakdown
    doc.setFontSize(11)
    doc.text('Feasibility Score Breakdown', 14, y)
    y += 6
    doc.setFontSize(9)
    doc.text(`Load Suitability: ${result.scores.load}/3 - Building thermal characteristics`, 14, y); y += 5
    doc.text(`Capacity Adequacy: ${result.scores.capacity}/3 - System sizing margin`, 14, y); y += 5
    doc.text(`Energy Benefit: ${result.scores.energy}/3 - Annual energy savings potential`, 14, y); y += 5
    doc.text(`Climate Suitability: ${result.scores.climate}/3 - Regional climate match`, 14, y); y += 5
    doc.text(`Economic Viability: ${result.scores.economic}/3 - Payback period assessment`, 14, y); y += 8

    // Regional Context
    doc.setFontSize(11)
    doc.text('Regional Context', 14, y)
    y += 6
    doc.setFontSize(9)
    doc.text(`Climate Zone: ${inputs.climate} (${result.climate_data.examples})`, 14, y); y += 5
    doc.text(`Cooling months: ${result.climate_data.cooling_months}, Heating months: ${result.climate_data.heating_months}`, 14, y); y += 5
    doc.text(`Ground temperature: ~${result.climate_data.ground_temp_C} deg C year-round`, 14, y); y += 5
    doc.text(`Annual operating hours: ${result.energy.operating_hours} hrs`, 14, y); y += 10

    // Footer
    doc.setFontSize(7)
    doc.text("Developed under Core Research Grant: 'Shallow Geothermal integrated thermally activated building cooling system design – Pathway to nature based free cooling (GeoTABS)'", 14, 280)
    doc.text("Tool enables rapid feasibility assessment across India's diverse climate and economic conditions", 14, 285)
    doc.text(`Generated: ${new Date().toLocaleDateString('en-IN')} | Tool Version: 2.0`, 14, 290)

    doc.save(`${projectName || 'GeoTABS'}_Feasibility_Report.pdf`)
  }

  return (
    <div className="tool-shell">
      <PageHero
        eyebrow="Design Tool"
        title="GeoTABS Design Tool - India Edition"
        description="Configure your project parameters below to compute feasibility scores, estimate capital costs, and size ground loops."
      />

      <section className="section" style={{ padding: '40px 0' }}>
        <div className="container">
          <div className="tool-panel">
            <h2 style={{ marginTop: 0, fontSize: 20 }}>Project Details</h2>
            <div className="field-grid">
              <div className="field">
                <label>Project Name</label>
                <input value={projectName} onChange={(e) => setProjectName(e.target.value)} />
              </div>
              <div className="field">
                <label>Building Type</label>
                <select name="buildingType" value={inputs.buildingType} onChange={handleChange}>
                  <option value="Office">Office</option>
                  <option value="Educational">Educational</option>
                  <option value="Residential">Residential</option>
                  <option value="Hospital">Hospital</option>
                  <option value="Hotel">Hotel</option>
                  <option value="IT/Tech Park">IT/Tech Park</option>
                </select>
              </div>
              <div className="field">
                <label>Building Tier</label>
                <select name="buildingTier" value={inputs.buildingTier} onChange={handleChange}>
                  <option value="Tier-1">Tier-1 (Metro cities)</option>
                  <option value="Tier-2">Tier-2 (Major cities)</option>
                  <option value="Tier-3">Tier-3 (Smaller towns)</option>
                </select>
              </div>
              <div className="field">
                <label>State/Region</label>
                <select name="state" value={inputs.state} onChange={handleChange}>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="West Bengal">West Bengal</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Haryana">Haryana</option>
                  <option value="National Average">National Average</option>
                </select>
              </div>
              <div className="field">
                <label>Climate Zone</label>
                <select name="climate" value={inputs.climate} onChange={handleChange}>
                  <option value="Hot-Dry">Hot-Dry</option>
                  <option value="Warm-Humid">Warm-Humid</option>
                  <option value="Composite">Composite</option>
                  <option value="Temperate">Temperate</option>
                  <option value="Cold">Cold</option>
                </select>
              </div>
              <div className="field">
                <label>Soil Type</label>
                <select name="soilType" value={inputs.soilType} onChange={handleChange}>
                  <option value="Alluvial Plains">Alluvial Plains</option>
                  <option value="Black Soil">Black Soil</option>
                  <option value="Red Soil">Red Soil</option>
                  <option value="Laterite">Laterite</option>
                  <option value="Sandy">Sandy</option>
                  <option value="Rocky/Hard">Rocky/Hard</option>
                </select>
              </div>
            </div>
          </div>

          <div className="tool-panel">
            <h2 style={{ marginTop: 0, fontSize: 20 }}>Technical Parameters</h2>
            <div className="field-grid">
              <div className="field">
                <label>Building Area (m²)</label>
                <input name="buildingArea_m2" type="number" value={inputs.buildingArea_m2} onChange={handleChange} />
              </div>
              <div className="field">
                <label>
                  Peak Cooling (kW) <span className="hint">- optional</span>
                </label>
                <input
                  name="peakCooling_kW"
                  type="number"
                  value={inputs.peakCooling_kW}
                  onChange={handleChange}
                  placeholder="Auto-estimated if blank"
                />
              </div>
              <div className="field">
                <label>
                  Peak Heating (kW) <span className="hint">- optional</span>
                </label>
                <input
                  name="peakHeating_kW"
                  type="number"
                  value={inputs.peakHeating_kW}
                  onChange={handleChange}
                  placeholder="Auto-estimated if blank"
                />
              </div>
            </div>
          </div>

          <div style={{ marginBottom: 24, display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={handleRun} disabled={loading}>
              {loading ? 'Running Analysis...' : 'Run Feasibility Analysis'}
            </button>
            <button className="btn btn-outline" onClick={downloadReport} disabled={!result}>
              Download JSON
            </button>
            <button
              className="btn btn-outline"
              onClick={downloadPDF}
              disabled={!result || !result.economics}
              style={{
                borderColor: '#dc2626',
                color: '#dc2626',
                opacity: result && result.economics ? 1 : 0.5,
              }}
            >
              Download PDF Report
            </button>
          </div>

          {error && (
            <div className="tool-panel" style={{ background: '#fee2e2', border: '1px solid #f3c3c0', color: '#991b1b' }}>
              <strong>Error:</strong> {error}
            </div>
          )}

          {result && !error && (
            <div>
              {/* Feasibility Banner */}
              <div
                className={`result-banner ${
                  result.feasibility_recommendation === 'Highly Feasible'
                    ? 'high'
                    : result.feasibility_recommendation === 'Conditionally Feasible'
                    ? 'mid'
                    : 'low'
                }`}
              >
                <h2 style={{ margin: 0, fontSize: 24, color: 'var(--sky-deep)' }}>
                  {result.feasibility_recommendation}
                </h2>
                <p style={{ margin: '8px 0 0 0', fontSize: 16 }}>
                  <strong>Total Feasibility Score:</strong> {result.total_score} / 15
                </p>
              </div>

              {/* Main Results Grid */}
              <div className="card-grid" style={{ marginBottom: 20 }}>
                {/* Performance Summary */}
                <div className="card">
                  <h3 style={{ marginTop: 0, color: 'var(--sky-deep)' }}>Performance Summary</h3>
                  <div className="metric-line">
                    <span>Peak Cooling Load:</span>
                    <b>{result.inputs.peakCooling_kW} kW</b>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--ink-soft)', marginTop: -6, marginBottom: 6 }}>
                    ({result.inputs.peakCooling_source})
                  </div>
                  <div className="metric-line">
                    <span>Annual Energy Use:</span>
                    <b>{result.energy.annual_kWh.toLocaleString()} kWh</b>
                  </div>
                  <div className="metric-line">
                    <span>Energy Savings:</span>
                    <b style={{ color: '#16a34a' }}>{result.energy.savings_kWh.toLocaleString()} kWh/yr</b>
                  </div>
                  <div className="metric-line">
                    <span>CO₂ Reduction:</span>
                    <b>{result.co2_savings_tonnes} tonnes/yr</b>
                  </div>
                  <div className="metric-line">
                    <span>Operating Hours:</span>
                    <b>{result.energy.operating_hours} hrs/yr</b>
                  </div>
                </div>

                {/* Economic Analysis */}
                <div className="card">
                  <h3 style={{ marginTop: 0, color: 'var(--sky-deep)' }}>Economic Analysis</h3>
                  <div className="metric-line">
                    <span>Electricity Rate:</span>
                    <b>₹{result.economics.electricity_rate}/kWh</b>
                  </div>
                  <div className="metric-line">
                    <span>Annual Savings:</span>
                    <b style={{ color: '#16a34a' }}>₹{result.economics.annual_savings_INR.toLocaleString('en-IN')}</b>
                  </div>
                  <div className="metric-line">
                    <span>Capital Cost:</span>
                    <b>₹{(result.economics.capital_cost_INR / 100000).toFixed(2)} Lakhs</b>
                  </div>
                  <div className="metric-line">
                    <span>Payback Period:</span>
                    <b>{result.economics.payback_years} years</b>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--ink-soft)', marginTop: 8 }}>
                    Based on local {inputs.state} tariffs
                  </div>
                </div>

                {/* Ground Loop Design */}
                <div className="card">
                  <h3 style={{ marginTop: 0, color: 'var(--sky-deep)' }}>Ground Loop Design</h3>
                  <div className="metric-line">
                    <span>Required Loop Length:</span>
                    <b>{result.ground_loop.loop_length_m} m</b>
                  </div>
                  <div className="metric-line">
                    <span>Number of Boreholes:</span>
                    <b>{result.ground_loop.borehole_count} × 100m</b>
                  </div>
                  <div className="metric-line">
                    <span>Land Area Required:</span>
                    <b>{result.ground_loop.land_area_m2} m²</b>
                  </div>
                  <div className="metric-line">
                    <span>Soil Thermal Conductivity:</span>
                    <b>{result.inputs.soilConductivity_WpmK} W/m·K</b>
                  </div>
                  <div className="metric-line">
                    <span>Soil Type:</span>
                    <b>{inputs.soilType}</b>
                  </div>
                </div>
              </div>

              {/* Score Breakdown */}
              <div className="card" style={{ marginBottom: 20 }}>
                <h3 style={{ marginTop: 0, color: 'var(--sky-deep)' }}>Feasibility Score Breakdown</h3>
                <div className="score-grid">
                  <div>
                    <div style={{ fontSize: 12, color: 'var(--ink-soft)' }}>Load Suitability</div>
                    <div className="score-num">{result.scores.load}/3</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: 'var(--ink-soft)' }}>Capacity Adequacy</div>
                    <div className="score-num">{result.scores.capacity}/3</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: 'var(--ink-soft)' }}>Energy Benefit</div>
                    <div className="score-num">{result.scores.energy}/3</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: 'var(--ink-soft)' }}>Climate Suitability</div>
                    <div className="score-num">{result.scores.climate}/3</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: 'var(--ink-soft)' }}>Economic Viability</div>
                    <div className="score-num">{result.scores.economic}/3</div>
                  </div>
                </div>
              </div>

              {/* Comparison Table */}
              <div className="card" style={{ marginBottom: 20, overflowX: 'auto' }}>
                <h3 style={{ marginTop: 0, color: 'var(--sky-deep)' }}>Comparison with Conventional HVAC</h3>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Parameter</th>
                      <th>GeoTABS</th>
                      <th>Conventional</th>
                      <th>Savings</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Annual Energy (kWh)</td>
                      <td>{result.energy.annual_kWh.toLocaleString()}</td>
                      <td>{result.energy.baseline_kWh.toLocaleString()}</td>
                      <td style={{ color: '#16a34a', fontWeight: 'bold' }}>
                        {result.energy.savings_kWh.toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <td>Annual Cost (₹)</td>
                      <td>₹{result.economics.geotabs_cost_INR.toLocaleString('en-IN')}</td>
                      <td>₹{result.economics.baseline_cost_INR.toLocaleString('en-IN')}</td>
                      <td style={{ color: '#16a34a', fontWeight: 'bold' }}>
                        ₹{result.economics.annual_savings_INR.toLocaleString('en-IN')}
                      </td>
                    </tr>
                    <tr>
                      <td>CO₂ Emissions (tonnes/yr)</td>
                      <td>{result.co2.geotabs_tonnes}</td>
                      <td>{result.co2.baseline_tonnes}</td>
                      <td style={{ color: '#16a34a', fontWeight: 'bold' }}>
                        {result.co2.savings_tonnes}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Regional Context */}
              <div className="card" style={{ background: '#eff6ff', borderColor: '#bfe3e0' }}>
                <h4 style={{ margin: '0 0 10px 0', color: 'var(--sky-deep)' }}>
                  Regional Context: {inputs.climate} Zone
                </h4>
                <p style={{ margin: '5px 0', fontSize: 14 }}>
                  <strong>Typical States:</strong> {result.climate_data.examples}
                </p>
                <p style={{ margin: '5px 0', fontSize: 14 }}>
                  <strong>Operating Pattern:</strong> {result.climate_data.cooling_months} months cooling,{' '}
                  {result.climate_data.heating_months} months heating
                </p>
                <p style={{ margin: '5px 0', fontSize: 14 }}>
                  <strong>Ground Temperature:</strong> ~{result.climate_data.ground_temp_C}°C year-round
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
