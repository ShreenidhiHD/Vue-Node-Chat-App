const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors'); 

const app = express();
app.use(cors()); 

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost", 
    methods: ["GET", "POST"]
  }
});


// io.on('connection', (socket) => {
//     socket.on('message', (msg) => {
//         const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
//         socket.broadcast.emit('message', {
//           text: msg.text,
//           timestamp: timestamp,
//           senderId: socket.id
//         });
//       });
      
//   });
function createRoomId(userId, otherUserId) {
  return [userId, otherUserId].sort().join('-');
}
io.on('connection', (socket) => {
  // When a user joins a chat, join them to a room with a unique ID
  socket.on('joinChat', (userId, otherUserId) => {
    console.log(`User ${userId} joined chat with user ${otherUserId}`);
    const room = createRoomId(userId, otherUserId);
    socket.join(room);

    // When a user sends a message, broadcast it to the room
    socket.on('message', (msg) => {
      const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
      io.to(room).emit('message', {
        text: msg.text,
        timestamp: timestamp,
        senderId: userId
      });
    });

    // When a user leaves a chat, remove them from the room
    socket.on('leaveChat', () => {
      socket.leave(room);
    });
  });

  // When a user disconnects, remove them from all rooms
  socket.on('disconnect', () => {
    socket.rooms.forEach(room => socket.leave(room));
  });
});


  
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
