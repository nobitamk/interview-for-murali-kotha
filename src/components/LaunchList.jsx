import React, { useContext, useState, useEffect } from 'react';
import { LaunchContext } from '../context/LaunchContext';
import LaunchCard from './LaunchCard';
import LaunchModaal from './LaunchModaal';
import {
  Grid,
  Typography,
  Skeleton,
  Button,
  useMediaQuery,
  useTheme,
} from '@mui/material';

function LaunchList() {
  const context = useContext(LaunchContext);
  if (!context) throw new Error('LaunchList must be used within a LaunchProvider');

  const { filteredLaunches, loading, error } = context;
  const [visibleCount, setVisibleCount] = useState(0);
  const [selectedLaunch, setSelectedLaunch] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    setVisibleCount(isMobile ? 10 : 24);
  }, [isMobile]);

  const handleLoadMore = () => {
    setVisibleCount((prev) =>
      isMobile ? Math.min(prev + 14, filteredLaunches.length) : Math.min(prev + 24, filteredLaunches.length)
    );
  };

  const handleCardClick = (launch) => {
    setSelectedLaunch(launch);
  };

  const handleCloseModal = () => {
    setSelectedLaunch(null);
  };

  if (loading) {
    return (
      <Grid container spacing={2} justifyContent="center">
        {Array.from(new Array(6)).map((_, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Skeleton variant="rectangular" height={200} />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (error) {
    return (
      <Grid container justifyContent="center">
        <Typography color="text.secondary">{error}</Typography>
      </Grid>
    );
  }

  if (!filteredLaunches.length) {
    return (
      <Grid container justifyContent="center">
        <Typography color="text.secondary">No launches found.</Typography>
      </Grid>
    );
  }

  const launchesToShow = filteredLaunches.slice(0, visibleCount);

  return (
    <div style={{ width: '100%' }}>
      {/* Rockets Grid */}
      <Grid container spacing={2} justifyContent="center">
        {launchesToShow.map((launch) => (
          <Grid
            item
            xs={6}    // 2 per row on mobile
            sm={4}    // 3 per row on tablet
            md={2}    // 6 per row on PC
            key={launch.id}
          >
            <LaunchCard launch={launch} onClick={handleCardClick} />
          </Grid>
        ))}
      </Grid>

      {/* Load More Button */}
      {visibleCount < filteredLaunches.length && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px',
            marginBottom: '40px',
          }}
        >
          <Button
            variant="contained"
            onClick={handleLoadMore}
            sx={{
              backgroundColor: '#bb86fc',
              color: '#000000',
              px: 4,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              '&:hover': { backgroundColor: '#a974f7' },
            }}
          >
            Load More
          </Button>
        </div>
      )}

      {selectedLaunch && (
        <LaunchModaal
          isOpen={!!selectedLaunch}
          onRequestClose={handleCloseModal}
          launch={selectedLaunch}
        />
      )}
    </div>
  );
}

export default LaunchList;
