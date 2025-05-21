import React from 'react';

const ChatBox = ({ selectedUser, message, setMessage, sendMessage, handleTyping, typingStatus }) => (
  selectedUser && (
    <div style={{ marginTop: 10 }}>
      <input
        value={message}
        onChange={e => setMessage(e.target.value)}
        onInput={handleTyping}
        placeholder="Type your message"
        style={{ width: '80%' }}
      />
      <button onClick={sendMessage} style={{ marginLeft: 10 }}>Send</button>
      {typingStatus && (
        <div style={{ color: 'gray', fontStyle: 'italic', marginTop: 5 }}>
          {typingStatus}
        </div>
      )}
    </div>
  )
);

export default ChatBox;
