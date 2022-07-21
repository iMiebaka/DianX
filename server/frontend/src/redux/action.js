import AVAILABLE from "./messages"


const started = (payload) => {
  return {
    type: AVAILABLE,
    payload,
  };
};

export default started;
