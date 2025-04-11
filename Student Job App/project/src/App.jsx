import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { toast, Toaster } from 'react-hot-toast';
import JobForm from './components/JobForm';
import JobList from './components/JobList';
import FilterBar from './components/FilterBar';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function App() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    filterJobs();
  }, [jobs, statusFilter, dateFilter]);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/jobs`);
      setJobs(response.data);
    } catch (error) {
      toast.error('Failed to fetch jobs');
    }
  };

  const filterJobs = () => {
    let filtered = [...jobs];

    if (statusFilter !== 'all') {
      filtered = filtered.filter(job => job.status === statusFilter);
    }

    if (dateFilter !== 'all') {
      const today = new Date();
      switch (dateFilter) {
        case 'week':
          filtered = filtered.filter(job => {
            const jobDate = new Date(job.appliedDate);
            return (today - jobDate) / (1000 * 60 * 60 * 24) <= 7;
          });
          break;
        case 'month':
          filtered = filtered.filter(job => {
            const jobDate = new Date(job.appliedDate);
            return (today - jobDate) / (1000 * 60 * 60 * 24) <= 30;
          });
          break;
      }
    }

    setFilteredJobs(filtered);
  };

  const addJob = async (jobData) => {
    try {
      const response = await axios.post(`${API_URL}/api/jobs`, jobData);
      setJobs([...jobs, response.data]);
      toast.success('Job application added successfully');
    } catch (error) {
      toast.error('Failed to add job application');
    }
  };

  const updateJobStatus = async (id, newStatus) => {
    try {
      await axios.patch(`${API_URL}/api/jobs/${id}`, { status: newStatus });
      setJobs(jobs.map(job => 
        job._id === id ? { ...job, status: newStatus } : job
      ));
      toast.success('Status updated successfully');
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const deleteJob = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/jobs/${id}`);
      setJobs(jobs.filter(job => job._id !== id));
      toast.success('Job application deleted successfully');
    } catch (error) {
      toast.error('Failed to delete job application');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-2">
              Student Job Tracker
            </h1>
            <p className="text-gray-600">Track your job applications and interviews in one place</p>
          </div>
          <JobForm onSubmit={addJob} />
          <FilterBar 
            statusFilter={statusFilter}
            dateFilter={dateFilter}
            onStatusChange={setStatusFilter}
            onDateChange={setDateFilter}
          />
          <JobList 
            jobs={filteredJobs}
            onStatusUpdate={updateJobStatus}
            onDelete={deleteJob}
          />
        </div>
      </div>
    </div>
  );
}

export default App;