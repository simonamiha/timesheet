import { useState } from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Collapse from '@mui/material/Collapse';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

const CreateLeave = () => {
    const [employeeId, setEmployeeId] = useState("");
    const [leaveStartDate, setLeaveStartDate] = useState(dayjs("2023-12-07"));
    const [leaveEndDate, setLeaveEndDate] = useState(dayjs("2023-12-07"));
    const [leaveStatus, setLeaveStatus] = useState(0);

    const [open, setOpen] = useState(false);

    const LeaveStatus = {
        Approved : 0, 
        Rejected : 1,
        Pending : 2,
        Cancelled : 3
    }

    const [error, setError] = useState(null);

    const handleSubmit = async event => {
        event.preventDefault();
        var finalStartDate = leaveStartDate.format("YYYY-MM-DD");
        var finalEndDate = leaveEndDate.format("YYYY-MM-DD");
        try {
            let res = await fetch('https://localhost:7209/api/Leave/addleave', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    employeeId: employeeId,
                    leaveStartDate: finalStartDate,
                    leaveEndDate: finalEndDate,
                    leaveStatus: leaveStatus,
                }),
            });
            let data = await res.json(); //you must save response from fetch in a different variable in order to access the properties
            if (res.status === 200) {
                setEmployeeId("");
                setLeaveStartDate("");
                setLeaveEndDate("");
                setLeaveStatus("");
                setOpen(true);
            } 
            else {
                var err = "";
                for (var i = 0; i < data.length; i++)
                {   err = err + "\r\n" + data[i].errorMessage;
                };
            }
        setError(err);

        } catch (error) {
            console.log(error);
        }
    };

    return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box component="form" onSubmit={handleSubmit} sx={{ '& > :not(style)': { m: 1, width: '25ch' }, }}
            noValidate
            autoComplete="off"
        >
            <fieldset>
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
            </fieldset>
            <Button type="submit" variant="contained">Submit</Button>

            <Collapse in={open}>
                <Alert onClick={() => {setOpen(false);}}>Leave added successfuly!</Alert>
            </Collapse>

            {/* {error && 
            <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert severity="error">{error}</Alert>
            </Stack>} */}
        </Box>
    </LocalizationProvider>
    )
}

export default CreateLeave;