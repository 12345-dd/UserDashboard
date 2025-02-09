import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { UserList } from './components/UserList';
import { AddUser } from './components/AddUser';
import { EditUser } from './components/EditUser';

function App() {
  const [Users, setUsers] = useState([]);
  const [Error, setError] = useState(null); 
  const URL = "https://jsonplaceholder.typicode.com/users";

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await axios.get(URL);
        setUsers(res.data);
      } catch {
        setError("Failed to fetch users");  
      }
    };
    getAllUsers();
  }, [URL]);  

  return (
    <Container>
      <Typography variant="h3" gutterBottom style={{ textAlign: "center" }}>
        User Management Dashboard
      </Typography>
      {Error && <Typography color="error">{Error}</Typography>}  
      <Routes>
        <Route path="/" element={<UserList URL={URL} Users={Users} setUsers={setUsers} />} />
        <Route path="/addUser" element={<AddUser URL={URL} Users={Users} setUsers={setUsers} />} />
        <Route path="/edit/:id" element={<EditUser URL={URL} Users={Users} setUsers={setUsers} />} />
      </Routes>
    </Container>
  );
}

export default App;

