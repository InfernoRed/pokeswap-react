# ![PokeSwap Logo][pokeswap-logo]

[![MegaLinter][megalint-badge]][megalint-workflow]

## 👋 Welcome to PokeSwap in React

A fun example of a localized application using the [Pokemon API][pokemon-api] to allow a user to compare prices of Pokemon Cards.

## 🧱 Architecture
This applications uses the following stack
- [React][react]
- [Remix][remix-docs]
- [i18next]
- [react-i18next]
- [Pokemon TCG SDK (Typescript)][pokemon-tcg-sdk-typescript]


## 💻 Development

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## 🚀 Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

<!--LINKS-->
[react]:https://react.dev/
[remix-docs]: https://remix.run/docs
[i18next]:https://www.i18next.com/
[react-i18next]:https://react.i18next.com/
[pokeswap-logo]: docs/images/pokeswap-logo.png
[pokemon-api]:https://pokemontcg.io/
[pokemon-tcg-sdk-typescript]: https://github.com/PokemonTCG/pokemon-tcg-sdk-typescript
[megalint-badge]: https://github.com/InfernoRed/pokeswap-react/actions/workflows/mega-linter.yml/badge.svg?branch=main&event=push
[megalint-workflow]:https://github.com/InfernoRed/pokeswap-react/actions/workflows/mega-linter.yml