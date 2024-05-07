import React from 'react';
import './App.css';
import { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import CreateLeave from './CreateLeave';
import UpdateLeave from './UpdateLeave';
import DeleteLeave from './DeleteLeave';


const LeavesTable = () => {
 
  const [show, setShow] = useState(false);

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

  function handleState(leaves){
    setLeaves(leaves);
  }

  const colums = [
    { field: "leaveId", headerName: "Leave ID" },
    { field: "employeeId", headerName: "Employee ID" },
    { field: "leaveStartDate", headerName: "Start Date" },
    { field: "leaveEndDate", headerName: "End Date" },
    { field: "leaveStatus", headerName: "Leave Status" },
    { field: "leaveType", headerName: "Leave Type" },
    {
      field: "edit",
      headerName: "Edit",
      renderCell: (params) => {

        return <UpdateLeave 
        props={{
          leaveId: params.row.leaveId, 
          employeeId: params.row.employeeId, 
          leaveStartDate: params.row.leaveStartDate, 
          leaveEndDate: params.row.leaveEndDate,
          leaveStatus: params.row.leaveStatus}}/>;
      }
    },
    {
      field: "delete",
      headerName: "Delete",
      renderCell: (params) => {
        
        return <DeleteLeave 
        change={handleState}
        props={{
          leaveId: params.row.leaveId }}/>;
      }
    }
  ]

  return (
    <Box>
      <CreateLeave />
      <DataGrid sx={{ m: 2 }}
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
    </Box>
  );
}

export default LeavesTable