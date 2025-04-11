import React from 'react';

const FilterBar = ({ statusFilter, dateFilter, onStatusChange, onDateChange }) => {
  return (
    <div className="flex flex-wrap gap-6 mb-8 p-6 bg-white rounded-lg shadow-lg backdrop-blur-lg bg-opacity-90">
      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Filter by Status
        </label>
        <select
          className="w-full px-4 py-2 rounded-lg border-2 border-indigo-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Filter by Date
        </label>
        <select
          className="w-full px-4 py-2 rounded-lg border-2 border-indigo-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
          value={dateFilter}
          onChange={(e) => onDateChange(e.target.value)}
        >
          <option value="all">All Time</option>
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;