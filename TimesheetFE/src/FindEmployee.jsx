import { useState } from 'react'
import './App.css'
import Employee from './Employee';

const FindEmployee = () => {

  const [query, setQuery] = useState("");

  return (
    <div>
      <div className='page-container'>
        <input placeholder="Enter Employee Id" className='input-smecher' onInput={event => setQuery(event.target.value)} />
        {query && <Employee id={query} />}
      </div>
    </div>
  );
}

export default FindEmployee;