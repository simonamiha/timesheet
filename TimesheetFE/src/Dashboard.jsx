import React from 'react'
import './App.css'
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';

const Dashboard = ({ props }) => {

    const [employee, setEmployee] = useState({});
    const [id, setId] = useState(props.id);

    useEffect(() => {
        if (!id) return;
    
    
        fetch("https://localhost:7209/api/employee/" + id)
          .then(res => res.json())
          .then(
            (result) => {
              setEmployee(result);
            }
          );
      }, [id])


  return (
    <Box>

    </Box>
  );
}

export default Dashboard