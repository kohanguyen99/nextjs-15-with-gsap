import { io } from "socket.io-client";

export const socket = io('ws://localhost:8080');

socket.on('enter_message', text => {
    // console.log("vo day");
    return text;
});

export const enterRoom = (callback : (user: string) => void) => {
    socket.on('enter_room', callback);
}

