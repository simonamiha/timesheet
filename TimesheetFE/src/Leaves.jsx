import React from 'react';
import './App.css';
import { useState, useEffect } from "react";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const LeavesTable = () => {

  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    fetch("https://localhost:7209/api/Leave/getall")
      .then(res => res.json())
      .then(
        (result) => {
          setLeaves(result);
        }
      );
  }, []);

  return (
    <div>
      <h2>Leaves Data</h2>
      <table className='styled-table'>
        <thead>
          <tr>
            <th>Leave Id</th>
            <th>Employee Id</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {leaves.map(lv => (
            <tr key={lv.leaveId} className='active-row'>
              <td>{lv.leaveId}</td>
              <td>{lv.employeeId}</td>
              <td>{lv.leaveStartDate}</td>
              <td>{lv.leaveEndDate}</td>
              <td>{lv.leaveStatus}</td>
              <td>
                <IconButton aria-label="edit">
                  <EditIcon />
                </IconButton>
              </td>
              <td>
                <IconButton aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeavesTable