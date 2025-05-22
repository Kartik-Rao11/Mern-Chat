import { io } from 'socket.io-client';
const socket = io('https://mern-chat-production-7758.up.railway.app/');
export default socket;