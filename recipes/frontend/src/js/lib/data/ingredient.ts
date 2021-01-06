/**
 * @author Christian Visintin <christian.visintin1997@gmail.com>
 * @version 0.1.0
 * @license "please refer to <http://unlicense.org>"
 */

/**
 * @description Ingredient describes an Ingredient in a recipe
 */

export default interface Ingredient {
  name: string;
  quantity: number | undefined;
  measure: string | undefined;
}
