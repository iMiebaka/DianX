import { combineReducers } from "redux";
import AVAILABLE from "./types";


const userDetail = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case AVAILABLE:
      return payload;
    default:
      return state;
  }
};
const allReaducers = combineReducers({
  userDetail,
});

export default allReaducers;
