import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Table, TableHead, TableRow, TableCell, TableBody, Button, Snackbar, Alert } from "@mui/material";

export const UserList = ({URL}) => {
  const [Users, setUsers] = useState([]);
  const [Error, setError] = useState(null);
  const [Success, setSuccess] = useState(null);

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
  }, []);


  const handleDelete = async (id) => {
    try {
      await axios.delete(`${URL}/${id}`);
      setUsers(Users.filter((user) => user.id !== id));
      setSuccess("User deleted successfully");
    } catch {
      setError("Failed to delete user");
    }
  };

  return (
    <div>
      <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={!!Error} autoHideDuration={3000} onClose={() => setError(null)}>
        <Alert severity="error">{Error}</Alert>
      </Snackbar>
      <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={!!Success} autoHideDuration={3000} onClose={() => setSuccess(null)}>
        <Alert severity="success">{Success}</Alert>
      </Snackbar>
      <Button variant="contained" color="primary" component={Link} to="/addUser">Add User</Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Button variant="outlined" color="primary" component={Link} to={`/edit/${user.id}`}>Edit</Button>
                <Button variant="outlined" color="secondary" onClick={() => handleDelete(user.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
