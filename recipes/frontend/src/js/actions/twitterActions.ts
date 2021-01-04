/**
 * @author Christian Visintin <christian.visintin1997@gmail.com>
 * @version 0.1.0
 * @license "please refer to <http://unlicense.org>"
 */

import { Dispatch } from "redux";
import axios from "axios";

import Tweet from "../lib/data/tweet";

// Action names
export const FETCH_TWEETS: string = "FETCH_TWEETS";

/**
 * @function fetchTweets
 * @description fetch recipes on remote server and dispatch to store
 */

export const fetchTweets = () => async (dispatch: Dispatch) => {
  try {
    const response = await axios.get("http://localhost:3000/tweets");
    const payload = response.data;
    let tweets: Array<Tweet> = new Array();
    for (const tweet of payload) {
      // Create recipe
      tweets.push(
        new Tweet(tweet.uuid, tweet.username, tweet.author, tweet.date, tweet.text, tweet.href)
      );
    }
    tweets.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (dateA < dateB) return 1;
      if (dateA > dateB) return -1;
      return 0;
    });
    dispatch({
      type: FETCH_TWEETS,
      payload: tweets,
    });
  } catch (error) {
    console.error("Could not fetch tweets", error.message);
    throw error;
  }
};
