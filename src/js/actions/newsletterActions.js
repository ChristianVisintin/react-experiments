import { NEWSLETTER_SUBSCRIBE } from "./types";

const axios = require("axios").default;

/**
 * @function subscribeNewsletter
 * @description subscribe to newsletter
 */

export const subscribeNewsletter = (email) => (dispatch) => {
  return axios
    .post("http://localhost:3000/newsletter", {
      email: email,
    })
    .then((response) => {
      const newsletterSubscription = response.data.result;
      dispatch({
        type: NEWSLETTER_SUBSCRIBE,
        payload: newsletterSubscription,
      });
    })
    .catch((error) => {
      console.error("Could not subscribe to newsletter", error.data);
      dispatch({
        type: NEWSLETTER_SUBSCRIBE,
        payload: false,
      });
    });
};
