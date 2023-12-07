import CreateEmployee from './CreateEmployee';
import EmployeeTable from './EmployeeTable';
import FindEmployee from './FindEmployee';
import './Navbar.css'
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import UpdateEmployee from './UpdateEmployee';
import LeavesTable from './Leaves';
import CreateLeave from './CreateLeave';

const Navbar = () => {

  return (
    <Router>
      <nav>
        <ul className='list'>
          <li className='items'> <Link to="/EmployeeTable">Employees</Link> </li>
          <li className='items'> <Link to="/CreateEmployee">Create Employee</Link> </li>
          <li className='items'> <Link to="/FindEmployee">Find Employee</Link></li>
          <li className='items'> <Link to="/UpdateEmployee">Update Employee</Link></li>
          <li className='items'> <Link to="/Leaves">Leaves</Link></li>
          <li className='items'> <Link to="/CreateLeave">AddLeave</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/EmployeeTable" element={<EmployeeTable />}/>
        <Route path="/CreateEmployee" element={<CreateEmployee />}/>
        <Route path="/FindEmployee" element={<FindEmployee />}/>
        <Route path="/UpdateEmployee" element={<UpdateEmployee />}/>
        <Route path="/Leaves" element={<LeavesTable />}/>
        <Route path="/CreateLeave" element={<CreateLeave />}/>
      </Routes>
    </Router>
  );
}

export default Navbar