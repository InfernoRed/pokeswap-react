import { useQuery } from "@tanstack/react-query";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import { PropsWithChildren, createContext, useContext, useMemo } from "react";

interface PokemonCardContextType {
    pokemonCards?: PokemonTCG.Card[];
}

const pokemonCardContext = createContext<PokemonCardContextType>({});

export default function PokemonCardProvider({ children }: PropsWithChildren) {

  const {data: pokemonCards } = useQuery<PokemonTCG.Card[]>({queryKey: ["pokemonCardsAll"], queryFn: async () => {
    const data = await fetch("https://api.pokemontcg.io/v2/cards", {
      headers: {
        "X-Api-Key": window.ENV.POKEMON_TCG_API_KEY
      }
    }).then(res => res.json()).then(res => res.data)
    return data
  }})

  const value = useMemo(() => ({
    pokemonCards
  }), [pokemonCards])

  return (
    <pokemonCardContext.Provider value={value}>
      {children}
    </pokemonCardContext.Provider>
  );

}

export const usePokemonCardContext = () => {
    return useContext(pokemonCardContext);
}