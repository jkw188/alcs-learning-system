import { GraduationCap } from 'lucide-react'
import { Link, Outlet } from 'react-router-dom'

export function SiteLayout() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <Link to="/" className="brand">
          <span className="brand-mark"><GraduationCap size={24} /></span>
          <span>
            <strong>ALCS</strong>
            <small>A Level Computer Science</small>
          </span>
        </Link>
      </header>
      <Outlet />
    </div>
  )
}
