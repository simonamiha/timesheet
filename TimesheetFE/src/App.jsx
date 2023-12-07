import { useState } from 'react'
import './App.css'
import Navbar from './Navbar';
import './Navbar.css'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export default function App() {

  const [query, setQuery] = useState("");

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <Navbar />
      </div>
    </LocalizationProvider>
  );
}
