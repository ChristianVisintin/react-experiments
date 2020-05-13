/**
 * Recipe represents a Recipe entity as stored in the server
 */

export default class Recipe {
  id: Number;
  title: String;
  category: Array<String>;
  date: Date;
  img: Array<String>;
  body: String;
  tags: Array<String>;

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

  constructor(id: number, title: string, category: Array<String>, date: string, img: Array<String>, body: string, tags: Array<String>) {
    this.id = id;
    this.title = title;
    this.category = category;
    this.date = new Date(date);
    this.img = img;
    this.body = body;
    this.tags = tags;
  }
}
