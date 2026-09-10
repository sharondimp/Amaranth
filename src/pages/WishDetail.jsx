import { useParams } from 'react-router-dom'
import { useState } from 'react'
import SparkleBackground from '../components/SparkleBackground.jsx'
import Navbar from '../components/Navbar.jsx'
import { mockWishes } from '../data/mockWishes.js'
import { payWithPaystack } from '../utils/paystack.js'

export default function WishDetail() {
  const { id } = useParams()
  const wish = mockWishes.find((w) => w.id === id)

  const [amount, setAmount] = useState('')
  const [hasGranted, setHasGranted] = useState(false) // mock: did the current visitor fund this?
  const [messages, setMessages] = useState([])
  const [draft, setDraft] = useState('')

  if (!wish) {
    return (
      <div className="page">
        <SparkleBackground density="light" />
        <Navbar />
        <div className="container">Wish not found.</div>
      </div>
    )
  }

  const pct = Math.min(100, Math.round((wish.raised / wish.goal) * 100))

  function handleFund(e) {
    e.preventDefault()
    payWithPaystack({
      amountNaira: Number(amount),
      email: 'granter@example.com', // TODO: collect or generate a throwaway email
      onSuccess: (reference) => {
        // TODO: verify `reference` server-side (Cloud Function) before
        // crediting the wish, then update Firestore raised amount
        setHasGranted(true)
        setMessages([
          { from: 'them', text: `Thank you so much — this means more than you know. 🕯️` },
        ])
      },
    })
  }

  function sendMessage(e) {
    e.preventDefault()
    if (!draft.trim()) return
    setMessages((m) => [...m, { from: 'me', text: draft.trim() }])
    setDraft('')
  }

  return (
    <div className="page">
      <SparkleBackground density="light" />
      <Navbar />
      <div className="container">
        <span className={`status-pill status-${wish.status}`}>
          {wish.status === 'partial' ? 'in progress' : wish.status}
        </span>

        <h1 className="italic" style={{ fontSize: '1.9rem', color: '#FFF8EA', margin: '0.7rem 0 0.5rem' }}>
          {wish.title}
        </h1>
        <p style={{ color: 'var(--mist-dim)', marginBottom: '1.4rem' }}>{wish.story}</p>

        <div className="depth-track">
          <div className="depth-fill" style={{ width: `${pct}%` }} />
        </div>
        <div className="wish-meta" style={{ marginBottom: '1.8rem' }}>
          <span><strong>₦{wish.raised.toLocaleString()}</strong> of ₦{wish.goal.toLocaleString()}</span>
          <span>{wish.grantors} grantors · {wish.isAnonymous ? wish.username : wish.username}</span>
        </div>

        {wish.status !== 'granted' && !hasGranted && (
          <form onSubmit={handleFund} className="card" style={{ marginBottom: '1.8rem' }}>
            <div className="field">
              <label>How much would you like to give?</label>
              <input
                type="number"
                min="500"
                placeholder="₦"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Grant this wish
            </button>
          </form>
        )}

        <div className="section-title" style={{ fontSize: '1.3rem' }}>messages</div>

        {hasGranted ? (
          <>
            <div className="chat-thread">
              {messages.map((m, i) => (
                <div key={i} className={`chat-bubble ${m.from === 'me' ? 'me' : 'them'}`}>
                  {m.text}
                </div>
              ))}
            </div>
            <form onSubmit={sendMessage} style={{ display: 'flex', gap: '0.6rem' }}>
              <input
                type="text"
                placeholder="Send a message..."
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                style={{
                  flex: 1,
                  padding: '0.7rem 0.9rem',
                  borderRadius: '10px',
                  border: '1px solid var(--card-border)',
                  background: 'rgba(255,255,255,0.05)',
                  color: 'var(--mist)',
                }}
              />
              <button type="submit" className="btn btn-primary">Send</button>
            </form>
          </>
        ) : (
          <div className="chat-locked">
            Only someone who has granted this wish can start a conversation here —
            {wish.isAnonymous ? ' the wisher' : ` ${wish.username}`} can reply once they do, but can't message first.
          </div>
        )}

        {wish.type === 'item' && wish.status === 'granted' && (
          <div className="card" style={{ marginTop: '1.8rem' }}>
            <div className="wish-name" style={{ fontSize: '1.05rem' }}>Proof of receipt</div>
            <p style={{ color: 'var(--mist-dim)', fontSize: '0.85rem', marginBottom: '1rem' }}>
              To keep Amaranth trustworthy, wishers confirm delivery with a photo once a
              material wish arrives. This is visible only to the grantor.
            </p>
            <span style={{ color: 'var(--gold)', fontSize: '0.85rem' }}>✦ Awaiting confirmation from wisher</span>
          </div>
        )}
      </div>
    </div>
  )
}
