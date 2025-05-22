## Description

The MERN Chat App is a full-stack real-time messaging application built using the MERN stack (MongoDB, Express.js, React, Node.js) with Socket.IO for real-time communication.

It allows users to:

1. See online/offline users

2. Select a user and initiate a private chat

3. Send and receive real-time messages

4. View previous chat history

5. See "user is typing" indicators


## Demo

- **Live Demo**: Click [here](https://website-generator-kr.vercel.app/) to view the live demo.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Kartik-Rao11/Mern-Chat.git
   ```

2. Change to project directory:

   ```bash
   cd Mern-Chat
   ```

3. Install Frontend Dependencies:

   ```bash
   cd chat-frontend
   npm install
   ```

4. Install Backend Dependencies:

   ```bash
   cd ../chat-backend
   npm install
   ```

5. Set up Environment Variables:
   Backend:

   ```bash
   cd ../chat-backend
   cp .env.example .env
   # Edit backend .env with your configuration
   ```

6. Start Frontend Development Server:

   ```bash
   cd ../chat-frontend
   npm run start
   ```

7. Start Backend Server:
   ```bash
   cd ../chat-backend
   npm run start
   ```