const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();
const socketHandler = require('./socket');
const chatRoutes = require('./routes/chatRoutes');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

console.log(process.env.FRONTEND_URL);
console.log(process.env.PORT);
console.log(process.env.MONGO_URI);

connectDB();

app.use(cors());
app.use(express.json());
app.use('/chat', chatRoutes);
socketHandler(io);

server.listen(process.env.PORT, () => console.log(`Server running on : ${process.env.PORT}`));