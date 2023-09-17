import React, { useEffect, useState } from 'react'


const Employee = ({ id }) => {
  const [employee, setEmployee] = useState({});


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
      <table className='styled-table'>
        <thead>
          <tr>
            <th>Employee Id</th>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Job Title</th>
            <th>Department Name</th>
          </tr>
        </thead>
        <tbody>
          <tr key={employee.employeeId} className='active-row'>
            <td>{employee.employeeId}</td>
            <td>{employee.lastName}</td>
            <td>{employee.firstName}</td>
            <td>{employee.jobTitle}</td>
            <td>{employee.departmentName}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Employee