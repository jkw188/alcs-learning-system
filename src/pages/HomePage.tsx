import { ArrowRight, BookOpen, Clock3 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { chapters } from '../services/content'

export function HomePage() {
  const firstAvailable = chapters.find((chapter) => chapter.meta.status !== 'coming-soon')

  return (
    <main>
      <section className="hero section-width">
        <span className="hero-kicker">A Level Computer Science Learning System</span>
        <h1>Learn Computer Science by solving meaningful problems.</h1>
        <p>
          ALCS keeps every chapter in one consistent learning experience: structured modules,
          practical activities, clear explanations, and reusable content.
        </p>
        {firstAvailable && (
          <Link className="primary-button" to={`/chapter/${firstAvailable.meta.id}`}>
            Continue Learning <ArrowRight size={18} />
          </Link>
        )}
      </section>

      <section className="section-width chapter-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Curriculum</span>
            <h2>Chapters</h2>
          </div>
          <span className="chapter-count">{chapters.length} chapters</span>
        </div>

        <div className="chapter-grid">
          {chapters.map(({ meta }) => {
            const comingSoon = meta.status === 'coming-soon'
            const card = (
              <article className={`chapter-card ${comingSoon ? 'is-disabled' : ''}`}>
                <div className="chapter-card-top">
                  <span className="chapter-index">{String(meta.number).padStart(2, '0')}</span>
                  <span className={`status-pill ${comingSoon ? 'soon' : 'ready'}`}>
                    {comingSoon ? <Clock3 size={14} /> : <BookOpen size={14} />}
                    {comingSoon ? 'Coming soon' : `${meta.modules.length} modules`}
                  </span>
                </div>
                <h3>{meta.title}</h3>
                <p>{meta.description ?? 'Chapter content for the ALCS learning system.'}</p>
                {!comingSoon && <span className="card-link">Open chapter <ArrowRight size={16} /></span>}
              </article>
            )

            return comingSoon ? (
              <div key={meta.id}>{card}</div>
            ) : (
              <Link key={meta.id} to={`/chapter/${meta.id}`} className="chapter-card-link">
                {card}
              </Link>
            )
          })}
        </div>
      </section>
    </main>
  )
}
