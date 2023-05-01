import React from 'react';
import './InfoPage.css'

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {
  return (
    <div className="container">
      <br></br>
      <h3>The Problem:</h3>
      <p className='infocontainer'>Hardware deployed in the field breaks at individually random but statistically
        predictable intervals. Highly variable lead times complicate efforts to retain the correct amount of stock on hand.</p>
      <br />
      <p>What is a small business to do?</p>
      <img src='/media/todo.jpg' width="200px"></img>
      <br />
      <h2>Answer: Stock Pik'r</h2>
      <h2>Inventory Control Application</h2>



    </div>
  );
}

export default InfoPage;
