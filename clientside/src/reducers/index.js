import { combineReducers } from "redux";
import authReducer from "./authReducers";
import todoReducer from "./todoReducers";
import completeReducer from "./completeReducers";

export default combineReducers({
  auth: authReducer,
  todos: todoReducer,
  complete: completeReducer
});
