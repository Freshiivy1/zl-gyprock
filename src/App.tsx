import { Routes, Route } from 'react-router'
import Layout from './components/Layout'
import Home from './pages/Home'
import Services from './pages/Services'
import Projects from './pages/Projects'
import About from './pages/About'
import Reviews from './pages/Reviews'
import Contact from './pages/Contact'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<Services />} />
        <Route path="projects" element={<Projects />} />
        <Route path="about" element={<About />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  )
}
