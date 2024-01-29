import { animate, motion } from "framer-motion";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import { FC, useEffect, useRef, useState } from "react";
import { usePokemonCardContext } from "store/pokemonCardProvider";
import TypeIndicator from "../TypeIndicator";

const animationDurationSeconds = .25;

const PokemonCardSelector: FC = () => {
  const { pokemonCards, addPokemonCard } = usePokemonCardContext();
  const randomCardNumber = Math.floor(Math.random() * pokemonCards!.length);
  const [pokemonCard, setPokemonCard] = useState<PokemonTCG.Card>(pokemonCards![randomCardNumber]);
  const cardRef = useRef<HTMLDivElement>(null);
  const [pokemonHp, setPokemonHp] = useState<number>(0);

  const onPokemonSelected = () => {
    const selectedCard = pokemonCards![Math.floor(Math.random() * pokemonCards!.length)];
    if (!selectedCard) return;
    if (cardRef.current) {
      animate(cardRef.current, { opacity: 0 }, { duration: animationDurationSeconds, ease: 'easeInOut' });
    }
    //Better way to do this?
    setTimeout(() => {
      setPokemonCard(selectedCard);
    }, animationDurationSeconds * 2000)
  }

  const pokemonDisplayVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: .75,
      }
    }
  }

  const pokemonDataVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: .1,
        staggerChildren: 1
      }
    }
  }

  useEffect(() => {
    if (!pokemonCard || !pokemonCard.hp) return;

    const updateHP = () => {
      setPokemonHp((prevState) => {
        if (prevState >= parseInt(pokemonCard.hp)) {
          clearInterval(intervalID);
          return parseInt(pokemonCard.hp);
        }
        return prevState + 1
      })
    }

    setPokemonHp(0);
    const intervalID = setInterval(updateHP, 2000 / parseInt(pokemonCard.hp));

    return () => {
      clearInterval(intervalID);
    };
  }, [pokemonCard])

  return <motion.div className="flex flex-col gap-2 justify-between w-0" style={{ "flex": "1 1 0" }} variants={pokemonDisplayVariants} initial={'hidden'} animate='visible' key={pokemonCard.name}>
    <div className="flex flex-col justify-center gap-2" ref={cardRef}>
      <motion.div className="flex justify-between" variants={pokemonDataVariants}>
        <div className="flex flex-row items-center gap-2">
          <h2 className="text-xl">{pokemonCard.name}</h2>
          {pokemonCard.types?.map((type) => {
            return <TypeIndicator key={type} type={type} />
          })}
        </div>
        {pokemonCard.nationalPokedexNumbers && <h3>No. {pokemonCard.nationalPokedexNumbers[0]}</h3>}
      </motion.div>
      <motion.div className="flex flex-row gap-2 items-center" variants={pokemonDataVariants}>
        <p className="font-bold">HP:</p>
        <motion.div variants={pokemonDataVariants} className="h-4 bg-gray-700 border-solid border-black border-2" initial={{ width: '0px' }} animate={{ width: `${pokemonCard.hp}px` }} transition={{ delay: .5, duration: 2, ease: 'easeOut' }} />
        <p className="text-center">{pokemonHp}</p>
      </motion.div>
      <motion.div key={pokemonCard.id} className="w-64 self-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: animationDurationSeconds * 2, ease: 'easeOut' }}>
        <img src={pokemonCard.images.small} alt={pokemonCard.name} className="w-full" />
      </motion.div>
      <motion.div variants={pokemonDataVariants}>
        {typeof pokemonCard.cardmarket?.prices?.averageSellPrice !== 'undefined' && <p className="font-sans text-xl text-center">{new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'USD' }).format(pokemonCard.cardmarket?.prices?.averageSellPrice)}</p>}
        {pokemonCard.flavorText && <p className="leading-normal mt-2 px-4 text-justify">{pokemonCard.flavorText}</p>}
      </motion.div>
    </div>
    <div>
      <div className="flex flex-row justify-between">
        <button className="border-gray-700 border-solid border-2 px-2" onClick={onPokemonSelected}>See a new pokemon</button>
        <button className="border-gray-700 border-solid border-2 px-2" onClick={() => {
          addPokemonCard(pokemonCard);
          onPokemonSelected();
        }}>Add to Deck</button>
      </div>
    </div>
  </motion.div>
}

export default PokemonCardSelector;