import React from 'react';
import './App.css';
import { useState, useEffect } from "react";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid } from '@mui/x-data-grid';
import Edit from '@mui/icons-material/Edit';

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

  const colums = [
    {field: "leaveId", headerName: "Leave ID"},
    {field: "employeeId", headerName: "Employee ID"},
    {field: "leaveStartDate", headerName: "Start Date"},
    {field: "leaveEndDate", headerName: "End Date"},
    {field: "leaveStatus", headerName: "Leave Status"},
    {field: "edit",
    headerName: "Edit",
    renderCell: (params) => {
      const onClick = (e) => {

        //return alert(JSON.stringify(params.leaves.leaveId));
        console.log(params);
        return alert(JSON.stringify(params.row.leaveId));

    };

    return <EditIcon onClick={onClick}></EditIcon>
  }}
  ]

  return (
      <DataGrid
        rows={leaves}
        columns={colums}
        getRowId={(row) => row.leaveId}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10]}
      />
  );
}

export default LeavesTable