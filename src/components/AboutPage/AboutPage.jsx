import React from 'react';
import './AboutPage.css'
// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <>
      <div className="container">
        <div>
          <h1>Stock Pik'r Created with:</h1>
          <br />
          <ul className='aboutPage'>
            <li>React</li>
            <li>React Pro Sidebar</li>
            <li>Material UI</li>
            <li>Node.js</li>
            <li>Javascript</li>
            <li>Passport</li>
            <li>PostgreSQL</li>
            <li>Axios</li>
          </ul>
          <br></br>
          <br></br>
          <div className='about-container'>
            <h4>https://www.linkedin.com/in/schilmoeller/</h4>
            <br />
            <h3>dave.schilmoeller@gmail.com</h3>
          </div>
          <br />
          <br />
          <div className='about-container'>
            <p>Special Thanks To:</p>
            <p>Prime Instructors</p>
            <p>Aquamarine Cohort</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutPage;
