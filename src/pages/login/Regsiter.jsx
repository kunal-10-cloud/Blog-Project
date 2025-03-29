import React, { useState } from "react"
import "./login.css"
import { Link, useHistory } from "react-router-dom"
import { useAuth } from "../../services/authContext"
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from "react-icons/ai"

export const Regsiter = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const { register } = useAuth()
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")

    // Simple validation
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    // Register user
    const userData = {
      name,
      email,
      password,
    }

    const result = register(userData)

    if (result.success) {
      // Registration successful, redirect to home
      history.push("/")
    } else {
      // Registration failed
      setError(result.message)
    }
  }

  return (
    <>
      <section className="login">
        <div className="container">
          <div className="sign-box">
            <h1>Create Account</h1>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="name">Full Name</label>
                <AiOutlineUser className="input-icon" />
                <input
                  type="text"
                  id="name"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
              </div>
              <div className="input-group">
                <label htmlFor="email">Email Address</label>
                <AiOutlineMail className="input-icon" />
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
                  autoComplete="new-password"
                />
              </div>
              <div className="input-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <AiOutlineLock className="input-icon" />
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </div>
              <button type="submit" className="button">
                Register
              </button>
            </form>
            <div className="register-link">
              <p>
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
