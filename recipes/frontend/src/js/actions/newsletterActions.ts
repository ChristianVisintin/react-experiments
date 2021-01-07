/**
 * @author Christian Visintin <christian.visintin1997@gmail.com>
 * @version 0.1.0
 * @license "please refer to <http://unlicense.org>"
 */

import { v4 as uuidv4 } from "uuid";
import { Dispatch } from "redux";
import axios from "axios";

// Action names
export const NEWSLETTER_SUBSCRIBE: string = uuidv4();

/**
 * @function subscribeNewsletter
 * @description subscribe to newsletter
 */

export const subscribeNewsletter = (email: string) => async (
  dispatch: Dispatch
) => {
  try {
    const response = await axios.post("http://localhost:3000/newsletter", {
      email: email,
    });
    const newsletterSubscription = response.data.result;
    dispatch({
      type: NEWSLETTER_SUBSCRIBE,
      payload: newsletterSubscription,
    });
  } catch (error) {
    console.error("Could not subscribe to newsletter", error.message);
    throw error;
  }
};
