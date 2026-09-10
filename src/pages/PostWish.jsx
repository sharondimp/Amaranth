import { useState } from 'react'
import SparkleBackground from '../components/SparkleBackground.jsx'
import Navbar from '../components/Navbar.jsx'

export default function PostWish() {
  const [wishType, setWishType] = useState('cash')
  const [isAnonymous, setIsAnonymous] = useState(true)
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    // TODO: on submit —
    // 1. write the wish doc to Firestore, tied to the anonymous-auth uid
    // 2. send bank details to a Cloud Function that creates a Paystack
    //    Transfer Recipient and stores the returned recipient_code
    //    (never store the raw account number in Firestore)
    // 3. upload any photos to Firebase Storage, store their URLs
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="page">
        <SparkleBackground density="light" />
        <Navbar />
        <div className="container" style={{ textAlign: 'center', paddingTop: '4rem' }}>
          <div className="section-title">your wish is out</div>
          <p style={{ color: 'var(--mist-dim)', marginBottom: '2rem' }}>
            It's in the current now. You'll see here if someone grants it — check the
            "my wishes" tab any time.
          </p>
          <a href="/my-wishes" className="btn btn-primary">Go to my wishes</a>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <SparkleBackground density="light" />
      <Navbar />
      <div className="container">
        <div className="section-title">make a wish</div>
        <div className="section-sub">Say it plainly. Someone out there is listening.</div>

        <form onSubmit={handleSubmit}>

          <div className="field">
            <label>What kind of wish is this?</label>
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <button
                type="button"
                onClick={() => setWishType('cash')}
                className={wishType === 'cash' ? 'btn btn-primary' : 'btn btn-ghost'}
                style={{ flex: 1 }}
              >
                Cash
              </button>
              <button
                type="button"
                onClick={() => setWishType('item')}
                className={wishType === 'item' ? 'btn btn-primary' : 'btn btn-ghost'}
                style={{ flex: 1 }}
              >
                A specific item
              </button>
            </div>
          </div>

          <div className="field">
            <label>{wishType === 'cash' ? 'What is this for?' : 'What do you need?'}</label>
            <input
              type="text"
              placeholder={wishType === 'cash' ? 'e.g. one month\'s rent' : 'e.g. a sewing machine'}
              required
            />
          </div>

          <div className="field">
            <label>Tell your story (optional, but it helps)</label>
            <textarea placeholder="A few honest sentences about why this matters to you." />
          </div>

          <div className="field">
            <label>Amount needed (₦)</label>
            <input type="number" min="500" placeholder="0" required />
          </div>

          <div className="field">
            <label>Add photos (optional)</label>
            <input type="file" accept="image/*" multiple />
            <small>No profile pictures — this is just for the wish itself, if it helps tell the story.</small>
          </div>

          {wishType === 'item' && (
            <div className="field">
              <label>Delivery address</label>
              <textarea placeholder="Where should this be sent if granted?" required />
              <small>Only shared with the person who grants your wish, never shown publicly.</small>
            </div>
          )}

          <div className="field">
            <label>How do you want to appear?</label>
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <button
                type="button"
                onClick={() => setIsAnonymous(true)}
                className={isAnonymous ? 'btn btn-primary' : 'btn btn-ghost'}
                style={{ flex: 1 }}
              >
                Stay anonymous
              </button>
              <button
                type="button"
                onClick={() => setIsAnonymous(false)}
                className={!isAnonymous ? 'btn btn-primary' : 'btn btn-ghost'}
                style={{ flex: 1 }}
              >
                Be known
              </button>
            </div>
          </div>

          {isAnonymous ? (
            <div className="field">
              <label>Pick a username</label>
              <input type="text" placeholder="e.g. quietmorning" required />
              <small>No real name, no profile photo needed.</small>
            </div>
          ) : (
            <div className="field">
              <label>Your name</label>
              <input type="text" placeholder="e.g. Chiamaka U." required />
            </div>
          )}

          <div className="field">
            <label className="serif italic" style={{ fontSize: '1.1rem', color: '#FFF8EA' }}>
              Payout details
            </label>
            <small style={{ marginBottom: '0.8rem', display: 'block' }}>
              Only used if your wish is granted — sent securely to Paystack, never stored or shown publicly.
            </small>
            <div className="field-row">
              <div className="field">
                <label>Bank</label>
                <select required>
                  <option value="">Select bank</option>
                  <option>Access Bank</option>
                  <option>GTBank</option>
                  <option>Zenith Bank</option>
                  <option>UBA</option>
                  <option>First Bank</option>
                  <option>Opay</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="field">
                <label>Account number</label>
                <input type="text" inputMode="numeric" placeholder="0123456789" required />
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: '0.5rem' }}>
            Send my wish out
          </button>
        </form>
      </div>
    </div>
  )
}
