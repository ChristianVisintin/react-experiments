/**
 * @author Christian Visintin <christian.visintin1997@gmail.com>
 * @version 0.1.0
 * @license "please refer to <http://unlicense.org>"
 */

import OpenType from "../lib/utils/opentype";

export class StoreState {
  items: any;
  item: any;

  constructor(items: any, item: any) {
    this.items = items;
    this.item = item;
  }
}

export interface ActionMessage {
  type: string;
  payload: OpenType;
}
