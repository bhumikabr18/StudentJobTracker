import React from 'react';

const Filter = ({ filterStatus, onFilterChange }) => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label>Filter by Status: </label>
      <select value={filterStatus} onChange={(e) => onFilterChange(e.target.value)}>
        <option value="">All</option>
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Offer">Offer</option>
        <option value="Rejected">Rejected</option>
      </select>
    </div>
  );
};

export default Filter;
