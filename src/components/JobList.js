import React from 'react';
import API from '../api';

const JobList = ({ jobs, onDelete, onStatusChange }) => {
  const handleDelete = async (id) => {
    await API.delete(`/api/jobs/${id}`);
    onDelete();
  };

  const handleStatusUpdate = async (id, newStatus) => {
    await API.patch(`/api/jobs/${id}`, { status: newStatus });
    onStatusChange();
  };

  return (
    <div>
      {jobs.map((job) => (
        <div key={job._id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
          <h3>{job.company} - {job.role}</h3>
          <p>Status: {job.status}</p>
          <p>Date: {new Date(job.appliedDate).toLocaleDateString()}</p>
          <p><a href={job.link} target="_blank" rel="noopener noreferrer">Link</a></p>
          <select value={job.status} onChange={(e) => handleStatusUpdate(job._id, e.target.value)}>
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
          <button onClick={() => handleDelete(job._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default JobList;
