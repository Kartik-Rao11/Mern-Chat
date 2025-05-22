const Message = require('./models/Message');

let onlineUsers = {};

const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('join', ({ username }) => {
      onlineUsers[username] = socket.id;
      io.emit('update-user-list', Object.keys(onlineUsers));
    });

    socket.on('private-message', async ({ to, content }) => {
      const from = Object.keys(onlineUsers).find(key => onlineUsers[key] === socket.id);
      const message = new Message({ from, to, content });
      await message.save();
      const toSocket = onlineUsers[to];
      if (toSocket) {
        io.to(toSocket).emit('private-message', { from, content });
      }
    });

    socket.on('typing', ({ to }) => {
      const from = Object.keys(onlineUsers).find(key => onlineUsers[key] === socket.id);
      const toSocket = onlineUsers[to];
      if (toSocket) {
        io.to(toSocket).emit('typing', { from });
      }
    });

    socket.on('disconnect', () => {
      const disconnectedUser = Object.keys(onlineUsers).find(key => onlineUsers[key] === socket.id);
      delete onlineUsers[disconnectedUser];
      io.emit('update-user-list', Object.keys(onlineUsers));
    });
  });
};

module.exports = socketHandler;