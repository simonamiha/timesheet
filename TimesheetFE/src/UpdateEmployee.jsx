import { useState } from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';

const UpdateEmployee = () => {
    const [employeeId, setEmployeeId] = useState("");
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [departmentName, setDepartmentName] = useState("");
    const [open, setOpen] = useState(false);

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            let res = await fetch('https://localhost:7209/api/employee/updateemployee', {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    employeeId: employeeId,
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
        <Box component="form" onSubmit={handleSubmit} sx={{ '& > :not(style)': { m: 1, width: '25ch' }, }}
            noValidate
            autoComplete="off"
        >
            <fieldset>
                <TextField id="outlined-basic" label="Emploee Id" variant="outlined" value={employeeId} onChange={(event) => setEmployeeId(event.target.value)} />
                <TextField id="outlined-basic" label="Last Name" variant="outlined" value={lastName} onChange={(event) => setLastName(event.target.value)} />
                <TextField id="outlined-basic" label="First Name" variant="outlined" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
                <TextField id="outlined-basic" label="Job Title" variant="outlined" value={jobTitle} onChange={(event) => setJobTitle(event.target.value)} />
                <TextField id="outlined-basic" label="Department Name" variant="outlined" value={departmentName} onChange={(event) => setDepartmentName(event.target.value)} />
            </fieldset>

            <Button type="submit" variant="contained">Submit</Button>

            <Collapse in={open}>
                <Alert onClick={() => {setOpen(false);}}>Employee updated successfuly!</Alert>
            </Collapse>
        </Box>
    )
}

export default UpdateEmployee;