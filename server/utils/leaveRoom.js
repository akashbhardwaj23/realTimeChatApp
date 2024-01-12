
function leaveRoom({ id, users }) {
    users = users.filter((user) => user.id !== id);
    return users;
  }
export default leaveRoom;