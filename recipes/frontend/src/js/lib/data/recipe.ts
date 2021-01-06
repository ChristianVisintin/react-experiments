/**
 * @author Christian Visintin <christian.visintin1997@gmail.com>
 * @version 0.1.0
 * @license "please refer to <http://unlicense.org>"
 */

import Ingredient from "./ingredient";

/**
 * @description Recipe represents a Recipe entity as stored in the server
 */

export default class Recipe {
  public id: string; // UUID v4
  public title: string;
  public categories: Array<string>;
  public date: Date;
  public img: Array<string>;
  public persons: number | null;
  public ingredients: Array<Ingredient> | null;
  public body: string | null;
  public likes: number | null;

  /**
   * 
   * @param {string} id 
   * @param {string} title translated title
   * @param {Array<string>} categories 
   * @param {Date} date 
   * @param {Array<string>} img 
   * @param {number | null} persons 
   * @param {Array<Ingredient> | null} ingredients 
   * @param {string | null} body 
   * @param {number | null} likes 
   */

  constructor(
    id: string,
    title: string,
    categories: Array<string>,
    date: string,
    img: Array<string>,
    persons: number | null = null,
    ingredients: Array<Ingredient> | null = null,
    body: string | null = null,
    likes: number | null = null,
  ) {
    this.id = id;
    this.title = title;
    this.categories = categories;
    this.date = new Date(date);
    this.img = img;
    this.persons = persons;
    this.ingredients = ingredients;
    this.body = body;
    this.likes = likes;
  }
}
