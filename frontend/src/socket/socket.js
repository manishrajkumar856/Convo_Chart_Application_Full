import { io } from "socket.io-client";

const SOCKET_URL = "https://convo-chart-application-full.onrender.com";

export const socket = io(SOCKET_URL, {
    autoConnect: false,
    transports: ["websocket"],
})
