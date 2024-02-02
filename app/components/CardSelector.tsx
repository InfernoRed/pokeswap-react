import { FC, useRef, useState } from "react";
import { animate, motion } from "framer-motion";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import getRandom from "~/utils/getRandom";

const ANIMATION_DURATION = 0.25;
const ANIMATION_DELAY = ANIMATION_DURATION * 1000;
const ANIMATION_TRANSITION_DURATION = ANIMATION_DURATION * 2;

interface CardSelectorProps {
  cards: PokemonTCG.Card[];
  onCardSelected?: (card: PokemonTCG.Card) => void;
}

const CardSelector: FC<CardSelectorProps> = ({ cards, onCardSelected }) => {
  const [pokemonCard, setPokemonCard] = useState<PokemonTCG.Card | null>(
    getRandom(cards)
  );
  const cardImageRef = useRef<HTMLDivElement>(null);

  const onPokemonSelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCard = cards.find((card) => card.id === e.target.value);
    if (!selectedCard) return;
    if (cardImageRef.current) {
      animate(
        cardImageRef.current,
        { opacity: 0 },
        { duration: ANIMATION_DURATION, ease: "easeInOut" }
      );
    }
    // TODO: Revisit to improve animation delay
    setTimeout(() => {
      setPokemonCard(selectedCard);
      if (onCardSelected) onCardSelected(selectedCard);
    }, ANIMATION_DELAY);
  };

  if (!pokemonCard) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      <select value={pokemonCard?.id} onChange={onPokemonSelected}>
        {cards.map((card) => {
          return (
            <option key={card.id} value={card.id}>
              {card.name}
            </option>
          );
        })}
      </select>
      <motion.div
        key={pokemonCard.id}
        className="w-64"
        ref={cardImageRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: ANIMATION_TRANSITION_DURATION,
          ease: "easeOut",
        }}
      >
        <img
          src={pokemonCard.images.small}
          alt={pokemonCard.name}
          className="w-full"
        />
      </motion.div>
    </div>
  );
};

export default CardSelector;
