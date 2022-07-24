import { combineReducers } from "redux";
import { AVAILABLE, STATS } from "./messages";

{
  localStorage.getItem("dian-xchange-device") == null &&
    localStorage.setItem("dian-xchange-device", "{}");
}

{
  localStorage.getItem("dian-xchange-stats") == null &&
    localStorage.setItem("dian-xchange-stats", "{}");
}

const initialState = JSON.parse(localStorage.getItem("dian-xchange-device"));
const initialState_ = JSON.parse(localStorage.getItem("dian-xchange-stats"));

const userDetail = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case AVAILABLE:
      return payload;
    default:
      return state;
  }
};

const userStats = (state = initialState_, action) => {
  const { type, payload } = action;
  switch (type) {
    case STATS:
      return payload;
    default:
      return state;
  }
};
const allReaducers = combineReducers({
  userDetail,
  userStats,
});

export default allReaducers;
