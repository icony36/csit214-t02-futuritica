import { combineReducers } from "redux";
import adminReducer from "./adminReducer";
import authReducer from "./authReducer";
import messageReducer from "./messageReducer";
import roomReducer from "./roomReducer";
import profileReducer from "./profileReducer";
import bookingReducer from "./bookingReducer";
import loadingReducer from "./loadingReducer";

export default combineReducers({
   auth: authReducer,
   messages: messageReducer ,
   rooms: roomReducer,
   profile: profileReducer,
   users: adminReducer,
   booking: bookingReducer,
   loading: loadingReducer
});