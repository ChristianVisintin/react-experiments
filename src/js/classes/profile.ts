/**
 * Profile represents a profile entity for the about page
 */

export default class Profile {
  id: Number;
  name: string;
  jobs: Array<string>;
  body: string;
  img: string;

  /**
   * @description Profile class constructor
   * @param id 
   * @param name 
   * @param jobs 
   * @param body 
   * @param img 
   */

  constructor(id: number, name: string, jobs: Array<string>, body: string, img: string) {
    this.id = id;
    this.name = name;
    this.jobs = jobs;
    this.body = body;
    this.img = img;
  }
}
