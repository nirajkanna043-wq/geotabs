import { Link } from 'react-router-dom'
import GroundDivider from '../components/GroundDivider.jsx'
import { caseStudies, newsItems } from '../data/sampleData.js'

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <div>
            <span className="eyebrow" style={{ color: '#e0a35c' }}>Hybrid Geothermal Technology</span>
            <h1>Cooling buildings with the ground beneath them</h1>
            <p className="lede">
              GeoTABS pairs shallow geothermal boreholes with thermally activated
              building slabs — a nature-based path to lower cooling energy across
              India's diverse climates and soils.
            </p>
            <div className="hero-actions">
              <Link to="/design-tool" className="btn btn-primary">Open Design Tool</Link>
              <Link to="/case-studies" className="btn btn-ghost">View Case Studies</Link>
            </div>
          </div>
          <div className="hero-diagram">
            <svg viewBox="0 0 360 300" width="100%" role="img" aria-label="Cross-section of a building with a geothermal ground loop">
              <rect x="0" y="0" width="360" height="180" fill="none" />
              <circle cx="60" cy="40" r="16" fill="rgba(255,255,255,0.25)" />
              <circle cx="120" cy="26" r="10" fill="rgba(255,255,255,0.18)" />
              <circle cx="280" cy="50" r="14" fill="rgba(255,255,255,0.2)" />
              
              {/* building */}
              <rect x="150" y="70" width="60" height="130" fill="none" stroke="#fff" strokeOpacity="0.85" strokeWidth="2" />
              {Array.from({ length: 6 }).map((_, i) => (
                <line key={i} x1="150" y1={90 + i * 18} x2="210" y2={90 + i * 18} stroke="#fff" strokeOpacity="0.35" />
              ))}
              
              {/* ground */}
              <rect x="0" y="200" width="360" height="100" fill="#3e2a1e" fillOpacity="0.9" />
              <line x1="0" y1="200" x2="360" y2="200" stroke="#e0a35c" strokeDasharray="4 4" strokeWidth="2" />
              
              {/* boreholes */}
              {[165, 185, 205].map((x, i) => (
                <line key={i} x1={x} y1="200" x2={x} y2="290" stroke="#e0a35c" strokeWidth="3" />
              ))}
              <text x="14" y="290" fill="rgba(255,255,255,0.55)" fontSize="10" fontFamily="IBM Plex Mono, monospace">
                Ground loop · ~24°C year-round
              </text>
            </svg>
          </div>
        </div>
      </section>

      <GroundDivider />

      <section className="section">
        <div className="container">
          <div className="stat-row">
            <div>
              <div className="stat-num">30–40%</div>
              <div className="stat-label">Typical cooling energy reduction</div>
            </div>
            <div>
              <div className="stat-num">13</div>
              <div className="stat-label">Indian states modelled</div>
            </div>
            <div>
              <div className="stat-num">5</div>
              <div className="stat-label">Climate zones covered</div>
            </div>
            <div>
              <div className="stat-num">6–10 yrs</div>
              <div className="stat-label">Typical simple payback</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-tight" style={{ background: 'var(--paper-dim)' }}>
        <div className="container">
          <span className="eyebrow">Selected Case Studies</span>
          <h2>Deployed across building types and climates</h2>
          <div className="card-grid" style={{ marginTop: 24 }}>
            {caseStudies.slice(0, 3).map((cs) => (
              <div key={cs.id} className="card">
                <span className="tag-pill">{cs.type}</span>
                <h3 style={{ marginTop: 12 }}>{cs.title}</h3>
                <p>{cs.summary}</p>
                <Link to="/case-studies" style={{ color: 'var(--copper)', fontWeight: 600, fontSize: '0.9rem', display: 'inline-block', marginTop: '12px' }}>
                  Read Details &rarr;
                </Link>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 24 }}>
            <Link to="/case-studies" className="btn btn-outline">See all case studies</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <span className="eyebrow">Latest</span>
          <h2>News from the research programme</h2>
          <div className="card-grid" style={{ marginTop: 24 }}>
            {newsItems.slice(0, 2).map((n) => (
              <div key={n.id} className="card">
                <span className="tag-pill">
                  {new Date(n.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
                </span>
                <h3 style={{ marginTop: 12 }}>{n.title}</h3>
                <p>{n.excerpt}</p>
                <Link to="/news" style={{ color: 'var(--copper)', fontWeight: 600, fontSize: '0.9rem', display: 'inline-block', marginTop: '12px' }}>
                  Read Article &rarr;
                </Link>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 24 }}>
            <Link to="/news" className="btn btn-outline">Read all news</Link>
          </div>
        </div>
      </section>
    </>
  )
}
