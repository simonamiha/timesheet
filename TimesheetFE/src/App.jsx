import './App.css'
import Navbar from './Navbar';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Box from '@mui/material/Box';

export default function App() {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ width: '100%' }}>
        <Navbar />
        </Box>
    </LocalizationProvider>
  );
}
