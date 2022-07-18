import { io } from "socket.io-client";

const socket = io("ws://192.168.43.64:3333/", {
    reconnectionDelayMax: 10000,
    transports: ["websocket"],
});

export default socket