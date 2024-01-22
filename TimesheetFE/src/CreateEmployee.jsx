import { useState } from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Collapse from '@mui/material/Collapse';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const CreateEmployee = () => {
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [departmentName, setDepartmentName] = useState("");
    const [open, setOpen] = useState(false);

    const [error, setError] = useState(null);

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
            let res = await fetch('https://localhost:7209/api/employee/createemployee', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    lastName: lastName,
                    firstName: firstName,
                    jobTitle: jobTitle,
                    departmentName: departmentName,
                }),
            });
            let data = await res.json(); //you must save response from fetch in a different variable in order to access the properties
            if (res.status === 200) {
                setLastName("");
                setFirstName("");
                setJobTitle("");
                setDepartmentName("");
                setOpen(true);
            }
            else {
                var err = "";
                for (var i = 0; i < data.length; i++) {
                    err = err + "\r\n" + data[i].errorMessage;
                }
            }
            setError(err);

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Create Employee
            </Button>
            <Dialog open={openDialog} onClose={handleClose}>
                <DialogTitle>Create Employee</DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={handleSubmit} id="form"
                        sx={{ display: 'flex', flexWrap: "wrap", alignItems: 'flex-start', flexDirection: 'column' }}
                        noValidate
                        autoComplete="off"
                    >
                            <TextField
                                id="outlined-basic"
                                label="Last Name"
                                variant="outlined"
                                value={lastName}
                                onChange={(event) => setLastName(event.target.value)} />
                            <TextField
                                id="outlined-basic"
                                label="First Name"
                                variant="outlined"
                                value={firstName}
                                onChange={(event) => setFirstName(event.target.value)} />
                            <TextField
                                id="outlined-basic"
                                label="Job Title"
                                variant="outlined"
                                value={jobTitle}
                                onChange={(event) => setJobTitle(event.target.value)} />
                            <TextField
                                id="outlined-basic"
                                label="Department Name"
                                variant="outlined"
                                value={departmentName}
                                onChange={(event) => setDepartmentName(event.target.value)} />

                        <Collapse in={open}>
                            <Alert onClick={() => { setOpen(false); }}>Employee created successfuly!</Alert>
                        </Collapse>

                        {error &&
                            <Stack sx={{ width: '100%' }} spacing={2}>
                                <Alert severity="error">{error}</Alert>
                            </Stack>}
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

export default CreateEmployee;