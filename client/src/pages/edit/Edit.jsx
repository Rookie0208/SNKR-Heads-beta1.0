import React, { useState } from 'react';
import axios from 'axios';

const EditProfile = ({ user, onUpdate }) => {
  const [username, setUsername] = useState(user.username);
  const [desc, setDesc] = useState(user.desc);

  const handleUpdate = async () => {
    try {
      const updatedUser = await axios.put(`/users/${user._id}`, {
        username,
        desc,
      });
      onUpdate(updatedUser.data); // Pass the updated user data to the parent component
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <label>Username:</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label>Description:</label>
      <textarea
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      ></textarea>
      <button onClick={handleUpdate}>Update Profile</button>
    </div>
  );
};

export default EditProfile;
