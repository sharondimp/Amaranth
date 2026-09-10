import SparkleBackground from '../components/SparkleBackground.jsx'
import Navbar from '../components/Navbar.jsx'
import WishCard from '../components/WishCard.jsx'
import { mockWishes } from '../data/mockWishes.js'

export default function MyWishes() {
  // TODO: replace with a Firestore query filtered by the signed-in
  // anonymous uid, e.g. where('ownerUid', '==', auth.currentUser.uid)
  const myWishes = mockWishes.slice(0, 2)

  return (
    <div className="page">
      <SparkleBackground density="light" />
      <Navbar />
      <div className="container">
        <div className="section-title">my wishes</div>
        <div className="section-sub">Only visible to you — tied to this device, not a public account.</div>

        {myWishes.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', color: 'var(--mist-dim)' }}>
            You haven't made a wish yet.
          </div>
        ) : (
          <div className="grid-2">
            {myWishes.map((wish) => (
              <WishCard key={wish.id} wish={wish} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
