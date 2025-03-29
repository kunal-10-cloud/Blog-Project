import React, { useState, useEffect } from "react"
import image from "../../assets/images/input.png"
import "./account.css"
import { useAuth } from "../../services/authContext"
import { useHistory } from "react-router-dom"

export const Account = () => {
  const { isAuthenticated, user, logout } = useAuth()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [profileImage, setProfileImage] = useState(image)
  const [message, setMessage] = useState("")
  const history = useHistory()

  useEffect(() => {
    if (!isAuthenticated) {
      history.push('/login')
      return
    }

    // Load user data
    if (user) {
      setName(user.name || "")
      setEmail(user.email || "")
      setPassword("")
    }
  }, [isAuthenticated, user, history])

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUpdate = () => {
    if (!name.trim() || !email.trim()) {
      setMessage("Name and email are required")
      return
    }

    // In a real app, we would send this to a server
    // For this demo, just update the user in localStorage
    const userData = {
      ...user,
      name,
      email,
      profileImage
    }

    // If password is provided, update it
    if (password.trim()) {
      userData.password = password
    }

    // Update users in localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const updatedUsers = users.map(u => 
      u.email === user.email ? userData : u
    )
    localStorage.setItem("users", JSON.stringify(updatedUsers))

    // Update current user
    localStorage.setItem("currentUser", JSON.stringify(userData))

    setMessage("Profile updated successfully!")
    setPassword("") // Clear password field

    // Reload the page to refresh auth context
    window.location.reload()
  }

  const handleLogout = () => {
    logout()
    history.push('/')
  }

  if (!isAuthenticated) {
    return null // Don't render anything if not authenticated (will redirect via useEffect)
  }

  return (
    <>
      <section className='accountInfo'>
        <div className='container boxItems'>
          <h1>Account Information</h1>
          {message && <div className={message.includes("successfully") ? "success-message" : "error-message"}>{message}</div>}
          <div className='content'>
            <div className='left'>
              <div className='img flexCenter'>
                <input 
                  type='file' 
                  accept='image/*' 
                  onChange={handleImageChange} 
                  id="profile-image-upload"
                />
                <label htmlFor="profile-image-upload">
                  <img src={profileImage} alt='Profile' className='image-preview' />
                  <div className="overlay-text">Change Photo</div>
                </label>
              </div>
            </div>
            <div className='right'>
              <label htmlFor='name'>Name</label>
              <input 
                type='text' 
                id='name' 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
              />
              
              <label htmlFor='email'>Email</label>
              <input 
                type='email' 
                id='email' 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
              
              <label htmlFor='password'>New Password (leave blank to keep current)</label>
              <input 
                type='password' 
                id='password' 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Enter new password" 
              />
              
              <div className="button-group">
                <button className='button' onClick={handleUpdate}>Update Profile</button>
                <button className='button logout-button' onClick={handleLogout}>Logout</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
