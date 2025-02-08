import { Container, Typography } from '@mui/material'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { UserList } from './components/UserList'
import { AddUser } from './components/AddUser'
import { EditUser } from './components/EditUser'

function App() {

  const URL = "https://jsonplaceholder.typicode.com/users";

  return (
    <Container>
      <Typography variant='h3' gutterBottom style={{textAlign:"center"}}>User Management Dashboard</Typography>
      <Routes>
        <Route path='/' element={<UserList URL={URL}/>}/>
        <Route path='/addUser' element={<AddUser URL={URL}/>}/>
        <Route path='/edit/:id' element={<EditUser URL={URL}/>}/>
      </Routes>
    </Container>
  )
}

export default App
