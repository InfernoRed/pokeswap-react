export const Language = {
  English: 'en',
  Spanish: 'es'
} as const

export const Namespace = {
  Common: 'common'
} as const

export default {
  // This is the list of languages your application supports
  supportedLngs: [Language.English, Language.Spanish],
  // This is the language you want to use in case
  // if the user language is not in the supportedLngs
  fallbackLng: Language.English,
  // The default namespace of i18next is "translation", but you can customize it here
  defaultNS: Namespace.Common,
  // Disabling suspense is recommended
  react: { useSuspense: false }
}
