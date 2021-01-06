/**
 * @author Christian Visintin <christian.visintin1997@gmail.com>
 * @version 0.1.0
 * @license "please refer to <http://unlicense.org>"
 */

/**
 * Translations is the translations container; translations are loaded at runtime from JSON
 */

export default interface Translations {
  en: Record<string, string>;
  [key: string]: Record<string, string>;
}
