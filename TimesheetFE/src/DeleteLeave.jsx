import { useState } from 'react'
import './App.css'
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import LeavesTable from './Leaves';
import Cookies from 'js-cookie';


const DeleteLeave = ({ props, change }) => {

    const [leaveId, setLeaveId] = useState(props.leaveId);

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
            let res = await fetch("https://localhost:7209/api/Leave/deleteLeave?id=" + leaveId, {
                method: 'DELETE',
                headers: {'Authorization': 'Bearer '+ Cookies.get('token')}
            });

            if (res.status === 200) {
                alert("Leave deleted.");
                setOpenDialog(false);
                console.log(leaves => leaves.filter(leaveId => leaves.leaveId !== leaveId))
                change(leaves => leaves.filter(leaveId => leaves.leaveId !== leaveId));
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
                    Are you sure you want to delete leave ID {leaveId}?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" onClick={handleSubmit}>I am sure</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default DeleteLeave;