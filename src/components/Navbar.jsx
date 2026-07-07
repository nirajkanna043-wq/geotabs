import { NavLink } from 'react-router-dom'

const LINKS = [
  { to: '/technology', label: 'Technology' },
  { to: '/case-studies', label: 'Case Studies' },
  { to: '/research', label: 'Research' },
  { to: '/team', label: 'Team' },
  { to: '/news', label: 'News' },
  { to: '/publications', label: 'Publications' },
  { to: '/training', label: 'Training' },
]

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="brand">
          <span className="brand-mark">GT</span>
          <span className="brand-text">
            <span className="name">GeoTABS</span>
            <span className="tag">Hybrid Technology</span>
          </span>
        </NavLink>
        <nav className="nav-links">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink
            to="/design-tool"
            className={({ isActive }) => 'tool-link' + (isActive ? ' active' : '')}
          >
            Design Tool
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
