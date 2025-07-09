import React, { useContext, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Chip, Typography,
  CircularProgress, Pagination, Box, Grid
} from '@mui/material';
import { LaunchContext } from '../context/LaunchContext';
import LaunchModal from './LaunchModal';
import FilterControls from './FilterControls';

const statusColor = { Success: 'success', Failed: 'error', Upcoming: 'warning' };

function LaunchTable() {
  const context = useContext(LaunchContext);
  if (!context) throw new Error('LaunchTable must be used within LaunchProvider');

  const { filteredLaunches, loading, error } = context;
  const [selectedLaunch, setSelectedLaunch] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const handleOpenModal = (launch) => {
    setSelectedLaunch(launch);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedLaunch(null);
    setIsModalOpen(false);
  };

  const handlePageChange = (_, value) => {
    setPage(value);
  };

  const paginatedLaunches = filteredLaunches.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4, width: '100%' }}>
      <Grid container spacing={2} sx={{ maxWidth: '1000px', width: '100%', mb: 2, px: 2 }}>
        <Grid item xs={12} md={6}><FilterControls /></Grid>
        <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'left', md: 'right' }, alignSelf: 'center' }}>
          {/* Future: add search or additional filter here if needed */}
        </Grid>
      </Grid>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error" align="center">{error}</Typography>
      ) : !filteredLaunches.length ? (
        <Typography align="center">No launches found.</Typography>
      ) : (
        <>
          <TableContainer component={Paper} sx={{ maxWidth: '1000px', width: '100%' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Launched (UTC)</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Mission</TableCell>
                  <TableCell>Orbit</TableCell>
                  <TableCell>Launch Status</TableCell>
                  <TableCell>Rocket</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedLaunches.map((launch, index) => (
                  <TableRow key={launch.id} hover onClick={() => handleOpenModal(launch)} sx={{ cursor: 'pointer' }}>
                    <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
                    <TableCell>{new Date(launch.date_utc).toLocaleString()}</TableCell>
                    <TableCell>{launch.launchpad?.name || 'Unknown'}</TableCell>
                    <TableCell>{launch.name}</TableCell>
                    <TableCell>{launch.payloads?.[0]?.orbit || 'N/A'}</TableCell>
                    <TableCell>
                      <Chip label={launch.upcoming ? 'Upcoming' : launch.success ? 'Success' : 'Failed'}
                            color={launch.upcoming ? statusColor.Upcoming : launch.success ? statusColor.Success : statusColor.Failed}
                            size="small" />
                    </TableCell>
                    <TableCell>{launch.rocket?.name || 'Unknown'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
            <Pagination count={Math.ceil(filteredLaunches.length / rowsPerPage)}
                        page={page}
                        onChange={handlePageChange}
                        color="primary" />
          </Box>
        </>
      )}

      <LaunchModal open={isModalOpen} handleClose={handleCloseModal} launch={selectedLaunch} />
    </Box>
  );
}

export default LaunchTable;
