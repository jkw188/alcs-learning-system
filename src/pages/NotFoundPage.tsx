import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <main className="not-found section-width">
      <span className="eyebrow">404</span>
      <h1>Page not found</h1>
      <p>The page you requested does not exist in the ALCS learning system.</p>
      <Link to="/" className="primary-button">Back to ALCS Home</Link>
    </main>
  )
}
