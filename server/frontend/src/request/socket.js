import { io } from "socket.io-client";

const socket = io("ws://localhost:9339/", {
    reconnectionDelayMax: 10000,
    transports: ["websocket"],
});

export default socket