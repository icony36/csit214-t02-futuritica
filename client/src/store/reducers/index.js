import { combineReducers } from "redux";
import adminReducer from "./adminReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import roomReducer from "./roomReducer";
import profileReducer from "./profileReducer";
import bookingReducer from "./bookingReducer";

export default combineReducers({
   auth: authReducer,
   errors: errorReducer ,
   rooms: roomReducer,
   profile: profileReducer,
   users: adminReducer,
   booking: bookingReducer
});