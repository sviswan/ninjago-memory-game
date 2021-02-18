import React from 'react';
import Card from './card'
import { useState, useEffect } from "react";
import 'reactjs-popup/dist/index.css';

export default function Game({highScore, setHighScore}) {
    const [game, setGame] = useState([]);
    const [flippedCount, setFlippedCount] = useState(0)
    const [flippedIndexes, setFlippedIndexes] = useState([])
    const numberOfTilesGame = 16;
    const cardimage = [
          "images/jay.jpg",
          "images/kai.jpg",
          "images/cole.jpg",
          "images/zane.jpg",
          "images/llyod.jpg",
          "images/senseiwu.jpg",
          "images/nya.jpg",
          "images/garmedon.jpg"
        ]
        useEffect(() => {
            const newGame = []
            for (let i = 0; i < numberOfTilesGame/2; i++) {
              const firstOption = {
                id: 2 * i,
                cardId: i,
                cardimage: cardimage[i],
                flipped: false,
              }
              const secondOption = {
                id: 2 * i + 1,
                cardId: i,
                cardimage: cardimage[i],
                flipped: false,
              }
        
              newGame.push(firstOption)
              newGame.push(secondOption)
            }
            const shuffledGame = newGame.sort(() => Math.random() - 0.5)
            setGame(shuffledGame)
          }, [])
        
          useEffect(() => {
            const finished = !game.some(card => !card.flipped)
            if (finished && game.length > 0) {
              setTimeout(() => {
                const bestPossible = game.length
          
                const pointsLost = 0.66 * flippedCount - bestPossible
          
                let score
                if (pointsLost < 100) {
                  score = 100 - pointsLost
                } else {
                  score = 0
                }
          
                if (score > highScore) {
                  setHighScore(score)
                  const json = JSON.stringify(score)
                  localStorage.setItem('memorygamehighscore', json)
                }
          
                const newGame = confirm('You Win!, SCORE: ' + score + ' New Game?')
                if (newGame) {
                  setTimeout(() => {}, 5)
                } else { }
                }, 500)
                }
                }, [game]
                
                )

          if (flippedIndexes.length === 2) {
            const match = game[flippedIndexes[0]].cardId === game[flippedIndexes[1]].cardId
          
            if (match) {
              const newGame = [...game]
              newGame[flippedIndexes[0]].flipped = true
              newGame[flippedIndexes[1]].flipped = true
              setGame(newGame)
          
              const newIndexes = [...flippedIndexes]
              newIndexes.push(false)
              setFlippedIndexes(newIndexes)
            } else {
              const newIndexes = [...flippedIndexes]
              newIndexes.push(true)
              setFlippedIndexes(newIndexes)
            }
          }
 if (game.length === 0) return <div>loading...</div>
  else {
    return (
    <React.Fragment>
      <div id="cards">
        {game.map((card, index) => (
          <div className="card" key={index}>
            <Card
              id={index}
              cardimage={card.cardimage}
              game={game}
              flippedCount={flippedCount}
              setFlippedCount={setFlippedCount}
              flippedIndexes={flippedIndexes}
              setFlippedIndexes={setFlippedIndexes}
            />
          </div>
        ))}
      </div>
      </React.Fragment>
    )
  }
}
        
