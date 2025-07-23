const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const PORT = process.env.PORT || 8080;

io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);

  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
    socket.to(roomId).emit('user-connected', socket.id);
  });

  socket.on('offer', (payload) => {
    io.to(payload.target).emit('offer', { ...payload, source: socket.id });
  });

  socket.on('answer', (payload) => {
    io.to(payload.target).emit('answer', { ...payload, source: socket.id });
  });

  socket.on('ice-candidate', (payload) => {
    io.to(payload.target).emit('ice-candidate', { ...payload, source: socket.id });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected:', socket.id);
    io.emit('user-disconnected', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Signaling server is running on port ${PORT}`);
});
