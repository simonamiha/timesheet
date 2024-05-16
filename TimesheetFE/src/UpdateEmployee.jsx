import { useState } from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';

const UpdateEmployee = ({props}) => {
    const [employeeId, setEmployeeId] = useState(props.employeeId);
    const [lastName, setLastName] = useState(props.lastName);
    const [firstName, setFirstName] = useState(props.firstName);
    const [jobTitle, setJobTitle] = useState(props.jobTitle);
    const [departmentName, setDepartmentName] = useState(props.departmentName);
    const [open, setOpen] = useState(false);

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
            let res = await fetch('https://localhost:7209/api/employee/updateemployee', {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: employeeId,
                    lastName: lastName,
                    firstName: firstName,
                    jobTitle: jobTitle,
                    departmentName: departmentName,
                }),
            });
            await res.json();
            if (res.status === 200) {
                setEmployeeId("");
                setLastName("");
                setFirstName("");
                setJobTitle("");
                setDepartmentName("");
                setOpen(true);
            } else {
                alert("Some error occured.");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <EditIcon onClick={handleClickOpen}>
            </EditIcon>
            <Dialog open={openDialog} onClose={handleClose}>
                <DialogTitle>Edit Employee Details</DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={handleSubmit} sx={{ '& > :not(style)': { m: 1, width: '25ch' }, }} id="form"
                        noValidate
                        autoComplete="off"
                    >
                            <TextField disabled id="outlined-disabled" label="Emploee Id" variant="outlined" value={employeeId} onChange={(event) => setEmployeeId(event.target.value)} />
                            <TextField id="outlined-basic" label="Last Name" variant="outlined" value={lastName} onChange={(event) => setLastName(event.target.value)} />
                            <TextField id="outlined-basic" label="First Name" variant="outlined" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
                            <TextField id="outlined-basic" label="Job Title" variant="outlined" value={jobTitle} onChange={(event) => setJobTitle(event.target.value)} />
                            <TextField id="outlined-basic" label="Department Name" variant="outlined" value={departmentName} onChange={(event) => setDepartmentName(event.target.value)} />

                        <Collapse in={open}>
                            <Alert onClick={() => { setOpen(false); }}>Employee updated successfuly!</Alert>
                        </Collapse>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" variant="contained" form="form">Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default UpdateEmployee;