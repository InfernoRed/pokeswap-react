import { animate, motion } from "framer-motion";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import { FC, useRef, useState } from "react";
import { usePokemonCardContext } from "store/pokemonCardProvider";

const animationDurationSeconds = .25;

const PokemonCardSelector: FC = () => {
    const { pokemonCards } = usePokemonCardContext();
    const randomCardNumber = Math.floor(Math.random() * pokemonCards!.length);
    const [pokemonCard, setPokemonCard] = useState<PokemonTCG.Card>(pokemonCards![randomCardNumber]);
    const cardImageRef = useRef<HTMLDivElement>(null);

    const onPokemonSelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedCard = pokemonCards!.find((card) => card.id === e.target.value);
      if(!selectedCard) return;
      if(cardImageRef.current) {
        animate(cardImageRef.current, {opacity: 0}, { duration: animationDurationSeconds, ease: 'easeInOut'});
      }
      //Better way to do this?
      setTimeout(() => {
        setPokemonCard(selectedCard);
      }, animationDurationSeconds*1000)
    }

    return <div className="flex flex-col gap-2">
      <select value={pokemonCard?.id} onChange={onPokemonSelected}>
        {pokemonCards!.map((card) => {
          return <option key={card.id} value={card.id}>{card.name}</option>
        })}
      </select>
      <motion.div key={pokemonCard.id} className="w-64" 
        ref={cardImageRef}
        initial={{opacity: 0}} 
        animate={{opacity: 1}} 
        transition={{duration: animationDurationSeconds * 2, ease: 'easeOut'}}>
          <img src={pokemonCard.images.small} alt={pokemonCard.name} className="w-full"/>
      </motion.div>
    </div>
}

export default PokemonCardSelector;