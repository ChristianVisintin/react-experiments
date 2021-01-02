/**
 * @author Christian Visintin <christian.visintin1997@gmail.com>
 * @version 0.1.0
 * @license "please refer to <http://unlicense.org>"
 */

/**
 * @description Tweet represents a post from twitter
 */

export default class Tweet {
  public uuid: string; // UUID v4
  public username: string;
  public author: string;
  public date: Date;
  public text: string;
  public href: URL;

  /**
   *
   * @param uuid
   * @param username
   * @param author
   * @param date
   * @param text
   * @param href
   */

  public constructor(
    uuid: string,
    username: string,
    author: string,
    date: string,
    text: string,
    href: string
  ) {
    this.uuid = uuid;
    this.username = username;
    this.author = author;
    this.date = new Date(date);
    this.text = text;
    this.href = new URL(href);
  }
}
