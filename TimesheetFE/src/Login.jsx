import { useState } from "react";
import React from 'react'
import './App.css'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Cookies from 'js-cookie';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
//import { useLoginValidator } from "./useLoginValidator";


const Login = () => {
  const [userEmail, setUserEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
          if (!data.token){
            alert ("Incorrent email or password.");
          }
          else {
          Cookies.set('token', data.token);
          setUserEmail('');
          setPassword('');
          setOpen(true);
          }
        })
  };

  return(
    <Box component="form" onSubmit={handleSubmit} id="form"
      sx={{ display: 'flex', flexWrap: "wrap", alignItems: 'flex-start', flexDirection: 'column', padding: 1 }}
      noValidate
      autoComplete="off">
      <TextField
        id="outlined-basic"
        label="Email"
        margin="dense"
        variant="outlined"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)} />
          <TextField
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            margin="dense"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
                ),
            }}
            variant="outlined"
          />
          <Collapse in={open}>
            <Alert onClick={() => { setOpen(false); }}>You are now logged in!</Alert>
          </Collapse>
      <Button type="submit" variant="contained" form="form">Submit</Button>
    </Box>
  )
};

export default Login;
