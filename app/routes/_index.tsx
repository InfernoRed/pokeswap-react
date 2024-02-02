import { defer, MetaFunction } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import { Suspense } from "react";
import { useTranslation } from "react-i18next";
import CardSelector from "~/components/CardSelector";
import { motion } from "framer-motion";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader() {
  console.log("Loading pokemon cards");
  return defer({
    cards: PokemonTCG.getAllCards(),
  });
}

const sentenceVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const letterVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.005,
    },
  },
};

export default function Index() {
  const { t } = useTranslation();
  const { cards } = useLoaderData<typeof loader>();

  return (
    <div
      id="pokedex"
      style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}
    >
      <div id="bar">
        <div id="buttonGlass">
          <div id="reflect" />
        </div>
        <div id="miniButtonGlass1" />
        <div id="miniButtonGlass2" />
        <div id="miniButtonGlass3" />
        {/* TODO: Need to find IRT logo */}
      </div>
      <div id="screen" style={{ fontFamily: "Pixer" }}>
        <motion.div
          variants={sentenceVariants}
          initial={"hidden"}
          animate="visible"
        >
          <motion.h1 className="text-2xl">
            {t("greeting")
              .split("")
              .map((letter, index) => {
                return (
                  <motion.span
                    key={letter + index}
                    variants={letterVariants}
                    custom={index + 1}
                  >
                    {letter}
                  </motion.span>
                );
              })}
          </motion.h1>
          <motion.h3 className="text-xl">
            {t("compare-pokemon-cta")
              .split("")
              .map((letter, index) => {
                return (
                  <motion.span
                    key={letter + index}
                    variants={letterVariants}
                    custom={index + 1}
                  >
                    {letter}
                  </motion.span>
                );
              })}
          </motion.h3>
        </motion.div>
        <div className="flex flex-row gap-8 justify-center mx-4 mt-4">
          <Suspense key="pokemon-selectors" fallback={<div>Loading...</div>}>
            <Await resolve={cards}>
              {(cards) => (
                <>
                  <CardSelector cards={cards} />
                  <CardSelector cards={cards} />
                </>
              )}
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
