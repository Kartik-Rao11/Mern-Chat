import './App.css';
import React, { useState } from 'react';
function App() {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const joinChat = () => {
    if (username) setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Enter Username to Join</h2>
        <input value={username} onChange={e => setUsername(e.target.value)} />
        <button onClick={joinChat}>Join Chat</button>
      </div>
    );
  }

  return <p>Chat page</p>;
}

export default App;
