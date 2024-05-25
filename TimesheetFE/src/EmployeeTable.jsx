import React from 'react'
import './App.css'
import { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import CreateEmployee from './CreateEmployee';
import UpdateEmployee from './UpdateEmployee';
import DeleteEmployee from './DeleteEmployee';
import { useNavigate } from "react-router-dom";
import Employee from './Employee';

const EmployeeTable = () => {

  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    //const headers = {'Authorization': 'Bearer '+ {token}};
     fetch("https://localhost:7209/api/employee/getall"//, {headers}
      
     )
      .then(res => res.json())
      .then(
        (result) => {
          setEmployees(result);
        }
      );
  }, []);

  function handleState(employees) {
    setEmployees(employees);
  }

  const colums = [
    { field: "id", headerName: "Employee ID" },
    { field: "firstName", headerName: "First Name" },
    { field: "lastName", headerName: "Last Name" },
    { field: "jobTitle", headerName: "Job Title" },
    { field: "departmentName", headerName: "Department" },
    {
      field: "view",
      headerName: "View",
      renderCell: (params) => {

        return <Employee
        props = {{id : params.row.id}}/>;
      }
    },
    {
      field: "edit",
      headerName: "Edit",
      renderCell: (params) => {

        return <UpdateEmployee
          props={{
            employeeId: params.row.id,
            firstName: params.row.firstName,
            lastName: params.row.lastName,
            jobTitle: params.row.jobTitle,
            departmentName: params.row.departmentName
          }} />;
      }
    },
    {
      field: "delete",
      headerName: "Delete",
      renderCell: (params) => {

        return <DeleteEmployee
          change={handleState}
          props={{
            employeeId: params.row.id
          }} />;
      }
    }
  ]

  return (
    <Box>
      <CreateEmployee />
      <DataGrid sx={{ m: 2 }}
        rows={employees}
        columns={colums}
        getRowId={(row) => row.id}
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

export default EmployeeTable