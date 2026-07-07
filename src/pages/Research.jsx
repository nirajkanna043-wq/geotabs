import { useState } from 'react'
import PageHero from '../components/PageHero.jsx'
import { researchAreas } from '../data/sampleData.js'

export default function Research() {
  const [expandedId, setExpandedId] = useState(null)

  return (
    <>
      <PageHero
        eyebrow="Research Program"
        title="Scientific & Technical Research"
        description="Our team conducts active field testing, laboratory simulations, and techno-economic analyses focused on shallow geothermal technologies in India."
      />

      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {researchAreas.map((res) => {
              const isExpanded = expandedId === res.id
              return (
                <div 
                  key={res.id} 
                  className="card"
                  style={{
                    borderLeft: '4px solid var(--sky-mid)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                    <div>
                      <span className="tag-pill">{res.tag}</span>
                      <h3 style={{ marginTop: 8, marginBottom: 8, color: 'var(--sky-deep)' }}>{res.title}</h3>
                    </div>
                    <button 
                      className="btn btn-outline"
                      style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                      onClick={() => setExpandedId(isExpanded ? null : res.id)}
                    >
                      {isExpanded ? 'Hide Details' : 'Expand Details'}
                    </button>
                  </div>
                  <p style={{ margin: '8px 0 0', fontSize: '0.95rem' }}>{res.description}</p>
                  
                  {isExpanded && (
                    <div style={{ 
                      marginTop: '16px', 
                      paddingTop: '16px', 
                      borderTop: '1px dashed var(--line)',
                      animation: 'slideDown 0.2s ease-out'
                    }}>
                      <h4 style={{ color: 'var(--sky-deep)', marginTop: 0 }}>Research Context & Findings</h4>
                      <p style={{ fontSize: '0.92rem', color: 'var(--ink)' }}>{res.details}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
