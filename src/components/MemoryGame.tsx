import { useState } from 'react';
import './MemoryGame.css'

type MemoryGameProps = {
  images: string[];
}
type Card = {
  id: number;
  imageUrl: string;
  isFlipped: boolean;
  isMatched: boolean
}

function MemoryGame({ images }: MemoryGameProps) {
  const [cards, setCards] = useState<Card[]>(() => {
    const gameImages = [...images, ...images];
    return gameImages.map((image, index) => ({
      id: index,
      imageUrl: image,
      isFlipped: false,
      isMatched: false,
    }))
  })

  function handleCardClick(card: Card) {
    if (card.isFlipped || card.isMatched) {
      return;
    }
    setCards((previousCards) => {
      const newCards = [...previousCards];
      newCards[card.id].isFlipped = true;
      return newCards;
    })
  }
  

  return (
    <div className="memory-game">
      {cards.map((card) => (
        <div key={card.id} className="card" onClick={() => handleCardClick(card)}>
          {(card.isFlipped || card.isMatched) && (
            <img src={card.imageUrl} />
          )}
        </div>
      ))}
    </div>
  )
}

export default MemoryGame
