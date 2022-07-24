import { combineReducers } from "redux";
import { getDeviceId } from "../controllers/deviceId";
import AVAILABLE from "./messages";

const initialState = getDeviceId;

const userDetail = (state = initialState, action) => {
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
