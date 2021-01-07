/**
 * @author Christian Visintin <christian.visintin1997@gmail.com>
 * @version 0.1.0
 * @license "please refer to <http://unlicense.org>"
 */

import { getDefaultLanguage } from "../../../App";

export default interface OrderByChoice {
  name: string; // API name
  translation: string; // Translation key
}

// Default
export const recipesOrderBy: Array<OrderByChoice> = [
  {
    name: "date",
    translation: "recipes.orderby.date",
  },
  {
    name: "likes",
    translation: "recipes.orderby.likes",
  },
  {
    name: "title_" + getDefaultLanguage(),
    translation: "recipes.orderby.name",
  },
];
