import { combineReducers } from "redux";
import AVAILABLE from "./messages";

{
  localStorage.getItem("dian-xchange") == null &&
    localStorage.setItem("dian-xchange", "{}");
}
const initialState = JSON.parse(localStorage.getItem("dian-xchange"));

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
