import { useState } from 'react'
import PageHero from '../components/PageHero.jsx'
import { caseStudies } from '../data/sampleData.js'

export default function CaseStudies() {
  const [activeStudy, setActiveStudy] = useState(null)

  return (
    <>
      <PageHero 
        eyebrow="Case Studies"
        title="Real-World GeoTABS Deployments"
        description="Explore how hybrid geothermal activated slabs perform across various states, soils, and facilities in India."
      />
      
      <section className="section">
        <div className="container">
          <div className="card-grid">
            {caseStudies.map((study) => (
              <div 
                key={study.id} 
                className="card" 
                style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                onClick={() => setActiveStudy(study)}
              >
                <span className="tag-pill">{study.type}</span>
                <h3 style={{ marginTop: 12, color: 'var(--sky-deep)' }}>{study.title}</h3>
                <p>{study.summary}</p>
                <div style={{ display: 'flex', gap: '15px', marginTop: '15px', borderTop: '1px solid var(--line)', paddingTop: '15px' }}>
                  {study.stats.map((stat, idx) => (
                    <div key={idx}>
                      <small style={{ display: 'block', fontSize: '0.7rem', color: 'var(--ink-soft)', textTransform: 'uppercase' }}>{stat.label}</small>
                      <strong style={{ fontSize: '1rem', color: 'var(--copper)' }}>{stat.value}</strong>
                    </div>
                  ))}
                </div>
                <button 
                  className="btn btn-outline" 
                  style={{ width: '100%', marginTop: '15px', padding: '8px 16px', fontSize: '0.85rem' }}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal for detailed case study details */}
      {activeStudy && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(11, 79, 108, 0.4)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 100,
          padding: '20px'
        }} onClick={() => setActiveStudy(null)}>
          <div style={{
            background: 'var(--paper)',
            maxWidth: '650px',
            width: '100%',
            borderRadius: '12px',
            boxShadow: 'var(--shadow-md)',
            overflow: 'hidden',
            animation: 'fadeIn 0.2s ease-out'
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ 
              background: 'linear-gradient(120deg, var(--sky-deep), var(--sky-mid))', 
              padding: '24px', 
              color: '#fff',
              position: 'relative'
            }}>
              <span className="eyebrow" style={{ color: 'var(--copper-light)' }}>{activeStudy.type}</span>
              <h2 style={{ color: '#fff', margin: '8px 0 0', fontSize: '1.6rem' }}>{activeStudy.title}</h2>
              <button 
                onClick={() => setActiveStudy(null)}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'transparent',
                  border: 'none',
                  color: '#fff',
                  fontSize: '1.5rem',
                  cursor: 'pointer'
                }}
              >
                &times;
              </button>
            </div>
            
            <div style={{ padding: '24px' }}>
              <h4 style={{ color: 'var(--sky-deep)', marginTop: 0 }}>Project Overview</h4>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--ink)' }}>
                {activeStudy.details}
              </p>
              
              <h4 style={{ color: 'var(--sky-deep)', marginBottom: '12px' }}>Performance Parameters</h4>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(3, 1fr)', 
                gap: '15px', 
                background: 'var(--paper-dim)', 
                padding: '16px', 
                borderRadius: '8px',
                border: '1px solid var(--line)'
              }}>
                {activeStudy.stats.map((stat, idx) => (
                  <div key={idx} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--ink-soft)', textTransform: 'uppercase', marginBottom: '4px' }}>
                      {stat.label}
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--copper)' }}>
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ padding: '16px 24px', borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'flex-end', background: 'var(--paper-dim)' }}>
              <button className="btn btn-primary" onClick={() => setActiveStudy(null)} style={{ padding: '8px 20px', fontSize: '0.9rem' }}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
