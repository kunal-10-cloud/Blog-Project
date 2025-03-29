import React from "react"
import "./intro.css"

export const Intro = () => {
  return (
    <>
      <section className="intro">
        <div className="container">
          <div className="intro-content">
            <div className="intro-header">
              <h1>Welcome to BlogSphere</h1>
              <p className="tagline">Explore ideas, stories, and perspectives</p>
            </div>
            <div className="intro-divider"></div>
            <div className="intro-description">
              <p>
                BlogSphere is a platform dedicated to sharing thoughtful content on a variety of topics. 
                Our mission is to create a space where readers can discover insightful articles, 
                engaging stories, and diverse perspectives from writers around the world.
              </p>
              <p>
                Whether you're looking for inspiration, knowledge, or simply an enjoyable read, 
                you'll find content that resonates with you here at BlogSphere.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
} 