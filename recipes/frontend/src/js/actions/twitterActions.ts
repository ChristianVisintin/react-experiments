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

// API url
const API_URL = "/api";

/**
 * @function fetchTweets
 * @description fetch recipes on remote server and dispatch to store
 * @param {number | undefined} limit results to
 * @param {number | undefined} offset offset result start from
 * @param {string | undefined} orderBy order tweets by...
 */

export const fetchTweets = (
  limit: number | undefined = undefined,
  offset: number | undefined = undefined,
  orderBy: string | undefined = undefined
) => async (dispatch: Dispatch) => {
  try {
    let url = API_URL + "/tweets?";
    if (orderBy) {
      url += "orderBy=" + orderBy + "&";
    }
    if (limit) {
      url += "limit=" + limit + "&";
    }
    if (offset) {
      url += "offset=" + offset + "&";
    }
    const response = await axios.get(url);
    const payload = response.data;
    let tweets: Array<Tweet> = new Array();
    for (const tweet of payload) {
      // Create recipe
      tweets.push(
        new Tweet(
          tweet.uuid,
          tweet.username,
          tweet.nickaname,
          tweet.date,
          tweet.text,
          tweet.url,
          tweet.avatar
        )
      );
    }
    dispatch({
      type: FETCH_TWEETS,
      payload: tweets,
    });
  } catch (error) {
    console.error("Could not fetch tweets", error.message);
    throw error;
  }
};
