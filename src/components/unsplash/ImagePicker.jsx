import React, { useState, useEffect } from 'react'
import { AiOutlineClose, AiOutlineCheck, AiOutlineSearch } from 'react-icons/ai'
import { searchImages, getImagesByCategory } from '../../services/unsplashService'
import './imagePicker.css'

// List of popular categories with display names and search terms
const CATEGORIES = [
  { id: 'nature', label: 'Nature', term: 'nature landscape' },
  { id: 'technology', label: 'Technology', term: 'technology computer' },
  { id: 'business', label: 'Business', term: 'business office' },
  { id: 'travel', label: 'Travel', term: 'travel destination' },
  { id: 'food', label: 'Food', term: 'food dish' },
  { id: 'health', label: 'Health', term: 'health wellness' },
  { id: 'art', label: 'Art', term: 'art creative' },
  { id: 'pets', label: 'Pets', term: 'pets animals' }
]

const ImagePicker = ({ onSelectImage, onClose, initialCategory = 'blog' }) => {
  const [images, setImages] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState(initialCategory || 'blog')
  
  // Fetch images using the unsplashService
  const fetchImages = async (searchTerm) => {
    setLoading(true)
    setError(null)
    
    try {
      const data = await searchImages(searchTerm)
      setImages(data.results || [])
    } catch (err) {
      console.error('Error fetching images:', err)
      setError('Failed to load images. Please try again.')
      setImages([])
    } finally {
      setLoading(false)
    }
  }
  
  // Initial load
  useEffect(() => {
    // Find if initialCategory matches any of our predefined categories
    const category = CATEGORIES.find(cat => cat.id === initialCategory)
    if (category) {
      fetchImages(category.term)
    } else {
      fetchImages(initialCategory || 'blog')
    }
  }, [initialCategory])
  
  // Handle search
  const handleSearch = () => {
    const searchTerm = query.trim()
    if (searchTerm) {
      fetchImages(searchTerm)
      setActiveCategory('') // Clear active category when searching
    }
  }
  
  // Handle search on Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSearch()
    }
  }
  
  // Handle category selection
  const handleCategoryClick = (category) => {
    setQuery('') // Clear search query
    setActiveCategory(category.id)
    fetchImages(category.term) // Use the more detailed search term
  }
  
  // Handle image selection
  const handleImageSelect = (image) => {
    setSelectedImage(image)
  }
  
  // Confirm selection
  const handleConfirmSelection = () => {
    if (selectedImage) {
      onSelectImage(selectedImage)
      onClose()
    }
  }
  
  return (
    <div className="image-picker-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="image-picker-container">
        <div className="image-picker-header">
          <h3>Select an image from Unsplash</h3>
          <button className="close-button" onClick={onClose}>
            <AiOutlineClose />
          </button>
        </div>
        
        <div className="search-form">
          <div className="search-input-container">
            <AiOutlineSearch className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search for images..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          <button 
            type="button" 
            className="search-button" 
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        
        <div className="suggested-categories">
          <span>Sort by:</span>
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              type="button"
              className={`category-button ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category)}
            >
              {category.label}
            </button>
          ))}
        </div>
        
        {loading ? (
          <div className="loading">Loading images...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : images.length === 0 ? (
          <div className="no-results">No images found. Try a different search term.</div>
        ) : (
          <div className="images-grid">
            {images.map((image) => (
              <div
                key={image.id}
                className={`image-item ${selectedImage?.id === image.id ? 'selected' : ''}`}
                onClick={() => handleImageSelect(image)}
              >
                <img src={image.urls.small} alt={image.alt_description} />
                {selectedImage?.id === image.id && (
                  <div className="selected-overlay">
                    <AiOutlineCheck className="check-icon" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        <div className="image-picker-footer">
          <div className="attribution">
            Photos provided by <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer">Unsplash</a>
          </div>
          <button
            className="select-button"
            disabled={!selectedImage}
            onClick={handleConfirmSelection}
          >
            Select Image
          </button>
        </div>
      </div>
    </div>
  )
}

export { ImagePicker };
export default ImagePicker; 