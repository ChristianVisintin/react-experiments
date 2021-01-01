/**
 * @author Christian Visintin <christian.visintin1997@gmail.com>
 * @version 0.1.0
 * @license "please refer to <http://unlicense.org>"
 */

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const initialState = {};

const middleware = [thunk];

export interface RootState {
  [key: string]: any;
}

const Store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware)
  )
);

export default Store;
