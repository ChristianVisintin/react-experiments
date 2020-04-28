import React from 'react';       
import ReactDOM from 'react-dom';
import App from "./App";

//Entry point
ReactDOM.render(<App />, document.getElementById("root"));

//Functions

function importFrom(r) {
  return r.keys().map(r);
}