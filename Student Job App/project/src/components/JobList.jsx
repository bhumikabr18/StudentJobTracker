import React from 'react';
import { format } from 'date-fns';

const JobList = ({ jobs, onStatusUpdate, onDelete }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Applied':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Interview':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Offer':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="mt-6">
      <div className="overflow-x-auto rounded-lg shadow-xl">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-gradient-to-r from-indigo-50 to-purple-50">
            <tr>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Company
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Role
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Applied Date
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {jobs.map((job) => (
              <tr key={job._id} className="hover:bg-gray-50 transition duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    <a 
                      href={job.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-indigo-600 transition duration-150"
                    >
                      {job.company}
                    </a>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{job.role}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    className={`text-sm rounded-full px-4 py-1 border ${getStatusColor(job.status)} transition duration-150 cursor-pointer`}
                    value={job.status}
                    onChange={(e) => onStatusUpdate(job._id, e.target.value)}
                  >
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Offer">Offer</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {format(new Date(job.appliedDate), 'MMM dd, yyyy')}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onDelete(job._id)}
                    className="text-red-500 hover:text-red-700 font-medium transition duration-150"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobList;