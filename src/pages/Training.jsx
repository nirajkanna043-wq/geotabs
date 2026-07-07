import { useState } from 'react'
import PageHero from '../components/PageHero.jsx'
import { trainingPrograms } from '../data/sampleData.js'

export default function Training() {
  const [selectedProgram, setSelectedProgram] = useState(null)

  return (
    <>
      <PageHero
        eyebrow="Capacity Building"
        title="Training & Workshops"
        description="We offer certified training workshops for mechanical engineers, developers, and HVAC designers interested in shallow geothermal hybrid building integrations."
      />

      <section className="section">
        <div className="container">
          <div className="card-grid">
            {trainingPrograms.map((prog) => (
              <div 
                key={prog.id} 
                className="card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span className="tag-pill" style={{ color: 'var(--copper)' }}>{prog.length}</span>
                    <small style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink-soft)' }}>For: {prog.audience.split(' ')[0]}</small>
                  </div>
                  <h3 style={{ color: 'var(--sky-deep)' }}>{prog.title}</h3>
                  <p style={{ fontSize: '0.92rem' }}>{prog.description}</p>
                </div>
                <button 
                  className="btn btn-primary"
                  style={{ alignSelf: 'stretch', padding: '10px', fontSize: '0.88rem', marginTop: '16px' }}
                  onClick={() => setSelectedProgram(prog)}
                >
                  View Course Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedProgram && (
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
        }} onClick={() => setSelectedProgram(null)}>
          <div style={{
            background: 'var(--paper)',
            maxWidth: '550px',
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
                {selectedProgram.length} training program
              </span>
              <h2 style={{ color: '#fff', margin: '8px 0 0', fontSize: '1.4rem' }}>{selectedProgram.title}</h2>
              <button 
                onClick={() => setSelectedProgram(null)}
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
              <h4 style={{ color: 'var(--sky-deep)', marginTop: 0 }}>Target Audience</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--ink)' }}>{selectedProgram.audience}</p>
              
              <h4 style={{ color: 'var(--sky-deep)', marginBottom: '8px' }}>Syllabus & Agenda</h4>
              <ul style={{ paddingLeft: '20px', margin: 0, fontSize: '0.9rem', color: 'var(--ink)' }}>
                {selectedProgram.curriculum.map((day, idx) => (
                  <li key={idx} style={{ marginBottom: '8px' }}>
                    {day}
                  </li>
                ))}
              </ul>
            </div>
            
            <div style={{ padding: '16px 24px', borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'flex-end', background: 'var(--paper-dim)' }}>
              <button className="btn btn-primary" onClick={() => setSelectedProgram(null)} style={{ padding: '8px 20px', fontSize: '0.9rem' }}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
