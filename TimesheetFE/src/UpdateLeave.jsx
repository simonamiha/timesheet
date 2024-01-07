import { useState } from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';

const UpdateLeave = ({props}) => {
    const [leaveId, setLeaveId] = useState(props.leaveId);
    const [employeeId, setEmployeeId] = useState(props.employeeId);
    const [leaveStartDate, setLeaveStartDate] = useState(dayjs("2023-12-07"));
    const [leaveEndDate, setLeaveEndDate] = useState(dayjs("2023-12-07"));
    const [leaveStatus, setLeaveStatus] = useState(0);
    const [open, setOpen] = useState(false);

    const [openDialog, setOpenDialog] = useState(false);

    const handleClickOpen = () => {
        setOpenDialog(true);
      };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const LeaveStatus = {
        Approved: 0,
        Rejected: 1,
        Pending: 2,
        Cancelled: 3
    }

    const handleSubmit = async event => {
        event.preventDefault();
        var finalStartDate = leaveStartDate.format("YYYY-MM-DD");
        var finalEndDate = leaveEndDate.format("YYYY-MM-DD");
        try {
            let res = await fetch('https://localhost:7209/api/Leave/updateLeave', {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    leaveId: leaveId,
                    employeeId: employeeId,
                    leaveStartDate: finalStartDate,
                    leaveEndDate: finalEndDate,
                    leaveStatus: leaveStatus,
                }),
            });
            await res.json();
            if (res.status === 200) {
                setLeaveId("");
                setEmployeeId("");
                setLeaveStartDate("");
                setLeaveEndDate("");
                setLeaveStatus("");
                setOpen(true);
            } else {
                alert("Some error occured.");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div>
            <EditIcon onClick={handleClickOpen}>
            </EditIcon>
            <Dialog open={openDialog} onClose={handleClose}>
                <DialogTitle>Edit Leave</DialogTitle>
                <DialogContent>
                    <Box 
                    component="form" onSubmit={handleSubmit} id="form"
                    sx={{ '& > :not(style)': { m: 1, width: '25ch' }, }}
                        noValidate
                        autoComplete="off"
                    >       
                            <TextField id="outlined-basic" label="Leave Id" variant="outlined" value={leaveId} onChange={(event) => setLeaveId(event.target.value)} />
                            <TextField id="outlined-basic" label="Employee Id" variant="outlined" value={employeeId} onChange={(event) => setEmployeeId(event.target.value)} />
                            <DatePicker
                                value={leaveStartDate}
                                format="YYYY/MM/DD"
                                onChange={(newValue) => setLeaveStartDate(newValue)}
                            />
                            <DatePicker
                                value={leaveEndDate}
                                format="YYYY/MM/DD"
                                onChange={(newValue) => setLeaveEndDate(newValue)}
                            />
                            <Select variant="outlined" onChange={(_, newValue) => setLeaveStatus(Number(newValue))}>
                                <Option value={LeaveStatus.Approved}>Approved</Option>
                                <Option value={LeaveStatus.Rejected}>Rejected</Option>
                                <Option value={LeaveStatus.Pending}>Pending</Option>
                                <Option value={LeaveStatus.Cancelled}>Cancelled</Option>
                            </Select>

                        <Collapse in={open}>
                            <Alert onClick={() => { setOpen(false); }}>Leave added successfuly!</Alert>
                        </Collapse>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" variant="contained" form="form">Submit</Button>
                </DialogActions>
            </Dialog>
            </div>
        </LocalizationProvider>

    )
}

export default UpdateLeave;