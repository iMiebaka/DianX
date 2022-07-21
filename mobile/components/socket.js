import { io } from "socket.io-client";

const socket = (url) =>
  io(`ws://${url}/`, {
    reconnectionDelayMax: 10000,
    transports: ["websocket"],
  });

export default socket;
