import { useState } from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const CreateEmployee = () => {
    const [lastName, setLastName] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [jobTitle, setJobTitle] = useState(null);
    const [departmentName, setDepartmentName] = useState(null);

    const [error, setError] = useState(null);

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
        <Box component="form" onSubmit={handleSubmit} sx={{ '& > :not(style)': { m: 1, width: '25ch' }, }}
            noValidate
            autoComplete="off"
        >
            <fieldset>
                <TextField id="outlined-basic" label="Last Name" variant="outlined" value={lastName} onChange={(event) => setLastName(event.target.value)} />
                <TextField id="outlined-basic" label="First Name" variant="outlined" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
                <TextField id="outlined-basic" label="Job Title" variant="outlined" value={jobTitle} onChange={(event) => setJobTitle(event.target.value)} />
                <TextField id="outlined-basic" label="Department Name" variant="outlined" value={departmentName} onChange={(event) => setDepartmentName(event.target.value)} />
            </fieldset>
            <Button type="submit" variant="contained">Submit</Button>

            {error && 
            <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert severity="error">{error}</Alert>
            </Stack>}
        </Box>
    )
}

export default CreateEmployee;