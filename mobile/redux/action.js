import { AVAILABLE } from "./types";

const started = (payload) => {
  return {
    type: AVAILABLE,
    payload,
  };
};

export { started };
