import React from 'react';

const MessageList = ({ messages, currentUser, typingStatus }) => (
  <div style={{ height: 300, overflowY: 'auto', border: '1px solid #ccc', padding: 10 }}>
    {messages.map((msg, idx) => (
      <div key={idx} style={{ margin: '5px 0' }}>
        <b>{msg.from === currentUser ? 'You' : msg.from}:</b> {msg.content}
      </div>
    ))}
    {typingStatus && <div style={{ color: 'gray', fontStyle: 'italic' }}>{typingStatus}</div>}
  </div>
);

export default MessageList;
