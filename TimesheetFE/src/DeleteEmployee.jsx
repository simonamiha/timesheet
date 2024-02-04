import { useState } from 'react'
import './App.css'
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';


const DeleteEmployee = ({ props, change }) => {

    const [employeeId, setEmployeeId] = useState(props.employeeId);

    const [openDialog, setOpenDialog] = useState(false);

    const handleClickOpen = () => {
        setOpenDialog(true); 
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            let res = await fetch("https://localhost:7209/api/Employee/deleteEmployee?id=" + employeeId, {
                method: 'DELETE',
            });

            if (res.status === 200) {
                alert("Employee deleted.");
                setOpenDialog(false);
                console.log(employees => employees.filter(employeeId => employees.employeeId !== employeeId))
                change(employees => employees.filter(employeeId => employees.employeeId !== employeeId));
            } else {
                alert("Some error occured."); 
            }
        } catch (err) {
            console.log(err);
        }
};

    return (
        <div>
            <DeleteIcon onClick={handleClickOpen}>
            </DeleteIcon>
            <Dialog open={openDialog} onClose={handleClose}>
                <DialogTitle id="alert-dialog-title">
                    Are you sure you want to delete employee number {employeeId}?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" onClick={handleSubmit}>Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default DeleteEmployee;