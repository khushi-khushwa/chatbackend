const express = require('express');

const { createServer } = require('node:http'); 
const { Server } = require('socket.io'); 
const path = require('path')

const app = express();
const server = createServer(app); 
// const io = new Server(server); 

const io = new Server(server, {
    cors: {
        origin: "http://localhost:4200", 
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
}); 

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('user-message', (message) => {
        io.emit('user-message', message); 
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

app.use(express.static(path.resolve('./public')));

app.get('/', (req, res) => {
     return res.sendFile('/public/index.html'); 
});

server.listen(5000, () => {
    console.log('Server is running at port 5000');
});
