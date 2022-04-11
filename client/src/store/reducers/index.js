import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import roomReducer from "./roomReducer";
import userDeducer from "./userReducer";

export default combineReducers({
   auth: authReducer,
   errors: errorReducer ,
   rooms: roomReducer,
   userDetails: userDeducer
});