import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Container, Typography, Snackbar, Alert } from "@mui/material";

export const AddUser = ({ URL, Users, setUsers }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const nextId = Users.length > 0 ? Math.max(...Users.map(user => user.id)) + 1 : 1;
      const newUser = { id: nextId, name, email };

      await axios.post(URL, newUser);
      
      setUsers([...Users, newUser]);

      setSuccess("User added successfully!");
      setTimeout(() => {
        setSuccess(null);
        navigate("/");
      }, 2000);
    } catch {
      setError("Failed to add user");
    }
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: "center", paddingTop: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Add User
      </Typography>
      <Snackbar open={!!error} autoHideDuration={3000} onClose={() => setError(null)} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
      <Snackbar open={!!success} autoHideDuration={3000} onClose={() => setSuccess(null)} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert severity="success">{success}</Alert>
      </Snackbar>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <TextField label="Name" variant="outlined" fullWidth required value={name} onChange={(e) => setName(e.target.value)} />
        <TextField label="Email" variant="outlined" fullWidth required value={email} onChange={(e) => setEmail(e.target.value)} />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Container>
  );
};







