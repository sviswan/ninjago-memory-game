import '../styles/globals.css'
import Game from './components/game'
import React from 'react';
import { useState, useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const [highScore, setHighScore] = useState(0)
  useEffect(() => {
    const json = localStorage.getItem('memorygamehighscore')
    const savedScore = JSON.parse(json)
    if (savedScore) {
      setHighScore(savedScore)
    }
  }, [])
  return (
  <div>
  <Component {...pageProps} />
  <div className='title'><h2>Welcome to Ninjago Memory Game!!</h2></div>
  <h3>High Score: {highScore}</h3>
  <Game highScore={highScore} setHighScore={setHighScore}/>
  </div>
  );
}

export default MyApp
