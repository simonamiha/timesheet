import React from 'react'
import './App.css'
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Cookies from 'js-cookie';
import UpdateLeave from './UpdateLeave';
import DeleteLeave from './DeleteLeave';
import CreateLeave from './CreateLeave';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';

const Dashboard = () => {
    //log in based on user id
    const [id, setId] = useState();
    const [employee, setEmployee] = useState({});
    const [leaves, setLeaves] = useState([]);


    useEffect(() => {
        const fetchId = async () => {
            try {
                fetch("https://localhost:7209/api/Leave/getcurrentuser", {
                    headers: {'Authorization': 'Bearer '+ Cookies.get('token')}
                    })
                    .then(res => res.json())
                    .then(
                        (result) => {
                            setId(result.id);
                            }
                        )
                } catch (err) { }
            };

        const fetchEmployee = async () => {
            try {
                fetch("https://localhost:7209/api/employee/" + id)
                    .then(res => res.json())
                    .then(
                        (result) => {
                            setEmployee(result);
                        }
                    );
            } catch (err) {
                console.log(err);
                throw err;
             }
        };

        const fetchLeaves = async () => {
            try {
                fetch("https://localhost:7209/api/Leave/getemployeeleaves?id=" + id, {
                    headers: {'Authorization': 'Bearer '+ Cookies.get('token')}
                }
                )
                    .then(res => res.json())
                    .then(
                        (result) => {
                            setLeaves(result);
                        }
                    );
            } catch (err) {
                console.log(err);
                throw err;
             }
        };

        fetchId().then( () => {
            fetchEmployee();
            fetchLeaves();
        });

    }, [id]);


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
                        employeeId: params.row.employeeId,
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
                    //change={handleState}
                    props={{
                        leaveId: params.row.leaveId
                    }} />;
            }
        }
    ]


    return (
        <Box sx={{  
                    display: "flex",
                    bgcolor: "#f9f9f9",
                    borderRadius: 3,
                    flexDirection: "column",
                    justifyContent: "flex-start", 
                    alignItems: "flex-start",
                    ml:"30rem",
                    mr:"30rem", 
                    p: 2}}>
                <Avatar
                    alt={employee.lastName}
                    sx={{ width: 60, height: 60 }}
                />
                <Typography variant="h5">
                    {employee.lastName} {employee.firstName}
                </Typography>
                <Typography variant="caption" gutterBottom>
                Id: {employee.id}
                </Typography>
                <Typography variant="h6">
                    Job Title: {employee.jobTitle}
                </Typography>
                <Typography variant="h6">
                    Department: {employee.departmentName}
                </Typography>
            <Divider flexItem>Leaves</Divider>
            <CreateLeave 
                    props={{
                        employeeId: employee.id
                    }} />
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
        </Box>
    );
}

export default Dashboard;