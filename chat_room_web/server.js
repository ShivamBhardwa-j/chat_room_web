// Import required modules
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

// Create an Express application
const app = express();

// Create a HTTP server and bind it with Express
const server = http.createServer(app);

// Bind the HTTP server to socket.io for WebSocket connections
const io = socketIo(server);

// Serve the frontend files
app.use(express.static(path.join(__dirname)));

// Handle socket connection events
io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for 'chat message' events from clients
    socket.on('chat message', (msg) => {
        // Broadcast the message to all connected clients
        io.emit('chat message', msg);
    });

    // Handle user disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Define the port the server will listen on
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

