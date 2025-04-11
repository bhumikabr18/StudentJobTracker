import React, { useState } from 'react';
import API from '../api';

const JobForm = ({ onJobAdded }) => {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    status: 'Applied',
    appliedDate: '',
    link: '',
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await API.post('/api/jobs', formData);
    setFormData({ company: '', role: '', status: 'Applied', appliedDate: '', link: '' });
    onJobAdded();
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <input name="company" placeholder="Company" value={formData.company} onChange={handleChange} required />
      <input name="role" placeholder="Role" value={formData.role} onChange={handleChange} required />
      <input name="appliedDate" type="date" value={formData.appliedDate} onChange={handleChange} required />
      <input name="link" placeholder="Link" value={formData.link} onChange={handleChange} />
      <select name="status" value={formData.status} onChange={handleChange}>
        <option>Applied</option>
        <option>Interview</option>
        <option>Offer</option>
        <option>Rejected</option>
      </select>
      <button type="submit">Add Job</button>
    </form>
  );
};

export default JobForm;
