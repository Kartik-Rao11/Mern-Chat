import React from 'react';

const UserList = ({ users, currentUser, selectUser, selectedUser }) => (
  <div style={{ width: '30%', borderRight: '1px solid #ccc' }}>
    <h3>Users</h3>
    {users.map(({ username, online }) => (
      username !== currentUser && (
        <div
          key={username}
          onClick={() => selectUser(username)}
          style={{
            cursor: 'pointer',
            padding: '5px 0',
            fontWeight: selectedUser === username ? 'bold' : 'normal',
            color: online ? 'green' : 'gray'
          }}
        >
          {username} {online ? '(online)' : '(offline)'}
        </div>
      )
    ))}
  </div>
);

export default UserList;
