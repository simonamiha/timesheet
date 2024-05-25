import React from 'react'
import './App.css'
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Cookies from 'js-cookie';
import Login from './Login';
import { Link } from 'react-router-dom';   

const Dashboard = () => {

    //log in based on user id
    const [employee, setEmployee] = useState({});
    //const [id, setId] = useState(props.id);
    const [leaves, setLeaves] = useState([]);

    useEffect(() => {

        const fetchEmployee = async () => {
            try {
                fetch("https://localhost:7209/api/employee/" + '466616d6-26e6-4f50-9949-557d9175424d')
                    .then(res => res.json())
                    .then(
                        (result) => {
                            setEmployee(result);
                        }
                    );
            } catch (err) { }
        };

        const fetchLeaves = async () => {
            try {
                fetch("https://localhost:7209/api/Leave/getemployeeleaves/" + '466616d6-26e6-4f50-9949-557d9175424d')
                    .then(res => res.json())
                    .then(
                        (result) => {
                            setLeaves(result);
                        }
                    );
            } catch (err) { }
        };

        fetchEmployee();
        fetchLeaves();
    }
    //, [id]
);
    const token = Cookies.get('token');

    if (!token) {
        return (
          <>
            <main style={{ padding: '50px' }}>
              <p>You&apos;re not logged in.</p>
              <Link href={'/login'}>Login</Link>
            </main>
          </>
        )
      }

    const colums = [
        { field: "leaveId", headerName: "Leave ID" },
        { field: "id", headerName: "Employee ID" },
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
                        employeeId: params.row.id,
                        leaveStartDate: params.row.leaveStartDate,
                        leaveEndDate: params.row.leaveEndDate,
                        leaveStatus: params.row.leaveStatus
                    }} />;
            }
        },
        {
            field: "delete",
            headerName: "Delete",
            renderCell: (params) => {

                return <DeleteLeave
                    change={handleState}
                    props={{
                        leaveId: params.row.leaveId
                    }} />;
            }
        }
    ]


    return (
        <Box>
            <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
            >
                <Avatar
                    alt={employee.lastName}
                    sx={{ width: 60, height: 60 }}
                />
                <h2>{employee.lastName} {employee.firstName} ({employee.id})</h2>
                <h3>Job Title: {employee.jobTitle}</h3>
                <h3>Department: {employee.departmentName}</h3>
            </Stack>
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

export default Dashboard