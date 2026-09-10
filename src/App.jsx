import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import Browse from './pages/Browse.jsx'
import PostWish from './pages/PostWish.jsx'
import WishDetail from './pages/WishDetail.jsx'
import MyWishes from './pages/MyWishes.jsx'
import { ensureAnonymousAuth } from './firebase.js'

export default function App() {
  useEffect(() => {
    // Signs the visitor in anonymously on first load — no signup screen,
    // just a stable uid behind the scenes so "my wishes" can work.
    // Requires a real Firebase config in src/firebase.js to actually run.
    try {
      ensureAnonymousAuth(() => {})
    } catch (err) {
      console.warn('Firebase not configured yet — skipping anonymous auth.', err)
    }
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/browse" element={<Browse />} />
      <Route path="/post" element={<PostWish />} />
      <Route path="/wish/:id" element={<WishDetail />} />
      <Route path="/my-wishes" element={<MyWishes />} />
    </Routes>
  )
}
