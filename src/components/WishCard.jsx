import { Link } from 'react-router-dom'

const statusLabel = {
  open: 'open',
  partial: 'in progress',
  granted: 'granted',
}

export default function WishCard({ wish }) {
  const pct = Math.min(100, Math.round((wish.raised / wish.goal) * 100))
  const displayName = wish.isAnonymous ? wish.username : wish.username

  return (
    <Link to={`/wish/${wish.id}`} className="card">
      <span className={`status-pill status-${wish.status}`}>
        {statusLabel[wish.status]}
      </span>
      <div className="wish-name" style={{ marginTop: '0.7rem' }}>{wish.title}</div>
      <div className="wish-story">{wish.story}</div>
      <div className="depth-track">
        <div className="depth-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="wish-meta">
        <span><strong>₦{wish.raised.toLocaleString()}</strong> of ₦{wish.goal.toLocaleString()}</span>
        <span>{wish.grantors} grantors</span>
      </div>
      {wish.status === 'granted' && <div className="granted-tag">✦ Granted</div>}
    </Link>
  )
}
