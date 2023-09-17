import React from 'react'
import './App.css'

class EmployeeTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: []
    };
  }

  componentDidMount() {
    fetch("https://localhost:7209/api/employee/getall")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            employees: result
          });
        }
      );
  }

  render() {
    return (
      <div>
        <h2>Employee Data</h2>
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
            {this.state.employees.map(emp => (
              <tr key={emp.employeeId} className='active-row'>
                <td>{emp.employeeId}</td>
                <td>{emp.lastName}</td>
                <td>{emp.firstName}</td>
                <td>{emp.jobTitle}</td>
                <td>{emp.departmentName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default EmployeeTable