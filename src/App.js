// File: Main.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard'; // Screen 1
import EmployeeForm from './components/EmployeeForm'; // Screen 2
import 'bootstrap/dist/css/bootstrap.min.css';



const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/employee" element={<EmployeeForm />} />
    </Routes>
  </Router>
);

export default App;
