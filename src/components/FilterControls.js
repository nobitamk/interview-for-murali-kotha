// src/components/FilterControls.jsx

import React, { useContext } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { LaunchContext } from '../context/LaunchContext';

function FilterControls() {
  const context = useContext(LaunchContext);
  if (!context) throw new Error('FilterControls must be used within LaunchProvider');

  const {
    filterStatus,
    setFilterStatus,
    filterDateRange,
    setFilterDateRange
  } = context;

  const handleStatusChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const handleDateRangeChange = (event) => {
    setFilterDateRange(event.target.value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}
    >
      <FormControl size="small" sx={{ minWidth: 160 }}>
        <InputLabel id="date-range-label">Date Range</InputLabel>
        <Select
          labelId="date-range-label"
          value={filterDateRange}
          label="Date Range"
          onChange={handleDateRangeChange}
        >
          <MenuItem value="all">All Time</MenuItem>
          <MenuItem value="past_week">Past Week</MenuItem>
          <MenuItem value="past_month">Past Month</MenuItem>
          <MenuItem value="past_3_months">Past 3 Months</MenuItem>
          <MenuItem value="past_6_months">Past 6 Months</MenuItem>
          <MenuItem value="past_year">Past Year</MenuItem>
          <MenuItem value="past_2_years">Past 2 Years</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 160 }}>
        <InputLabel id="status-filter-label">Launch Status</InputLabel>
        <Select
          labelId="status-filter-label"
          value={filterStatus}
          label="Launch Status"
          onChange={handleStatusChange}
        >
          <MenuItem value="all">All Launches</MenuItem>
          <MenuItem value="success">Success</MenuItem>
          <MenuItem value="failed">Failed</MenuItem>
          <MenuItem value="upcoming">Upcoming</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default FilterControls;
