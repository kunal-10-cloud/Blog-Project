import React, { useState, useEffect } from "react"
import "../create/create.css"
import { useHistory, useParams } from "react-router-dom"
import { blog } from "../../assets/data/data"
import { ImagePicker } from "../unsplash/ImagePicker"
import { AiOutlinePicture } from "react-icons/ai"
import { useAuth } from "../../services/authContext"

export const EditBlog = () => {
  const { id } = useParams()
  const blogId = parseInt(id)
  const history = useHistory()
  const { isAuthenticated } = useAuth()
  
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [imagePreview, setImagePreview] = useState("")
  const [imagePath, setImagePath] = useState("")
  const [originalBlog, setOriginalBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isDefaultBlog, setIsDefaultBlog] = useState(false)
  const [showImagePicker, setShowImagePicker] = useState(false)
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      history.push('/login')
    }
  }, [isAuthenticated, history])
  
  // Get unique categories for dropdown
  const categories = [...new Set(blog.map(item => item.category))]
  
  // Load the blog data on component mount
  useEffect(() => {
    if (!isAuthenticated) return; // Don't load data if not authenticated
    
    let foundBlog = null;
    
    // First check if this is a default blog
    const defaultBlog = blog.find(item => item.id === blogId);
    
    if (defaultBlog) {
      // Check if this blog has been modified
      const modifiedBlogs = JSON.parse(localStorage.getItem('modifiedBlogs') || '[]');
      const modifiedBlog = modifiedBlogs.find(item => item.id === blogId);
      
      // Use the modified version if it exists, otherwise use the default
      foundBlog = modifiedBlog || defaultBlog;
      setIsDefaultBlog(true);
    } else {
      // Look for the blog in user-created blogs
      const storedBlogs = localStorage.getItem('userBlogs');
      
      if (storedBlogs) {
        try {
          const userBlogs = JSON.parse(storedBlogs);
          foundBlog = userBlogs.find(item => item.id === blogId);
        } catch (error) {
          console.error("Error parsing stored blogs:", error);
        }
      }
    }
    
    if (foundBlog) {
      // Populate the form with the blog data
      setTitle(foundBlog.title);
      setContent(foundBlog.desc);
      setSelectedCategory(foundBlog.category);
      setImagePreview(foundBlog.cover);
      setImagePath(foundBlog.cover);
      setOriginalBlog(foundBlog);
      setLoading(false);
    } else {
      // Blog not found, redirect to home
      alert("Blog post not found");
      history.push('/');
    }
  }, [blogId, history, isAuthenticated]);
  
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Create a preview in the UI
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
      
      // In a real app, we would upload the image to a server
      // For this demo, we'll just use a default path since we can't actually upload
      setImagePath(`../images/blogs/b${Math.floor(Math.random() * 8) + 1}.jpg`)
    }
  }
  
  const handleUnsplashSelect = (image) => {
    // Set the image from Unsplash
    setImagePreview(image.urls.regular)
    setImagePath(image.urls.regular) // Using direct URL for Unsplash images
    setShowImagePicker(false)
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!isAuthenticated) {
      alert("You must be logged in to edit blog posts")
      history.push('/login')
      return
    }
    
    if (!title.trim() || !content.trim() || !selectedCategory) {
      alert("Please fill in all fields")
      return
    }
    
    // Update the blog post
    const updatedBlog = {
      ...originalBlog,
      title: title,
      desc: content,
      category: selectedCategory,
      cover: imagePath,
    }
    
    if (isDefaultBlog) {
      // This is a default blog, store the modified version
      const modifiedBlogs = JSON.parse(localStorage.getItem('modifiedBlogs') || '[]')
      
      // Check if this blog has already been modified
      const existingIndex = modifiedBlogs.findIndex(b => b.id === blogId)
      
      if (existingIndex >= 0) {
        // Update the existing modified blog
        modifiedBlogs[existingIndex] = updatedBlog
      } else {
        // Add this blog to the modified blogs
        modifiedBlogs.push(updatedBlog)
      }
      
      // Save back to localStorage
      localStorage.setItem('modifiedBlogs', JSON.stringify(modifiedBlogs))
    } else {
      // This is a user-created blog, update it in userBlogs
      const storedBlogs = localStorage.getItem('userBlogs')
      
      if (storedBlogs) {
        try {
          let userBlogs = JSON.parse(storedBlogs)
          
          // Replace the old blog with the updated one
          userBlogs = userBlogs.map(item => 
            item.id === blogId ? updatedBlog : item
          )
          
          // Save back to localStorage
          localStorage.setItem('userBlogs', JSON.stringify(userBlogs))
        } catch (error) {
          console.error("Error updating blog post:", error)
          alert("Error updating blog post. Please try again.")
          return;
        }
      }
    }
    
    // Redirect to the blog details page
    alert("Blog post updated successfully!")
    history.push(`/details/${blogId}`)
  }
  
  if (!isAuthenticated) {
    return null // Don't render anything if not authenticated (will redirect via useEffect)
  }
  
  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading blog post...</p>
      </div>
    )
  }
  
  return (
    <>
      <section className='newPost'>
        <div className='container boxItems'>
          <h1>Edit Blog Post</h1>
          <div className='img'>
            <img src={imagePreview} alt='preview' className='image-preview' />
          </div>
          <form onSubmit={handleSubmit}>
            <div className='image-upload-options'>
              <div className='inputfile flexCenter'>
                <input 
                  type='file' 
                  accept='image/*' 
                  onChange={handleImageChange}
                  id="file-upload-edit"
                />
                <label htmlFor="file-upload-edit">Upload From Device</label>
              </div>
              
              <div className='unsplash-button'>
                <button 
                  type="button"
                  onClick={() => setShowImagePicker(true)}
                  className="unsplash-select-btn"
                >
                  <AiOutlinePicture /> Select From Unsplash
                </button>
              </div>
            </div>
            
            <div className='inputGroup'>
              <label>Title</label>
              <input 
                type='text' 
                placeholder='Enter blog title...' 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            
            <div className='inputGroup'>
              <label>Category</label>
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            
            <div className='inputGroup'>
              <label>Content</label>
              <textarea 
                placeholder='Write your blog content here...'
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows='10'
                required
              ></textarea>
            </div>

            <div className="button-group">
              <button type="submit" className='button'>Update Post</button>
              <button 
                type="button" 
                className='button cancel-button'
                onClick={() => history.push(`/details/${blogId}`)}
              >
                Cancel
              </button>
            </div>
          </form>
          
          {/* Unsplash Image Picker Modal */}
          {showImagePicker && (
            <ImagePicker 
              initialCategory={selectedCategory.toLowerCase()}
              onSelectImage={handleUnsplashSelect}
              onClose={() => setShowImagePicker(false)}
            />
          )}
        </div>
      </section>
    </>
  )
} 