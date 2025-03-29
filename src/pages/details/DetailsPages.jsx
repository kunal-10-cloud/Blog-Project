import React, { useState } from "react"
import "./details.css"
import "../../components/header/header.css"
import { useParams, useHistory } from "react-router-dom"
import { useEffect } from "react"
import { blog } from "../../assets/data/data"
import { Comments } from "../../components/comments/Comments"
import { AiOutlineHeart, AiFillHeart, AiOutlineEdit, AiOutlineDelete, AiOutlinePicture, AiOutlineUser } from "react-icons/ai"
import { ImagePicker } from "../../components/unsplash/ImagePicker"
import { useAuth } from "../../services/authContext"

export const DetailsPages = () => {
  const { id } = useParams()
  const [blogs, setBlogs] = useState(null)
  const [likes, setLikes] = useState({})
  const [likedBlogs, setLikedBlogs] = useState([])
  const [showImagePicker, setShowImagePicker] = useState(false)
  const [isUserCreated, setIsUserCreated] = useState(false)
  const history = useHistory()
  const { isAuthenticated } = useAuth()
  
  const blogId = parseInt(id)

  useEffect(() => {
    // First check in the original blog data
    let foundBlog = blog.find((item) => item.id === blogId)
    let isUserBlog = false
    
    // If not found in original data, check in user-created blogs
    if (!foundBlog) {
      const storedBlogs = localStorage.getItem('userBlogs')
      if (storedBlogs) {
        try {
          const userBlogs = JSON.parse(storedBlogs)
          foundBlog = userBlogs.find((item) => item.id === blogId)
          if (foundBlog) {
            isUserBlog = true
          }
        } catch (error) {
          console.error("Error parsing stored blogs:", error)
        }
      }
    }
    
    if (foundBlog) {
      setBlogs(foundBlog)
      setIsUserCreated(isUserBlog)
    }
    
    // Load likes from localStorage
    const storedLikes = localStorage.getItem('blogLikes')
    const storedLikedBlogs = localStorage.getItem('likedBlogs')
    
    if (storedLikes) {
      setLikes(JSON.parse(storedLikes))
    }
    
    if (storedLikedBlogs) {
      setLikedBlogs(JSON.parse(storedLikedBlogs))
    }
  }, [blogId])
  
  const handleLike = () => {
    if (!blogs) return
    
    // Update likes count
    const newLikes = { ...likes }
    const isLiked = likedBlogs.includes(blogId)
    
    if (isLiked) {
      // Unlike the blog
      newLikes[blogId] = (newLikes[blogId] || 1) - 1
      // If likes go below 0, set to 0
      if (newLikes[blogId] < 0) newLikes[blogId] = 0
      
      // Remove blog from liked list
      const updatedLikedBlogs = likedBlogs.filter(id => id !== blogId)
      setLikedBlogs(updatedLikedBlogs)
      localStorage.setItem('likedBlogs', JSON.stringify(updatedLikedBlogs))
    } else {
      // Like the blog
      newLikes[blogId] = (newLikes[blogId] || 0) + 1
      
      // Add blog to liked list
      const updatedLikedBlogs = [...likedBlogs, blogId]
      setLikedBlogs(updatedLikedBlogs)
      localStorage.setItem('likedBlogs', JSON.stringify(updatedLikedBlogs))
    }
    
    setLikes(newLikes)
    localStorage.setItem('blogLikes', JSON.stringify(newLikes))
  }
  
  // Function to handle editing a blog post
  const handleEdit = () => {
    if (!isAuthenticated) {
      alert("You must be logged in to edit blog posts.")
      history.push('/login')
      return
    }
    
    history.push(`/edit/${blogId}`)
  }
  
  // Function to handle selecting a new cover image
  const handleSelectImage = (image) => {
    if (!blogs || !isAuthenticated) return
    
    const updatedBlog = { ...blogs, cover: image.urls.regular }
    
    // Update the blog in the appropriate storage
    const originalBlog = blog.find(item => item.id === blogId)
    
    if (originalBlog) {
      // This is a default blog - we need to track our modifications
      const modifiedBlogs = JSON.parse(localStorage.getItem('modifiedBlogs') || '[]')
      const existingIndex = modifiedBlogs.findIndex(b => b.id === blogId)
      
      if (existingIndex >= 0) {
        modifiedBlogs[existingIndex] = updatedBlog
      } else {
        modifiedBlogs.push(updatedBlog)
      }
      
      localStorage.setItem('modifiedBlogs', JSON.stringify(modifiedBlogs))
    } else {
      // This is a user-created blog
      const storedBlogs = localStorage.getItem('userBlogs')
      if (storedBlogs) {
        try {
          let userBlogs = JSON.parse(storedBlogs)
          const blogIndex = userBlogs.findIndex(item => item.id === blogId)
          
          if (blogIndex >= 0) {
            userBlogs[blogIndex] = updatedBlog
            localStorage.setItem('userBlogs', JSON.stringify(userBlogs))
          }
        } catch (error) {
          console.error("Error updating blog image:", error)
        }
      }
    }
    
    // Update the current view
    setBlogs(updatedBlog)
    
    // Close the image picker
    setShowImagePicker(false)
    
    // Show success message
    alert("Cover image updated successfully!")
  }
  
  // Function to handle deleting a blog post
  const handleDelete = () => {
    if (!isAuthenticated) {
      alert("You must be logged in to delete blog posts.")
      history.push('/login')
      return
    }
    
    if (window.confirm("Are you sure you want to delete this blog post? This action cannot be undone.")) {
      // For default blogs from data.js, we'll update the allBlogs in localStorage to track deleted blogs
      const originalBlog = blog.find(item => item.id === blogId)
      
      if (originalBlog) {
        // This is a default blog, mark it as deleted in localStorage
        const deletedBlogs = JSON.parse(localStorage.getItem('deletedBlogs') || '[]')
        deletedBlogs.push(blogId)
        localStorage.setItem('deletedBlogs', JSON.stringify(deletedBlogs))
      } else {
        // This is a user-created blog, remove it from userBlogs
        const storedBlogs = localStorage.getItem('userBlogs')
        if (storedBlogs) {
          try {
            let userBlogs = JSON.parse(storedBlogs)
            userBlogs = userBlogs.filter(item => item.id !== blogId)
            localStorage.setItem('userBlogs', JSON.stringify(userBlogs))
          } catch (error) {
            console.error("Error deleting blog post:", error)
          }
        }
      }
      
      // Redirect to the home page
      alert("Blog post deleted successfully")
      history.push('/')
    }
  }
  
  // Function to get like count for this blog post
  const getLikeCount = () => {
    return likes[blogId] || 0
  }
  
  // Function to check if user has liked this blog
  const isLiked = () => {
    return likedBlogs.includes(blogId)
  }

  return (
    <>
      {blogs ? (
        <section className='singlePage'>
          {/* Image Header */}
          <div className='image-header'>
            <img src={blogs.cover} alt={blogs.title} />
            <div className='overlay'></div>
            {isAuthenticated && isUserCreated && (
              <button 
                className='change-image-button'
                onClick={() => setShowImagePicker(true)}
                title="Change cover image"
              >
                <AiOutlinePicture /> Change Image
              </button>
            )}
          </div>
          
          <div className='container'>
            <div className='content'>
              <h1>{blogs.title}</h1>
              <div className='category'>
                <span>#{blogs.category}</span>
                <span className='date'>{blogs.date}</span>
                <span 
                  className='like-button'
                  onClick={handleLike}
                >
                  {isLiked() ? 
                    <AiFillHeart className='icon' style={{ color: 'red' }} /> : 
                    <AiOutlineHeart className='icon' />} 
                  <span>{getLikeCount()}</span>
                </span>
                {isUserCreated && <span className="user-badge"><AiOutlineUser /> Your Post</span>}
              </div>
              
              {/* Edit and Delete buttons - only for authenticated users AND posts they created */}
              {isAuthenticated && isUserCreated && (
                <div className='edit-controls'>
                  <button 
                    className="edit-button"
                    onClick={handleEdit}
                    title="Edit this blog post"
                    aria-label="Edit blog post"
                  >
                    <AiOutlineEdit className='icon' /> Edit
                  </button>
                  <button 
                    className="delete-button"
                    onClick={handleDelete}
                    title="Delete this blog post"
                    aria-label="Delete blog post"
                  >
                    <AiOutlineDelete className='icon' /> Delete
                  </button>
                </div>
              )}
              
              <div className='blog-content'>
                <p>{blogs.desc}</p>
              </div>
              
              {/* Comments Section */}
              <Comments blogId={blogId} />
            </div>
          </div>
          
          {/* Image Picker Modal */}
          {showImagePicker && (
            <ImagePicker 
              initialCategory={blogs.category}
              onSelectImage={handleSelectImage}
              onClose={() => setShowImagePicker(false)}
            />
          )}
        </section>
      ) : (
        <section className='singlePage'>
          <div className='container'>
            <h1>Blog post not found</h1>
            <p>The blog post you're looking for doesn't exist or has been deleted.</p>
          </div>
        </section>
      )}
    </>
  )
}
