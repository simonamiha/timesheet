import EmployeeTable from './EmployeeTable';
import FindEmployee from './FindEmployee';
import './Navbar.css'
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import UpdateEmployee from './UpdateEmployee';
import LeavesTable from './Leaves';

const Navbar = () => {

  return (
    <Router>
      <nav>
        <ul className='list'>
          <li className='items'> <Link to="/EmployeeTable">Employees</Link> </li>
          <li className='items'> <Link to="/FindEmployee">Find Employee</Link></li>
          <li className='items'> <Link to="/Leaves">Leaves</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/EmployeeTable" element={<EmployeeTable />}/>
        <Route path="/FindEmployee" element={<FindEmployee />}/>
        <Route path="/Leaves" element={<LeavesTable />}/>
      </Routes>
    </Router>
  );
}

export default Navbar