import { useState } from 'react'
import './App.css'
import Employee from './Employee';
import TextField from '@mui/material/TextField';

const FindEmployee = () => {

  const [query, setQuery] = useState("");

  return (
    <div>
      <div className='page-container'>
        <TextField placeholder="Enter Employee Id" className='input-smecher' id="outlined-basic" label="Employee Id" variant="outlined" onInput={event => setQuery(event.target.value)} />
        {query && <Employee id={query} />}
      </div>
    </div>
  );
}

export default FindEmployee;