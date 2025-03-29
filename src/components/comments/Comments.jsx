import React, { useState, useEffect } from "react"
import "./comments.css"
import { comments as commentsData } from "../../assets/data/data"
import { useAuth } from "../../services/authContext"
import { Link } from "react-router-dom"

export const Comments = ({ blogId }) => {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState({ text: "" })
  const [editingComment, setEditingComment] = useState(null)
  const [editText, setEditText] = useState("")
  const { isAuthenticated, user } = useAuth()
  
  // Load comments from data source and local storage
  useEffect(() => {
    // Get initial comments from data file
    const initialComments = commentsData.filter(comment => comment.blogId === blogId)
    
    // Try to get stored comments from localStorage
    const storedComments = localStorage.getItem('blogComments')
    let combinedComments = [...initialComments]
    
    if (storedComments) {
      const parsedStoredComments = JSON.parse(storedComments)
      const blogStoredComments = parsedStoredComments.filter(comment => comment.blogId === blogId)
      
      // Create a set of existing IDs to avoid duplicates
      const existingIds = new Set(initialComments.map(comment => comment.id))
      
      // Add stored comments that don't exist in initial data
      blogStoredComments.forEach(comment => {
        if (!existingIds.has(comment.id)) {
          combinedComments.push(comment)
        }
      })
    }
    
    setComments(combinedComments)
  }, [blogId])
  
  // Save comments to local storage whenever they change
  const saveCommentsToStorage = (updatedComments) => {
    const storedComments = localStorage.getItem('blogComments')
    let allComments = []
    
    if (storedComments) {
      // Get all comments for other blog posts
      const parsedStoredComments = JSON.parse(storedComments)
      allComments = parsedStoredComments.filter(comment => comment.blogId !== blogId)
    }
    
    // Add the updated comments for this blog post
    allComments = [...allComments, ...updatedComments]
    
    // Save back to local storage
    localStorage.setItem('blogComments', JSON.stringify(allComments))
  }
  
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewComment(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!isAuthenticated) {
      alert("You must be logged in to post a comment.")
      return
    }
    
    if (!newComment.text.trim()) {
      alert("Please enter a comment")
      return
    }
    
    // Find the highest ID across all comments to ensure uniqueness
    const maxId = comments.length > 0 
      ? Math.max(...comments.map(c => c.id)) 
      : 0;
    
    // Create a new comment object with the current user's information
    const comment = {
      id: maxId + 1,
      blogId,
      username: user.name,
      userId: user.email, // Store the user's email as identifier
      text: newComment.text,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    }
    
    // Add the comment to the state
    const updatedComments = [...comments, comment]
    setComments(updatedComments)
    
    // Persist to localStorage
    saveCommentsToStorage(updatedComments)
    
    // Reset the form
    setNewComment({ text: "" })
  }
  
  // Check if the current user is the author of a comment
  const isCommentAuthor = (comment) => {
    return isAuthenticated && user.email === comment.userId
  }
  
  // Start editing a comment
  const handleEdit = (comment) => {
    if (!isCommentAuthor(comment)) {
      alert("You can only edit your own comments.")
      return
    }
    
    setEditingComment(comment.id)
    setEditText(comment.text)
  }
  
  // Save edited comment
  const handleSaveEdit = () => {
    if (!editText.trim()) {
      alert("Comment cannot be empty")
      return
    }
    
    const updatedComments = comments.map(comment => 
      comment.id === editingComment 
        ? { ...comment, text: editText } 
        : comment
    )
    
    // Update state
    setComments(updatedComments)
    
    // Persist to localStorage
    saveCommentsToStorage(updatedComments)
    
    // Exit edit mode
    setEditingComment(null)
    setEditText("")
  }
  
  // Cancel editing
  const handleCancelEdit = () => {
    setEditingComment(null)
    setEditText("")
  }
  
  // Delete a comment
  const handleDelete = (comment) => {
    if (!isCommentAuthor(comment)) {
      alert("You can only delete your own comments.")
      return
    }
    
    if (window.confirm("Are you sure you want to delete this comment?")) {
      const updatedComments = comments.filter(c => c.id !== comment.id)
      
      // Update state
      setComments(updatedComments)
      
      // Persist to localStorage
      saveCommentsToStorage(updatedComments)
    }
  }
  
  return (
    <div className="comments-section">
      <h2>Comments ({comments.length})</h2>
      
      {/* Comment form - only shown to authenticated users */}
      {isAuthenticated ? (
        <div className="comment-form-container">
          <h3>Leave a Comment</h3>
          <form onSubmit={handleSubmit} className="comment-form">
            <div className="form-group">
              <textarea 
                name="text" 
                placeholder="Your Comment" 
                value={newComment.text}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-btn">Submit</button>
          </form>
        </div>
      ) : (
        <div className="login-to-comment">
          <p>Please <Link to="/login">log in</Link> to post a comment.</p>
        </div>
      )}
      
      {/* Comments list */}
      <div className="comments-list">
        {comments.length === 0 ? (
          <p className="no-comments">No comments yet. {isAuthenticated ? 'Be the first to comment!' : 'Log in to be the first to comment!'}</p>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="comment">
              <div className="comment-header">
                <h4 className="username">{comment.username}</h4>
                <div className="comment-actions">
                  <span className="date">{comment.date}</span>
                  {isCommentAuthor(comment) && (
                    <div className="action-buttons">
                      <button 
                        className="edit-btn" 
                        onClick={() => handleEdit(comment)}
                        aria-label="Edit comment"
                      >
                        Edit
                      </button>
                      <button 
                        className="delete-btn" 
                        onClick={() => handleDelete(comment)}
                        aria-label="Delete comment"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              {editingComment === comment.id ? (
                <div className="edit-comment-form">
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    placeholder="Edit your comment..."
                  ></textarea>
                  <div className="edit-actions">
                    <button className="save-btn" onClick={handleSaveEdit}>Save</button>
                    <button className="cancel-btn" onClick={handleCancelEdit}>Cancel</button>
                  </div>
                </div>
              ) : (
                <p className="comment-text">{comment.text}</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
} 