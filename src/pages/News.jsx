import { useState } from 'react'
import PageHero from '../components/PageHero.jsx'
import { newsItems } from '../data/sampleData.js'

export default function News() {
  const [selectedNews, setSelectedNews] = useState(null)

  return (
    <>
      <PageHero
        eyebrow="News & Press"
        title="Project Updates & Announcements"
        description="Follow project milestones, field trials, research outcomes, and workshop details from the GeoTABS hybrid research team."
      />

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {newsItems.map((n) => (
              <div 
                key={n.id} 
                className="card" 
                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer' }}
                onClick={() => setSelectedNews(n)}
              >
                <div>
                  <span className="tag-pill">
                    {new Date(n.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </span>
                  <h3 style={{ marginTop: '12px', color: 'var(--sky-deep)' }}>{n.title}</h3>
                  <p style={{ fontSize: '0.92rem' }}>{n.excerpt}</p>
                </div>
                <button 
                  className="btn btn-outline" 
                  style={{ alignSelf: 'flex-start', marginTop: '12px', padding: '6px 12px', fontSize: '0.8rem' }}
                >
                  Read Full Article
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedNews && (
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
        }} onClick={() => setSelectedNews(null)}>
          <div style={{
            background: 'var(--paper)',
            maxWidth: '600px',
            width: '100%',
            borderRadius: '12px',
            boxShadow: 'var(--shadow-md)',
            overflow: 'hidden'
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ 
              background: 'linear-gradient(120deg, var(--sky-deep), var(--sky-mid))', 
              padding: '24px', 
              color: '#fff',
              position: 'relative'
            }}>
              <span className="eyebrow" style={{ color: 'var(--copper-light)' }}>
                {new Date(selectedNews.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              <h2 style={{ color: '#fff', margin: '8px 0 0', fontSize: '1.4rem' }}>{selectedNews.title}</h2>
              <button 
                onClick={() => setSelectedNews(null)}
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
              <p style={{ fontSize: '1rem', lineHeight: '1.7', color: 'var(--ink)', whiteSpace: 'pre-wrap' }}>
                {selectedNews.content}
              </p>
            </div>
            <div style={{ padding: '16px 24px', borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'flex-end', background: 'var(--paper-dim)' }}>
              <button className="btn btn-primary" onClick={() => setSelectedNews(null)} style={{ padding: '8px 20px', fontSize: '0.9rem' }}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
