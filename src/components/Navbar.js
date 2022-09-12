import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar">
            <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>Home</NavLink>
            <NavLink to="/blog" className={({ isActive }) => (isActive ? "active" : "")}>Blog</NavLink>
    </div>
  )
}