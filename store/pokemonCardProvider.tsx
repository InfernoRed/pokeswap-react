import { useQuery } from "@tanstack/react-query";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import { PropsWithChildren, createContext, useCallback, useContext, useMemo, useState } from "react";

interface PokemonCardContextType {
  pokemonCards?: PokemonTCG.Card[];
  addPokemonCard: (card: PokemonTCG.Card) => void;
  yourPokemonCards: PokemonTCG.Card[];
}

const pokemonCardContext = createContext<PokemonCardContextType>({
  addPokemonCard: () => { },
  yourPokemonCards: []
});

export default function PokemonCardProvider({ children }: PropsWithChildren) {
  const [yourPokemonCards, setYourPokemonCards] = useState<PokemonTCG.Card[]>([])

  const { data: pokemonCards } = useQuery<PokemonTCG.Card[]>({
    queryKey: ["pokemonCardsAll"], queryFn: async () => {
      const data = await fetch("https://api.pokemontcg.io/v2/cards", {
        headers: {
          "X-Api-Key": window.ENV.POKEMON_TCG_API_KEY
        }
      }).then(res => res.json()).then(res => res.data)
      return data
    }
  })

  const addPokemonCard = useCallback((card: PokemonTCG.Card) => {
    setYourPokemonCards((prevState) => [...prevState, card])
  }, [])

  const value = useMemo(() => ({
    pokemonCards,
    addPokemonCard,
    yourPokemonCards
  }), [pokemonCards, yourPokemonCards, addPokemonCard])

  return (
    <pokemonCardContext.Provider value={value}>
      {children}
    </pokemonCardContext.Provider>
  );

}

export const usePokemonCardContext = () => {
  return useContext(pokemonCardContext);
}