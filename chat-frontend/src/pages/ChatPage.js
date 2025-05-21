import  { useState, useEffect } from 'react';
import axios from 'axios';
import socket from '../socket';
import UserList from '../components/UserList';
import MessageList from '../components/MessageList';
import ChatBox from '../components/ChatBox';
const ChatPage = ({ username }) => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState('');


  // Set socket.io for real time communication and listening custom events
  useEffect(() => {
    socket.emit('join', { username });

    //update user list
    socket.on('update-user-list', (users) => {
      const updatedUsers = users.map((u) => ({
        username: u,
        online: true
      }));
      setOnlineUsers((prev) => {
        const prevUsernames = prev.map(u => u.username);
        const merged = [...updatedUsers];
        prev.forEach((oldUser) => {
          if (!users.includes(oldUser.username)) {
            merged.push({ username: oldUser.username, online: false });
          }
        });
        return merged;
      });
    });

    // on sending message
    socket.on('private-message', ({ from, content }) => {
      setMessages(prev => [...prev, { from, content }]);
    });

    // handling typing event
    socket.on('typing', ({ from }) => {
      setTypingStatus(`${from} is typing...`);
      setTimeout(() => setTypingStatus(''), 2000);
    });

    //resources clean up
    return () => {
      socket.off('update-user-list');
      socket.off('private-message');
      socket.off('typing');
    };
  }, [username]);

  const selectUser = async (user) => {
    setSelectedUser(user);
    const res = await axios.get(`http://localhost:5000/chat/${username}/${user}`);
    setMessages(res.data);
  };

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('private-message', {
        to: selectedUser,
        content: message,
      });
      setMessages(prev => [...prev, { from: username, content: message }]);
      setMessage('');
    }
  };

  const handleTyping = () => {
    if (selectedUser) {
      socket.emit('typing', { from: username, to: selectedUser });
    }
  };

 return (
    <div style={{ display: 'flex', padding: 20 }}>
      <UserList users={onlineUsers} currentUser={username} selectUser={selectUser} selectedUser={selectedUser}/>
      <div style={{ width: '70%', paddingLeft: 20 }}>
        <h3>Chat with {selectedUser || '...'}</h3>
        <MessageList messages={messages} currentUser={username} typingStatus={typingStatus} />
        <ChatBox
          selectedUser={selectedUser}
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
          handleTyping={handleTyping}
          typingStatus={typingStatus}
        />
      </div>
    </div>
  );
};

export default ChatPage;
