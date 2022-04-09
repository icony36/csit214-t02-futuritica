import { combineReducers } from "redux";
import currentUserReducer from "./currentUserReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
   currentUser: currentUserReducer,
   error: errorReducer 
});