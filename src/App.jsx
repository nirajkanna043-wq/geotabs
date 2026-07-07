import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Technology from './pages/Technology.jsx'
import CaseStudies from './pages/CaseStudies.jsx'
import Research from './pages/Research.jsx'
import Team from './pages/Team.jsx'
import News from './pages/News.jsx'
import DesignTool from './pages/DesignTool.jsx'
import Publications from './pages/Publications.jsx'
import Training from './pages/Training.jsx'

export default function App() {
  return (
    <div id="top">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/technology" element={<Technology />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/research" element={<Research />} />
        <Route path="/team" element={<Team />} />
        <Route path="/news" element={<News />} />
        <Route path="/design-tool" element={<DesignTool />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/training" element={<Training />} />
      </Routes>
      <Footer />
    </div>
  )
}
