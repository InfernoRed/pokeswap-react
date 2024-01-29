import type { MetaFunction } from "@remix-run/node";
import { useTranslation } from "react-i18next";
import { usePokemonCardContext } from "store/pokemonCardProvider";
import PokemonCardSelector from "~/shared/components/PokemonCardSelector";
import { motion } from "framer-motion";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

const sentenceVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: .1,
    }
  }
}

const letterVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: .005,
    }
  }
}

export default function Index() {
  const { t } = useTranslation();
  const { pokemonCards, yourPokemonCards } = usePokemonCardContext();

  return (
    <div id="pokedex" style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <div id="bar">
        <div id="buttonGlass">
          <div id="reflect" />
        </div>
        <div id="miniButtonGlass1" />
        <div id="miniButtonGlass2" />
        <div id="miniButtonGlass3" />
        {/* TODO: Need to find IRT logo */}
      </div>
      <div style={{ fontFamily: 'Pixer' }} className="flex flex-row w-4/5 self-center justify-between items-center">
        <motion.div variants={sentenceVariants} initial={'hidden'} animate='visible' >
          <motion.h1 className="text-2xl text-white" >{
            (t("build-deck-cta")).split("").map((letter, index) => {
              return <motion.span key={letter + index} variants={letterVariants} custom={index + 1}>{letter}</motion.span>
            })
          }</motion.h1>
        </motion.div>
        <div className="flex flex-row gap-2 items-center">
          <div className="border-dashed border-black w-10 h-14 border-2 rounded-sm relative">
            {yourPokemonCards.length > 0 && <motion.img src="https://images.pokemontcg.io/hgss4/0.png" className="absolute  h-full w-full top-0" initial={{ x: 100, opacity: 0 }} animate={{ x: -1 * yourPokemonCards.length, y: -1 * yourPokemonCards.length, opacity: 1 }} transition={{ duration: .5 }} style={{ boxShadow: `${yourPokemonCards.length}px ${yourPokemonCards.length}px rgb(27, 39, 80)` }} />}
            {yourPokemonCards.length > 1 && <motion.img src="https://images.pokemontcg.io/hgss4/0.png" className="absolute  h-full w-full top-0" key={yourPokemonCards.length} initial={{ x: 100, opacity: 0 }} animate={{ x: -1 * yourPokemonCards.length, y: -1 * yourPokemonCards.length, opacity: 1 }} transition={{ duration: .5 }} />}
          </div>
          <p>{yourPokemonCards.length}</p>
        </div>
      </div>
      <div id="screen" style={{ fontFamily: 'Pixer' }}>
        {pokemonCards &&
          <div className="flex flex-row gap-16 justify-center h-full">
            <PokemonCardSelector />
            <PokemonCardSelector />
          </div>
        }
      </div>
    </div>
  );
}
