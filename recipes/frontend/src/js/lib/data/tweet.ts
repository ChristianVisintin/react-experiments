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
  public nickname: string;
  public date: Date;
  public text: string;
  public url: string;
  public avatar: string;

  /**
   *
   * @param {string} uuid
   * @param {string} username
   * @param {string} nickname
   * @param {string} date
   * @param {string} text
   * @param {string} url
   * @param {string} avatar
   */

  public constructor(
    uuid: string,
    username: string,
    nickname: string,
    date: string,
    text: string,
    url: string,
    avatar: string
  ) {
    this.uuid = uuid;
    this.username = username;
    this.nickname = nickname;
    this.date = new Date(date);
    this.text = text;
    this.url = url;
    this.avatar = avatar;
  }
}
