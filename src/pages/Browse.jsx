import { useState } from 'react'
import SparkleBackground from '../components/SparkleBackground.jsx'
import Navbar from '../components/Navbar.jsx'
import WishCard from '../components/WishCard.jsx'
import { mockWishes } from '../data/mockWishes.js'

const filters = [
  { key: 'all', label: 'all' },
  { key: 'open', label: 'open' },
  { key: 'partial', label: 'in progress' },
  { key: 'granted', label: 'granted' },
]

export default function Browse() {
  const [filter, setFilter] = useState('all')

  const visible = filter === 'all' ? mockWishes : mockWishes.filter((w) => w.status === filter)

  return (
    <div className="page">
      <SparkleBackground density="light" />
      <Navbar />
      <div className="container">
        <div className="section-title">wishes waiting</div>
        <div className="section-sub">every wish here is real, told in the words of the person who made it</div>

        <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.6rem', flexWrap: 'wrap' }}>
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={filter === f.key ? 'btn btn-primary' : 'btn btn-ghost'}
              style={{ padding: '0.5rem 1.1rem', fontSize: '0.82rem' }}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid-2">
          {visible.map((wish) => (
            <WishCard key={wish.id} wish={wish} />
          ))}
        </div>
      </div>
    </div>
  )
}
