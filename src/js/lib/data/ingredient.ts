/**
 * @author Christian Visintin <christian.visintin1997@gmail.com>
 * @version 0.1.0
 * @license "please refer to <http://unlicense.org>"
 */

/**
 * @description Ingredient describes an Ingredient in a recipe
 */

export default class Ingredient {
  public name: string;
  public quantity: number | undefined;
  public measure: string | undefined;

  public constructor(
    name: string,
    quantity: number | undefined,
    measure: string | undefined
  ) {
    this.name = name;
    this.quantity = quantity;
    this.measure = measure;
  }
}
