import React, { useEffect, useState } from 'react';
import API from '../api';
import JobForm from '../components/JobForm';
import JobList from '../components/JobList';
import Filter from '../components/Filter';

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [filterStatus, setFilterStatus] = useState('');

  const fetchJobs = async () => {
    const res = await API.get('/api/jobs');
    setJobs(res.data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs = filterStatus
    ? jobs.filter(job => job.status === filterStatus)
    : jobs;

  return (
    <div>
      <h1>Student Job Tracker</h1>
      <JobForm onJobAdded={fetchJobs} />
      <Filter filterStatus={filterStatus} onFilterChange={setFilterStatus} />
      <JobList jobs={filteredJobs} onDelete={fetchJobs} onStatusChange={fetchJobs} />
    </div>
  );
};

export default Home;
