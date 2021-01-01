/**
 * @author Christian Visintin <christian.visintin1997@gmail.com>
 * @version 0.1.0
 * @license "please refer to <http://unlicense.org>"
 */

/**
 * Recipe represents a Recipe entity as stored in the server
 */

export default class Recipe {
  id: string;
  title: string;
  category: Array<string>;
  date: Date;
  img: Array<string>;
  body: string;
  tags: Array<string>;

  /**
   * @description Recipe class constructor
   * @param id 
   * @param title 
   * @param category 
   * @param date: date must be formatted as ISO8601
   * @param img 
   * @param body 
   * @param tags 
   */

  constructor(id: string, title: string, category: Array<string>, date: string, img: Array<string>, body: string, tags: Array<string>) {
    this.id = id;
    this.title = title;
    this.category = category;
    this.date = new Date(date);
    this.img = img;
    this.body = body;
    this.tags = tags;
  }
}
