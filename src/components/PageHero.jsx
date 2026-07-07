export default function PageHero({ eyebrow, title, description }) {
  return (
    <section className="page-hero">
      <div className="container">
        {eyebrow && <span className="eyebrow" style={{ color: '#e0a35c', display: 'block', marginBottom: '8px' }}>{eyebrow}</span>}
        <h1 style={{ marginTop: 0 }}>{title}</h1>
        {description && <p style={{ marginBottom: 0 }}>{description}</p>}
      </div>
    </section>
  )
}
