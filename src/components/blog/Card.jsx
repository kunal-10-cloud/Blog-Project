import React, { useState, useEffect } from "react"
import "./blog.css"
import { blog } from "../../assets/data/data"
import { AiOutlineTags, AiOutlineClockCircle, AiOutlineHeart, AiFillHeart, AiOutlineSearch, AiOutlineUser, AiOutlineInfoCircle } from "react-icons/ai"
import { Link } from "react-router-dom"
import { useAuth } from "../../services/authContext"

export const Card = () => {
  const [likes, setLikes] = useState({})
  const [likedBlogs, setLikedBlogs] = useState([])
  const [allBlogs, setAllBlogs] = useState([...blog])
  const [filteredBlogs, setFilteredBlogs] = useState([])
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const { isAuthenticated } = useAuth()
  
  // Load user-created blogs and combine with existing blogs
  useEffect(() => {
    // Get deleted blog IDs from localStorage
    const deletedBlogIds = JSON.parse(localStorage.getItem('deletedBlogs') || '[]')
    
    // Filter out deleted blogs from original blog data
    const filteredDefaultBlogs = blog.filter(item => !deletedBlogIds.includes(item.id))
    
    // Get modified blog data (for cover images, etc.)
    const modifiedBlogs = JSON.parse(localStorage.getItem('modifiedBlogs') || '[]')
    
    // Create a map of blog IDs to their modified versions
    const modifiedBlogsMap = {}
    modifiedBlogs.forEach(modifiedBlog => {
      modifiedBlogsMap[modifiedBlog.id] = modifiedBlog
    })
    
    // Apply modifications to default blogs
    const updatedDefaultBlogs = filteredDefaultBlogs.map(defaultBlog => 
      modifiedBlogsMap[defaultBlog.id] ? modifiedBlogsMap[defaultBlog.id] : defaultBlog
    )
    
    // Get user-created blogs
    const storedBlogs = localStorage.getItem('userBlogs')
    let combinedBlogs = [...updatedDefaultBlogs]
    
    if (storedBlogs) {
      try {
        const userBlogs = JSON.parse(storedBlogs)
        combinedBlogs = [...updatedDefaultBlogs, ...userBlogs]
      } catch (error) {
        console.error("Error parsing stored blogs:", error)
      }
    }
    
    setAllBlogs(combinedBlogs)
    setFilteredBlogs(combinedBlogs)
  }, [])
  
  // Get unique categories from blog data
  const categories = ["All", ...new Set(allBlogs.map(item => item.category))]
  
  useEffect(() => {
    // Load likes from localStorage
    const storedLikes = localStorage.getItem('blogLikes')
    const storedLikedBlogs = localStorage.getItem('likedBlogs')
    
    if (storedLikes) {
      setLikes(JSON.parse(storedLikes))
    }
    
    if (storedLikedBlogs) {
      setLikedBlogs(JSON.parse(storedLikedBlogs))
    }
  }, [])
  
  useEffect(() => {
    // Filter blogs based on category and search query
    let filtered = [...allBlogs]
    
    // Filter by category
    if (activeCategory !== "All") {
      filtered = filtered.filter(item => item.category === activeCategory)
    }
    
    // Filter by search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase().trim()
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.category.toLowerCase().includes(query) || 
        item.desc.toLowerCase().includes(query)
      )
    }
    
    setFilteredBlogs(filtered)
  }, [activeCategory, searchQuery, allBlogs])
  
  const handleCategoryChange = (category) => {
    setActiveCategory(category)
  }
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }
  
  const handleLike = (blogId) => {
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
  
  // Function to get like count for a blog post
  const getLikeCount = (blogId) => {
    return likes[blogId] || 0
  }
  
  // Function to check if user has liked a blog
  const isLiked = (blogId) => {
    return likedBlogs.includes(blogId)
  }

  return (
    <>
      <section className='blog'>
        {/* User Guide */}
        <div className='user-guide'>
          <div>
            <AiOutlineInfoCircle className='info-icon' />
            <p>
              {isAuthenticated ? (
                <>
                  Click <Link to="/create">Create Blog</Link> to add new posts. You can only edit and delete posts you've created.
                  Your own posts are marked with <span className="user-badge-small"><AiOutlineUser /> Your Post</span> badge.
                </>
              ) : (
                <>
                  <Link to="/login">Log in</Link> or <Link to="/register">Register</Link> to create, edit, and delete blog posts!
                </>
              )}
            </p>
          </div>
        </div>

        {/* Filter Section */}
        <div className='filter-container'>
          <div className='search-box'>
            <AiOutlineSearch className='search-icon' />
            <input 
              type='text' 
              placeholder='Search blogs...'
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <div className='category-filter'>
            {categories.map((category, index) => (
              <button
                key={index}
                className={activeCategory === category ? 'active' : ''}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Create Blog Button - For authenticated users */}
        {isAuthenticated && (
          <div className='create-button-container'>
            <Link to='/create' className='create-button'>
              + Create New Blog
            </Link>
          </div>
        )}
        
        <div className='container grid3'>
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((item) => {
              // Check if this is a user-created blog
              const storedBlogs = localStorage.getItem('userBlogs')
              let isUserCreated = false
              
              if (storedBlogs) {
                try {
                  const userBlogs = JSON.parse(storedBlogs)
                  isUserCreated = userBlogs.some(blog => blog.id === item.id)
                } catch (error) {
                  console.error("Error parsing stored blogs:", error)
                }
              }
              
              return (
                <div className='box boxItems' key={item.id}>
                  <div className='img'>
                    <img src={item.cover} alt='' />
                  </div>
                  <div className='details'>
                    <div className='tag'>
                      <AiOutlineTags className='icon' />
                      <a href='/'>#{item.category}</a>
                      {isUserCreated && <span className="user-badge-small"><AiOutlineUser /></span>}
                    </div>
                    <Link to={`/details/${item.id}`} className='link'>
                      <h3>{item.title}</h3>
                    </Link>
                    <p>{item.desc.slice(0, 180)}...</p>
                    <div className='date'>
                      <AiOutlineClockCircle className='icon' /> <label htmlFor=''>{item.date}</label>
                      <span 
                        className='like-button'
                        onClick={(e) => {
                          e.preventDefault()
                          handleLike(item.id)
                        }}
                        style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}
                      >
                        {isLiked(item.id) ? 
                          <AiFillHeart className='icon' style={{ color: 'red' }} /> : 
                          <AiOutlineHeart className='icon' />} 
                        <label htmlFor=''>{getLikeCount(item.id)}</label>
                      </span>
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="no-results">
              <h3>No blogs found matching your search criteria</h3>
              <p>Try a different search term or category</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
