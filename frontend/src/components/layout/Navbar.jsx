import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
    const [ menuOpen, setMenuOpen ] = useState(false);
    return (
        <nav className="navbar">
            <link to="/" className="navbar-logo">
                <span>SkillPath <span className="gradient-text">AI</span></span>
            </link>
            <div className={`navbar-link $(menuOpen ? 'active': '')`}>
                <NavLink to= "/" className={({isActive}) => isActive ? 'navbar-link active' : 'nav-link'}>Home</NavLink>
                <NavLink to="/about" className={({isActive}) => isActive ? 'navbar-link active' : 'nav-link'}>About</NavLink>
                <Link to="/login" className="nav-btn-login">Login</Link>
                <Link to="/register" className="nav-btn-register">Register</Link>

            </div>
            <button className="navbar-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? 'X' : 'E'}
            </button>
        </nav>
    )
}

export default Navbar;