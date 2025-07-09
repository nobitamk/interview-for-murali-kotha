import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const LaunchContext = createContext();

export const LaunchProvider = ({ children }) => {
  const [launches, setLaunches] = useState([]);
  const [filteredLaunches, setFilteredLaunches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDateRange, setFilterDateRange] = useState('all');

  useEffect(() => {
    const fetchLaunches = async () => {
      try {
        setLoading(true);
        const res = await axios.get('https://api.spacexdata.com/v4/launches');
        setLaunches(res.data);
        setFilteredLaunches(res.data);
      } catch (err) {
        setError('Failed to fetch SpaceX launches.');
      } finally {
        setLoading(false);
      }
    };

    fetchLaunches();
  }, []);

  useEffect(() => {
    handleFilter();
  }, [filterStatus, filterDateRange, launches]);

  const handleFilter = () => {
    let filtered = [...launches];

    if (filterStatus !== 'all') {
      if (filterStatus === 'success') {
        filtered = filtered.filter(l => l.success);
      } else if (filterStatus === 'failed') {
        filtered = filtered.filter(l => l.success === false);
      } else if (filterStatus === 'upcoming') {
        filtered = filtered.filter(l => l.upcoming);
      }
    }

    if (filterDateRange !== 'all') {
      const now = new Date();
      let fromDate;

      switch (filterDateRange) {
        case 'past_week':
          fromDate = new Date(now.setDate(now.getDate() - 7));
          break;
        case 'past_month':
          fromDate = new Date(now.setMonth(now.getMonth() - 1));
          break;
        case 'past_3_months':
          fromDate = new Date(now.setMonth(now.getMonth() - 3));
          break;
        case 'past_6_months':
          fromDate = new Date(now.setMonth(now.getMonth() - 6));
          break;
        case 'past_year':
          fromDate = new Date(now.setFullYear(now.getFullYear() - 1));
          break;
        case 'past_2_years':
          fromDate = new Date(now.setFullYear(now.getFullYear() - 2));
          break;
        default:
          fromDate = null;
      }

      if (fromDate) {
        filtered = filtered.filter(l => new Date(l.date_utc) >= fromDate);
      }
    }

    setFilteredLaunches(filtered);
  };

  return (
    <LaunchContext.Provider
      value={{
        launches,
        filteredLaunches,
        loading,
        error,
        filterStatus,
        setFilterStatus,
        filterDateRange,
        setFilterDateRange
      }}
    >
      {children}
    </LaunchContext.Provider>
  );
};