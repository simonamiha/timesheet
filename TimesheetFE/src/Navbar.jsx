import CreateEmployee from './CreateEmployee';
import EmployeeTable from './EmployeeTable';
import FindEmployee from './FindEmployee';
import './Navbar.css'
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import UpdateEmployee from './UpdateEmployee';

const Navbar = () => {

  return (
    <Router>
      <nav>
        <ul className='list'>
          <li className='items'> <Link to="/EmployeeTable">Employees</Link> </li>
          <li className='items'> <Link to="/CreateEmployee">Create Employee</Link> </li>
          <li className='items'> <Link to="/FindEmployee">Find Employee</Link></li>
          <li className='items'> <Link to="/UpdateEmployee">Update Employee</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/EmployeeTable" element={<EmployeeTable />}/>
        <Route path="/CreateEmployee" element={<CreateEmployee />}/>
        <Route path="/FindEmployee" element={<FindEmployee />}/>
        <Route path="/UpdateEmployee" element={<UpdateEmployee />}/>
      </Routes>
    </Router>
  );
}

export default Navbar