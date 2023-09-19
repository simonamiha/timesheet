import { useState } from 'react'
import './App.css'
import EmployeeTable from './EmployeeTable'
import Employee from './Employee';
import Navbar from './Navbar';

export default function App() {

  const [isShown, setIsShown] = useState(false);
  const [query, setQuery] = useState("");

  const handleClick = event => {
    setIsShown(current => !current);
  }

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className='page-container'>
        <input placeholder="Enter Employee Id" className='input-smecher' onInput={event => setQuery(event.target.value)} />
        {query && <Employee id={query} />}
        <button onClick={handleClick}>Show All Employees</button>
        {isShown && <EmployeeTable />}
      </div>
    </div>
  );
}
