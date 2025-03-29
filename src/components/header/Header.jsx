import React from "react"
import logo from "../../assets/images/logo.svg"
import "./header.css"
import { nav } from "../../assets/data/data"
import { Link } from "react-router-dom"
import { useAuth } from "../../services/authContext"

export const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();

  window.addEventListener("scroll", function () {
    const header = this.document.querySelector(".header")
    header.classList.toggle("active", this.window.scrollY > 100)
  })

  return (
    <>
      <header className='header'>
        <div className='scontainer flex'>
          <div className='logo'>
            <Link to="/">
              <img src={logo} alt='BlogSphere' width='100px' />
            </Link>
          </div>
          <nav>
            <ul>
              {nav.map((link) => {
                // Skip links that require auth if user is not authenticated
                if (link.requiresAuth && !isAuthenticated) {
                  return null;
                }
                
                // Skip links marked to show only for non-authenticated users if user is authenticated
                if (link.showIfNotAuth && isAuthenticated) {
                  return null;
                }
                
                return (
                  <li key={link.id}>
                    <Link to={link.url}>{link.text}</Link>
                  </li>
                );
              })}
              
              {/* Show username and logout when authenticated */}
              {isAuthenticated && (
                <>
                  <li className="user-info">
                    <span>Hello, {user?.name || 'User'}</span>
                  </li>
                  <li>
                    <button className="logout-btn" onClick={logout}>Logout</button>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  )
}
