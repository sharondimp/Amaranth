import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="brand-mark">amaranth</NavLink>
      <div className="nav-links">
        <NavLink to="/browse" className={({ isActive }) => (isActive ? 'active' : '')}>
          browse
        </NavLink>
        <NavLink to="/post" className={({ isActive }) => (isActive ? 'active' : '')}>
          make a wish
        </NavLink>
        <NavLink to="/my-wishes" className={({ isActive }) => (isActive ? 'active' : '')}>
          my wishes
        </NavLink>
      </div>
    </nav>
  )
}
