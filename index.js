const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const httpServer = createServer(app);

const { ALLOWED_URL, PORT = 3000 } = process.env;

const wsServer = new Server(httpServer, {
    cors: {
        origin: ALLOWED_URL
    }
})

wsServer.on("connection", (socket) => {
    let userName;

    socket.on("chat-user", (user) => {
        userName = user;
        const { size } = wsServer.sockets.adapter.rooms;
        const systemMessage = {
            name: 'SYSTEM',
            message: `${user} joined to chat`,
            usersCount: size
        }
        socket.emit("chat-user", systemMessage);
        socket.broadcast.emit("chat-user", systemMessage);
    })

    socket.on("chat-message", (data) => {
        socket.broadcast.emit("chat-message", data);
    })

    socket.on('disconnect', () => {
        const { size } = wsServer.sockets.adapter.rooms;
        const systemMessage = {
            name: 'SYSTEM',
            message: `${userName} left the chat`,
            usersCount: size
        }
        socket.broadcast.emit("chat-user", systemMessage);
    })
})

httpServer.listen(PORT, () => {
    console.log(`Server started on the port ${PORT}`);
})