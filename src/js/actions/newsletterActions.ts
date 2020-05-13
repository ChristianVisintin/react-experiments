import { Dispatch } from 'redux';
import { NEWSLETTER_SUBSCRIBE } from "./types";

//const axios = require("axios").default;
import axios from "axios";

/**
 * @function subscribeNewsletter
 * @description subscribe to newsletter
 */

export const subscribeNewsletter = (email: String) => async (dispatch: Dispatch) => {
  try {
    const response = await axios
      .post("http://localhost:3000/newsletter", {
        email: email,
      });
    const newsletterSubscription = response.data.result;
    dispatch({
      type: NEWSLETTER_SUBSCRIBE,
      payload: newsletterSubscription,
    });
  }
  catch (error) {
    console.error("Could not subscribe to newsletter", error.message);
    dispatch({
      type: NEWSLETTER_SUBSCRIBE,
      payload: false,
    });
  }
};
