import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./components/App";

import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { Provider } from "react-redux";

const initialState = {};
const middleware = [thunk];

let store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default props => {
  return <Provider store={store}>{props.children}</Provider>;
};
