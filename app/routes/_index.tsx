import { defer, MetaFunction } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import { Suspense } from "react";
import { useTranslation } from "react-i18next";

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

export default function Index() {
  const { t } = useTranslation();
  const { cards } = useLoaderData<typeof loader>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>{t("greeting")}</h1>
      <h2>{t("compare-pokemon-cta")}</h2>
      <Suspense fallback="Loading..." key="pokemon-drop-down-container">
        <Await resolve={cards}>
          {(cards) => (
            <div style={{ display: "flex", flexFlow: "row", gap: "24px" }}>
              <select>
                {cards.map((card) => {
                  return (
                    <option key={card.id} value={card.id}>
                      {card.name}
                    </option>
                  );
                })}
              </select>
              <select>
                {cards.map((card) => {
                  return (
                    <option key={card.id} value={card.id}>
                      {card.name}
                    </option>
                  );
                })}
              </select>
            </div>
          )}
        </Await>
      </Suspense>
    </div>
  );
}
