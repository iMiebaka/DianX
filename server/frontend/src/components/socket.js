import { io } from "socket.io-client";

const socket = io("ws://localhost:3333/", {
    reconnectionDelayMax: 10000,
    transports: ["websocket"],
});

export default socket