import PageHero from '../components/PageHero.jsx'
import { publications } from '../data/sampleData.js'

export default function Publications() {
  return (
    <>
      <PageHero
        eyebrow="Scientific Output"
        title="Journal & Conference Publications"
        description="Read our peer-reviewed literature detailing active slab responses, borehole hydronic sizing, and state-wise techno-economics."
      />

      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {publications.map((pub) => (
              <div 
                key={pub.id} 
                className="card" 
                style={{
                  display: 'flex', 
                  flexDirection: 'row', 
                  alignItems: 'flex-start', 
                  gap: '20px',
                  borderLeft: '4px solid var(--copper)'
                }}
              >
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  color: 'var(--copper)',
                  background: 'var(--paper-dim)',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  lineHeight: '1',
                  flexShrink: 0
                }}>
                  {pub.year}
                </div>
                <div>
                  <h3 style={{ margin: '0 0 6px 0', fontSize: '1.15rem', color: 'var(--sky-deep)' }}>{pub.title}</h3>
                  <p style={{ margin: '0 0 6px 0', fontSize: '0.9rem', color: 'var(--ink-soft)' }}>
                    <strong>Authors:</strong> {pub.authors}
                  </p>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--sky-mid)', fontStyle: 'italic' }}>
                    Published in: {pub.venue}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
