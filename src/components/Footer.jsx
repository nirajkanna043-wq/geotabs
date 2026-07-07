import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h4>GeoTABS Hybrid</h4>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.88rem', maxWidth: '32ch' }}>
              Shallow geothermal, thermally activated building cooling —
              a pathway to nature-based free cooling.
            </p>
          </div>
          <div>
            <h4>Explore</h4>
            <Link to="/technology">Technology</Link>
            <Link to="/case-studies">Case Studies</Link>
            <Link to="/research">Research</Link>
            <Link to="/design-tool">Design Tool</Link>
          </div>
          <div>
            <h4>Organisation</h4>
            <Link to="/team">Team</Link>
            <Link to="/news">News</Link>
            <Link to="/training">Training</Link>
          </div>
          <div>
            <h4>Resources</h4>
            <Link to="/publications">Publications</Link>
            <Link to="/design-tool">Feasibility Tool</Link>
          </div>
          <div>
            <h4>Contact</h4>
            <a href="mailto:contact@geotabs-hybrid.org">contact@geotabs-hybrid.org</a>
            <a href="#top">Back to top</a>
          </div>
        </div>
        <div className="footer-bottom">
          © {new Date().getFullYear()} GeoTABS Hybrid Technology. Sample content for demonstration purposes.
        </div>
      </div>
    </footer>
  )
}
