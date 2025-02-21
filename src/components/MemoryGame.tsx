import { useState } from 'react';
import './MemoryGame.css'
import { shuffle } from '../utils/shuffle';

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
    const gameImages = shuffle<string>([...images, ...images]);
    return gameImages.map((image, index) => ({
      id: index,
      imageUrl: image,
      isFlipped: false,
      isMatched: false,
    }))
  })


  function handleFlippedCards(firstCard: Card, secondCard: Card) {
    if (firstCard.imageUrl == secondCard.imageUrl) {
      setCards((previousCards) => {
        const newCards = [...previousCards];
        newCards[firstCard.id].isMatched = true;
        newCards[secondCard.id].isMatched = true;
        return newCards;
      });
    }
    else {
      setTimeout(() => {
        setCards((previousCards) => {
          const newCards = [...previousCards];
          newCards[firstCard.id].isFlipped = false;
          newCards[secondCard.id].isFlipped = false;
          return newCards;
        })
      }, 800)
    }
  }

  function handleCardClick(card: Card) {
    if (card.isMatched) {
      return;
    }
    if (card.isFlipped) {
      setCards((previousCards) => {
        const newCards = [...previousCards];
        newCards[card.id].isFlipped = false;
        return newCards;
      });
      return;
    }
    setCards((previousCards) => {
      const newCards = [...previousCards];
      newCards[card.id].isFlipped = true;

      const flippedCards = newCards.filter(({ isFlipped, isMatched }) => isFlipped && !isMatched);

      if (flippedCards.length == 2) {
        handleFlippedCards(flippedCards[0], flippedCards[1])
      }
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
