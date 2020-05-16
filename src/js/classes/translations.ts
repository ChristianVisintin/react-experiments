/**
 * Translations is the translations container; translations are loaded at runtime from JSON
 */

export default interface Translations {
  en: Record<string, string>;
  [key: string]: Record<string, string>;
}
