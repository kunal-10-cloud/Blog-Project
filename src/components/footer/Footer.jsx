import React from "react"
import "./footer.css"

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <>
      <footer className='footer'>
        <div className='container'>
          <p className='footer-copyright'>
            © {currentYear} BlogSphere - Sharing ideas that matter
          </p>
        </div>
      </footer>
    </>
  )
}
