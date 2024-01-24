import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData,
} from "@remix-run/react";
import i18nextServer from "./i18next.server";
import { useTranslation } from "react-i18next";
import { Namespace } from "./i18n";
import { useChangeLanguage } from "remix-i18next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PokemonCardProvider from "store/pokemonCardProvider";

import stylesheet from "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export async function loader({ request }: LoaderFunctionArgs) {
  const locale = await i18nextServer.getLocale(request);
  return json({ locale, ENV: process.env });
}

export const handle = {
  // In the handle export, we can add a i18n key with namespaces our route
  // will need to load. This key can be a single string or an array of strings.
  // TIP: In most cases, you should set this to your defaultNS from your i18n config
  // or if you did not set one, set it to the i18next default namespace "translation"
  i18n: Namespace.Common,
};

export default function App() {
  // Get the locale from the loader
  const { locale, ENV } = useLoaderData<typeof loader>();

  const { i18n } = useTranslation();

  // This hook will change the i18n instance language to the current locale
  // detected by the loader, this way, when we do something to change the
  // language, this locale will change and i18next will load the correct
  // translation files
  useChangeLanguage(locale);

  const client = new QueryClient();

  return (
    <html lang={locale} dir={i18n.dir()}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(
              ENV
            )}`,
          }}
        />
        <QueryClientProvider client={client}>
          <PokemonCardProvider>
            <Outlet />
            <ScrollRestoration />
            <Scripts />
            <LiveReload />
          </PokemonCardProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
