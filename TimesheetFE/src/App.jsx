import { useState } from 'react'
import './App.css'
import Employee from './Employee';
import Navbar from './Navbar';
import './Navbar.css'

export default function App() {

  const [isShown, setIsShown] = useState(false);
  const [query, setQuery] = useState("");

  const handleClick = event => {
    setIsShown(current => !current);
  }

  return (
      <div>
        <Navbar />
      </div>
  );
}
