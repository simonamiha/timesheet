import { useState } from 'react'
import './App.css'
import Navbar from './Navbar';
import './Navbar.css'

export default function App() {

  const [query, setQuery] = useState("");

  return (
      <div>
        <Navbar />
      </div>
  );
}
