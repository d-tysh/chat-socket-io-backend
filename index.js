const { createServer } = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const httpServer = createServer();

const { ALLOWED_URL, PORT = 3000 } = process.env;

const wsServer = new Server(httpServer, {
    cors: {
        origin: ALLOWED_URL
    }
})

wsServer.on("connection", (socket) => {
    socket.on("chat-message", (data) => {
        socket.broadcast.emit("chat-message", data);
    })
})

wsServer.on("connection", (socket) => {
    socket.on("chat-user", (user) => {
        const systemMessage = {
            name: 'SYSTEM',
            message: `${user} joined to chat`
        }
        socket.broadcast.emit("chat-user", systemMessage);
    })
})

httpServer.listen(PORT, () => {
    console.log(`Server started on the port ${PORT}`);
})