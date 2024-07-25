import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, loginUser, updateUser, deleteUser } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import './UserManagement.css';

const UserManagement = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  const handleRegister = useCallback(() => {
    dispatch(registerUser({ username, email, password }));
    console.log(username);
    alert('User registered successfully!');
    navigate('/');
  }, [dispatch, username, email, password, navigate]);

  const handleLogin = useCallback(() => {
    dispatch(loginUser({ username, password }));
    alert('User logged in successfully!');
    navigate('/');
  }, [dispatch, username, password, navigate]);

  const handleUpdate = useCallback(() => {
    dispatch(updateUser({ id: 1, username, email, password }));
    alert('User updated successfully!');
  }, [dispatch, username, email, password]);

  const handleDelete = useCallback(() => {
    dispatch(deleteUser(1));
    alert('User deleted successfully!');
  }, [dispatch]);

  return (
    <div>
      <h1>Login/Register</h1>
      <div className="user-management">
      {!user && (
        <>
        <h3>Register</h3>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleRegister}>Register</button>
        
        <h3>Login</h3>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin}>Login</button>
        </>
        )}
        {user && (
            <>
        <p>Logged in as: {user.username}</p>
        <h3>Update</h3>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleUpdate}>Update</button>
        
        <h3>Delete</h3>
        <button onClick={handleDelete}>Delete Account</button>
        </>
        )}
      </div>
    </div>
  );
};

export default UserManagement;