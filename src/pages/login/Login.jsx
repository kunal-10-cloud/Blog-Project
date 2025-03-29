import React, { useState } from "react"
import "./login.css"
import { Link, useHistory, useLocation } from "react-router-dom"
import { useAuth } from "../../services/authContext"
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai"

export const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login } = useAuth()
  const history = useHistory()
  const location = useLocation()

  // Get the page user was trying to access before being redirected to login
  const { from } = location.state || { from: { pathname: "/" } }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("All fields are required")
      return
    }

    // In a real app, you would validate credentials against a backend
    // For this demo, we'll check localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const user = users.find(
      (u) => u.email === email && u.password === password
    )

    if (!user) {
      setError("Invalid email or password")
      return
    }

    // Login successful
    login(user)
    
    // Redirect to the page they were trying to access, or home
    history.replace(from)
  }

  return (
    <>
      <section className="login">
        <div className="container">
          <div className="sign-box">
            <h1>Welcome Back</h1>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="email">Email Address</label>
                <AiOutlineUser className="input-icon" />
                <input
                  type="email"
                  id="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <AiOutlineLock className="input-icon" />
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>
              <button type="submit" className="button">
                Log In
              </button>
            </form>
            <div className="register-link">
              <p>
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
