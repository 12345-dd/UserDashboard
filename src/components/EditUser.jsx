import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Container, Typography, Snackbar, Alert } from "@mui/material";

export const EditUser = ({ URL, Users, setUsers }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const user = Users.find((u) => u.id === parseInt(id));
    if (user) {
      setName(user.name);
      setEmail(user.email);
    } else {
      setError("User not found");
    }
  }, [Users, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${URL}/${id}`, { id, name, email });

      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === parseInt(id) ? { ...user, name, email } : user))
      );

      setSuccess("User updated successfully!");

      setTimeout(() => {
        setSuccess(null);
        navigate("/");
      }, 2000);
    } catch {
      setError("Failed to update user");
    }
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: "center", paddingTop: "20px" }}>
      <Typography variant="h4" gutterBottom>Edit User</Typography>
      <Snackbar open={!!error} autoHideDuration={3000} onClose={() => setError(null)} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
      <Snackbar open={!!success} autoHideDuration={3000} onClose={() => setSuccess(null)} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert severity="success">{success}</Alert>
      </Snackbar>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <TextField label="Name" variant="outlined" fullWidth required value={name} onChange={(e) => setName(e.target.value)} />
        <TextField label="Email" variant="outlined" fullWidth required value={email} onChange={(e) => setEmail(e.target.value)} />
        <Button type="submit" variant="contained" color="primary">Update</Button>
      </form>
    </Container>
  );
};


