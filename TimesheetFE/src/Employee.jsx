import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Button from '@mui/material/Button';


const Employee = ({ props }) => {
  const [employee, setEmployee] = useState({});
  const [id, setId] = useState(props.id);
  const [open, setOpen] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  function avatarInitials(lastName,firstName)
  {
    return lastName.charAt(0) + firstName.charAt(0);
  }

  useEffect(() => {
    if (!id) return;


    fetch("https://localhost:7209/api/employee/" + id)
      .then(res => res.json())
      .then(
        (result) => {
          setEmployee(result);
        }
      );
  }, [id])

  return (

    <div>
      <VisibilityIcon onClick={handleClickOpen}></VisibilityIcon>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Employee Details</DialogTitle>
        <DialogContent>
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Avatar
              alt={employee.lastName}
              sx={{ width: 60, height: 60 }}
              children={avatarInitials(employee.lastName, employee.firstName)}/>
            <h2>{employee.lastName} {employee.firstName} ({employee.employeeId})</h2>
            <h3>Job Title: {employee.jobTitle}</h3>
            <h3>Department: {employee.departmentName}</h3>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Return</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Employee