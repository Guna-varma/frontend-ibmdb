// File: EmployeeForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const EmployeeForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    id: '',
    employeeId: '',
    firstName: '',
    lastName: '',
    bloodGroup: '',
  });

  const isEdit = location.state?.employee;

  useEffect(() => {
    if (isEdit) {
      setFormData({
        id: location.state.employee.id || '',
        employeeId: location.state.employee.employeeId || '',
        firstName: location.state.employee.firstName || '',
        lastName: location.state.employee.lastName || '',
        bloodGroup: location.state.employee.bloodGroup || '',
      });
    }
  }, [isEdit, location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await axios.put('http://localhost:8090/empl/update', formData);
        alert('Employee updated successfully!');
      } else {
        await axios.post('http://localhost:8090/empl/add', formData);
        alert('Employee created successfully!');
      }
      navigate('/'); // Go back to Screen 1
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit the form. Please try again.');
    }
  };

  const handleClear = () => {
    setFormData({
        id : '',
      employeeId: '',
      firstName: '',
      lastName: '',
      bloodGroup: '',
    });
  };

  return (
    <div>
      <h2>{isEdit ? 'Edit Employee' : 'Create Employee'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Employee ID:</label>
          <input
            type="text"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            disabled={isEdit}
            required
          />
        </div>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Blood Group:</label>
          <input
            type="text"
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit">Submit</button>
          <button type="button" onClick={handleClear}>Clear Fields</button>
          <button type="button" onClick={() => navigate('/')}>Back</button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
