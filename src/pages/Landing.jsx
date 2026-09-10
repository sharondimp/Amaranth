import { Link } from 'react-router-dom'
import SparkleBackground from '../components/SparkleBackground.jsx'

export default function Landing() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      <SparkleBackground density="full" />
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '3rem 1.8rem',
        }}
      >
        <div className="brand-mark" style={{ marginBottom: '1.4rem' }}>amaranth</div>
        <h1
          className="italic"
          style={{
            fontSize: 'clamp(2.6rem, 10vw, 4.4rem)',
            color: '#FFFDF8',
            textShadow: '0 0 40px rgba(247,223,163,0.45)',
            lineHeight: 1.1,
            marginBottom: '1.1rem',
            maxWidth: '14ch',
          }}
        >
          every wish is a light you set loose in the dark
        </h1>
        <p style={{ maxWidth: '28ch', color: 'var(--mist-dim)', fontSize: '1.05rem' }}>
          Say it once. Somewhere, someone is already reaching for it.
        </p>
        <Link to="/post" className="btn btn-primary" style={{ marginTop: '2.4rem' }}>
          Make a wish
        </Link>
        <Link to="/browse" style={{ marginTop: '1.2rem', fontSize: '0.85rem', color: 'var(--mist-dim)' }}>
          or grant someone else's →
        </Link>
      </div>
    </div>
  )
}
