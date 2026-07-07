import PageHero from '../components/PageHero.jsx'
import { teamMembers } from '../data/sampleData.js'

export default function Team() {
  return (
    <>
      <PageHero
        eyebrow="Who we are"
        title="Meet Our Research Team"
        description="Our multi-disciplinary team brings together experts in geothermal hydrology, thermal concrete modeling, building standards, and energy economics."
      />

      <section className="section">
        <div className="container">
          <div className="card-grid">
            {teamMembers.map((member, i) => (
              <div key={i} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--sky-mid), var(--copper))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  marginBottom: '10px'
                }}>
                  {member.name.split(' ').slice(-1)[0][0]}
                </div>
                <h3 style={{ margin: 0, color: 'var(--sky-deep)' }}>{member.name}</h3>
                <span className="eyebrow" style={{ fontSize: '0.7rem' }}>{member.role}</span>
                <p style={{ fontSize: '0.85rem', color: 'var(--ink-soft)', fontStyle: 'italic', margin: 0 }}>
                  Focus: {member.focus}
                </p>
                <p style={{ fontSize: '0.9rem', color: 'var(--ink)', marginTop: '8px' }}>
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
