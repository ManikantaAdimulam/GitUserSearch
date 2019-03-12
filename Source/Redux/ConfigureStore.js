import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "./CombineReducers";

export default function configureStore() {
  let root = rootReducer();
  let store = createStore(root, applyMiddleware(thunk));
  return store;
}
