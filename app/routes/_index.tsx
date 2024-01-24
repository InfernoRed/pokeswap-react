import type { MetaFunction } from "@remix-run/node";
import { useTranslation } from "react-i18next";
import { usePokemonCardContext } from "store/pokemonCardProvider";
import PokemonCardSelector from "~/shared/components/PokemonCardSelector";
import {motion} from "framer-motion";

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
  const { pokemonCards } = usePokemonCardContext();
  
  return (
    <div id="pokedex" style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <div id="bar">
        <div id="buttonGlass">
          <div id="reflect"/>
        </div>
        <div id="miniButtonGlass1"/>
        <div id="miniButtonGlass2"/>
        <div id="miniButtonGlass3"/>
        {/* TODO: Need to find IRT logo */}
      </div>
      <div id="screen" style={{ fontFamily: 'Pixer'}}>
        <motion.div variants={sentenceVariants} initial={'hidden'} animate='visible'>
          <motion.h1 className="text-2xl" >{
            t("greeting").split("").map((letter, index) => {
              return <motion.span key={letter + index} variants={letterVariants} custom={index + 1}>{letter}</motion.span>
            })
          }</motion.h1>
          <motion.h3 className="text-xl">{t("compare-pokemon-cta").split("").map((letter, index) => {
              return <motion.span key={letter + index} variants={letterVariants} custom={index + 1}>{letter}</motion.span>
            })}</motion.h3>
        </motion.div>
        {pokemonCards && 
          <div className="flex flex-row gap-8 justify-center mx-4 mt-4">
            <PokemonCardSelector/>
            <PokemonCardSelector/>
          </div>
        }
      </div>
    </div>
  );
}
