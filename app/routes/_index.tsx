import type { MetaFunction } from "@remix-run/node";
import { useTranslation } from "react-i18next";
import { usePokemonCardContext } from "store/pokemonCardProvider";
import PokemonCardSelector from "~/shared/components/PokemonCardSelector";


export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const { t } = useTranslation();
  const { pokemonCards } = usePokemonCardContext();
  
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>{t("greeting")}</h1>
      <h3>{t("compare-pokemon-cta")}</h3>
      {pokemonCards && 
      <div className="flex flex-row gap-8">
        <PokemonCardSelector/>
        <PokemonCardSelector/>
      </div>
      }
    </div>
  );
}
