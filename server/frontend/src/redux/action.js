import { AVAILABLE, STATS } from "./messages";

const started = (payload) => {
  return {
    type: AVAILABLE,
    payload,
  };
};

const stats = (payload) => {
  return {
    type: STATS,
    payload,
  };
};


export {started, stats};
