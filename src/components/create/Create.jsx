import React, { useState, useEffect } from "react"
import "./create.css"
import { useHistory } from "react-router-dom"
import { blog } from "../../assets/data/data"
import { ImagePicker } from "../unsplash/ImagePicker"
import { AiOutlinePicture } from "react-icons/ai"
import { useAuth } from "../../services/authContext"

export const Create = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [imagePreview, setImagePreview] = useState("https://images.pexels.com/photos/6424244/pexels-photo-6424244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")
  const [imagePath, setImagePath] = useState("../images/blogs/b1.jpg")
  const [showImagePicker, setShowImagePicker] = useState(false)
  const history = useHistory()
  const { isAuthenticated, user } = useAuth()
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      history.push('/login')
    }
  }, [isAuthenticated, history])
  
  // Get unique categories for dropdown
  const categories = [...new Set(blog.map(item => item.category))]
  
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
    
    if (!title.trim() || !content.trim() || !selectedCategory) {
      alert("Please fill in all fields")
      return
    }
    
    // Create a new blog post
    const newBlog = {
      id: blog.length + 1 + Math.floor(Math.random() * 1000), // Simple way to create unique ID
      title: title,
      desc: content,
      category: selectedCategory,
      cover: imagePath,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      author: user.name || 'Anonymous'
    }
    
    // Save to localStorage
    const storedBlogs = localStorage.getItem('userBlogs')
    let allBlogs = []
    
    if (storedBlogs) {
      allBlogs = JSON.parse(storedBlogs)
    }
    
    allBlogs.push(newBlog)
    localStorage.setItem('userBlogs', JSON.stringify(allBlogs))
    
    // Redirect to home page
    alert("Blog post created successfully!")
    history.push('/')
  }
  
  if (!isAuthenticated) {
    return null // Don't render anything if not authenticated (will redirect via useEffect)
  }
  
  return (
    <>
      <section className='newPost'>
        <div className='container boxItems'>
          <h1>Create a New Blog Post</h1>
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
                  id="file-upload"
                />
                <label htmlFor="file-upload">Upload From Device</label>
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

            <button type="submit" className='button'>Publish Post</button>
          </form>
          
          {/* Unsplash Image Picker Modal */}
          {showImagePicker && (
            <ImagePicker 
              initialCategory={selectedCategory ? selectedCategory.toLowerCase() : 'blog'}
              onSelectImage={handleUnsplashSelect}
              onClose={() => setShowImagePicker(false)}
            />
          )}
        </div>
      </section>
    </>
  )
}
