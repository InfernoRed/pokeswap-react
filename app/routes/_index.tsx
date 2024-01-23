import type { MetaFunction } from "@remix-run/node";
import { useTranslation } from "react-i18next";
import { usePokemonCardContext } from "store/pokemonCardProvider";

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
      <div style={{display: 'flex', flexFlow: 'row', gap: '24px'}}>
        <select>
          {pokemonCards.map((card) => {
            return <option key={card.id} value={card.id}>{card.name}</option>
          })}
        </select>
        <select>
        {pokemonCards.map((card) => {
            return <option key={card.id} value={card.id}>{card.name}</option>
          })}
        </select>
      </div>
      }
    </div>
  );
}
