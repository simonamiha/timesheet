import { useState } from "react";
import React from 'react'
import './App.css'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Cookies from 'js-cookie';

const Login = () => {
  const [userEmail, setUserEmail] = useState();
  const [password, setPassword] = useState();

  async function handleSubmit(e) {
    e.preventDefault()
    fetch('https://localhost:7209/api/Authentication/login',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: userEmail,
        passwordHash: password
      })
    })
    .then(data => data.json())
    .then(
      (data) => {
        Cookies.set('token', data.token);
        setUserEmail('')
        setPassword('')
      })
    };

  return(
    <Box component="form" onSubmit={handleSubmit} id="form"
      sx={{ display: 'flex', flexWrap: "wrap", alignItems: 'flex-start', flexDirection: 'column' }}
      noValidate
      autoComplete="off">
      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)} />
      <TextField
        id="outlined-basic"
        label="Password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)} />
      <Button type="submit" variant="contained" form="form">Submit</Button>
    </Box>
  )
};

export default Login;
